<template>
    <div class="block" v-html="createBlock" v-if="props.block">
    </div>
</template>

<script setup>
const props = defineProps({
    block: {
        type: Object,
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
</style>