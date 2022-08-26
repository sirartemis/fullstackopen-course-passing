import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filter, setFilter}) => {

  return (
    <>
      find countries
      <input value={filter} onChange={event => setFilter(event.target.value)} />
    </>
  )

}

const Languages = ({languages}) => {

  return (
    <>
      <strong>languages:</strong>
      <ul>
        {Object.values(languages).map(language => <li key={language}>{language}</li>)}
      </ul>
    </>
  )

}

const CountriesList = ({countries, setShowInfo, setFilter})  => {

  return (
    <ul>
      {countries.map(country => {

        const name = country.name.common

        return (
          <li key={name}>
          {name}
          <button onClick={() => {
            setShowInfo(...countries.filter(country => country.name.common === name))
            setFilter('')
          }}>
            show
          </button>
        </li>
        )
      }
      )}
    </ul>
  )

}

const CountryInfo = ({country}) => {

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={country.name.common} />
      <Weather city={country.capital[0]} />
    </div>
  )

}

const Weather = ({city}) => {

  const [weather, setWeather] = useState(null)

  const api_key = process.env.REACT_APP_WEATHER_API_KEY

  const convertFromKelvinToCelcius = temp => temp -273.15

  const round = number =>  Math.floor(number * 100) / 100

  useEffect(() => {

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => setWeather(response.data))
  }, [api_key, city])

  return (
    (weather && (
<>
      <h3>Weather in {city}</h3>
      <p>temperature {round(convertFromKelvinToCelcius(weather.main.temp))} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={city} />
      <p>wind {weather.wind.speed} m/s</p>
    </>

    ))  )
}

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showInfo, setShowInfo] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])
  
  const regex = new RegExp(filter, 'i')

  const findedCountries = filter ? countries.filter(country => regex.exec(country.name.common)) : []

  const showCountryInfo = filter.length === 0 && showInfo

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {findedCountries.length > 10 && 'Too many matches, specify another filter'}
      {findedCountries.length <= 10 && findedCountries.length > 1 && <CountriesList countries={findedCountries} setShowInfo={setShowInfo} setFilter={setFilter} />}
      {findedCountries.length === 1 && <CountryInfo country={findedCountries[0]} />}
      {showCountryInfo && <CountryInfo country={showInfo} />}
    </div>
  )
}

export default App