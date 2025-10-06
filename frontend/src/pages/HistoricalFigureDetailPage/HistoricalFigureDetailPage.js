import Styles from './HistoricalFigureDetailPage.module.css';
import {useParams} from 'react-router-dom';
import {historicalFigures} from '../../const/historicalFigures';
import {Breadcrumbs} from '../../shared/ui/Breadcrumbs/Breadcrumbs';
import vovaImage from "../../../shared/static/images/vova.png";
import lenaImage from "../../../shared/static/images/lena.png";
import jannaImage from "../../../shared/static/images/janna.png";
import Popov2Image from "../../../shared/static/images/popov2.png";
import Popov3Image from "../../../shared/static/images/popov3.png";

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

    // Массив изображений для галереи
    const galleryImages = [figure.image, Popov2Image, Popov3Image];

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.HistoricalFigureDetailPage}>
                <div className={Styles.Content}>
                    <div className={Styles.ImageGallery}>
                        <div className={Styles.MainImage}>
                            <img src={figure.image} alt={figure.name} className={Styles.Image}/>
                        </div>
                        <div className={Styles.Thumbnails}>
                            {galleryImages.map((image, index) => (
                                <div 
                                    key={index} 
                                    className={Styles.Thumbnail}
                                    onClick={() => {
                                        const mainImage = document.querySelector(`.${Styles.MainImage} img`);
                                        if (mainImage) {
                                            mainImage.src = image;
                                        }
                                    }}
                                >
                                    <img src={image} alt={`${figure.name} - фото ${index + 1}`} />
                                </div>
                            ))}
                        </div>
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