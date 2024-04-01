export default function createForm(block, styles, attrs, pre) {
    let generatedBlock = ''
    let innerHTMLBlock = ''

    const childsItems = [...block.childs.items];

    let stylesTitleStr = block.title.styles && !pre ? Object.entries(block.title.styles).map(([key, value]) => `${key}: ${value}`).join('; ') : '';
    
    let stylesTitle = !pre ? ` style="${stylesTitleStr}"` : ''

    let styleForm = !pre ? ` style="${styles}"` : ''

innerHTMLBlock += 
    `<${block.title.tag} class="${block.title.class}" ${stylesTitle}>
        ${block.title.innerHTML}
    </${block.title.tag}>`;

    childsItems.forEach((el, index) => {

        const name = `name="${el.name}"`
        const id = `id="${el.name}"`
        const forId = `for="${el.name}"`
        const placeHolder = `placeholder="${el.placeHolder}"`
        
        if(el.tag === 'input') {
            innerHTMLBlock += `
    <div class="form__field">
        <label for="${name}">${el.name}:</label>
        <${el.tag} ${id} ${name} ${placeHolder}>
    </div>`;
        }

        else if(el.tag === 'textarea') {
            innerHTMLBlock += `
    <div class="form__field">
        <label ${forId}">${el.name}:</label>
        <${el.tag} ${id} ${name} ${placeHolder}"></${el.tag}>
    </div>`;
        }
    });

    innerHTMLBlock += `
    <${block.button.tag} class="btn btn_blue" type="submit">
        ${block.button.innerHTML}
    </${block.button.tag}>`;

    generatedBlock = `<${block.tag} class=${block.class} ${styleForm} ${attrs}>
    ${innerHTMLBlock}
</${block.tag}>`;



    return generatedBlock
}