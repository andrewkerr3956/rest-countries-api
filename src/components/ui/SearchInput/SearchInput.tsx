import { useContext, type InputHTMLAttributes } from "react";
import styles from './SearchInput.module.css';
import ThemeContext from "../../../contexts/ThemeContext";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput(props: SearchInputProps) {
    const theme = useContext(ThemeContext);

    return (
        <div className={`${styles.searchWrapper} ${theme === 'dark' ? styles.dark : ''}`}>
            <i className={`${styles.searchIcon} fa-solid fa-magnifying-glass`}></i>
            <input 
                {...props}
                className={styles.searchInput}
                type="search"
            />
        </div>
    )
}