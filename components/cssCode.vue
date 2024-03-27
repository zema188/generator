<template>
    <div class="css">
        <div class="numbers">
            <div class="number"
                v-for="number of quantityLines" :key="number"
            >
                {{ number }}
            </div>
        </div>
        <pre class="code" ref="codeRef">
            {{ classesCode }}
        </pre>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },

    modelValue: {
        type: String,
        required: true
    }
})

const emits = defineEmits('update:modelValue')

const codeRef = ref(null)

const quantityLines = computed(() => {
    return props.modelValue ? props.modelValue.split("\n").length : 0
})

const classesCode = computed(() => {
    let text = ''
    
    props.data.blocks.forEach((el, i) => {
        let styles = ''

        if (el.styles) {
            let index = 0
            let sizeStyles = Object.keys(el.styles).length
            for (const [key, value] of Object.entries(el.styles)) {
                if(index !== sizeStyles - 1) {
                    styles += `${key}: ${value};\n    `
                } else {
                    styles += `${key}: ${value};`
                }
                index++
            }
        }

        let obj = ``

            obj = `
.${el.class} {          
    ${styles}
}\n`
        text += obj
    });

    emits('update:modelValue', text)

    return text
})
</script>

<style lang="scss" scoped>
.css {
    height: 700px;
    border: 2px solid #5589f8;
    padding: 10px;
    display: flex;
    gap: 10px;
    background: #ccc;
    overflow: auto;
}

.number {
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: right;
}
</style>