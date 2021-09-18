import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Content from './components/Content';
import axios from 'axios';

function App() {
  const [searchCountry, setSearchCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const { data } = response;
        setCountries(data);
        setLoading(false);
      })
  }, []);

  const handleOnChange = event => {
    setSearchCountry(event.target.value);
    if (searchCountry) {
      const countriesFiltered = countries.filter((country) => country.name.toLowerCase().includes(searchCountry.toLowerCase()));
      setCountriesFiltered(countriesFiltered);
    }
  };

  return (
    <div>
      {loading ? "Loading..." : ""}
      <Filter value={searchCountry} onChange={handleOnChange} />
      <Content countries={countriesFiltered} setCountriesFiltered={setCountriesFiltered} />
    </div>
  );
}

export default App;
