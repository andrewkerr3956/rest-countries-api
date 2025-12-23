import { Suspense, use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function CountryDetails({ code }: { code: string }) {
    const handleFetchDetails = async (code: string) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(resp => resp.json());
    }

    const data = use(handleFetchDetails(code));

    return (
        <div>
            <h1 style={{ color: 'white' }}>{data?.[0]?.name?.official}</h1>
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