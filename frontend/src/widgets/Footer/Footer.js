import Styles from './Footer.module.css';
import {routes} from "../../shared/const";
import { Link } from 'react-router-dom';

const column1Links = [
    ["Главная", routes.home],
    ["Экскурсии", routes.excursions],
    ["Исторические личности", routes.historicalFigures],
    ["Залы с экспонатами", routes.halls],
];

const column2Links = [
    ["Оставить отзыв", routes.survey],
    ["Контакты", routes.contacts],
    ["Поиск по сайту", routes.search],
];

const column3Links = [
    ["Войти как администратор", routes.admin]
];

export function Footer({ onAdminClick }) {
    const handleAdminClick = (e) => {
        e.preventDefault();
        onAdminClick(e);
    };

    const renderLink = (element, index) => {
        if (element[1] === routes.admin) {
            return (
                <button 
                    key={index} 
                    onClick={handleAdminClick}
                    className={Styles.adminButton}
                >
                    {element[0]}
                </button>
            );
        }
        return (
            <Link to={element[1]} key={index}>
                {element[0]}
            </Link>
        );
    };

    return (
        <footer className={Styles.Footer}>
            <div className={Styles.FooterContent}>
                <div className={Styles.MuseumTitle}>
                    <div>Музей</div>
                    <div>Вычислительной</div>
                    <div>Техники ИрНИТУ</div>
                </div>
                <div className={Styles.Divider}></div>
                <div className={Styles.ColumnsWrapper}>
                    <div className={Styles.Column}>
                        {column1Links.map((element, index) => renderLink(element, index))}
                    </div>
                    <div className={Styles.Column}>
                        {column2Links.map((element, index) => renderLink(element, index))}
                    </div>
                    <div className={Styles.Column}>
                        {column3Links.map((element, index) => renderLink(element, index))}
                    </div>
                </div>
            </div>
        </footer>
    )
}