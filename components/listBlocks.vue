<template>
    <div class="list">
        <block
            v-for="(item, index) of props.data.blocks"
            :key="index"
            :block="item"
            :isActive="props.indexActiveBlockInList === index"
            @click="handleClickBlock(item, index)"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    
    indexActiveBlockInList: {
        type: [null, Number],
        required: true
    },

    activeBlockInList: {
        type: [null, Object],
        required: true
    },
})

const emits = defineEmits(['update:indexActiveBlockInList', 'update:activeBlockInList'])

const handleClickBlock = (item, index) => {
    if(props.indexActiveBlockInList === index) {
        emits('update:indexActiveBlockInList', null)
        emits('update:activeBlockInList', null)
    } else {
        emits('update:indexActiveBlockInList', index)
        emits('update:activeBlockInList', JSON.parse(JSON.stringify(item)))
    }
}
</script>

<style lang="scss" scoped>
.list {
    height: 700px;
    border: 2px solid #5589f8;
    padding: 10px;
    overflow: auto;
}
</style>