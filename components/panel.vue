<template>
    <div class="panel">

        <div class="panel__item">
            Заголовок
        </div>

        <div class="panel__item">
            Список
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.panel {
    display: flex;
    border: 1px solid #969696;
    margin-top: 20px;
    background: #f4f4f4;
    &__item {
        padding: 10px;
        position: relative;
        cursor: pointer;
        &::after {
            content: "";
            width: 1px;
            height: calc(100% - 8px);
            background: #969696;
            position: absolute;
            top: 4px;
            right: 0;
        }
    }
}

</style>