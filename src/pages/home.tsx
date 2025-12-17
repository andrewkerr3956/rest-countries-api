import { Suspense, use, useEffect, useRef, useState } from "react";
import Filter from "../components/ui/Filter/Filter";
import SearchInput from "../components/ui/SearchInput/SearchInput";

export default function HomePage() {
    const initialCountriesData = useRef(() => handleFetchCountries());

    const [countriesData, setCountriesData] = useState([]);

    const handleFetchCountries = async() => {
        return fetch('https://restcountries.com/v3.1/all?fields=capital,flag,name,population,region').then(resp => resp.json());
    }

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
                {countriesData && countriesData?.length > 0 ? countriesData.map((c) => (
                    <div>Country</div>
                )) : null}
            </Suspense>
        </div>
    )
}