<template>
    <div>
        <div class="create__title">
            Элементы списка
        </div>

        <div class="links"
            v-if="props.paramsNewBlock.childs"
        >
            <div
                class="link"
                v-for="(el, index) of props.paramsNewBlock.childs.items" :key="index"
            >
                <button class="cross">
                    <icons-cross
                        @click="deleteChild(index)"
                    />
                </button>

                <fields-input
                    v-model="el.innerHTML"
                >

                    <template v-slot:title>
                        {{ index + 1}} Элемент
                    </template>
                </fields-input>

                <fields-input
                    v-model="el.attrs.href"
                >

                    <template v-slot:title>
                        Ссылка
                    </template>

                </fields-input>
            </div>
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
    props.paramsNewBlock.childs.items.push({
        attrs: {
            
        }
    })
}

const deleteChild = (index) => {
    props.paramsNewBlock.childs.items.splice(index, 1)
}

const initParams = () => {
    props.paramsNewBlock.tag = 'nav'
    props.paramsNewBlock.typeTag = 'double-sided'
    props.paramsNewBlock.type = 'nav'
    props.paramsNewBlock.class = createClass('nav', props.classes.nav)
    props.paramsNewBlock.innerHTML = ''

    props.paramsNewBlock.styles = {
        'list-style': 'none',
        'font-weight': 'bold',
        'display': 'flex',
        'flex-wrap': 'wrap',
        'gap': '10px',
    }

    props.paramsNewBlock.childs = {
        info: {
            tag: 'a',
            type: 'double-sided',
        },
        items: [
            {
                attrs: {
                    
                }
            }
        ]
    }
}

onMounted(() => {
    if(!props.activeBlockInList) initParams()
})
</script>

<style lang="scss" scoped>
.link {
    border: 1px solid #000000d2;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 15px;
    position: relative;
    & .cross {
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        & svg {

        }

        width: 20px;
    }
}
</style>