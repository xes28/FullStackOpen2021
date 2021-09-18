import Country from "./Country"

const Content = ({ countries, setCountriesFiltered }) => {

    if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    } else if (countries.length >= 2 && countries.length <= 10) {
        return (
            <div>
                <ul>
                    {countries.map((country) =>
                        // Al clicar en el botón seteamos el país en el que se clica para mostrar directamente su información
                        // ya que se vuelve a renderizar el componente y el tamaño es 1 por lo que accede directamente al componente Country
                        <li key={country.name}>{country.name} <button onClick={() => setCountriesFiltered([country])}>Show</button></li>
                    )}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}

export default Content;