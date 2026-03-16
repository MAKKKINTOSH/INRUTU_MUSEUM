import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Excursions.module.css';
import Breadcrumbs from '../../shared/ui/Breadcrumbs/Breadcrumbs';

export function Excursions() {
    const navigate = useNavigate();
    const breadcrumbsLinks = [
        ["Главная", "/home"],
        ["Экскурсии", "/excursions"]
    ]

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className={styles.Excursions}>
                <h1>Экскурсии</h1>
                <p className={styles.description}>
                    Приглашаем вас на увлекательные экскурсии по музею вычислительной техники. 
                    Наши опытные экскурсоводы помогут вам погрузиться в историю развития технологий 
                    и узнать много интересного о компьютерах и их создателях.
                </p>
                <div className={styles.grid}>
                    <button
                        type="button"
                        className={styles.OverviewButton}
                        onClick={() => navigate('/excursions/tour')}
                    >
                        Обзорная экскурсия
                    </button>
                </div>
            </div>
        </>
    );
} 