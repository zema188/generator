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

        <div class="create__title">
            Параметры
        </div>

        <div class="selects-list">
            <fields-input
                v-model="paramsNewBlock.attrs.href"
            >

                <template v-slot:title>
                    Ссылка
                </template>
            </fields-input>
        </div>
        
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

const initParams = () => {
    props.paramsNewBlock.tag = 'a'
    props.paramsNewBlock.typeTag = 'double-sided'
    props.paramsNewBlock.type = 'link'
    props.paramsNewBlock.class = createClass('link', props.classes.link)
    props.paramsNewBlock.innerHTML = ''
    props.paramsNewBlock.attrs.href = ''

    props.paramsNewBlock.styles['font-size'] = '16px';
    props.paramsNewBlock.styles['text-align'] = 'left';
    props.paramsNewBlock.styles['font-weight'] = '400';
    props.paramsNewBlock.styles['color'] = 'blue';
}

onMounted(() => {
    if(!props.activeBlockInList) initParams()
})
</script>

<style lang="scss" scoped>
</style>
