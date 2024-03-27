<template>
    <div class="container">
        <h1>
            Генератор семантического кода
        </h1>

        <div class="header__btns">

            <button class="btn btn_green btn_small"
                @click="downloadProject()"
            >
                Скачать архив проекта
            </button>

            <button class="btn btn_green btn_small copy"
                @click="copyHtmlCode()"
            >
                Скопировать HTML
                <icons-copy/>
            </button>

            <button class="btn btn_green btn_small copy"
                @click="copyCssCode()"
            >
                Скопировать CSS
                <icons-copy/>
            </button>

        </div>

        <div class="btns">
            <button
                v-for="btn of btns"
                :key="btn.name"
                :class="{active: btn.name === activeTabBlock}"
                @click="activeTabBlock = btn.name"
            >
                {{ btn.value }}
            </button>
        </div>

        <panel
            v-model:indexActiveBlockInList="indexActiveBlockInList"
            :quantityBlocks="data.blocks.length"
            :activeTabBlock="activeTabBlock"
            @moveBlock="direction => moveBlock(direction)"
            @openPopupCreate="type => openPopupCreate(type)"
            @deleteBlock="confirmDelete()"
            @openPopupEdit="openPopupEdit()"
        />

        <list-blocks
            v-show="activeTabBlock === 'redactor'"
            :data="data"
            v-model:indexActiveBlockInList="indexActiveBlockInList"
            v-model:activeBlockInList="activeBlockInList"
            v-on-click-outside="onClickOutsideHandler"
        />

        <html-code
            v-show="activeTabBlock === 'HTML'"
            :data="data"
            v-model="htmlText"
        />

        <css-code
            v-show="activeTabBlock === 'CSS'"
            :data="data"
            v-model="cssText"
        />
    </div>

    <popup
        :name="'createBlockPopup'"
        @closePopup="closePopup"
    >
        <create-block
            :blockType="blockType"
            :paramsNewBlock="paramsNewBlock"
            :activeBlockInList="activeBlockInList"
            :classes="data.classes"
            @createNewBlock="createNewBlock()"
            @editActiveBlock="editActiveBlock()"
        />
    </popup>

    <popup
        :name="'confirmDelete'"
    >
        <p>
            Вы действительно хотите удалить блок ?
        </p>
        <div class="btns">
            <button class="btn btn_red"
                @click="deleteBlock()"
            >
                Удалить
            </button>
            <button class="btn btn_green"
                @click="popupStore.enableScroll('confirmDelete')"
            >
                Отмена
            </button>
        </div>
    </popup>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'
import { usePopup } from '@/stores/popup'
import JSZip from 'jszip';
import resetStyles from '@/helpers/resetStyle.js'
import htmlDefaultCode from '@/helpers/htmlDefaultCode.js'

const popupStore = usePopup()

const btns = ref([
    {
        name: 'redactor',
        value: 'Редактор'
    },
    {
        name: 'HTML',
        value: 'Код HTML'
    },
    {
        name: 'CSS',
        value: 'Код CSS'
    },
])

const paramsNewBlock = ref({
    styles: {
            
    },
    attrs: {
            
    }
})

let activeTabBlock = ref('redactor')
let indexActiveBlockInList = ref(null)
let activeBlockInList = ref(null)
let blockType = ref(null)
let cssText = ref('')
let htmlText = ref('')

const moveBlock = (direction) => {
    if (direction === 'up' && indexActiveBlockInList.value > 0) {
        const newIndex = indexActiveBlockInList.value - 1;
        const blockToMove = data.value.blocks.splice(indexActiveBlockInList.value, 1)[0];
        data.value.blocks.splice(newIndex, 0, blockToMove);
        indexActiveBlockInList.value = newIndex;
    } else if (direction === 'down' && indexActiveBlockInList.value < data.value.blocks.length - 1) {
        const newIndex = indexActiveBlockInList.value + 1;
        const blockToMove = data.value.blocks.splice(indexActiveBlockInList.value, 1)[0];
        data.value.blocks.splice(newIndex, 0, blockToMove);
        indexActiveBlockInList.value = newIndex;
    }
}

const openPopupCreate = (type) => {
    blockType.value = type
    activeBlockInList.value = null
    popupStore.disableScroll('createBlockPopup')
}

const createNewBlock = () => {
    popupStore.enableScroll('createBlockPopup')
    data.value.blocks.push({...paramsNewBlock.value})
    data.value.classes[blockType.value]++
    blockType.value = null
    clearParams()
}

const editActiveBlock = () => {
    data.value.blocks[indexActiveBlockInList.value] = JSON.parse(JSON.stringify(paramsNewBlock.value))
    activeBlockInList.value = JSON.parse(JSON.stringify(data.value.blocks[indexActiveBlockInList.value]))
}

const deleteBlock = () => {
    data.value.blocks.splice(indexActiveBlockInList.value, 1)
    indexActiveBlockInList.value = null
    popupStore.enableScroll('confirmDelete')
}

const confirmDelete = () => {
    popupStore.disableScroll('confirmDelete')
}

const openPopupEdit = () => {
    // paramsNewBlock.value = {...activeBlockInList.value}
    paramsNewBlock.value = JSON.parse(JSON.stringify(activeBlockInList.value))
    blockType.value = activeBlockInList.value.type 
    popupStore.disableScroll('createBlockPopup')
}

const clearParams = () => {
    paramsNewBlock.value = {
        styles: {

        },
        attrs: {

        }
    }
}

const closePopup = () => {
    clearParams()
    blockType.value = null
}

const downloadProject = () => {
  const zip = new JSZip();

  zip.file('index.html', htmlDefaultCode(htmlText.value));

  zip.file('style.css', `
    ${resetStyles}
    ${cssText.value}
  `);

  zip.generateAsync({ type: 'blob' })
    .then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'my-project.zip';
      link.click();
    })
    .catch(error => {
      console.error('Error creating ZIP archive:', error);
    });
};

const copyHtmlCode = () => {
    navigator.clipboard.writeText(htmlDefaultCode(htmlText.value))
}

const copyCssCode = () => {
    navigator.clipboard.writeText(cssText.value)
}

const onClickOutsideHandler = [
  () => {
    indexActiveBlockInList.value = null
  },
  { ignore: [] },
]

onMounted(() => {
    onClickOutsideHandler[1].ignore.push(document.querySelector('.action_redactor'));
    onClickOutsideHandler[1].ignore.push(document.querySelector('.createBlockPopup'));
    onClickOutsideHandler[1].ignore.push(document.querySelector('.confirmDelete'));
})

const data = ref({
    classes: {
        title: 1,
        list: 1,
        link: 1,
        nav: 1,
    },

    blocks: [
        {
            tag: 'h1',
            typeTag: 'double-sided',
            innerHTML: 'Заголовок страницы',
            class: 'title-1',
            type: 'title',
            styles: {
                'text-align': 'center',
                'font-weight': '800',
                'font-size': '25px',
            }
        },
        {
            tag: 'nav',
            typeTag: 'double-sided',
            innerHTML: null,
            class: 'nav-1',
            type: 'nav',
            styles: {
                'list-style': 'disc',
                'font-size': '30px',
            },
            childs: {
                info: {
                    tag: 'a',
                    class: '',
                    typeTag: 'double-sided',
                },
                items: [
                    {
                        innerHTML: 'Ссылка в меню №1',
                        attrs: {
                            href: 'https://vk.com/'
                        },
                    },
                    {
                        innerHTML: 'Ссылка в меню №2',
                        attrs: {
                            href: 'https://vk.com/'
                        },
                    },
                    {
                        innerHTML: 'Ссылка в меню №3',
                        attrs: {
                            href: 'https://vk.com/'
                        },
                    },
                ],
            },
        },
        {
            tag: 'ul',
            typeTag: 'double-sided',
            innerHTML: null,
            class: 'list-1',
            type: 'list',
            styles: {
                'list-style': 'disc',
                'text-align': 'left',
                'font-weight': 'bold',
            },
            childs: {
                info: {
                    tag: 'li',
                    class: 'list-1__item',
                    typeTag: 'double-sided',
                },
                items: [
                    {
                        innerHTML: 'Элемент списка №1',
                    },
                    {
                        innerHTML: 'Элемент списка №2',
                    },
                    {
                        innerHTML: 'Элемент списка №3',
                        styles: {
                        },
                    },
                    {
                        innerHTML: 'Элемент списка №4',
                    },
                ],
                styles: {
                    'text-align': 'center',
                    'font-weight': '500',
                    'color': 'green',
                }
            },
        },
        {
            tag: 'a',
            typeTag: 'double-sided',
            innerHTML: 'Ссылка на другую страницу',
            class: 'link-1',
            type: 'link',
            attrs: {
                href: 'https://vk.com/'
            },
            styles: {
                'text-align': 'left',
                'font-weight': 'bold',
                'color': 'Blue',
                'text-decoration': 'underline'
            },
        },
        {
            tag: 'p',
            typeTag: 'double-sided',
            innerHTML: 'Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности играет важную роль в формировании форм развития. Не следует, однако забывать, что укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. ',
            class: 'text-1',
            type: 'textP',
            styles: {
                'text-align': 'left',
                'font-weight': 'bold',
            },
        },
        // {
        //     tag: 'img',
        //     typeTag: 'one-sided',
        //     innerHTML: null,
        //     class: 'image-1',
        //     type: 'photo',
        //     attrs: {
        //         src: 'https://rgo.ru/upload/content_block/images/9ca8302358b777e143cd6e314058266b/7065323d0aa2e3fa6e8764c4f57f1655.jpg?itok=sawvdjq3',
        //         alt: 'птичка'
        //     },
        //     styles: {
        //         'max-width': '700px',
        //         'width': '100%',
        //         'object-fit': 'contain',
        //     },
        // }
    ],
})
</script>

<style lang="scss" scoped>
h1 {
    font-weight: bold;
    font-size: 30px;
    margin-top: 50px;
}

.btns {
    display: flex;
    justify-content: center;
    gap: 10px;
    & button {
        padding: 20px;
        border-bottom: 3px solid transparent;
        transition: .2s;
        &.active {
            border-bottom: 3px solid #5589f8;
        }
    }
}

.header__btns {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}
.copy {
    & svg {
        width: 20px;
    }
}

.confirmDelete {
    & p {
        font-size: 20px;
        text-align: center;
        font-weight: bold;
    }
    & .btns {
        display: flex;
        margin-top: 20px;
        & .btn {
            max-width: 150px;
            padding: 10px 15px;
        }
    }
}
</style>