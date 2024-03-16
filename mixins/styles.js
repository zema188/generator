export default function useStyles() {
    const textAlign = ref([
        {
            name: 'center',
            value: 'По центру'
        },
        {
            name: 'left',
            value: 'По левому краю'
        },
        {
            name: 'right',
            value: 'По правому краю'
        },
    ]);
    
    const fontWeight = ref([
        {
            name: '100',
            value: 'Тонкий'
        },
        {
            name: '200',
            value: 'Ультра Легкий'
        },
        {
            name: '300',
            value: 'Легкий'
        },
        {
            name: '400',
            value: 'Нормальный'
        },
        {
            name: '500',
            value: 'Средний'
        },
        {
            name: '600',
            value: 'Полужирный'
        },
        {
            name: '700',
            value: 'Жирный'
        },
        {
            name: '800',
            value: 'Экстражирный '
        },
        {
            name: '900',
            value: 'Черный'
        },
    ]);

    return {
        textAlign, fontWeight
    }
}