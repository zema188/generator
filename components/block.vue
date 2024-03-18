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
const customBlocks = ['nav']

const createBlock = computed(() => {
    let generatedBlock = '';
    let innerHTMLBlock = '';

    let custom = customBlocks.includes(props.block.tag);

    if (props.block.innerHTML) {
        innerHTMLBlock = props.block.innerHTML;
    } else if (props.block.childs) {
        let childsItems = [];

        if (custom) {
            if (props.block.tag === 'nav') {
                childsItems = [...props.block.childs.items];
            }
        } else {
            childsItems = [...props.block.childs.items];
        }

        childsItems.forEach((el, index) => {
            const styles = el.styles && !props.pre ? Object.entries(el.styles).map(([key, value]) => `${key}: ${value}`).join(';') : '';
            const attrs = el.attrs ? Object.entries(el.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : '';

            if (custom) {
                if (props.block.tag === 'nav') {
                    innerHTMLBlock += `\n       <li>
            <${props.block.childs.info.tag} class=${props.block.childs.info.class} style="${styles}" ${attrs}>
                ${el.innerHTML}
            </${props.block.childs.info.tag}>
        </li>`;
                }
            } else {
                    innerHTMLBlock += `\n   <${props.block.childs.info.tag} class=${props.block.childs.info.class} style="${styles}" ${attrs}>
        ${el.innerHTML}
    </${props.block.childs.info.tag}>`;
            }
        });
    }
    const styles = props.block.styles && !props.pre ? Object.entries(props.block.styles).map(([key, value]) => `${key}: ${value}`).join(';') : '';
    const attrs = props.block.attrs ? Object.entries(props.block.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : '';

    if (props.block.typeTag === 'double-sided') {
        if (custom) {
            if (props.block.tag === 'nav') {
                generatedBlock = `<${props.block.tag} class=${props.block.class} ${attrs}>
    <ul style="${styles}">
        ${innerHTMLBlock}
    </ul>
</${props.block.tag}>`;
            } else {
                generatedBlock = `
                    <${props.block.tag} class=${props.block.class} style="${styles}" ${attrs}>
                        ${innerHTMLBlock}
                    </${props.block.tag}>`;
            }
        } else {
            generatedBlock = `<${props.block.tag} class=${props.block.class} style="${styles}" ${attrs}>
    ${innerHTMLBlock}
</${props.block.tag}>`;
        }
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
            border-color: #ff0000;
            &:hover {
                border-color: #ff0000;
            }
        }
    }
    > :first-child {
        // width: fit-content;
        border: 2px solid transparent;
        padding: 2px 2px;
        transition: .2s;
        &:hover {
            border-color: #d87d7d;
        }
    }
    &:global(a) {
        display: block;
    }
}
</style>