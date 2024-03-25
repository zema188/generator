<template>
    <div class="css">
        <div class="numbers">
            <div class="number"
                v-for="number of quantityLines" :key="number"
            >
                {{ number }}
            </div>
        </div>
        <div class="code">
            <div
                v-for="(item, index) of classesCode"
                :key="index"
                ref="itemRefs"
            >
                <pre>
                    {{ item }}
                </pre>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})

const itemRefs = ref([])

const quantityLines = computed(() => {
    let lines = 0

    itemRefs.value.forEach(el => {
        lines += el.querySelector('pre').textContent.split("\n").length
    });

    return lines
})

const classesCode = computed(() => {
    let classes = []

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

        if(i === 0) {
            obj = `
.${el.class} {          
    ${styles}
}`
        } else {
            obj = `
.${el.class} {          
    ${styles}
}`
        }
        classes.push(obj)
    });

    return classes
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