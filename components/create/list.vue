<template>
    <div>
        <div class="create__title">
            Элементы списка
        </div>

        <div class="items"
            v-if="props.paramsNewBlock.childs"
        >
            <fields-input
                v-for="(el, index) of props.paramsNewBlock.childs.items" :key="index"
                v-model="el.innerHTML"
                icon
            >

                <template v-slot:title>
                    {{ index + 1}} Элемент
                </template>
                
                <template v-slot:icon>
                    <icons-cross
                        @click="deleteChild(index)"
                    />
                </template>
            </fields-input>
        </div>
        <button class="btn btn_green btn_small"
            @click="addChild()"
        >
            Добавить элемент
        </button>

        <div class="create__title">
            Стили CSS
        </div>

        <div class="selects-list">
            <fields-select
                v-model="paramsNewBlock.styles['list-style']"
                :options="listStyle"
            >
                <template v-slot:title>
                    Стиль списка
                </template>
            </fields-select>
        </div>
    </div>
</template>

<script setup>
import useCreateBlockEntity from '~/mixins/createBlockEntity';

const { textAlign, fontWeight, listStyle, createClass } = useCreateBlockEntity()

const props = defineProps({
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

const addChild = () => {
    props.paramsNewBlock.childs.items.push({})
}

const deleteChild = (index) => {
    props.paramsNewBlock.childs.items.splice(index, 1)
}

const initParams = () => {
    props.paramsNewBlock.tag = 'ul'
    props.paramsNewBlock.typeTag = 'double-sided'
    props.paramsNewBlock.type = 'list'
    props.paramsNewBlock.class = createClass('list', props.classes.list)
    props.paramsNewBlock.innerHTML = ''

    props.paramsNewBlock.styles = {
        'list-style': 'disc',
        'text-align': 'left',
        'font-weight': 'bold',
        'color': 'black',
    }
    props.paramsNewBlock.childs = {
        info: {
            tag: 'li',
            type: 'double-sided',
        },
        items: [
            {
                
            },
        ],
        styles: {
            'text-allign': 'center',
            'font-weight': 'bold',
            'color': 'red',
        }
    }
}

onMounted(() => {
    if(!props.activeBlockInList) initParams()
})
</script>

<style lang="scss" scoped>
.field {
    & .icon {
        position: absolute;
        & svg {
            width: 20px;
        }
    }
}
</style>