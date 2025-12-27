import { Suspense, use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

async function handleFetchDetails(code: string) {
    const data = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const json = await data?.json();
    // Get border countries
    if (!!json?.[0]?.borders?.length) {
        const borders = await fetch(`https://restcountries.com/v3.1/alpha?codes=${json?.[0]?.borders?.map((b) => b?.toLowerCase())}`)
        json[0].borderCountries = await borders.json();
    }
    return json;
};


const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const getData = await handleFetchDetails(params?.countryCode || '');
            console.log(getData)
            setData(getData);
        })()
    }, []);

    return (
        <div>
            <button onClick={() => navigate('/')}>Back</button>
            {!!data ? (
                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '5%' }}>
                    <picture style={{ flex: 1 }}>
                        <img alt="Country Flag" src={data?.[0]?.flags?.png} />
                    </picture>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ color: 'white' }}>{data?.[0]?.name?.common}</h1>
                        <div>
                            <p>Native Name: {data?.[0]?.name?.nativeName?.[params?.countryCode?.toLowerCase()]?.official}</p>
                            <p>Population: {data?.[0]?.population}</p>
                            <p>Region: {data?.[0]?.region}</p>
                            <p>Sub Region: {data?.[0]?.subregion}</p>
                            <p>Capital: {data?.[0]?.capital}</p>
                            <p>Top Level Domain: {data?.[0]?.tld?.[0]}</p>
                            {/* <p>Currencies: {!!Object.keys(data?.[0]?.currencies) ? Object.keys(data?.[0]?.currencies)?.[0] : null}</p> */}
                            <p>Languages: {Object.values(data?.[0]?.languages)?.map((v) => <span style={{ textTransform: 'capitalize' }}>{v}</span>)}</p>
                        </div>
                        <p>Border Countries: {data?.[0]?.borderCountries ? data?.[0]?.borderCountries?.map((b) => <span>{b?.name?.common}</span>) : <span>N/A</span>}</p>
                    </div>
                </div>
            ) : <p>Loading...</p>}
        </div>
    )
};

export default CountryDetailsPage;