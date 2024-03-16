<template>
    <div class="field">
        <span>
            <slot name="title"></slot>
        </span>

        <select
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
        >
            <option
                v-for="option in options"
                :key="option.name"
                :value="option.name"
            >
                {{ option.value }}
            </option>
        </select>
    </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        },

        options: {
            type: Array,
            required: true,
        }
    })
</script>

<style lang="scss" scoped>

</style>