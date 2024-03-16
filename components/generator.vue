<template>
    <div class="container">
        <h1>
            Генератор семантического кода
        </h1>

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
            v-model:activeBlockInList="activeBlockInList"
            :quantityBlocks="data.blocks.length"
            @moveBlock="direction => moveBlock(direction)"
            @openPopupCreate="type => openPopupCreate(type)"
        />

        <list-blocks
            v-if="activeTabBlock === 'redactor'"
            :data="data"
            v-model:activeBlockInList="activeBlockInList"
        />

        <html-code
            v-if="activeTabBlock === 'HTML'"
            :data="data"
        />

        <css-code
            v-if="activeTabBlock === 'CSS'"
        />
    </div>

    <popup
        :name="'createBlockPopup'"
    >
        <create-block
            :createBlockType="createBlockType"
            :paramsNewBlock="paramsNewBlock"
            @createNewBlock="createNewBlock()"
        />
    </popup>
</template>

<script setup>
import { usePopup } from '~/stores/popup'

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

let activeTabBlock = ref('redactor')
let activeBlockInList = ref(null)
let createBlockType = ref(null)
const paramsNewBlock = ref({
    styles: {
            
    }
})
const data = ref({
    blocks: [
        {
            tag: 'h1',
            innerHTML: 'Заголовок страницы',
            class: 'title-1',
            type: 'double-sided',
            styles: {
                'text-align': 'center',
                'font-weight': 'bold',
            }
        },
        {
            tag: 'ul',
            innerHTML: null,
            class: 'list-1',
            type: 'double-sided',
            childs: {
                info: {
                    tag: 'li',
                    class: 'list-1__item',
                    type: 'double-sided',
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
                            'font-weight': 'bold',
                        },
                    },
                    {
                        innerHTML: 'Элемент списка №4',
                    },
                ],
                styles: {
                    'text-allign': 'center',
                    'font-weight': 'bold',
                }
            },
        },
        {
            tag: 'a',
            innerHTML: 'Ссылка на другую страницу',
            class: 'link-1',
            type: 'double-sided',
            attrs: {
                href: 'https://vk.com/'
            },
        },
        {
            tag: 'img',
            innerHTML: null,
            class: 'image-1',
            type: 'one-sided',
            attrs: {
                src: 'https://rgo.ru/upload/content_block/images/9ca8302358b777e143cd6e314058266b/7065323d0aa2e3fa6e8764c4f57f1655.jpg?itok=sawvdjq3',
                alt: 'птичка'
            },
        }
    ],
})

const moveBlock = (direction) => {
    if (direction === 'up' && activeBlockInList.value > 0) {
        const newIndex = activeBlockInList.value - 1;
        const blockToMove = data.value.blocks.splice(activeBlockInList.value, 1)[0];
        data.value.blocks.splice(newIndex, 0, blockToMove);
        activeBlockInList.value = newIndex;
    } else if (direction === 'down' && activeBlockInList.value < data.value.blocks.length - 1) {
        const newIndex = activeBlockInList.value + 1;
        const blockToMove = data.value.blocks.splice(activeBlockInList.value, 1)[0];
        data.value.blocks.splice(newIndex, 0, blockToMove);
        activeBlockInList.value = newIndex;
    }
}

const openPopupCreate = (type) => {
    createBlockType.value = type
    popupStore.disableScroll('createBlockPopup')
}

const createNewBlock = () => {
    popupStore.enableScroll('createBlockPopup')
    data.value.blocks.push({...paramsNewBlock.value})
    createBlockType.value = null
    clearParams()
}

const clearParams = () => {
    paramsNewBlock.value = {
        styles: {

        }
    }
}

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
</style>