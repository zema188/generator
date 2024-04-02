<template>
    <div>
        <div class="create__title">
            Контент
        </div>

        <img class="image" :src="props.paramsNewBlock.attrs.src" :alt="props.paramsNewBlock.attrs.alt">

        <div class="create__title">
            Параметры
        </div>
        
        <fields-input
            v-model="props.paramsNewBlock.attrs.src"
        >

            <template v-slot:title>
                Ссылка на изображение
            </template>
        </fields-input>

        <fields-input
            v-model="props.paramsNewBlock.attrs.alt"
        >

            <template v-slot:title>
                Атрибут alt для описания фотографии
            </template>
        </fields-input>

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

const initParams = () => {
    props.paramsNewBlock.tag = 'img'
    props.paramsNewBlock.typeTag = 'one-sided'
    props.paramsNewBlock.type = 'photo'
    props.paramsNewBlock.class = createClass('photo', props.classes.link)
    props.paramsNewBlock.innerHTML = ''
    props.paramsNewBlock.attrs.alt = 'Ваше описание для фото'

    props.paramsNewBlock.styles = {
        'max-width': '700px',
        'width': '100%',
        'object-fit': 'contain',
    }
}

onMounted(() => {
    if(!props.activeBlockInList) initParams()
})
</script>

<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
    margin-bottom: 20px;
}
</style>