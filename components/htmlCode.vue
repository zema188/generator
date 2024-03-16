<template>
    <div class="html">
        html
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})
</script>

<style lang="scss" scoped>
.html {
    min-height: 700px;
    border: 2px solid #5589f8;
    padding: 10px;
}
</style>