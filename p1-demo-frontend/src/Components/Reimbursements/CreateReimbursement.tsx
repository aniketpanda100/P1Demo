import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { store } from "../../GlobalData/store";
import { useNavigate } from "react-router-dom"

interface CreateReimbursementProps {
    propCreateReimbursement: () => void;  // define the type as a function
}

export const CreateReimbursement:React.FC<CreateReimbursementProps> = ({propCreateReimbursement}) => {

    //useNavigate hook to navigate between components programatically
    const navigate = useNavigate()
        
    //Defining a state object to store the data
    const[reimbursementData, setReimbursementData] = useState({
        description:"",
        amount:0,
        status:"PENDING",
        userId: store.loggedInUser.userId
    }) //could have defined an interface for this, but we didn't

    /*
    //useEffect to check user logged in on load 
     useEffect(() => {
        if(store.loggedInUser.role === ""){
            navigate("/")
        }
    }, [])
    */
    
    //Function to store user inputs
    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {

        //I'm going to store the name and value of the inputs for ease of use below
        const name = event.target.name //name is an attribute we set on the input boxes
        const value = event.target.value //value is the actual value in the input at the time

        //"Take whatever input was changed, and set the matching state field to the value of that input"
        //[name] can be EITHER amount or status. This ugly code lends flexibility. 
        //This syntax is less necessary if we just have 2 fields, but wayyyy more useful if there are like, 50
        setReimbursementData((reimbursementData) => ({...reimbursementData, [name]:value}))

    }

    //axios is a way to send HTTP requests from React
    const createReimbursement = async () => {

        if (reimbursementData.description === null || reimbursementData.description.trim() === "") {
            alert("Invalid description!")
            return
        }
        if (reimbursementData.amount < 1) {
            alert("Invalid amount!")
            return
        }

        try{
            //POST request
            const response = await axios.post("http://localhost:8080/reimbursements", reimbursementData, {withCredentials:true})

            //if the catch doesn't run, creation was successful!
            //greet the user and navigate back to reimbursement table page
            alert("New reimbursement successfully created!")

        } catch {
            alert("Reimbursement creation unsuccessful")
        }
        finally {
            propCreateReimbursement()
        }
    }

    return(
        <>
            <div style={{padding: 12, display: "grid", rowGap: 6, backgroundColor: '#f8f9fa', borderRadius: 10}}>
                <h1>Create Reimbursement</h1>
                <hr></hr>
                <div style={{ width: `${50}%` }}>
                    <Form.Control
                        type="text"
                        placeholder="description"
                        name="description"
                        onChange={storeValues}
                    />
                </div>
                <div  style={{ width: `${25}%` }}>
                    <Form.Control
                        type="number"
                        placeholder="amount"
                        name="amount"
                        onChange={storeValues}
                        min={0}
                    />
                </div>
                <hr></hr>
                <div>
                    <Button onClick={() => {createReimbursement()}}>Create Reimbursement</Button>
                </div>
            </div>
      </>
  )

}