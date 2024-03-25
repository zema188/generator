<template>
    <div class="panel">
        <div class="panel__list" v-if="activeTabBlock === 'redactor'">
            <div class="panel__item"
                @click="openPopupCreate('title')"
            >
                Заголовок
            </div>

            <div class="panel__item"
                @click="openPopupCreate('textP')"
            >
                Текст
            </div>

            <div class="panel__item"
                @click="openPopupCreate('link')"
            >
                Ссылка
            </div>

            <div class="panel__item"
                @click="openPopupCreate('list')"
            >
                Список
            </div>

            <div class="panel__item"
                @click="openPopupCreate('nav')"
            >
                Меню
            </div>
        </div>

        <div class="action action_redactor" v-show="activeTabBlock === 'redactor'">
            <button class="up"
                :disabled="indexActiveBlockInList === null || indexActiveBlockInList === 0"
                @click="emits('moveBlock', 'up')"
            >
                <icons-arrow/>
            </button>

            <button class="down"
                :disabled="indexActiveBlockInList === null || indexActiveBlockInList === quantityBlocks - 1"
                @click="emits('moveBlock', 'down')"
            >
                <icons-arrow/>
            </button>

            <button class="edit"
                :disabled="indexActiveBlockInList === null"
                @click="emits('openPopupEdit',)"
            >
                <icons-edit/>
            </button>

            <button class="trash"
                :disabled="indexActiveBlockInList === null"
                @click="emits('deleteBlock',)"
            >
                <icons-trash/>
            </button>
        </div>

        <!-- <div class="action action_html" v-if="activeTabBlock === 'HTML'">
            <button class="btn btn_blue">
                Скопировать код
            </button>
        </div> -->
    </div>
</template>

<script setup>
const props = defineProps({
    indexActiveBlockInList: {
        type: [null, Number],
        required: true
    },

    quantityBlocks: {
        type: Number,
        required: true
    },

    activeTabBlock: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['moveBlock', 'openPopupCreate', 'deleteBlock', 'openPopupEdit'])

const openPopupCreate = (type) => {
    emits('openPopupCreate', type)
}
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

.action {
    display: flex;
    &_html {
        padding: 10px;
    }
    & .edit {
        width: 28px;
        & svg {
            height: 18px;
        }
    }
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