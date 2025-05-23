import routerImage from "../../shared/static/images/router.jpg"
import vovaImage from "../../shared/static/images/vova.png"
import {historicalFigures} from "./historicalFigures"

export const museumSections = {
    inrtuHalls: {
        title: "Залы ИрНИТУ",
        description: "Экспонаты, находящиеся в залах ИрНИТУ:",
        link: "/halls?hallType=inrtuHalls",
        linkText: "Посмотреть все залы ИрНИТУ",
        sections: [
            {
                link: "/artifacts?hall=inrtuHalls&room=B-108",
                imageUrl: routerImage,
                text: "В-108"
            },
            {
                link: "/artifacts?hall=inrtuHalls&room=museum",
                imageUrl: routerImage,
                text: "Музей ИрНИТУ"
            },
        ]
    },
    computersHalls: {
        title: "Залы вычислительной техники",
        description: "Упорядоченная по эпохе вычислительная техника:",
        link: "/halls?hallType=computersHalls",
        linkText: "Посмотреть все залы вычислительной техники",
        sections: [
            {
                link: "/artifacts?hall=computersHalls&room=first-gen",
                imageUrl: routerImage,
                text: "Первая электронная вычислительная техника"
            },
            {
                link: "/artifacts?hall=computersHalls&room=second-gen",
                imageUrl: routerImage,
                text: "Второе поколение компьютеров"
            },
            {
                link: "/artifacts?hall=computersHalls&room=analog",
                imageUrl: routerImage,
                text: "Аналоговые вычислительные приборы"
            },
            {
                link: "/artifacts?hall=computersHalls&room=super",
                imageUrl: routerImage,
                text: "Суперкомпьютеры"
            },
        ]
    },
}

export const excursionSection = {
    title: "Приглашаем на цифровую экскурсию",
    description: "Пройдитесь по виртуальным залам ИрНИТУ:",
    link: "/excursions",
    linkText: "Перейти к экскурсиям",
    sections: [
        {
            link: "/excursions",
            imageUrl: routerImage,
            text: "Виртуальная экскурсия по музею"
        },
    ]
}

export const historicalFiguresSection = [
    {
        title: "Исторические деятели",
        description: "Эти люди сделали вклад в развитие информационных технологий:",
        link: "/historical_figures",
        linkText: "Посмотреть всех исторических деятелей",
        sections: historicalFigures.slice(0, 6).map(figure => ({
            imageUrl: figure.image,
            personName: figure.name,
            link: `/historical_figure/${figure.id}`
        }))
    }
]