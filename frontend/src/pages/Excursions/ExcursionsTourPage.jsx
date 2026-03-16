import React, { useEffect, useMemo, useState } from 'react';
import Breadcrumbs from '../../shared/ui/Breadcrumbs/Breadcrumbs';
import styles from './Excursions.module.css';
import { TourShell } from './Tour/ui/TourShell';
import { createTourApp } from './Tour/modules/tourApp';

export function ExcursionsTourPage() {
  const [elements, setElements] = useState(null);

  useEffect(() => {
    if (!elements) return;
    const app = createTourApp(elements);
    const cleanup = app.mount();

    return () => {
      try {
        cleanup?.();
      } catch (e) {}
    };
  }, [elements]);

  const breadcrumbsLinks = [
    ['Главная', '/home'],
    ['Экскурсии', '/excursions'],
    ['Обзорная экскурсия', '/excursions/tour'],
  ];

  const onReady = useMemo(() => (els) => setElements(els), []);

  return (
    <>
      <Breadcrumbs links={breadcrumbsLinks} />
      <div className={styles.TourPage}>
        <div className={styles.TourWindow}>
          <div className={styles.TourRoot}>
            <TourShell onReady={onReady} />
          </div>
        </div>
      </div>
    </>
  );
}

