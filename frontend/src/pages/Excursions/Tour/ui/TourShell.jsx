import React, { useEffect, useRef } from 'react';
import '../tourStyles.css';

export function TourShell({ onReady }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const els = {
      root: rootRef.current,
      hud: rootRef.current.querySelector('[data-tour="hud"]'),
      loading: rootRef.current.querySelector('[data-tour="loading"]'),
      label: rootRef.current.querySelector('[data-tour="label"]'),
      labelTitle: rootRef.current.querySelector('[data-tour="labelTitle"]'),
      labelText: rootRef.current.querySelector('[data-tour="labelText"]'),
      actionHint: rootRef.current.querySelector('[data-tour="actionHint"]'),
      crosshair: rootRef.current.querySelector('[data-tour="crosshair"]'),
      viewer: rootRef.current.querySelector('[data-tour="viewer"]'),
      viewerTitle: rootRef.current.querySelector('[data-tour="viewerTitle"]'),
      viewerClose: rootRef.current.querySelector('[data-tour="viewerClose"]'),
      viewerCanvas: rootRef.current.querySelector('[data-tour="viewerCanvas"]'),
    };

    onReady?.(els);
  }, [onReady]);

  // NOTE: CSS file is global; we keep selectors class-based only.
  // CRA will include it once; classes keep it scoped in practice.
  return (
    <div ref={rootRef} className="tourRoot">
      <div className="tourLoading" data-tour="loading">
        Загрузка тура…
      </div>

      <div className="tourHud" data-tour="hud">
        <div className="tourHudTitle">Виртуальный музей</div>
        <div className="tourHudHint">
          Кликни, чтобы начать. WASD — ходьба, мышь — обзор, Shift — быстрее, Esc — выйти.
        </div>
      </div>

      <div className="tourLabel" data-tour="label" style={{ display: 'none' }}>
        <div className="tourLabelTitle" data-tour="labelTitle" />
        <div className="tourLabelText" data-tour="labelText" />
      </div>

      <div className="tourCrosshair" data-tour="crosshair">+</div>
      <div className="tourActionHint" data-tour="actionHint" style={{ display: 'none' }}>
        Нажми <b>E</b> чтобы открыть
      </div>

      <div className="tourViewer" data-tour="viewer" style={{ display: 'none' }}>
        <div className="tourViewerBar">
          <div className="tourViewerTitle" data-tour="viewerTitle" />
          <button type="button" className="tourViewerClose" data-tour="viewerClose">
            Закрыть ✕
          </button>
        </div>
        <canvas className="tourViewerCanvas" data-tour="viewerCanvas" />
        <div className="tourViewerHelp">Мышь: вращать • Колесо: зум • ПКМ: панорама</div>
      </div>
    </div>
  );
}

