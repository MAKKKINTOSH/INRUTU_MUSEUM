import React from 'react';
import styles from './ExcursionCard.module.css';

export function ExcursionCard({ excursion }) {
    return (
        <div className={styles.ExcursionCard}>
            <a href={`#${excursion.id}`} className={styles.link}>
                <div className={styles.ContentWrapper}>
                    <p>{excursion.title}</p>
                </div>
            </a>
        </div>
    );
} 