import { Suspense, use, useContext, useEffect, useMemo, useRef, useState } from "react";
import Filter from "../components/ui/Filter/Filter";
import SearchInput from "../components/ui/SearchInput/SearchInput";
import CountryCard from "../components/ui/CountryCard/CountryCard";
import { Link } from "react-router";
import ThemeContext from "../contexts/ThemeContext";

async function handleFetchCountries() {
    return fetch('https://restcountries.com/v3.1/all?fields=capital,flag,flags,name,population,region,cca3').then(resp => resp.json());
};

const HomePage = () => {
    const theme = useContext(ThemeContext);

    const initialLoad = useRef(true);
    const initialCountriesData = useRef<any[]>([]);

    const [countriesData, setCountriesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState(null);

    useMemo(() => {
        (async () => {
            const data = [...initialCountriesData.current];
            console.log({ initialRef: data });
            if (!initialLoad.current) {
                let searchFilter = [...data];
                let regionFilter = [...data];
                // Apply filters
                if (searchQuery) {
                    searchFilter = data.filter((d) => d?.name?.common?.includes(searchQuery));
                }
                if (filterQuery && filterQuery !== 'all') {
                    regionFilter = data.filter((d) => d?.region?.toLowerCase()?.includes(filterQuery));
                }
                const filteredData = data.filter((d) => searchFilter?.includes(d) && regionFilter?.includes(d))
                setCountriesData(filteredData);
            }
        })();
    }, [searchQuery, filterQuery]);

    useEffect(() => {
        (async () => {
            const data = await handleFetchCountries();
            if (initialLoad?.current) {
                initialCountriesData.current = [...data];
            }
            let searchFilter = [...data];
            let regionFilter = [...data];
            // Apply filters
            if (searchQuery) {
                searchFilter = data.filter((d) => d?.name?.common?.includes(searchQuery));
            }
            if (filterQuery) {
                regionFilter = data.filter((d) => d?.region?.toLowerCase()?.includes(filterQuery));
            }
            const filteredData = data.filter((d) => searchFilter?.includes(d) && regionFilter?.includes(d))
            setCountriesData(filteredData);
            initialLoad.current = false;
        })();
    }, []);

    return (
        <div>
            <div className="filterSection">
                <SearchInput
                    placeholder='Search for a country...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <Filter
                    className={`countriesFilter ${theme === 'dark' ? 'dark' : ''}`}
                    selectProps={{
                        className: 'countriesSelect'
                    }}
                    options={[
                        { label: 'All', value: 'all' },
                        { label: 'Africa', value: 'africa' },
                        { label: 'Americas', value: 'americas' },
                        { label: 'Asia', value: 'asia' },
                        { label: 'Europe', value: 'europe' },
                        { label: 'Oceania', value: 'oceania' },
                    ]}
                    value={filterQuery}
                    onChange={e => setFilterQuery(e.target.value)}
                />
            </div>
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
};

export default HomePage;