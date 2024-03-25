<template>
    <div class="create">
        <!-- <div class="create__title">
            Создание заголовка
        </div> -->

        <div class="create__settings">
            <div class="create__settings-item">

                <create-title
                    v-if="blockType === 'title'"
                    :paramsNewBlock="paramsNewBlock"
                    :activeBlockInList="activeBlockInList"
                    :classes="props.classes"
                />

                <create-text-p
                    v-if="blockType === 'textP'"
                    :paramsNewBlock="paramsNewBlock"
                    :activeBlockInList="activeBlockInList"
                    :classes="props.classes"
                />

                <create-link
                    v-if="blockType === 'link'"
                    :paramsNewBlock="paramsNewBlock"
                    :activeBlockInList="activeBlockInList"
                    :classes="props.classes"
                />

                <create-list
                    v-if="blockType === 'list'"
                    :paramsNewBlock="paramsNewBlock"
                    :activeBlockInList="activeBlockInList"
                    :classes="props.classes"
                />

                <create-nav
                    v-if="blockType === 'nav'"
                    :paramsNewBlock="paramsNewBlock"
                    :activeBlockInList="activeBlockInList"
                    :classes="props.classes"
                />
            </div>
        </div>

        <button
            v-if="!activeBlockInList"
            class="create__btn btn btn_blue"
            @click="emits('createNewBlock')"
        >
            Создать
        </button>
        <button
            v-else
            class="create__btn btn btn_blue"
            @click="emits('editActiveBlock')"
        >

            Сохранить
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    blockType: {
        type: [null, String],
        required: true,
    },

    paramsNewBlock: {
        type: Object,
        required: true,
    },

    activeBlockInList: {
        type: [null, Object],
        required: true
    },

    classes: {
        type: [null, Object],
        required: true
    }
})

const emits = defineEmits('createNewBlock', 'editActiveBlock')
</script>

<style lang="scss" scoped>
.create {

    &__title {
        font-weight: bold;
        text-align: center;
        font-size: 22px;
        margin-bottom: 10px;
    }

    &__settings {
        margin-bottom: 20px;
    }

    &__settings-item {

    }

    &__btn {

    }
}
</style>