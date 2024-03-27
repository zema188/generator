export default function generatedDoubleSidedBlock(block, styles, attrs, pre) {
    console.log(attrs)
    let generatedBlock = ''
    let innerHTMLBlock = ''


    let style = !pre ? ` style="${styles}"` : ''


    if (block.innerHTML) {
        innerHTMLBlock = block.innerHTML;

            generatedBlock = `<${block.tag} class=${block.class}${style}${attrs}>
    ${innerHTMLBlock}
</${block.tag}>`;
        
    } else if (block.childs) {
        let childsItems = [...block.childs.items];

        childsItems.forEach((el, index) => {
            const styles = el.styles && !pre ? Object.entries(el.styles).map(([key, value]) => `${key}: ${value}`).join(';') : '';
            const attrs = el.attrs ? Object.entries(el.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : '';
            let breakStr = '\n'

            let style = !pre ? ` style="${styles}"` : ''

            console.log('test1', style)

            if(index === 0) breakStr = ''

                innerHTMLBlock += `${breakStr}   <${block.childs.info.tag}${style}${attrs}>
        ${el.innerHTML}
    </${block.childs.info.tag}>`;


        
        });
    }
generatedBlock = `<${block.tag} class=${block.class}${style} ${attrs}>
    ${innerHTMLBlock}
</${block.tag}>`;
    return generatedBlock
}