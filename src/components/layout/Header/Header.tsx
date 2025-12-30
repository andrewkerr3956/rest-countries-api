import styles from './Header.module.css'

interface HeaderProps {
    theme: string;
    onThemeChange: (theme: string) => void;
}

export default function Header(props: HeaderProps) {
    const { theme, onThemeChange } = props;

    return (
        <header className={`${styles.mainHeader} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={styles.mainHeaderContainer}>
                <h1>Where in the world?</h1>
                <div>
                    <button style={{ textTransform: 'capitalize' }} onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>{theme} Mode</button>
                </div>
            </div>
        </header>
    )
}