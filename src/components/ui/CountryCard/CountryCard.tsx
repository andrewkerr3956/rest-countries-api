import styles from './CountryCard.module.css';

interface CountryCardProps {
    country: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
    className?: string;
}

export default function CountryCard(props: CountryCardProps) {
    const { country, population, region, capital, flag, className } = props;

    return (
        <figure className={`${className} ${styles.countryCard}`}>
            <picture style={{ display: 'block' }}>
                <img alt={`${country} Flag`} src={flag} style={{ display: 'block', width: '100%', height: 175, borderTopLeftRadius: 4, borderTopRightRadius: 4  }} />
            </picture>
            <figcaption className={styles.countryCardDetails} style={{ height: 175 }}>
                <div className={styles.countryCardTitle}>{country}</div>
                <div className={styles.countryCardDetailItemsList}>
                    <p className={styles.countryCardDetailItem}>
                        <span className={styles.countryCardDetailItemLabel}>Population: </span> 
                        {population}
                    </p>
                    <p className={styles.countryCardDetailItem}>
                        <span className={styles.countryCardDetailItemLabel}>Region: </span>
                        {region}
                    </p>
                    <p className={styles.countryCardDetailItem}>
                        <span className={styles.countryCardDetailItemLabel}>Capital: </span>
                        {capital}
                    </p>
                </div>
            </figcaption>
        </figure>
    )
}