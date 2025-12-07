import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BaseLayout from '../shared/ui/BaseLayout/BaseLayout';
import { routes } from '../shared/const';
import { HomePage, ContactsPage, NotFoundPage, Excursions, HallPage, ArtifactPage, ArtifactDetailPage, FeedbackPage } from '../pages';

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Navigate to={routes.home} replace />} />
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.excursions} element={<Excursions />} />
        <Route path={routes.halls} element={<HallPage />} />
        <Route path={routes.contacts} element={<ContactsPage />} />
        <Route path={routes.survey} element={<FeedbackPage />} />
        <Route path="/artifacts" element={<ArtifactPage />} />
        <Route path="/artifact/:id" element={<ArtifactDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
