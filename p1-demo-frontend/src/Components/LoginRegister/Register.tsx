import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
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

        try{
            //POST request with hardcoded user info
            const response = await axios.post("http://localhost:8080/auth/register", registrationData)

            //if the catch doesn't run, registration was successful!
            //greet the user and navigate back to login page
            alert(response.data.username + " has registered! Welcome.")
            navigate("/")

        } catch {
            alert("Registration unsuccessful")
        }
    }

    return(
        <Container>
          <div>
              <h1>New here? Create an Account for free!</h1>

              <div>
                  <Form.Control
                      type="text"
                      placeholder="firstName"
                      name="firstName"
                      onChange={storeValues}
                  />
              </div>
              <div>
                  <Form.Control
                      type="text"
                      placeholder="lastName"
                      name="lastName"
                      onChange={storeValues}
                  />
              </div>
              <div>
                  <Form.Control
                      type="text"
                      placeholder="username"
                      name="username"
                      onChange={storeValues}
                  />
              </div>
              <div>
                  <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      onChange={storeValues}
                  />
              </div>

              <div>
                <Button onClick={register}>Create Account!</Button>
              </div>
          </div>
      </Container>
  )

}