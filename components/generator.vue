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
            @moveBlock="direction => moveBlock(direction)"
            :quantityBlocks="data.blocks.length"
        />

        <list-blocks
            v-if="activeTabBlock === 'redactor'"
            :data="data"
            v-model:activeBlockInList="activeBlockInList"
        />

        <html-code
            v-if="activeTabBlock === 'HTML'"
        />

        <css-code
            v-if="activeTabBlock === 'CSS'"
        />
    </div>
</template>

<script setup>
import panel from '~/components/panel.vue';
import htmlCode from './htmlCode.vue';

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

const data = ref({
    blocks: [
        {
            tag: 'h1',
            innerHTML: 'Заголовок страницы',
            class: 'title-1',
            type: 'double-sided',
            additional: {
                
            }
        },
        {
            tag: 'ul',
            innerHTML: null,
            class: 'list-1',
            type: 'double-sided',
            childs: [
                {
                    tag: 'li',
                    innerHTML: 'Элемент списка №1',
                    class: 'list-1__item',
                    type: 'double-sided',
                    additional: {
                        
                    }
                },
                {
                    tag: 'li',
                    innerHTML: 'Элемент списка №2',
                    class: 'list-1__item',
                    type: 'double-sided',
                    additional: {
                        
                    }
                },
                {
                    tag: 'li',
                    innerHTML: 'Элемент списка №3',
                    class: 'list-1__item',
                    type: 'double-sided',
                    additional: {
                        
                    }
                },
                {
                    tag: 'li',
                    innerHTML: 'Элемент списка №4',
                    class: 'list-1__item',
                    type: 'double-sided',
                    additional: {
                        
                    }
                },
            ],
            additional: {
                
            }
        },
        {
            tag: 'a',
            innerHTML: 'Ссылка на другую страницу',
            class: 'link-1',
            type: 'double-sided',
            additional: {
                href: 'https://vk.com/'
            }
        },
        {
            tag: 'img',
            innerHTML: null,
            class: 'image-1',
            type: 'one-sided',
            additional: {
                src: 'https://rgo.ru/upload/content_block/images/9ca8302358b777e143cd6e314058266b/7065323d0aa2e3fa6e8764c4f57f1655.jpg?itok=sawvdjq3',
                test: 'test'
            }
        }
    ],
    styles: [

    ]
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