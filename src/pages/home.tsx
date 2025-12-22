import { Suspense, use, useEffect, useRef, useState } from "react";
import Filter from "../components/ui/Filter/Filter";
import SearchInput from "../components/ui/SearchInput/SearchInput";
import CountryCard from "../components/ui/CountryCard/CountryCard";

export default function HomePage() {
    const initialCountriesData = useRef([]);

    const [countriesData, setCountriesData] = useState([]);

    const handleFetchCountries = async () => {
        return fetch('https://restcountries.com/v3.1/all?fields=capital,flag,flags,name,population,region').then(resp => resp.json());
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
                        <CountryCard 
                            key={c?.name?.official}
                            country={c?.name?.official}
                            region={c?.region}
                            capital={c?.capital?.[0]}
                            population={c?.population}
                            flag={c?.flags?.png}
                            className="countriesGridItem"
                        />
                    )) : null}
                </div>
            </Suspense>
        </div>
    )
}