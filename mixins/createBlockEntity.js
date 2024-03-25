
export default function useCreateBlockEntity() {
    const paramsNewBlock = {
        type: Object,
        required: true,
    }

    const textAlign = ref([{ name: 'center', value: 'По центру' }, { name: 'left', value: 'По левому краю' }, { name: 'right', value: 'По правому краю' }]);
    const fontWeight = ref([{ name: '100', value: 'Тонкий' }, { name: '200', value: 'Ультра Легкий' }, { name: '300', value: 'Легкий' }, { name: '400', value: 'Нормальный' }, { name: '500', value: 'Средний' }, { name: '600', value: 'Полужирный' }, { name: '700', value: 'Жирный' }, { name: '800', value: 'Экстражирный ' }, { name: '900', value: 'Черный' }]);
    const color = ref([{ name: 'red', value: 'Красный' }, { name: 'blue', value: 'Синий' }, { name: 'green', value: 'Зеленый' }, { name: 'yellow', value: 'Желтый' }, { name: 'orange', value: 'Оранжевый' }, { name: 'purple', value: 'Фиолетовый' }, { name: 'pink', value: 'Розовый' }, { name: 'brown', value: 'Коричневый' }, { name: 'black', value: 'Черный' }, { name: 'white', value: 'Белый' }, { name: 'gray', value: 'Серый' }, { name: 'silver', value: 'Серебряный' }, { name: 'gold', value: 'Золотой' }, { name: 'cyan', value: 'Голубой' }, { name: 'magenta', value: 'Пурпурный' }]);
    const listStyle = ref([{ name: 'none', value: 'Нет' }, { name: 'disc', value: 'Круг' }, { name: 'circle', value: 'Круг (пустой внутри)' }, { name: 'square', value: 'Квадрат' }, { name: 'decimal', value: 'Десятичные цифры (1, 2, 3 и т. д.)' }, { name: 'decimal-leading-zero', value: 'Десятичные цифры с ведущим нулём (01, 02, 03 и т. д.)' }, { name: 'lower-roman', value: 'Римские цифры (в нижнем регистре) (i, ii, iii, iv, v и т. д.)' }, { name: 'upper-roman', value: 'Римские цифры (в верхнем регистре) (I, II, III, IV, V и т. д.)' }, { name: 'lower-greek', value: 'Греческие буквы (в нижнем регистре) (α, β, γ, δ, ε и т. д.)' }, { name: 'lower-alpha', value: 'Алфавитные буквы (в нижнем регистре) (a, b, c, d, e и т. д.)' }, { name: 'upper-alpha', value: 'Алфавитные буквы (в верхнем регистре) (A, B, C, D, E и т. д.)' }, { name: 'arabic-indic', value: 'Арабско-индийский' }, { name: 'armenian', value: 'Армянский' }, { name: 'bengali', value: 'Бенгальский' }, { name: 'cjk-ideographic', value: 'Идеографический (китайский, японский, корейский)' }, { name: 'decimal-leading-zero', value: 'Десятичные цифры с ведущим нулём (01, 02, 03 и т. д.)' }, { name: 'devanagari', value: 'Деванагари (хинди, маратхи, санскрит)' }, { name: 'georgian', value: 'Грузинский' }, { name: 'gujarati', value: 'Гуджарати' }, { name: 'gurmukhi', value: 'Гурмукхи (панджаби)' }, { name: 'hebrew', value: 'Иврит' }, { name: 'kannada', value: 'Каннада' }, { name: 'khmer', value: 'Кхмерский' }, { name: 'lao', value: 'Лаосский' }, { name: 'malayalam', value: 'Малаялам' }, { name: 'mongolian', value: 'Монгольский' }, { name: 'myanmar', value: 'Мьянманский (бирманский)' }, { name: 'oriya', value: 'Ория' }, { name: 'persian', value: 'Персидский (фарси)' }, { name: 'simp-chinese-formal', value: 'Китайский (упрощенный, формальный)' }, { name: 'simp-chinese-informal', value: 'Китайский (упрощенный, неформальный)' }, { name: 'tamil', value: 'Тамильский' }, { name: 'telugu', value: 'Телугу' }, { name: 'thai', value: 'Тайский' }, { name: 'trad-chinese-formal', value: 'Китайский (традиционный, формальный)' }, { name: 'trad-chinese-informal', value: 'Китайский (традиционный, неформальный)' }, { name: 'tibetan', value: 'Тибетский' }]);
    
    const createClass = (name, number) => {
        if(!number) number = 0
        return `${name}-${number + 1}`
    }

    return {
        paramsNewBlock, textAlign, color, fontWeight, listStyle, createClass
    }
}