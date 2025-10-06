import React, { useState, useEffect } from "react";
import Styles from "./HomePage.module.css";
import { MuseumSection } from "../../shared/ui";
import { MuseumWidgetList, ItemCardList } from "../../shared/ui";
import { routes } from "../../shared/const";
import { HallsAPI, HistoricalFiguresAPI } from "../../shared/const/api";

export function HomePage() {
    const [widgetsByMuseum, setWidgetsByMuseum] = useState({ hardware: [], software: [] });
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        // Когда в базе данных что-то будет, то моковые данные можно будет убрать
        // Используйте fetch или axios для получения данных с вашего API
        // Например для этого файла надо HallsAPI.list() и HistoricalFiguresAPI.getFigures()
        const loadData = () => {
            if (!isMounted) return;

            // --- Заглушки для залов ---
            const mockHalls = [
                { id: 1, name: "Аппаратный зал 1", category: { name: "Аппаратное" }, image: { url: "/images/hardware1.jpg" } },
                { id: 2, name: "Аппаратный зал 2", category: { name: "Аппаратное" }, image: { url: "/images/hardware2.jpg" } },
                { id: 3, name: "Программный зал 1", category: { name: "Программное" }, image: { url: "/images/software1.jpg" } },
                { id: 4, name: "Программный зал 2", category: { name: "Программное" }, image: { url: "/images/software2.jpg" } },
            ];

            // --- Заглушки для исторических личностей ---
            const mockPersons = [
                { id: 1, full_name: "Алан Тьюринг", images: [{ url: "/images/turing.jpg" }] },
                { id: 2, full_name: "Грейс Хоппер", images: [{ url: "/images/hopper.jpg" }] },
                { id: 3, full_name: "Конрад Цузе", images: [{ url: "/images/tsuse.jpg" }] },
                { id: 4, full_name: "Джон фон Нейман", images: [{ url: "/images/nyeman.jpg" }] },
                { id: 5, full_name: "Никлаус Вирт", images: [{ url: "/images/wirth.jpg" }] },
                { id: 6, full_name: "Дональд Кнут", images: [{ url: "/images/knuth.jpg" }] },
            ];

            // Группировка залов
            const grouped = { hardware: [], software: [] };
            mockHalls.forEach((hall) => {
                const widget = {
                    id: hall.id,
                    text: hall.name,
                    imageUrl: hall.image?.url || "",
                    link: `${routes.halls}?hallId=${hall.id}`,
                };
                const category = hall.category?.name?.toLowerCase() || "";
                if (category.includes("программ")) grouped.software.push(widget);
                else grouped.hardware.push(widget);
            });

            const mappedPersons = mockPersons.map((f) => ({
                imageUrl: f.images?.[0]?.url || "",
                personName: f.full_name,
                link: `${routes.historicalFigures}/${f.id}`,
            }));

            // Ограничение на главную страницу
            setWidgetsByMuseum({
                hardware: grouped.hardware.slice(0, 6),
                software: grouped.software.slice(0, 6),
            });
            setPersons(mappedPersons.slice(0, 12));
            setLoading(false);
        };

        loadData();
        return () => { isMounted = false; };
    }, []);

    if (loading) return <div className={Styles.HomePage}>Загрузка...</div>;

    return (
        <div className={Styles.HomePage}>
            <section className={Styles.WelcomeSection}>
                <div className={Styles.WelcomeImage}></div>
                <div className={Styles.WelcomeText}>
                    <h1>Музей вычислительной техники</h1>
                    <p>Приветствуем вас в Музее вычислительной техники ИрНИТУ!</p>
                    <p>
                        Здесь вы сможете погрузиться в историю развития цифровой электроники: от первых вычислительных
                        машин до современных технологий. Вас ждут экспонаты, демонстрирующие путь от ламповых
                        компьютеров до современных процессоров.
                    </p>
                    <p>
                        Также вы узнаете о выдающихся ученых, чьи открытия заложили основу современной IT-индустрии.
                        Приглашаем вас на увлекательное путешествие по этапам эволюции техники, которые определили облик
                        сегодняшнего цифрового мира!
                    </p>
                </div>
            </section>

            {widgetsByMuseum.hardware.length > 0 && (
                <MuseumSection
                    title="Аппаратная экспозиция"
                    description="Залы с экспонатами аппаратного обеспечения и вычислительной техники."
                    link={routes.halls}
                    linkText="Перейти к залам"
                >
                    <MuseumWidgetList widgets={widgetsByMuseum.hardware} />
                </MuseumSection>
            )}

            {widgetsByMuseum.software.length > 0 && (
                <MuseumSection
                    title="Программная экспозиция"
                    description="Залы, посвящённые программному обеспечению и его эволюции."
                    link={routes.halls}
                    linkText="Перейти к залам"
                >
                    <MuseumWidgetList widgets={widgetsByMuseum.software} />
                </MuseumSection>
            )}

            {persons.length > 0 && (
                <MuseumSection
                    title="Исторические личности"
                    description="Учёные и инженеры, внёсшие ключевой вклад в развитие вычислительной техники."
                    link={routes.historicalFigures}
                    linkText="Смотреть всех"
                >
                    <ItemCardList persons={persons} />
                </MuseumSection>
            )}
        </div>
    );
}
