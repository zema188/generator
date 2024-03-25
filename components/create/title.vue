<template>
    <div>
        <div class="create__title">
            Контент
        </div>

        <fields-input
            v-model="paramsNewBlock.innerHTML"
        >

            <template v-slot:title>
                Текст
            </template>
        </fields-input>

        <fields-select
            v-model="paramsNewBlock.tag"
            :options="tags"
        >
            <template v-slot:title>
                HTML тег
            </template>
        </fields-select>

        <div class="create__title">
            Стили CSS
        </div>
        
        <div class="selects-list">
            <fields-input
                v-model="paramsNewBlock.styles['font-size']"
            >

                <template v-slot:title>
                    Размер шрифтра
                </template>
            </fields-input>

            <fields-select
                v-model="paramsNewBlock.styles['font-weight']"
                :options="fontWeight"
            >
                <template v-slot:title>
                    Насыщенность шрифта
                </template>
            </fields-select>

            <fields-select
                v-model="paramsNewBlock.styles['text-align']"
                :options="textAlign"
            >
                <template v-slot:title>
                    Выравнивание текста
                </template>
            </fields-select>

            <fields-select
                v-model="paramsNewBlock.styles['color']"
                :options="color"
            >
                <template v-slot:title>
                    Цвет шрифта
                </template>
            </fields-select>
        </div>
    </div>
</template>

<script setup>
import useCreateBlockEntity from '~/mixins/createBlockEntity';

const { textAlign, color, fontWeight, createClass } = useCreateBlockEntity()

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

const tags = ref([
    {
        name: 'h1',
        value: 'Заголовок 1-го уровня'
    },
    {
        name: 'h2',
        value: 'Заголовок 2-го уровня'
    },
    {
        name: 'h3',
        value: 'Заголовок 3-го уровня'
    },
    {
        name: 'h4',
        value: 'Заголовок 4-го уровня'
    },
    {
        name: 'h5',
        value: 'Заголовок 5-го уровня'
    },
    {
        name: 'h6',
        value: 'Заголовок 6-го уровня'
    },
]);

const initParams = () => {
    props.paramsNewBlock.tag = 'h1'
    props.paramsNewBlock.typeTag = 'double-sided'
    props.paramsNewBlock.type = 'title'
    props.paramsNewBlock.class = createClass('title', props.classes.title)
    props.paramsNewBlock.innerHTML = ''

    props.paramsNewBlock.styles['font-size'] = '25px';
    props.paramsNewBlock.styles['text-align'] = 'center';
    props.paramsNewBlock.styles['font-weight'] = '900';
    props.paramsNewBlock.styles['color'] = 'black';
}

onMounted(() => {
    if(!props.activeBlockInList) initParams()
})
</script>

<style lang="scss" scoped>
.title {
    font-weight: bold;
    text-align: center;
    font-size: 22px;
}
</style>
