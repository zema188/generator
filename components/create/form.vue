<template>
    <div>
        <div class="create__title">
            Контент
        </div>

        <div v-if="paramsNewBlock.title">
            <fields-input
                v-model="paramsNewBlock.title.innerHTML"
            >

                <template v-slot:title>
                    Зоголовок формы
                </template>
            </fields-input>

            <fields-select
                v-model="paramsNewBlock.title.tag"
                :options="titleTags"
            >
                <template v-slot:title>
                    HTML тег заголовка формы
                </template>
            </fields-select>

            <div class="create__title">
                Стили CSS для заголовка
            </div>
            
            <div class="selects-list">
                <fields-input
                    v-model="paramsNewBlock.title.styles['font-size']"
                >

                    <template v-slot:title>
                        Размер шрифтра
                    </template>
                </fields-input>

                <fields-select
                    v-model="paramsNewBlock.title.styles['font-weight']"
                    :options="fontWeight"
                >
                    <template v-slot:title>
                        Насыщенность шрифта
                    </template>
                </fields-select>

                <fields-select
                    v-model="paramsNewBlock.title.styles['text-align']"
                    :options="textAlign"
                >
                    <template v-slot:title>
                        Выравнивание текста
                    </template>
                </fields-select>

                <fields-select
                    v-model="paramsNewBlock.title.styles['color']"
                    :options="color"
                >
                    <template v-slot:title>
                        Цвет шрифта
                    </template>
                </fields-select>
            </div>
        </div>

        <div class="create__title">
            Параметры
        </div>
        
        <div class="items"
            v-if="props.paramsNewBlock.childs"
        >
            <div
                class="item"
                v-for="(el, index) of props.paramsNewBlock.childs.items" :key="index"
            >
                {{ index + 1}} Параметр

                <button class="cross">
                    <icons-cross
                        @click="deleteChild(index)"
                    />
                </button>

                <fields-select
                    v-model="el.tag"
                    :options="parametrTags"
                >
                    <template v-slot:title>
                        Тип элемента
                    </template>
                </fields-select>

                <fields-input
                    v-model="el.name"
                >

                    <template v-slot:title>
                        Название
                    </template>
                </fields-input>

                <fields-input
                    v-model="el.placeHolder"
                    :type="el.tag"
                >

                    <template v-slot:title>
                        Надпись внутри поля ввода
                    </template>
                </fields-input>
            </div>
        </div>
        <button class="btn btn_green btn_small"
            @click="addChild()"
        >
            Добавить элемент
        </button>
        <!-- <div class="selects-list">
            <fields-input
                v-model="paramsNewBlock.attrs.href"
            >

                <template v-slot:title>
                    Ссылка
                </template>
            </fields-input>
        </div> -->
    </div>
</template>

<script setup>
import useCreateBlockEntity from '~/mixins/createBlockEntity';

const { textAlign, color, fontWeight, titleTags, createClass } = useCreateBlockEntity()

const props = defineProps({
    paramsNewBlock: {
        type: Object,
        required: true,
    },
    
    activeBlockInList: {
        type: [null, Object],
        required: true
    },

    classes: {
        type: [null, Object],
        required: true
    }
})

const parametrTags = [
    {
        name: 'input', value: 'Поле ввода',
    },
    {
        name: 'textarea', value: 'Большое поле ввода'
    }
]

const addChild = () => {
    props.paramsNewBlock.childs.items.push({
        tag: 'input',
        name: '',
        placeHolder: ''
    })
}

const deleteChild = (index) => {
    props.paramsNewBlock.childs.items.splice(index, 1)
}

const initParams = () => {
    props.paramsNewBlock.tag = 'form'
    props.paramsNewBlock.typeTag = 'double-sided'
    props.paramsNewBlock.type = 'form'
    props.paramsNewBlock.class = createClass('form', props.classes.link)
    props.paramsNewBlock.innerHTML = ''
    props.paramsNewBlock.attrs.action = '#'
    props.paramsNewBlock.attrs.method = 'post'

    props.paramsNewBlock.styles = {
        'border': '1px solid #969696',
        'padding': '25px',
        'border-radius': '12px',
    }
    
    props.paramsNewBlock.title = {
        tag: 'h3',
        type: 'double-sided',
        innerHTML: '',
        class: createClass('form__title', props.classes.link),
        styles: {
            'font-size': '20px',
            'text-align': 'center',
            'font-weight': 'bold',
            'color': 'red',
        }
    },

    props.paramsNewBlock.button = {
        tag: 'button',
        type: 'double-sided',
        innerHTML: 'Отправить',
        attrs: {
            type: 'submit',
        },
    },

    props.paramsNewBlock.childs = {
        items: [
            {
                tag: 'input',
                name: '',
                placeHolder: ''
            },
        ]
    }
}

onMounted(() => {
    if(!props.activeBlockInList) initParams()
})
</script>

<style lang="scss" scoped>
.item {
    border: 1px solid #000000d2;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 15px;
    position: relative;
    & .cross {
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
    }
}
</style>