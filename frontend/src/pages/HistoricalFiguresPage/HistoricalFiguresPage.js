import Styles from './HistoricalFiguresPage.module.css';
import {historicalFigures} from '../../const/historicalFigures';
import {Timeline} from '../ArtifactPage/ui/Timeline/Timeline';
import {HistoricalFigureCard} from './HistoricalFigureCard/HistoricalFigureCard';
import {Breadcrumbs} from '../../shared/ui/Breadcrumbs/Breadcrumbs';

export function HistoricalFiguresPage() {
    // Группируем исторические личности по векам
    const figuresByCentury = historicalFigures.reduce((acc, figure) => {
        const year = parseInt(figure.years.split('-')[0]);
        const century = Math.floor(year / 100) * 100;
        if (!acc[century]) {
            acc[century] = [];
        }
        acc[century].push(figure);
        return acc;
    }, {});

    // Сортируем века по возрастанию
    const sortedCenturies = Object.keys(figuresByCentury).sort((a, b) => parseInt(a) - parseInt(b));

    const breadcrumbsLinks = [
        ["Главная", "/home"],
        ["Исторические личности", "/historical_figures"]
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.HistoricalFiguresPage}>
                <Timeline artifactsByCentury={figuresByCentury} countLabel="деятеля" />
                <div className={Styles.FiguresGrid}>
                    {sortedCenturies.map(century => (
                        <div key={century} className={Styles.CenturySection}>
                            <h2 className={Styles.CenturyTitle}>{parseInt(century) / 100 + 1} век</h2>
                            <div className={Styles.FigureCards}>
                                {figuresByCentury[century].map(figure => (
                                    <HistoricalFigureCard key={figure.id} figure={figure} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
} 