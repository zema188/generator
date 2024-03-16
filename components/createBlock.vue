<template>
    <div class="create">
        <!-- <div class="create__title">
            Создание заголовка
        </div> -->

        <div class="create__settings">
            <div class="create__settings-item">

                <create-title
                    v-if="createBlockType === 'title'"
                    :paramsNewBlock="paramsNewBlock"
                />

                <create-text-p
                    v-if="createBlockType === 'textP'"
                    :paramsNewBlock="paramsNewBlock"
                />

                <create-link
                    v-if="createBlockType === 'link'"
                    :paramsNewBlock="paramsNewBlock"
                />

                <create-list
                    v-if="createBlockType === 'list'"
                    :paramsNewBlock="paramsNewBlock"
                />

            </div>
        </div>

        <button class="create__btn btn btn_blue"
            @click="emits('createNewBlock')"
        >
            Создать
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    createBlockType: {
        type: [null, String],
        required: true,
    },

    paramsNewBlock: {
        type: Object,
        required: true,
    }
})

const emits = defineEmits('createNewBlock')
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