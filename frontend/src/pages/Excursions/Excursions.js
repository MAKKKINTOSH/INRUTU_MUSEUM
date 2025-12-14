import React, { useState, useEffect } from 'react';
import styles from './Excursions.module.css';
import Breadcrumbs from '../../shared/ui/Breadcrumbs/Breadcrumbs';
import { routes } from '../../shared/const';
import { HallsAPI } from '../../shared/const/api';
import { ExcursionCard } from './ExcursionCard/ExcursionCard';
import hallStyles from '../HallPage/HallPage.module.css';

export function Excursions() {
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const breadcrumbsLinks = [
        ["Главная", routes.home],
        ["Экскурсии", routes.excursions],
    ];

    useEffect(() => {
        let isMounted = true;

        const loadExcursions = async () => {
            setLoading(true);
            setError(null);

            try {
                const hallsResponse = await HallsAPI.list();
                const hallsList = hallsResponse?.results || hallsResponse || [];

                if (!isMounted) return;
                setHalls(hallsList);
            } catch (err) {
                console.error("Ошибка при загрузке экскурсий:", err);
                if (isMounted) {
                    setError("Не удалось загрузить данные. Попробуйте обновить страницу.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadExcursions();

        return () => {
            isMounted = false;
        };
    }, []);

    const excursionWidgets = halls.map((hall) => ({
        id: hall.id,
        text: hall.name || "Без названия",
        imageUrl: hall.image?.image_url || hall.image?.url || '/logo192.png',
    }));

    const renderStateMessage = (message) => (
        <>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className={styles.PageWrapper}>
                <div className={styles.MessageBox}>
                    <p>{message}</p>
                </div>
            </div>
        </>
    );

    if (loading) {
        return renderStateMessage("Загрузка залов для экскурсий...");
    }

    if (error) {
        return renderStateMessage(error);
    }

    if (excursionWidgets.length === 0) {
        return renderStateMessage("Залы для экскурсий не найдены.");
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className={styles.PageWrapper}>
                <div className={styles.PageHeader}>
                    <h1 className={styles.PageTitle}>Выберите зал</h1>
                    <p className={styles.PageSubtitle}>
                        Выберите экскурсию, которую вы бы хотели посетить:
                    </p>
                </div>
                <section className={hallStyles.ContentSection}>
                    <div className={styles.Grid}>
                        {excursionWidgets.map((hall) => (
                            <ExcursionCard key={hall.id} hall={hall} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}