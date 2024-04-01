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
            :quantityBlocks="data.blocks?.length"
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
import { exampleData } from '@/blocks/example.js'

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

const data = ref({})
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

const init = () => {
    data.value = {...exampleData}
    console.log(data.value)
}

onMounted(() => {
    init()

    onClickOutsideHandler[1].ignore.push(document.querySelector('.action_redactor'));
    onClickOutsideHandler[1].ignore.push(document.querySelector('.createBlockPopup'));
    onClickOutsideHandler[1].ignore.push(document.querySelector('.confirmDelete'));
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