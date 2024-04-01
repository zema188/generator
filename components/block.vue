<template>
    <div>
        <div 
            v-if="props.block && !pre"
            :class="{active: isActive, block}"
            v-html="createBlock"
            @click.prevent
        >
        </div>

        <div v-if="props.block && pre">
            <pre ref="preBlock">{{ createBlock }}</pre>
        </div>
    </div>
</template>

<script setup>
import createNav from '@/blocks/custom/nav'
import createForm from '@/blocks/custom/form'
import createDoubleSidedBlock from '@/blocks/default/doubleSided.js'

const props = defineProps({
    block: {
        type: Object,
        required: true
    },

    isActive: {
        type: Boolean,
        required: false
    },

    pre: {
        type: Boolean,
        required: false
    }
})

const preBlock = ref(null)
const customBlocks = ['nav', 'form']

const createBlock = computed(() => {
    let custom = customBlocks.includes(props.block.tag);
    let generatedBlock = '';

    const styles = props.block.styles && !props.pre ? Object.entries(props.block.styles).map(([key, value]) => `${key}: ${value}`).join('; ') : '';
    const attrs = props.block.attrs ? Object.entries(props.block.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : '';

    if(custom) {
        if (props.block.tag === 'nav') {
            generatedBlock = createNav(props.block, styles, attrs, props.pre)
        }

        else if (props.block.tag === 'form') {
            generatedBlock = createForm(props.block, styles, attrs, props.pre)
        }

    } else if (props.block.typeTag === 'double-sided') {
        generatedBlock = createDoubleSidedBlock(props.block, styles, attrs, props.pre)
    } else {
        generatedBlock = `<${props.block.tag} class=${props.block.class} style="${styles}" ${attrs}/>`;
    }

    return generatedBlock;
});


const quantityLines = computed(() => {
    return preBlock.value.textContent.split("\n").length
})

onMounted(() => {
    if(props.pre) quantityLines
})
</script>

<style lang="scss" scoped>
.block {
    cursor: pointer;
    margin-bottom: 1px;
    &.active {
        > :first-child {
            border-color: #ff0000 !important;
            &:hover {
                border-color: #ff0000 !important;
            }
        }
    }
    > :first-child {
        // width: fit-content;
        border: 2px solid transparent;
        padding: 2px 2px;
        transition: .2s;
        &:hover {
            border-color: #d87d7d !important;
        }
    }
    &:global(a) {
        display: block;
    }
}
</style>