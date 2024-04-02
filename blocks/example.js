export let exampleData = {
    classes: {
        title: 1,
        list: 1,
        link: 1,
        nav: 1,
        form: 1,
    },

    blocks: [
        {
            tag: 'img',
            typeTag: 'one-sided',
            innerHTML: null,
            class: 'photo-1',
            type: 'photo',
            attrs: {
                src: 'https://rgo.ru/upload/content_block/images/9ca8302358b777e143cd6e314058266b/7065323d0aa2e3fa6e8764c4f57f1655.jpg?itok=sawvdjq3',
                alt: 'птичка'
            },
            styles: {
                'max-width': '700px',
                'width': '100%',
                'object-fit': 'contain',
            },
        },
        {
            tag: 'h1',
            typeTag: 'double-sided',
            innerHTML: 'Заголовок страницы',
            class: 'title-1',
            type: 'title',
            styles: {
                'text-align': 'center',
                'font-weight': '800',
                'font-size': '25px',
            }
        },
        {
            tag: 'form',
            typeTag: 'double-sided',
            innerHTML: '',
            class: 'form-1',
            type: 'form',
            styles: {
                'border': '1px solid #969696',
                'padding': '25px',
                'border-radius': '12px',
            },
            attrs: {
                action: '#',
                method: 'post'
            },
            title: {
                tag: 'h3',
                type: 'double-sided',
                innerHTML: 'Заголовок формы',
                class: 'form__title-1',
                styles: {
                    'font-size': '20px',
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'color': 'grey',
                    'margin-bottom': '10px'
                }
            },
            button: {
                tag: 'button',
                type: 'double-sided',
                innerHTML: 'Отправить',
                class: 'form__title-1',
            },
            childs: {
                items: [
                    {
                        tag: 'input',
                        name: 'Имя',
                        placeHolder: 'Введите ваше имя'
                    },
                    {
                        tag: 'textarea',
                        name: 'Рассказ о себе',
                        placeHolder: 'Краткий рассказ'
                    },
                ]
            }
        },
        {
            tag: 'nav',
            typeTag: 'double-sided',
            innerHTML: null,
            class: 'nav-1',
            type: 'nav',
            styles: {
                'list-style': 'disc',
                'font-size': '30px',
            },
            childs: {
                info: {
                    tag: 'a',
                    class: '',
                    typeTag: 'double-sided',
                },
                items: [
                    {
                        innerHTML: 'Ссылка в меню №1',
                        attrs: {
                            href: 'https://vk.com/'
                        },
                    },
                    {
                        innerHTML: 'Ссылка в меню №2',
                        attrs: {
                            href: 'https://vk.com/'
                        },
                    },
                    {
                        innerHTML: 'Ссылка в меню №3',
                        attrs: {
                            href: 'https://vk.com/'
                        },
                    },
                ],
            },
        },
        {
            tag: 'ul',
            typeTag: 'double-sided',
            innerHTML: null,
            class: 'list-1',
            type: 'list',
            styles: {
                'list-style': 'disc',
                'text-align': 'left',
                'font-weight': 'bold',
            },
            childs: {
                info: {
                    tag: 'li',
                    class: 'list-1__item',
                    typeTag: 'double-sided',
                },
                items: [
                    {
                        innerHTML: 'Элемент списка №1',
                    },
                    {
                        innerHTML: 'Элемент списка №2',
                    },
                    {
                        innerHTML: 'Элемент списка №3',
                        styles: {
                        },
                    },
                    {
                        innerHTML: 'Элемент списка №4',
                    },
                ],
                styles: {
                    'text-align': 'center',
                    'font-weight': '500',
                    'color': 'green',
                }
            },
        },
        {
            tag: 'a',
            typeTag: 'double-sided',
            innerHTML: 'Ссылка на другую страницу',
            class: 'link-1',
            type: 'link',
            attrs: {
                href: 'https://vk.com/'
            },
            styles: {
                'text-align': 'left',
                'font-weight': 'bold',
                'color': 'Blue',
                'text-decoration': 'underline'
            },
        },
        {
            tag: 'p',
            typeTag: 'double-sided',
            innerHTML: 'Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности играет важную роль в формировании форм развития. Не следует, однако забывать, что укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. ',
            class: 'text-1',
            type: 'textP',
            styles: {
                'text-align': 'left',
                'font-weight': 'bold',
            },
        },
    ],
}