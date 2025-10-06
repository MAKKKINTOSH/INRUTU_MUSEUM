import Styles from "./Header.module.css";

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
        </div>
    )
}