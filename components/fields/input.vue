<template>
    <div class="field"
        :class="{hasIcon: icon}"
    >
        <span>
            <slot name="title">

            </slot>
        </span>

        <div class="input-w">
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">

            <button class="icon">
                <slot name="icon">

                </slot>
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        },
        icon: Boolean
    })
</script>

<style lang="scss" scoped>
.input-w {
    width: 100%;
    position: relative;
}

.field {
    &.hasIcon {
        & input {
            padding-right: 38px;
        }
    }
}
.icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
}
</style>