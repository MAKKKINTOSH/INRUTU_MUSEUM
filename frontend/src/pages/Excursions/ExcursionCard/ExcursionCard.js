import React from 'react';
import styles from './ExcursionCard.module.css';

export function ExcursionCard({ hall }) {
    const { id, text, category, imageUrl } = hall;

    return (
        <div
            className={styles.card}
            aria-label={`Зал ${text}`}
            data-hall-id={id}
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="button"
            tabIndex={0}
        >
            <div className={styles.overlay}>
                <p className={styles.title}>{text}</p>
                {category && <p className={styles.meta}>{category}</p>}
            </div>
        </div>
    );
}