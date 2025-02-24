import axios from "axios";
import { useEffect, useRef, useState } from "react";
//import './login.css';
//import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store";

export const Login:React.FC = () => {

    //we can use the useNavigate hook to navigate between components programatically
        //(no more manual URL changing)
    const navigate = useNavigate()

    //Using the useRef and useEffect hooks to focus our username input box on component load
    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        //if the current value of the ref is truthy...
        if (usernameRef.current) {
            usernameRef.current.focus(); //focus it so the user can type right away
        }
    }, []); //remember [] means this happens on component load


    //Defining a state object to store the user's login credentials
    const[loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    }) //could have defined an interface for this, but we didn't


    //Function to store use inputs
    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {

        //I'm going to store the name and value of the inputs for ease of use below
        const name = event.target.name //name is an attribute we set on the input boxes
        const value = event.target.value //value is the actual value in the input at the time

        //"Take whatever input was changed, and set the matching state field to the value of that input"
        //[name] can be EITHER username or password. This ugly code lends flexibility. 
        //This syntax is less necessary if we just have 2 fields, but wayyyy more useful if there are like, 50
        setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))

    }


    //Function to make the actual login request
    //navigates to /users if a manager logged in, and /reimbursements if a user logged in
    const login = async () => {

        //make sure the username/password are present before proceeding
        if (loginCreds.username === null || loginCreds.username.trim() === "") {
            alert("Invalid username!")
            return
        }
        if (loginCreds.password === null || loginCreds.password.trim() === "") {
            alert("Invalid password!")
            return
        }

        try{

            const response = await axios.post("http://localhost:8080/auth/login", loginCreds, {withCredentials:true})
            //withCredentials lets us interact with sessions on the backend
            //every request that depends on the user being logged in, being manager, etc, needs this

            //if the catch doesn't run, login was successful! save the data to our global store, then switch components
            console.log(response.data)
            store.loggedInUser = response.data //this is our logged in user data from the backend

            //greet the user with this newly stored data
            alert(store.loggedInUser.username + " has logged in! Welcome.")

            //users will get sent to users component if they're an "manager", or the reimbursement component if they're a "user"
            if(store.loggedInUser.role === "manager"){
                navigate("/users")
            } else {
                navigate("/reimbursements")
            }

        } catch {
            alert("Login unsuccessful.")
        }
    }

    const [loginHovered, setLoginHovered] = useState(false);
    const [registerHovered, setRegisterHovered] = useState(false);

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
                marginBottom: '1.5rem'
              }}>Welcome</h1>
              <h3 style={{ 
                fontSize: '1.5rem',
                marginBottom: '2rem'
              }}>Please Log In:</h3>
            </div>
    
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  ref={usernameRef}
                  onChange={storeValues}
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
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={storeValues}
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
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <button 
                onClick={login}
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  border: '2px solid #22c55e',
                  borderRadius: '0.375rem',
                  color: loginHovered ? 'white' : '#22c55e',
                  backgroundColor: loginHovered ? '#22c55e' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Login
              </button>
              <button 
                onClick={() => navigate("/register")}
                onMouseEnter={() => setRegisterHovered(true)}
                onMouseLeave={() => setRegisterHovered(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  border: '2px solid #374151',
                  borderRadius: '0.375rem',
                  color: registerHovered ? 'white' : '#374151',
                  backgroundColor: registerHovered ? '#374151' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )
}