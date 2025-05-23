import Styles from "./ArtifactCard.module.css"
import {Link} from "react-router-dom"

export function ArtifactCard({artifact}) {
    return (
        <Link to={`/artifact/${artifact.id}`} className={Styles.ArtifactCard}>
            <div className={Styles.ImageContainer}>
                <img src={artifact.image} alt={artifact.title} className={Styles.Image}/>
            </div>
            <div className={Styles.Content}>
                <h3 className={Styles.Title}>{artifact.title}</h3>
                <p className={Styles.Year}>Год: {artifact.year}</p>
                <p className={Styles.Description}>{artifact.description}</p>
            </div>
        </Link>
    )
} 