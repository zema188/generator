<template>
    <div class="field">
        <span>
            Текст
        </span>
        
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        }
    })
</script>

<style lang="scss" scoped>

</style>