<template>
    <div class="title">
        <div class="field">
            <span>
                HTML тег
            </span>
            
            <select v-model="paramsNewBlock.tag" required>
                <option
                    v-for="option in tags"
                    :key="option.name"
                    :value="option.name"
                >
                    {{ option.value }}
                </option>
            </select>
        </div>

        <div class="field">
            <span>
                Текст
            </span>
            
            <input v-model="paramsNewBlock.innerHTML" required>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    paramsNewBlock: {
        type: Object,
        required: true,
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

onMounted(() => {
    props.paramsNewBlock.tag = 'h1'
    props.paramsNewBlock.innerHTML = ''
    props.paramsNewBlock.type = 'double-sided'
    props.paramsNewBlock.additional = {}
})
</script>

<style lang="scss" scoped>
/* Ваши стили */
</style>
