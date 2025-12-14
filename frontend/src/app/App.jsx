import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BaseLayout from '../shared/ui/BaseLayout/BaseLayout';
import { 
  HomePage, 
  ContactsPage, 
  NotFoundPage, 
  Excursions, 
  HallPage, 
  ArtifactPage, 
  ArtifactDetailPage,
  FeedbackPage,
  HistoricalFiguresPage,
  HistoricalFigureDetailPage
} from '../pages';

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/excursions" element={<Excursions />} />
        <Route path="/historical_figures" element={<HistoricalFiguresPage />} />
        <Route path="/historical_figure/:id" element={<HistoricalFigureDetailPage />} />
        <Route path="/halls" element={<HallPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/survey" element={<FeedbackPage />} />
        {/* Example nested/detail routes if needed later */}
        <Route path="/artifacts/*" element={<ArtifactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
