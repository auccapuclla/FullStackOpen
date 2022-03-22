import { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const Title = ( {title} ) => <h2> {title} </h2>
const MainTitle = ( {title} ) => <h1> {title} </h1>
const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  }
  console.log(message.status)
  return (
    <div className={message.status} >
      {message.text}
    </div>
  )
}
const DeleteButton = ({ id,persons,setPersons,name,setMessage }) => {
  const handleDelete = () => {
    const result = window.confirm(`Please, confirm if you want to delete ${name}`)
    if (result){
    const person = persons.filter( (person) => person.id !== id )
    personService.deletePerson(id)
                              .then( () => {
                                            setPersons(person)
                                            setMessage({text: `Deleted ${name}`,status: 'success'})
                                            setTimeout(() => {
                                            setMessage({text: null})
                                            }, 2000)
                                            } )
                              .catch( error => {
                                      setMessage({text: `${name} was already removed`,status: 'error'})
                                      setTimeout( () => {
                                                setMessage({text: null})
                                                }, 3000)
                                      setPersons(persons.filter(person => person.id !== id))
                              } )                              
    }
  }
  return (
    <button onClick={handleDelete}> delete</button>
  )
}
const Persons = ({ persons,setPersons,setMessage }) =>
      <> {persons.map( (person) => <Person key={person.id} person={person} setPersons={setPersons} 
                                          persons={persons} setMessage={setMessage}/> )} </>

const Person = ({ person,setPersons,persons,setMessage }) => <p> {person.name} {person.number} 
                        <DeleteButton id={person.id} setPersons={setPersons} name={person.name} 
                                      persons={persons} setMessage={setMessage} /> </p>

const PersonForm = ({ persons,setPersons,setMessage }) => 
      {
        const comparison = (persons, personObject) => {
          for (const person of persons){
            if (JSON.stringify(person.name) === JSON.stringify(personObject)){
              id = person.id
              return true
            }
          }
          return false
        }
        let id
        const updateNumber = (id,personObject) => {
              console.log("updated on process")
              personService
                .update(id, personObject).then( returnedPerson => {
                  setPersons( persons.map( person => person.id !== id ? person : returnedPerson ) )
                  setMessage({text: `Updated ${newName}`, status: 'success'})
                  setTimeout( () => {
                                    setMessage({text: null})
                                    }, 2000 )
                } )
        }
        const [newName, setNewName] = useState('')
        const [newNumber, setNewNumber] = useState('')
        const handlePersonChange = (event) => { setNewName(event.target.value) }
        const handleNumberChange = (event) => { setNewNumber(event.target.value) }
        const addPerson = (event) => { 
          event.preventDefault()
          const personObject = { 
                                name: newName,
                                number: newNumber                                
                              }
          if ( comparison(persons, personObject.name) ){
            if (window.confirm(`${personObject.name} is already added to phonebook, do you want to update number`)){
              updateNumber(id,personObject)
            }
          }
          else{      
            personService
              .create(personObject)
              .then(resPerson => {
                setPersons(persons.concat(resPerson))
                setMessage({text: `Added ${personObject.name}`, status: 'success'})
                setTimeout( () => {
                                  setMessage({text: null})
                                  }, 2000)
              })
            setNewName('')
            setNewNumber('')
          }
        }
        return ( <>
          <form onSubmit={addPerson}>
          <div> name: <input value={newName} onChange={handlePersonChange} /> </div>
          <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
          <div> <button type="submit">add</button> </div>        
          </form>
        </> )
      }

const Filter = ({ persons }) => {
  const handleFilterName = (event) => { setFilterName(event.target.value) }
  const [filterName, setFilterName] = useState('')
  return (
    <>
      <form>
      <div> name: <input value={filterName} onChange={handleFilterName} /> </div>
      { filterName==='' ? null : 
      persons.map( (person) => (person.name.toLowerCase()).includes(filterName.toLowerCase()) ? 
      <Person key={person.id} person={person} /> : null  ) }
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState({ text:null })
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  return (
    <div>
      <MainTitle title={"Phonebook"} />
      <Notification message={message}/>
      <Filter persons={persons} />
      <Title title={"add a new"} />
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />  
      <Title title={"Numbers"} />
      <Persons persons={persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default App