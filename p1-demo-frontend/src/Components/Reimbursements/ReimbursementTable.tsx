import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { Reimbursement } from "../../Interfaces/Reimbursement"
import { store } from "../../GlobalData/store";
import { useNavigate } from "react-router-dom";

export const ReimbursementTable:React.FC = () => {

    //useNavigate hook to navigate between components programatically
    const navigate = useNavigate()

    const [pendingFlag, setPendingFlag] = useState<boolean>(false)

    //state object to store the User Array from the backend
    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])

    //useEffect - we'll call a GET request for all users when the component loads
    useEffect(() => {
        //make sure the user is logged in, redirect them to login if not
        if(store.loggedInUser.role === ""){
            navigate("/")
        }
        else {
            getReimbursements()
        }

    }, []) //we want this to run once on load, so we use []


    //Function to get all users from the backend (HTTP request!)
    const getReimbursements = async () => {

        try{
            console.log(store.loggedInUser)
            let path = ""
            if(store.loggedInUser.role === "manager") {
                path = "http://localhost:8080/reimbursements"
            }
            else {
                path = "http://localhost:8080/reimbursements/" + store.loggedInUser.userId
            }
            console.log(path)

            const response = await axios.get(path, {withCredentials:true})
            //Again, we need withCredentials if the request requires specific session info 
            // (existence of a session, role stored in the session, etc)

            //TODO: error throwing code

            console.log(response.data) //print out the data just to see it

            //let filteredObjects = objects.filter(obj => obj.value === 10);
            //reimbursements.filter(r => r.status === "PENDING")

            //store the user data in our "users" state object
            setReimbursements(pendingFlag ? 
                response.data.filter((r:Reimbursement) => r.status == "PENDING") : response.data) 
        } catch {
            alert("Something went wrong trying to fetch reimbursements")
        }
    }

    //function that does a fake update delete (wanna show how to extract data from a map)
    const updateReimbursement = (reimbursement:Reimbursement) => {
        alert("User " + reimbursement.reimbId + " has been fake updated or deleted")

        //TODO: Could definitely make another call to getReimbursements for automatic updates
        //TODO2: Cache the list of users and update THAT so we don't make a repeat DB call
    }

    //handler for pending button
    const togglePending = () => {
        setPendingFlag(!pendingFlag)
        getReimbursements()
    }

    //handler for status menu
    const updateStatus = async (event:React.ChangeEvent<HTMLInputElement>) => {
        const reim:Reimbursement | undefined = reimbursements.find(r => r.reimbId === Number(event.target.id))
        //console.log(reim)
        if (reim === undefined) return;
        reim.status = event.target.value

        try{
            //PATCH request
            const response = await axios.patch("http://localhost:8080/reimbursements", reim, {withCredentials:true})

            //if the catch doesn't run, update was successful!
            alert("Reimbursement status successfully updated!")
            navigate("/reimbursements")

        } catch {
            alert("Reimbursement status update unsuccessful")
        }
    }

    const statusColors: { [key: string]: string } = {
        "PENDING": "table-warning",
        "APPROVED": "table-success",
        "DENIED": "table-danger"
    }

    return(
        <>
            <Container className="d-flex flex-column align-items-center mt-3">
                <Button variant="outline-dark" onClick={()=>navigate("/create-reimbursement")}>Add Reimbursement</Button>
                <Button variant="outline-dark" onClick={togglePending}>Toggle Pending</Button>
            </Container>
            <Container className="d-flex flex-column align-items-center mt-3">
                
                <h3>Reimbursements: </h3>

                <Table className="table-dark table-hover  table-striped w-50">
                    <thead>
                        <tr>
                            <th>Reimbursement ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody className="table-secondary">
                        {reimbursements.map((reimbursement:Reimbursement) => (
                            <tr key={reimbursement.reimbId}>
                                <td>{reimbursement.reimbId}</td>
                                <td>{reimbursement.description}</td>
                                <td>{reimbursement.amount}</td>
                                <td className={statusColors[reimbursement.status]}>
                                    {store.loggedInUser.role === "manager" ?
                                    <select name="status" id={String(reimbursement.reimbId)}
                                     value={reimbursement.status} onChange={updateStatus}>
                                        <option value="PENDING">PENDING</option>
                                        <option value="APPROVED">APPROVED</option>
                                        <option value="DENIED">DENIED</option>
                                    </select>
                                    :reimbursement.status}
                                </td>
                                <td>{reimbursement.userId}</td>
                            </tr>
                        ))} 
                    {/* WHY parenthesis to open the arrow func? because it implicitly returns */}
                    </tbody>
                </Table>

            </Container>
        </>
    )

}