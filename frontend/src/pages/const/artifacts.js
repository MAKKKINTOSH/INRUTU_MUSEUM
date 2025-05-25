import routerImage from "../../shared/static/images/router.jpg"
import CalculatorImage from "../../shared/static/images/calculator.jpg"
import FirstevmImage from "../../shared/static/images/firstevm.png"

export const artifacts = [
    {
        id: 1,
        title: "Электроника Б3-18М",
        year: "1978",
        image: CalculatorImage,
        description: "Один из первых Позволяет выполнять четыре арифметические операции, а также возводить в квадрат и извлекать квадратный корень, в два приёма возводить в любую степень в пределах восьми разрядов, вычислять обратные величины, логарифмы и антилогарифмы, тригонометрические функции, проводить операции с памятью.",
        hall: "inrtuHalls",
        room: "museum",
        centuryId: 20
    },
    {
        id: 2,
        title: "Транзисторный компьютер",
        year: "1842",
        image: routerImage,
        description: "Компьютер на основе транзисторов, что значительно уменьшило размеры и энергопотребление",
        hall: "computersHalls",
        room: "second-gen",
        centuryId: 20
    },
    {
        id: 3,
        title: "Первая ЭВМ",
        year: "1951",
        image: FirstevmImage,
        description: "Первая электронно-вычислительная машина, созданная в СССР",
        hall: "inrtuHalls",
        room: "museum",
        centuryId: 20
    },
    {
        id: 4,
        title: "Мини-компьютер",
        year: "1965",
        image: routerImage,
        description: "Один из первых мини-компьютеров, использовавшийся в научных исследованиях",
        hall: "computersHalls",
        room: "analog",
        centuryId: 20
    },
    {
        id: 5,
        title: "Персональный компьютер",
        year: "1975",
        image: routerImage,
        description: "Один из первых персональных компьютеров, доступных для домашнего использования",
        hall: "computersHalls",
        room: "first-gen",
        centuryId: 20
    },
    {
        id: 6,
        title: "Суперкомпьютер",
        year: "1985",
        image: routerImage,
        description: "Мощный вычислительный комплекс, способный выполнять сложные научные расчеты",
        hall: "computersHalls",
        room: "super",
        centuryId: 20
    },
    {
        id: 7,
        title: "Ноутбук первого поколения",
        year: "1981",
        image: routerImage,
        description: "Первый портативный компьютер, предшественник современных ноутбуков",
        hall: "computersHalls",
        room: "first-gen",
        centuryId: 20
    },
    {
        id: 8,
        title: "Смартфон",
        year: "1994",
        image: routerImage,
        description: "Один из первых смартфонов, объединивший функции телефона и компьютера",
        hall: "computersHalls",
        room: "second-gen",
        centuryId: 20
    },
    {
        id: 9,
        title: "Планшет",
        year: "2010",
        image: routerImage,
        description: "Современный планшетный компьютер с сенсорным экраном",
        hall: "computersHalls",
        room: "modern",
        centuryId: 21
    },
    {
        id: 10,
        title: "Квантовый компьютер",
        year: "2019",
        image: routerImage,
        description: "Экспериментальный квантовый компьютер, использующий квантовые биты",
        hall: "computersHalls",
        room: "modern",
        centuryId: 21
    }
];