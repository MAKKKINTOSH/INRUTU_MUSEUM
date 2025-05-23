import Styles from './Breadcrumbs.module.css';
import {useLocation} from "react-router-dom";

export function Breadcrumbs({links}) {

    const location = useLocation().pathname;

    return (
        <ul className={Styles.Breadcrumb}>
            {
                links.map(([name, path]) => {
                    if (path === location) {
                        return <li key={name} className="text">{name}</li>
                    }
                    return <li key={name}><a href={path} className="link">{name}</a></li>
                })
            }
        </ul>
    )

}