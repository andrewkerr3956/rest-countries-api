import { Suspense, use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const handleFetchDetails = async (code: string) => {
    const data = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    return data?.json();
}

function CountryDetails({ code }: { code: string }) {
    const data = use(handleFetchDetails(code));

    return (
        <div>
            <picture>
                <img alt="Country Flag" src={data?.[0]?.flags?.png} />
            </picture>
            <h1 style={{ color: 'white' }}>{data?.[0]?.name?.common}</h1>
            <p>Native Name: {data?.[0]?.name?.nativeName?.[code?.toLowerCase()]?.official}</p>
            <p>Population: {data?.[0]?.population}</p>
            <p>Region: {data?.[0]?.region}</p>
            <p>Sub Region: {data?.[0]?.subregion}</p>
            <p>Capital: {data?.[0]?.capital}</p>
            <p>Top Level Domain: {data?.[0]?.tld?.[0]}</p>
            <p>Currencies: {Object.keys(data?.[0]?.currencies)?.[0]}</p>
            <p>Languages: {Object.values(data?.[0]?.languages)?.map((v) => <span style={{ textTransform: 'capitalize' }}>{v}</span>)}</p>
        </div>
    )
}


export default function CountryDetailsPage() {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <div>
            <button onClick={() => navigate('/')}>Back</button>
            <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <CountryDetails code={params?.countryCode ?? ''} />
            </Suspense>
        </div>
    )
}