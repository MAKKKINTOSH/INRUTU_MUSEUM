import Styles from "./ItemCard.module.css"

export function ItemCard({imageUrl, link, personName}){
    return (
        <div className={Styles.ItemCard}>
            <a href={link}>
                <img src={imageUrl} alt={personName}/>
            </a>
            <p>{personName}</p>
        </div>
    )
}