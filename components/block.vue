<template>
    <div 
        v-if="props.block"
        :class="{active: isActive, block}"
        v-html="createBlock"
        @click.prevent
    >
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
        required: true
    }
})

const createBlock = computed(() => {
    let generatedBlock = '';
    let innerHTMLBlock = '';

    if(props.block.innerHTML) {
        innerHTMLBlock = props.block.innerHTML
    } else if (props.block.childs) {
        props.block.childs.items.forEach(el => {
            const styles = el.styles ? Object.entries(el.styles).map(([key, value]) => `${key}: ${value}`).join(';') : ''

            const attrs = el.attrs ? Object.entries(el.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : ''

            innerHTMLBlock += `
                <${props.block.childs.info.tag} class=${props.block.childs.info.class}
                    style="${styles}"
                    ${attrs}
                >
                    ${el.innerHTML}
                </${props.block.childs.info.tag}>
            `;
        });
    }

    const styles = props.block.styles ? Object.entries(props.block.styles).map(([key, value]) => `${key}: ${value}`).join(';') : ''
    const attrs = props.block.attrs ? Object.entries(props.block.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : ''

    if (props.block.type === 'double-sided') {
        generatedBlock = `
            <${props.block.tag} class=${props.block.class}
                style="${styles}"
                ${attrs}
            >
                ${innerHTMLBlock}
            </${props.block.tag}>
        `;
    } else {
        generatedBlock = `<${props.block.tag} class=${props.block.class}
            style="${styles}"
            ${attrs}
        />`
    }

    return generatedBlock;
});
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