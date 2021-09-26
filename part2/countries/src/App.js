import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Content from './components/Content';
import axios from 'axios';

function App() {
  const [searchCountry, setSearchCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get('https://restcountries.com/v3/all')
      .then(response => {
        const { data } = response;
        setCountries(data);
        setLoading(false);
      })
      .catch(error => {
        setErrorMsg('API DOESN\'T WORK, CHECK THE API CALL');
      })
  }, []);

  const handleOnChange = event => {
    setSearchCountry(event.target.value);
    if (searchCountry) {
      const countriesFiltered = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
      setCountriesFiltered(countriesFiltered);
    }
  };

  return (
    <div>
      {loading && !errorMsg ? "Loading..." : ""}
      <Filter value={searchCountry} onChange={handleOnChange} errMsg={errorMsg} />
      <Content countries={countriesFiltered} setCountriesFiltered={setCountriesFiltered} />
    </div>
  );
}

export default App;
