import React from 'react';
import Styles from "./HomePage.module.css"
import {MuseumSection} from "../../../widgets";
import {museumSections, excursionSection, historicalFiguresSection} from "../../const/sections";
import {MuseumWidgetList} from "../../../shared/ui";
import {ItemCardList} from "../../../shared/ui"

export function HomePage() {
    return (
        <div className={Styles.HomePage}>
            <section className={Styles.WelcomeSection}>
                <div className={Styles.WelcomeContent}>
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

            <section className={Styles.ContentSection}>
                {Object.entries(museumSections).map(([name, section]) => (
                    <MuseumSection
                        key={name}
                        title={section.title}
                        description={section.description}
                        link={section.link}
                        linkText={section.linkText}
                    >
                        <MuseumWidgetList widgets={section.sections}/>
                    </MuseumSection>
                ))}
            </section>

            <section className={Styles.ContentSection}>
                <MuseumSection
                    title={excursionSection.title}
                    description={excursionSection.description}
                    link={excursionSection.link}
                    linkText={excursionSection.linkText}
                >
                    <MuseumWidgetList widgets={excursionSection.sections}/>
                </MuseumSection>
            </section>

            <section className={Styles.HistoricalFiguresSection}>
                {historicalFiguresSection.map((section, index) => (
                    <MuseumSection
                        key={index}
                        title={section.title}
                        description={section.description}
                        link={section.link}
                        linkText={section.linkText}
                    >
                        <ItemCardList persons={section.sections}/>
                    </MuseumSection>
                ))}
            </section>
        </div>
    )
}