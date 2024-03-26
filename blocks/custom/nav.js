export default function createNav(block, styles, attrs, pre) {
    let generatedBlock = ''
    let innerHTMLBlock = ''

    const childsItems = [...block.childs.items];

    let style = !pre ? ` style="${styles}"` : ''

    childsItems.forEach((el, index) => {
        const styles = el.styles && !pre ? Object.entries(el.styles).map(([key, value]) => `${key}: ${value}`).join(';') : '';
        const attrs = el.attrs ? Object.entries(el.attrs).map(([key, value]) => `${key}="${value}"`).join(' ') : '';
        
innerHTMLBlock += `\n       <li>
            <${block.childs.info.tag} ${attrs}>
                ${el.innerHTML}
            </${block.childs.info.tag}>
       </li>`;

    });

    generatedBlock = `<${block.tag} class=${block.class}${attrs}>
    <ul${style}>${innerHTMLBlock}
    </ul>
</${block.tag}>`;

    return generatedBlock
}