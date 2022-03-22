import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Title = ({ name }) => <h2> {name} </h2>
const Flag = ({ flag_url,country_name }) => <img src={flag_url} alt={`${country_name} flag here`}></img>
const Country = ({ country }) => 
      <div> 
        <Text capital={country.capital[0]} area={country.area}  /> 
        <Languages languages={country.languages} /> 
        <Flag flag_url={country.flags.png} country_name={country.name.official} />
        <Wheather city={country.capital[0]} country={country.name.official} />
      </div>
const Languages = ({ languages }) => 
      <>
        <p> <b>Languages </b></p>
        <ul> {Object.keys(languages).map((key,index) =>
        <li> {languages[key]} </li> ) } </ul> 
      </>
const Text = ({ capital,area }) => { return( <> <ul> <li> capital: {capital} </li> 
                                        <li> area: {area} </li> </ul> </> ) } 
const CountryInfo = ({ country }) => {
    return(
      <div> <Title name={country.name.official} /> <Button country={country} />
            
      </div>
    )
}
const Button = ( { country } ) => {
  const [state, Setstate] = useState(false)
  const handleClick = () => Setstate(!state)
  return (
    <> 
      <button onClick={handleClick}> { !state? "Show Info" : "Hide Info" }  </button>
      { state ? <Country country={country} /> : null }
    </>
  )
}
const Countries = ({ countries,filterCountry  }) => {
    const listCountries = countries.filter( country => 
      country.name.official.toLowerCase().includes(filterCountry.toLowerCase()) ) 
    console.log(listCountries.length,"here")
    if (listCountries.length<11 )
      return(
        <div>
          {listCountries.map(country => <CountryInfo key={country.name.official} country={country} />)}
          
        </div>
      )
    return( <p>Please, be more specific. There are more than 
                10 countries that match this filter</p> ) 
}
const Wheather = ({ city,country }) => {
    const [weather, setWheater] = useState([])
    console.log('effect initialize')
    useEffect(() => {
      console.log('effect initialize')
      axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
          .then(response =>{ 
            setWheater(response.data)
          })
    }, [city]) 
    console.log(weather.name)
    if (weather.length === 0){
      return <></>
    }
    return (
    <>
      <p> <b> {`Weather in ${country}`} </b> </p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} ></img>
      <p> {`temperature ${weather.main.temp} Celcius`} </p>  
      <p> {`wind ${weather.wind.speed} m/s`} </p>
    </> 
    ) }
const App = () => {
  const [countries, setCountries] = useState([])
  const handleFilterCountry = (event) => { setFilterCountry(event.target.value) }
  const [filterCountry, setFilterCountry] = useState('')
  
  useEffect(() => {
    // console.log('effect')
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div>
      <div> country name: <input value={filterCountry} onChange={handleFilterCountry} /> </div>
      <Countries countries={countries} filterCountry={filterCountry} />
    </div>
  )
}

export default App