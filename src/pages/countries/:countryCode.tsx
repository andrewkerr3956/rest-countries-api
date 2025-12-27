import { Suspense, use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ThemeContext from "../../contexts/ThemeContext";

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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', rowGap: 40, marginBlock: '2%' }}>
            <button style={{ textAlign: 'left', width: 'max-content' }} onClick={() => navigate('/')}>Back</button>
            {!!data ? (
                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '5%' }}>
                    <picture style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <img alt="Country Flag" src={data?.[0]?.flags?.png} style={{ height: 500 }} />
                    </picture>
                    <div style={{ flex: 1 }}>
                        <h1 className="countryDetailTitle">{data?.[0]?.name?.common}</h1>
                        <div style={{ display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(2, 50%)', gridAutoFlow: 'column' }}>
                            <p className="countryDetailItem"><span className="countryDetailLabel">Native Name:</span> {data?.[0]?.name?.nativeName?.[params?.countryCode?.toLowerCase()]?.official}</p>
                            <p className="countryDetailItem"><span className="countryDetailLabel">Population:</span> {data?.[0]?.population}</p>
                            <p className="countryDetailItem"><span className="countryDetailLabel">Region:</span> {data?.[0]?.region}</p>
                            <p className="countryDetailItem"><span className="countryDetailLabel">Sub Region:</span> {data?.[0]?.subregion}</p>
                            <p className="countryDetailItem"><span className="countryDetailLabel">Capital:</span> {data?.[0]?.capital}</p>
                            <p className="countryDetailItem"><span className="countryDetailLabel">Top Level Domain:</span> {data?.[0]?.tld?.[0]}</p>
                            {/* <p>Currencies: {!!Object.keys(data?.[0]?.currencies) ? Object.keys(data?.[0]?.currencies)?.[0] : null}</p> */}
                            <p className="countryDetailItem"><span className="countryDetailLabel">Languages:</span> {Object.values(data?.[0]?.languages)?.map((v) => <span style={{ textTransform: 'capitalize' }}>{v}</span>)}</p>
                        </div>
                        <p className="countryDetailItem" style={{ marginTop: '5%' }}><span className="countryDetailLabel">Border Countries:</span> {data?.[0]?.borderCountries ? data?.[0]?.borderCountries?.map((b) => <span>{b?.name?.common}</span>) : <span>N/A</span>}</p>
                    </div>
                </div>
            ) : <p>Loading...</p>}
        </div>
    )
};

export default CountryDetailsPage;