import Styles from './Footer.module.css';
import {Logo} from "../../shared/ui";
import { Link } from 'react-router-dom';

const links = [
    ["Главная", "/home"],
    ["Экскурсии", "/excursions"],
    ["Исторические личности", "/historical_figures"],
    ["Залы с экспонатами", "/halls"],
    ["Оставить отзыв", "/survey"],
    ["Контакты", "/contacts"],
    ["Поиск по сайту", "/search"],
    ["Войти как администратор", "/admin"]
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
                        (
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