interface CountryCardProps {
    country: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
}

export default function CountryCard(props: CountryCardProps) {
    const { country, population, region, capital, flag } = props;

    return (
        <figure>
            <picture>
                <img alt={`${country} Flag`} src={flag} />
            </picture>
            <figcaption>
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