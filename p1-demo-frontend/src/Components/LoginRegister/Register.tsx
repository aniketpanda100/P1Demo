import axios from "axios"
import { useState } from "react"
//import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Register:React.FC = () => {

    //useNavigate hook to navigate between components programatically
    const navigate = useNavigate()
        
    //Defining a state object to store the user's login credentials
    const[registrationData, setRegistrationData] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:""
    }) //could have defined an interface for this, but we didn't
    
    //Function to store user inputs
    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {

        //I'm going to store the name and value of the inputs for ease of use below
        const name = event.target.name //name is an attribute we set on the input boxes
        const value = event.target.value //value is the actual value in the input at the time

        //"Take whatever input was changed, and set the matching state field to the value of that input"
        //[name] can be EITHER username or password. This ugly code lends flexibility. 
        //This syntax is less necessary if we just have 2 fields, but wayyyy more useful if there are like, 50
        setRegistrationData((registrationData) => ({...registrationData, [name]:value}))

    }

    //axios is a way to send HTTP requests from React
    const register = async () => {

        //check valid input 
        if (registrationData.firstName === null || registrationData.firstName.trim() === "") {
            alert("Invalid first name!")
            return
        }
        if (registrationData.lastName === null || registrationData.lastName.trim() === "") {
            alert("Invalid last name!")
            return
        }
        if (registrationData.username === null || registrationData.username.trim() === "") {
            alert("Invalid username!")
            return
        }
        if (registrationData.password === null || registrationData.password.trim() === "") {
            alert("Invalid password!")
            return
        }

        try{
            //POST request with hardcoded user info
            const response = await axios.post("http://localhost:8080/auth/register", registrationData)

            //if the catch doesn't run, registration was successful!
            //greet the user and navigate back to login page
            alert(response.data.username + " has registered! Welcome.")

            navigate("/")

        } catch(e) {
            if (e.status === 409) {
                alert("That username is taken!")
            }
            else{
                alert("Registration unsuccessful!")
            }
        }
    }

    const [createAccountHovered, setCreateAccountHovered] = useState(false)

    return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '32rem',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: '2.25rem',
                fontWeight: 'bold',
                marginBottom: '2rem'
              }}>Create a New Account</h1>
            </div>
    
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <input
                  type="text"
                  placeholder="firstName"
                  name="firstName"
                  onChange={storeValues}
                  maxLength={20}
                  style={{
                    width: '60%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
    
              <div style={{ 
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <input
                  type="text"
                  placeholder="lastName"
                  name="lastName"
                  onChange={storeValues}
                  maxLength={20}
                  style={{
                    width: '60%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
    
              <div style={{ 
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={storeValues}
                  maxLength={20}
                  style={{
                    width: '60%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
    
              <div style={{ 
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={storeValues}
                  maxLength={20}
                  style={{
                    width: '60%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>
    
            <div style={{ 
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button 
                onClick={register}
                onMouseEnter={() => setCreateAccountHovered(true)}
                onMouseLeave={() => setCreateAccountHovered(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  border: '2px solid #22c55e',
                  borderRadius: '0.375rem',
                  color: createAccountHovered ? 'white' : '#22c55e',
                  backgroundColor: createAccountHovered ? '#22c55e' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )

}