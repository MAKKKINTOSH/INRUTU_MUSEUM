import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

/**
 * Breadcrumbs component
 * Поддерживает два формата данных:
 * 1. items: массив объектов { label, to }
 * 2. links: массив массивов [label, path] (для обратной совместимости)
 */
const Breadcrumbs = ({ items = [], links = [] }) => {
  // Преобразуем links в items, если передан формат links
  const breadcrumbsItems = items.length > 0 
    ? items 
    : links.map((link) => {
        // Если link - это массив [label, path]
        if (Array.isArray(link)) {
          return {
            label: link[0],
            to: link[1]
          };
        }
        // Если link - это объект
        return link;
      });

  if (!breadcrumbsItems.length) return null;

  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbsItems.map((item, index) => (
        <span key={index} className={styles.item}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
          {index < breadcrumbsItems.length - 1 && <span className={styles.separator}>/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
