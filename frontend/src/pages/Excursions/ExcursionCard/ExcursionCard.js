import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExcursionCard.module.css';

export function ExcursionCard({ excursion }) {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate(excursion?.link || '/excursions/tour');
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={excursion.image} alt={excursion.title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{excursion.title}</h3>
                <p className={styles.description}>{excursion.description}</p>
                <div className={styles.details}>
                    <div className={styles.detail}>
                        <span className={styles.label}>Место проведения:</span>
                        <span className={styles.value}>{excursion.location}</span>
                    </div>
                </div>
                <button className={styles.button} type="button" onClick={handleStart}>
                    Начать экскурсию
                </button>
            </div>
        </div>
    );
} 