import Styles from './Timeline.module.css';

export function Timeline({ centuries, activeCentury, onCenturyClick }) {
    return (
        <div className={Styles.timeline}>
            {centuries.map((century) => (
                <div 
                    key={century.id}
                    className={`${Styles.century} ${activeCentury === century.id ? Styles.active : ''}`}
                    onClick={() => onCenturyClick(century.id)}
                >
                    <div className={Styles.centuryLabel}>{century.label}</div>
                    <div className={Styles.centuryLine}></div>
                </div>
            ))}
        </div>
    );
} 