<template>
    <div class="list">
        <block
            v-for="(item, index) of props.data.blocks"
            :key="index"
            :block="item"
            :isActive="props.activeBlockInList === index"
            @click="handleClickBlock(index)"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    
    activeBlockInList: {
        type: [null, Number],
        required: true
    }
})

const emits = defineEmits(['update:activeBlockInList'])

const handleClickBlock = (index) => {
    if(props.activeBlockInList === index) {
        emits('update:activeBlockInList', null)
    } else {
        emits('update:activeBlockInList', index)
    }
}
</script>

<style lang="scss" scoped>
.list {
    min-height: 700px;
    border: 2px solid #5589f8;
    padding: 10px;
}
</style>