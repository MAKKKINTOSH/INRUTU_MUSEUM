import React, { useState, useEffect } from 'react';
import styles from './Excursions.module.css';
import { excursions } from '../const УСТАРЕЛО/excursions';
import { ExcursionCard } from './ExcursionCard/ExcursionCard';
import Breadcrumbs from '../../shared/ui/Breadcrumbs/Breadcrumbs';
import { routes } from '../../shared/const';
import { HallsAPI } from '../../shared/const/api';

export function Excursions() {
    const [excursionsData, setExcursionsData] = useState(excursions);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const breadcrumbsItems = [
        { label: "Главная", to: routes.home },
        { label: "Экскурсии", to: routes.excursions }
    ];

    useEffect(() => {
        let isMounted = true;

        const loadExcursions = () => {
            setLoading(true);
            setError(null);

            HallsAPI.list()
                .then((hallsData) => {
                    if (!isMounted) return;

                    const mappedExcursions = (hallsData || []).map((hall) => ({
                        id: hall.id,
                        title: hall.name,
                        description: hall.description || '',
                        location: hall.category?.name || '',
                        image: hall.image?.url || '/logo192.png',
                    }));

                    if (mappedExcursions.length > 0) {
                        setExcursionsData(mappedExcursions);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Ошибка при загрузке экскурсий:", err);
                    if (isMounted) {
                        setError("Не удалось загрузить данные. Используются мок-данные.");
                        setLoading(false);
                    }
                });
        };

        loadExcursions();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className={styles.Excursions}>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.content}>
                <h1>Выберите зал:</h1>
                <p className={styles.description}>
                    Выберите экскурсию, которую вы бы хотели посетить:
                </p>
                {loading && <p>Загрузка...</p>}
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.grid}>
                    {excursionsData.map(excursion => (
                        <ExcursionCard key={excursion.id} excursion={excursion} />
                    ))}
                </div>
            </div>
        </div>
    );
} 