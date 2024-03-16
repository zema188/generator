<template>
    <div class="panel">
        <div class="panel__list">
            <div class="panel__item">
                Заголовок
            </div>

            <div class="panel__item">
                Список
            </div>
        </div>

        <div class="arrows-btns">
            <button
                class="up"
                :disabled="activeBlockInList === null || activeBlockInList === 0"
                @click="emits('moveBlock', 'up')"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>

            <button
                class="down"
                :disabled="activeBlockInList === null || activeBlockInList === quantityBlocks - 1"
                @click="emits('moveBlock', 'down')"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    activeBlockInList: {
        type: [null, Number],
        required: true
    },

    quantityBlocks: {
        type: Number,
        required: true
    }
})


const emits = defineEmits(['moveBlock'])
</script>

<style lang="scss" scoped>
.panel {
    display: flex;
    border: 1px solid #969696;
    margin-top: 20px;
    background: #f4f4f4;
    justify-content: space-between;
    &__list {
        display: flex;
    }
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

.arrows-btns {
    display: flex;
    & button {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .2s;
        &:disabled {
            opacity: 0.5;
            cursor: default;
        }
        & svg {
            width: 20px;
        }
        &.down {
            & svg {
                transform: rotate(180deg);
            }
        }
    }
}

</style>