import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { User } from "../../Interfaces/User"
import { store } from "../../GlobalData/store";
import { useNavigate } from "react-router-dom";

export const UserTable:React.FC = () => {

    //state object to store the User Array from the backend
    const [users, setUsers] = useState<User[]>([])

    //useNavigate hook to navigate between components programatically
    const navigate = useNavigate()

    //useEffect - we'll call a GET request for all users when the component loads
    useEffect(() => {
        //make sure the user is a manager, redirect them to login if not
        if(!(store.loggedInUser.role === "manager")){
            navigate("/")
        }
        else {
            getAllUsers()
        }

    }, []) //we want this to run once on load, so we use []


    //Function to get all users from the backend (HTTP request!)
    const getAllUsers = async () => {

        try{
            const response = await axios.get("http://localhost:8080/users", {withCredentials:true})

            //Again, we need withCredentials if the request requires specific session info (existence of a session, role stored in the session, etc)

            //TODO: error throwing code

            console.log(response.data) //print out the data just to see it

            //store the user data in our "users" state object 
            setUsers(response.data) 

        } catch {
            alert("Something went wrong trying to fetch users")
        }
    }


    //handler for status menu
    const userAction = async (event:React.ChangeEvent<HTMLSelectElement>) => {

        if (event.target.value === "DELETE") {
            try{
                //DELETE request
                const response = await axios.delete("http://localhost:8080/users/" + event.target.id, {withCredentials:true})

                //if the catch doesn't run, update was successful!
                alert("User deleted!")
            } catch{
                alert("Delete unsuccessful")
            }
        }
        else { 
            try{
                //PATCH request
                const response = await axios.patch("http://localhost:8080/users/" + event.target.id, null, {withCredentials:true})

                //if the catch doesn't run, update was successful!
                alert("Promotion successful!")
            } catch {
                alert("Promotion unsuccessful")
            }
        }
        getAllUsers()
    }


    return(
        <>
            <div style={{padding: 12, background: "black", display: "flex", gap: 12}}>
                {<Button onClick={()=>{store.loggedInUser.role = ""; navigate("/");}}>Logout</Button>}
                {store.loggedInUser.role === "manager" ?
                    <Button onClick={()=>navigate("/reimbursements")}>Reimbursements</Button> : null
                }
            </div>
            <Container className="d-flex flex-column align-items-center mt-3">
                
                <h3>Users: </h3>

                <Table className="table-hover table-striped w-50">
                    <thead className="table-dark">
                        <tr>
                            <th>User Id</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-primary">
                        {users.map((user:User) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.firstName + " " + user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>
                                    <select id={String(user.userId)} onChange={userAction}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #e5e7eb',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="" selected disabled>Choose an action</option>
                                        <option value="PROMOTE">PROMOTE</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </td>
                            </tr>
                        ))} 
                    {/* WHY parenthesis to open the arrow func? because it implicitly returns */}
                    </tbody>
                </Table>

            </Container>
        </>
    )

}