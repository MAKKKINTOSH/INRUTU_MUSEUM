import React from 'react';
import Styles from './Timeline.module.css';

/**
 * centuries: массив объектов вида { id, label, startYear, endYear }
 * activeCentury: id активного столетия
 * onCenturyClick: функция для обработки клика по столетию
 */
export function Timeline({ centuries, activeCentury, onCenturyClick }) {
  return (
    <nav className={Styles.timeline}>
      {centuries.map((century) => (
        <button
          key={century.id}
          className={`${Styles.century} ${activeCentury === century.id ? Styles.active : ''}`}
          onClick={() => onCenturyClick(century.id)}
        >
          <span className={Styles.centuryLabel}>{century.label}</span>
          <span className={Styles.centuryLine}></span>
        </button>
      ))}
    </nav>
  );
}
