import styles from './Header.module.css'

interface HeaderProps {
    theme: string;
    onThemeChange: (theme: string) => void;
}

const Header = (props: HeaderProps) => {
    const { theme, onThemeChange } = props;

    return (
        <header className={`${styles.mainHeader} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={`${styles.mainHeaderContainer} container`}>
                <h1>Where in the world?</h1>
                <div>
                    <button className={`btn ${theme === 'dark' ? 'dark' : ''}`} style={{ textTransform: 'capitalize' }} onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>
                        <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`} style={{ paddingRight: '1.5em' }}></i>
                        {theme} Mode
                    </button>
                </div>
            </div>
        </header>
    )
};

export default Header;