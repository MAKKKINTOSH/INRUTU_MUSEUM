import Styles from './HistoricalFigureDetailPage.module.css';
import {useParams} from 'react-router-dom';
import {historicalFigures} from '../../const/historicalFigures';
import {Breadcrumbs} from '../../../shared/ui/Breadcrumbs/Breadcrumbs';

export function HistoricalFigureDetailPage() {
    const {id} = useParams();
    const figure = historicalFigures.find(f => f.id === parseInt(id));

    if (!figure) {
        return <div>Историческая личность не найдена</div>;
    }

    const breadcrumbsLinks = [
        ["Главная", "/home"],
        ["Исторические личности", "/historical_figures"],
        [figure.name, `/historical_figure/${figure.id}`]
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.HistoricalFigureDetailPage}>
                <div className={Styles.Content}>
                    <div className={Styles.ImageContainer}>
                        <img src={figure.image} alt={figure.name} className={Styles.Image}/>
                    </div>
                    <div className={Styles.Info}>
                        <h1 className={Styles.Name}>{figure.name}</h1>
                        <p className={Styles.Years}>{figure.years}</p>
                        <div className={Styles.Description}>
                            <h2>Биография</h2>
                            <p>{figure.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 