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
                <img alt={`${country} Flag`} src={flag} style={{ display: 'block', width: '100%', height: 225 }} />
            </picture>
            <figcaption className={styles.countryCardDetails}>
               <div>{country}</div>
               <p>
                    Population: {population} <br />
                    Region: {region} <br />
                    Capital: {capital}
               </p>
            </figcaption>
        </figure>
    )
}