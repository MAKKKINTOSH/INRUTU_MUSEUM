import Styles from './ArtifactCard.module.css';
import { useNavigate } from 'react-router-dom';

export function ArtifactCard({ artifact }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/artifact/${artifact.id}`);
    };

    return (
        <div className={Styles.card} onClick={handleClick}>
            <div className={Styles.imageContainer}>
                <img src={artifact.image} alt={artifact.title} className={Styles.image} />
            </div>
            <div className={Styles.content}>
                <h3 className={Styles.title}>{artifact.title}</h3>
                <p className={Styles.year}>{artifact.year}</p>
            </div>
        </div>
    );
} 