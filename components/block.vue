<template>
    <div 
        v-if="props.block"
        class="block"
        :class="{active: isActive}"
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
        props.block.childs.forEach(el => {
            innerHTMLBlock += `
                <${el.tag} ${Object.entries(el.additional).map(([key, value]) => `${key}="${value}"`).join(' ')}>
                    ${el.innerHTML}
                </${el.tag}>
                `
        });
    }



    if (props.block.type === 'double-sided') {
        generatedBlock = `
            <${props.block.tag} ${Object.entries(props.block.additional).map(([key, value]) => `${key}="${value}"`).join(' ')}>
                ${innerHTMLBlock}
            </${props.block.tag}>
        `;
    } else {
        generatedBlock = `
            <${props.block.tag} ${Object.entries(props.block.additional).map(([key, value]) => `${key}="${value}"`).join(' ')}/>`
    }

    return generatedBlock;
});

</script>

<style lang="scss" scoped>
.block {
    cursor: pointer;
    &.active {
        > :first-child {
            border-color: #e94c90;
        }
    }
    > :first-child {
        width: fit-content;
        border: 1px solid transparent;
        padding: 0 5px;
        transition: .2s;
        &:hover {
            border-color: #f076aa;
        }
    }
}
</style>