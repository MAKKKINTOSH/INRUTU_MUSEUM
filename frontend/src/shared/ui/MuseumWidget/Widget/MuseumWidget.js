import Styles from "./MuseumWidget.module.css"

export function MuseumWidget({href, imageUrl, text}) {

    return (
        <div className={Styles.MuseumWidget} style={{backgroundImage: `url(${imageUrl})`}}>
            <a href={href}>
                <div className={Styles.ContentWrapper}>
                    <p>{text}</p>
                </div>
            </a>
        </div>
    )
}