<template>
    <div class="html">
        <div class="numbers">
            <div class="number"
                v-for="number of quantityLines" :key="number"
            >
                {{ number }}
            </div>
        </div>
        <div class="code">
            <div
                v-for="(item, index) of props.data.blocks"
                :key="index"
                ref="itemRefs"
            >
                <block
                    :block="item"
                    pre
                />
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

const lines = computed(() => {
    let lines = 0

    itemRefs.value.forEach(el => {
        lines += el.querySelector('pre').textContent
    });

    return lines
})
</script>

<style lang="scss" scoped>
.html {
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