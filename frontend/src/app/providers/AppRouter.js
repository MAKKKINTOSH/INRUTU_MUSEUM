import {routes} from '../../shared/const'
import {HomePage, NotFoundPage, ContactsPage, FeedbackPage} from "../../pages"
import {Navigate, Route, Routes} from "react-router-dom"
import {FullPage} from "../../pages"
import {HallPage} from "../../pages"
import {ArtifactPage} from "../../pages"
import {ArtifactDetailPage} from "../../pages/ArtifactDetailPage/ui/ArtifactDetailPage"
import {HistoricalFiguresPage} from "../../pages/HistoricalFiguresPage/ui/HistoricalFiguresPage"
import {HistoricalFigureDetailPage} from "../../pages/HistoricalFigureDetailPage/ui/HistoricalFigureDetailPage"

// Компонент для проверки авторизации
function ProtectedRoute({ children }) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
        return <Navigate to={routes.home} replace />;
    }

    return children;
}

const appRoutes = [
    {path: routes.home, element: <HomePage/>},
    {path: "/", element: <Navigate to={routes.home}/>},
    {path: routes.halls, element: <HallPage/>},
    {path: "/artifacts", element: <ArtifactPage/>},
    {path: "/artifact/:id", element: <ArtifactDetailPage/>},
    {path: routes.historicalFigures, element: <HistoricalFiguresPage/>},
    {path: "/historical_figure/:id", element: <HistoricalFigureDetailPage/>},
    {path: routes.contacts, element: <ContactsPage/>},
    {path: routes.survey, element: <FeedbackPage/>},
    {
        path: routes.admin,
        element: (
            <ProtectedRoute>
                <div>Админ-панель</div>
            </ProtectedRoute>
        )
    },
    {path: "*", element: <NotFoundPage/>},
]

export function AppRouter({ onAdminClick }) {
    return (
        <Routes>
            {appRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <FullPage onAdminClick={onAdminClick}>
                            {route.element}
                        </FullPage>
                    }
                />
            ))}
        </Routes>
    )
}