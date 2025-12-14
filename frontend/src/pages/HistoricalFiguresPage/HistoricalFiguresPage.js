import React, { useState, useEffect } from 'react';
import Styles from './HistoricalFiguresPage.module.css';
import {HistoricalFiguresAPI} from '../../shared/const/api';
import {Timeline} from '../../shared/ui/Timeline/Timeline';
import {HistoricalFigureCard} from './HistoricalFigureCard/HistoricalFigureCard';
import Breadcrumbs from '../../shared/ui/Breadcrumbs/Breadcrumbs';

export function HistoricalFiguresPage() {
    const [figures, setFigures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadFigures = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await HistoricalFiguresAPI.list();
                if (isMounted) {
                    setFigures(Array.isArray(data) ? data : []);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке исторических личностей:', err);
                if (isMounted) {
                    setError('Не удалось загрузить данные исторических личностей.');
                    setLoading(false);
                }
            }
        };

        loadFigures();

        return () => {
            isMounted = false;
        };
    }, []);

    // Группируем исторические личности по векам
    const figuresByCentury = figures.reduce((acc, figure) => {
        // Используем birth_year для определения века
        const birthYear = figure.birth_year;
        if (!birthYear) return acc;
        
        const year = parseInt(birthYear);
        if (isNaN(year)) return acc;
        
        const century = Math.floor(year / 100) * 100;
        if (!acc[century]) {
            acc[century] = [];
        }
        acc[century].push(figure);
        return acc;
    }, {});

    // Сортируем века по возрастанию
    const sortedCenturies = Object.keys(figuresByCentury).sort((a, b) => parseInt(a) - parseInt(b));

    const breadcrumbsLinks = [
        ["Главная", "/home"],
        ["Исторические личности", "/historical_figures"]
    ];

    if (loading) {
        return (
            <div className={Styles.HistoricalFiguresPage}>
                <div>Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={Styles.HistoricalFiguresPage}>
                <div>{error}</div>
            </div>
        );
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.HistoricalFiguresPage}>
                <Timeline artifactsByCentury={figuresByCentury} countLabel="деятеля" />
                <div className={Styles.FiguresGrid}>
                    {sortedCenturies.map(century => (
                        <div key={century} className={Styles.CenturySection}>
                            <h2 className={Styles.CenturyTitle}>{parseInt(century) / 100 + 1} век</h2>
                            <div className={Styles.FigureCards}>
                                {figuresByCentury[century].map(figure => (
                                    <HistoricalFigureCard key={figure.id} figure={figure} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
} 