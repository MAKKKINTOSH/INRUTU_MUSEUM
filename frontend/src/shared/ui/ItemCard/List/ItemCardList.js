import Styles from "./ItemCardList.module.css";
import {ItemCard} from "../Card/ItemCard";

export function ItemCardList({persons}) {

    return (
        <div className={Styles.ItemCardList}>
            {persons.map((personData, index) =>
                <ItemCard
                    key={index}
                    imageUrl={personData.imageUrl}
                    personName={personData.personName}
                    link={personData.link}
                />
            )}
        </div>
    )
}