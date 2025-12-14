import React, { useState, useEffect } from 'react';
import Styles from './HistoricalFigureDetailPage.module.css';
import {useParams} from 'react-router-dom';
import {HistoricalFiguresAPI} from '../../shared/const/api';
import Breadcrumbs from '../../shared/ui/Breadcrumbs/Breadcrumbs';

export function HistoricalFigureDetailPage() {
    const {id} = useParams();
    const [figure, setFigure] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const loadFigure = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await HistoricalFiguresAPI.get(id);
                if (isMounted) {
                    setFigure(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке исторической личности:', err);
                if (isMounted) {
                    setError('Не удалось загрузить данные исторической личности.');
                    setLoading(false);
                }
            }
        };

        loadFigure();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className={Styles.HistoricalFigureDetailPage}>
                <div className={Styles.Content}>
                    <div>Загрузка...</div>
                </div>
            </div>
        );
    }

    if (error || !figure) {
        return (
            <div className={Styles.HistoricalFigureDetailPage}>
                <div className={Styles.Content}>
                    <div>{error || 'Историческая личность не найдена'}</div>
                </div>
            </div>
        );
    }

    // Формируем строку с годами жизни
    const yearsString = figure.birth_year && figure.death_year 
        ? `${figure.birth_year} - ${figure.death_year}`
        : figure.birth_year 
        ? `род. ${figure.birth_year}`
        : '';

    // Получаем изображения из API
    const images = figure.images && figure.images.length > 0
        ? figure.images.map(img => img.image_url || img.image || '')
        : [];

    const mainImage = images[selectedImageIndex] || images[0] || '';

    const breadcrumbsLinks = [
        ["Главная", "/home"],
        ["Исторические личности", "/historical_figures"],
        [figure.full_name, `/historical_figure/${figure.id}`]
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.HistoricalFigureDetailPage}>
                <div className={Styles.Content}>
                    <div className={Styles.ImageGallery}>
                        <div className={Styles.MainImage}>
                            {mainImage && (
                                <img 
                                    src={mainImage} 
                                    alt={figure.full_name} 
                                    className={Styles.Image}
                                />
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className={Styles.Thumbnails}>
                                {images.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className={`${Styles.Thumbnail} ${selectedImageIndex === index ? Styles.Active : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={image} alt={`${figure.full_name} - фото ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={Styles.Info}>
                        <h1 className={Styles.Name}>{figure.full_name}</h1>
                        {yearsString && <p className={Styles.Years}>{yearsString}</p>}
                        <div className={Styles.Description}>
                            <h2>Биография</h2>
                            <p>{figure.biography || figure.description || 'Биография не указана.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 