<template>
    <div>
        <fields-text
            v-model="paramsNewBlock.innerHTML"
        />
        
        <div class="create__title">
            Стили CSS
        </div>

        <fields-select
            v-model="paramsNewBlock.styles['text-align']"
            :options="textAlign"
        >
            <template v-slot:title>
                Выравнивание текста
            </template>
        </fields-select>

        <fields-select
            v-model="paramsNewBlock.styles['font-weight']"
            :options="fontWeight"
        >
            <template v-slot:title>
                Насыщенность шрифта
            </template>
        </fields-select>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useStyles from '~/mixins/styles';

const { textAlign, fontWeight } = useStyles()

const props = defineProps({
    paramsNewBlock: {
        type: Object,
        required: true,
    }
})


onMounted(() => {
    props.paramsNewBlock.tag = 'a'
    props.paramsNewBlock.innerHTML = ''
    props.paramsNewBlock.type = 'double-sided'

    props.paramsNewBlock.styles['text-align'] = 'center';
    props.paramsNewBlock.styles['font-weight'] = '400';
})
</script>

<style lang="scss" scoped>
</style>
