import Styles from './HistoricalFigureCard.module.css';
import {Link} from "react-router-dom";

export function HistoricalFigureCard({figure}) {
    // Формируем строку с годами жизни
    const yearsString = figure.birth_year && figure.death_year 
        ? `${figure.birth_year} - ${figure.death_year}`
        : figure.birth_year 
        ? `род. ${figure.birth_year}`
        : '';

    // Получаем первое изображение из массива images
    const imageUrl = figure.images && figure.images.length > 0
        ? (figure.images[0].image_url || figure.images[0].image || '')
        : '';

    // Получаем описание (биографию)
    const description = figure.biography || figure.description || '';

    return (
        <Link to={`/historical_figure/${figure.id}`} className={Styles.Card}>
            <div className={Styles.ImageContainer}>
                {imageUrl && (
                    <img src={imageUrl} alt={figure.full_name} className={Styles.Image}/>
                )}
            </div>
            <div className={Styles.Content}>
                <h3 className={Styles.Name}>{figure.full_name}</h3>
                {yearsString && <p className={Styles.Years}>{yearsString}</p>}
                {description && <p className={Styles.Description}>{description}</p>}
            </div>
        </Link>
    );
} 