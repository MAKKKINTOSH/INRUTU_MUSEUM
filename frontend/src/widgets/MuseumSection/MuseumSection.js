import Styles from "./MuseumSection.module.css"

export function MuseumSection({title, description, link, linkText, children}) {

    return (
        <div className={Styles.MuseumSection}>
            <p className="title">
                {title}
            </p>
            <div className={Styles.SectionMainContent}>
                <p className="text">
                    {description}
                </p>
                {children}
            </div>

            <a href={link} className="link">
                {linkText}...
            </a>
        </div>
    )
}