import { Suspense, use, useEffect, useRef, useState } from "react";
import Filter from "../components/ui/Filter/Filter";
import SearchInput from "../components/ui/SearchInput/SearchInput";
import CountryCard from "../components/ui/CountryCard/CountryCard";
import { Link } from "react-router";

export default function HomePage() {
    const initialCountriesData = useRef([]);

    const [countriesData, setCountriesData] = useState([]);

    const handleFetchCountries = async () => {
        return fetch('https://restcountries.com/v3.1/all?fields=capital,flag,flags,name,population,region,cca3').then(resp => resp.json());
    }

    useEffect(() => {
        (async () => {
            const data = await handleFetchCountries();
            console.log(data)
            setCountriesData(data)
        })();
    }, []);

    return (
        <div>
            <SearchInput
                placeholder='Search for a country...'
            />
            <Filter
                options={[
                    { label: 'Africa', value: 'africa' },
                    { label: 'America', value: 'america' },
                    { label: 'Asia', value: 'asia' },
                    { label: 'Europe', value: 'europe' },
                    { label: 'Oceania', value: 'oceania' },
                ]}
            />
            <Suspense>
                <div className="countriesGrid">
                    {countriesData && countriesData?.length > 0 ? countriesData.map((c) => (
                        <Link to={`/countries/${c?.cca3}`}>
                            <CountryCard
                                key={c?.name?.official}
                                country={c?.name?.common}
                                region={c?.region}
                                capital={c?.capital?.[0]}
                                population={c?.population}
                                flag={c?.flags?.png}
                                className="countriesGridItem"
                            />
                        </Link>
                    )) : null}
                </div>
            </Suspense>
        </div>
    )
}