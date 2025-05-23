import {useState} from "react";
import Styles from "./Header.module.css";

export function SearchBar() {

    const [searchInput, setSearchInput] = useState("")

    const onInputChange = (e) => setSearchInput(e.target.value)

    return (
        <div className={Styles.SearchBar}>
            <input
                type="search"
                onChange={onInputChange}
                value={searchInput}
                placeholder="Поиск"
            />
        </div>
    )
}