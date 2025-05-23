import Styles from "./Header.module.css";
import {SearchBar} from "./SearchBar";

export function NavBar({navigationButtons}) {

    return (
        <div className={Styles.NavBar}>
            <div className={Styles.NavSection}>
                {navigationButtons.map((element, index) =>
                    <a href={element[1]} key={index}>
                        <p>{element[0]}</p>
                    </a>
                )}
            </div>
            <SearchBar></SearchBar>
        </div>
    )
}