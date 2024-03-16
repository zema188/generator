<template>
    <div class="container">
        <h1>
            Генератор семантического кода
        </h1>

        <div class="btns">
            <button
                v-for="btn of btns"
                :key="btn.name"
                :class="{active: btn.name === activeBtn}"
                @click="activeBtn = btn.name"
            >
                {{ btn.value }}
            </button>
        </div>

        <panel/>

        <list-blocks
            :data="data"
        />
    </div>
</template>

<script setup>
import panel from '~/components/panel.vue';

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

let activeBtn = ref('redactor')

const data = ref({
    block: [
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