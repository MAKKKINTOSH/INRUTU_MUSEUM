import Styles from './Header.module.css';
import {routes} from "../../shared/const";
import {NavBar} from "./NavBar";
import {Logo} from "../../shared/ui";

const navigationButtons = [
    ["Главная", routes.home],
    ["Экскурсии", routes.excursions],
    ["Исторические личности", routes.historicalFigures],
    ["Залы с экспонатами", routes.halls]
]


export function Header() {

    return (
        <header className={Styles.Header}>
            <div className="HeaderContent">
                <Logo/>
                <NavBar navigationButtons={navigationButtons}/>
            </div>
        </header>
    )
}