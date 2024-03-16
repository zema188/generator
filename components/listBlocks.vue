<template>
    <div class="list">
        <block
            v-for="(item, index) of props.data.block"
            :key="index"
            :block="item"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.list {
    min-height: 700px;
    border: 2px solid #5589f8;
    padding: 10px;
}
</style>