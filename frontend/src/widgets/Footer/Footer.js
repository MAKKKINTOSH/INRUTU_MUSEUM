import Styles from './Footer.module.css';
import {Logo} from "../../shared/ui";
import {routes} from "../../shared/const";
import { Link } from 'react-router-dom';

const links = [
    ["Главная", routes.home],
    ["Экскурсии", routes.excursions],
    ["Исторические личности", routes.historicalFigures],
    ["Залы с экспонатами", routes.halls],
    ["Оставить отзыв", routes.survey],
    ["Контакты", routes.contacts],
    ["Поиск по сайту", routes.search],
    ["Войти как администратор", routes.admin]
]

export function Footer({ onAdminClick }) {
    const handleAdminClick = (e) => {
        e.preventDefault();
        onAdminClick(e);
    };

    return (
        <footer className={Styles.Footer}>
            <div className="FooterContent">
                <Logo/>
                <div className={Styles.Links}>
                    {links.map((element, index) => (
                        element[1] === routes.admin ? (
                            <button 
                                key={index} 
                                onClick={handleAdminClick}
                                className={Styles.adminButton}
                            >
                                {element[0]}
                            </button>
                        ) : (
                            <Link to={element[1]} key={index}>
                                {element[0]}
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </footer>
    )
}