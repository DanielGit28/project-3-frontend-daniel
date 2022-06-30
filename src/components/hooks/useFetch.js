import { useEffect, useState } from "react";

const useFetch = (url,withAuth) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    
        useEffect(() => {
            const token = localStorage.getItem("JWT").replace(/^"(.+(?="$))"$/, '$1');
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            };
            setLoading(true);
            if(withAuth) {
            fetch(url,requestOptions)
                .then(response => response.json())
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
            } else {
                fetch(url)
                .then(response => response.json())
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
            }
        }, [url,withAuth]);
    
    return { data, error, loading };
};

export default useFetch;