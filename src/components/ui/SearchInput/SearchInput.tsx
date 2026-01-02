import type { InputHTMLAttributes } from "react";
import styles from './SearchInput.module.css';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput(props: SearchInputProps) {
    return (
        <div className={styles.searchWrapper}>
            <i className={`${styles.searchIcon} fa-solid fa-magnifying-glass`}></i>
            <input 
                {...props}
                className={styles.searchInput}
                type="search"
            />
        </div>
    )
}