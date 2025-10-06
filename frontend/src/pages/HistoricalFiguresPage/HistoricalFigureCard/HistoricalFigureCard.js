import Styles from './HistoricalFigureCard.module.css';
import {Link} from "react-router-dom";

export function HistoricalFigureCard({figure}) {
    return (
        <Link to={`/historical_figure/${figure.id}`} className={Styles.Card}>
            <div className={Styles.ImageContainer}>
                <img src={figure.image} alt={figure.name} className={Styles.Image}/>
            </div>
            <div className={Styles.Content}>
                <h3 className={Styles.Name}>{figure.name}</h3>
                <p className={Styles.Years}>{figure.years}</p>
                <p className={Styles.Description}>{figure.description}</p>
            </div>
        </Link>
    );
} 