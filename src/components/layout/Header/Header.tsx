import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.mainHeader}>
            <div className={styles.mainHeaderContainer}>
                <h1>Where in the world?</h1>
                <div>
                    <button>Dark Mode</button>
                </div>
            </div>
        </header>
    )
}