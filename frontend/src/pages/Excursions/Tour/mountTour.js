import React from 'react';
import { createRoot } from 'react-dom/client';
import { TourShell } from './ui/TourShell';
import { createTourApp } from './modules/tourApp';

export function mountTour(hostEl) {
  const root = createRoot(hostEl);

  let app = null;
  let appCleanup = null;

  root.render(
    <TourShell
      onReady={(elements) => {
        app = createTourApp(elements);
        Promise.resolve(app.mount()).then((cleanup) => {
          appCleanup = cleanup;
        });
      }}
    />
  );

  return () => {
    try {
      appCleanup?.();
    } catch (e) {}
    try {
      root.unmount();
    } catch (e) {}
  };
}

