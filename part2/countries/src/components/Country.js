import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Country = ({ country }) => {
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital[0]
        }

        axios.get('http://api.weatherstack.com/current', { params })
            .then(response => {
                const { data } = response;
                setWeather(data);
                setLoading(false);
            })
    }, [country.capital]);


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                <strong>Capital: </strong>{country.capital}
            </p>
            <p>
                <strong>Region: </strong>{country.region}
            </p>
            {/* <h2>Languages</h2>
            <ul>
                {country.languages.map((language, i) =>
                    <li key={i}>{language.name}</li>
                )}
            </ul> */}
            <h2>Flag</h2>
            <p>
                <img src={country.flags[0]}
                    alt="flag"
                    style={{ width: 200, height: 200 }}
                />
            </p>
            {weather.current && !loading ?
                <div>
                    <h2>Weather in {country.name.common}</h2>
                    <p>
                        <strong>Temperature: </strong>{weather.current.temperature}
                    </p>
                    <img src={weather.current.weather_icons[0]} alt="Weather icon" />
                    <p>
                        <strong>Wind: </strong>{weather.current.wind_speed} direccion {weather.current.wind_dir}
                    </p>
                </div>
                :
                "Loading Weather..."
            }
        </div>


    )
}

export default Country;