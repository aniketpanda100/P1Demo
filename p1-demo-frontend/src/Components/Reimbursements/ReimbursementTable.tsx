import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import { Reimbursement } from "../../Interfaces/Reimbursement"
import { store } from "../../GlobalData/store";
import { useNavigate } from "react-router-dom";
import { CreateReimbursement } from "./CreateReimbursement";

export const ReimbursementTable:React.FC = () => {

    //useNavigate hook to navigate between components programatically
    const navigate = useNavigate()

    //state to filter which records are showing by status
    const [statusFilter, setStatusFilter] = useState<string[]>(["PENDING", "APPROVED", "DENIED"])

    //state object to store the User Array from the backend
    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])

    //controls the modal for creating a new record
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const propCreateReimbursement = () => {
        setShow(false) 
        getReimbursements() 
    }

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
            setReimbursements(response.data) 
        } catch {
            alert("Something went wrong trying to fetch reimbursements")
        }
    }

    //handler for status filter menu
    const filterByStatus = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value === "All" ? ["PENDING", "APPROVED", "DENIED"] : [event.target.value])
    }

    //handler for status menu
    const updateStatus = async (event:React.ChangeEvent<HTMLSelectElement>) => {
        const reim:Reimbursement | undefined = reimbursements.find(r => r.reimbId === Number(event.target.id))

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
            <div style={{padding: 12, background: "black", display: "flex", gap: 12}}>
                {<Button onClick={()=>{store.loggedInUser.role = ""; navigate("/");}}>Logout</Button>}
                {store.loggedInUser.role === "manager" ?
                        <Button onClick={()=>navigate("/users")}>Users</Button> : null
                }
                {<Button onClick={handleShow}>Add Reimbursement</Button>}
                <select onChange={filterByStatus}
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
                        <option value="All">All</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="DENIED">DENIED</option>
                </select>
            </div>
            <Container className="d-flex flex-column align-items-center mt-3">
                
                <h3>Reimbursements: </h3>

                <Table className="table-hover table-striped w-50">
                    <thead className="table-dark">
                        <tr>
                            <th>Reimbursement ID</th>
                            <th>Description</th>
                            <th>Amount ($)</th>
                            <th>Status</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody className="table-primary">
                        {reimbursements.map((reimbursement:Reimbursement) => {
                            if (statusFilter.includes(reimbursement.status )) return (
                                <tr key={reimbursement.reimbId}>
                                    <td>{reimbursement.reimbId}</td>
                                    <td>{reimbursement.description}</td>
                                    <td>{reimbursement.amount}</td>
                                    <td className={statusColors[reimbursement.status]}>
                                        {store.loggedInUser.role === "manager" ?
                                        <select name="status" id={String(reimbursement.reimbId)}
                                        value={reimbursement.status} onChange={updateStatus}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #e5e7eb',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            outline: 'none'
                                        }}>
                                            <option value="PENDING">PENDING</option>
                                            <option value="APPROVED">APPROVED</option>
                                            <option value="DENIED">DENIED</option>
                                        </select>
                                        :reimbursement.status}
                                    </td>
                                    <td>{reimbursement.userId}</td>
                                </tr> 
                            )
                        })} 
                    {/* WHY parenthesis to open the arrow func? because it implicitly returns */}
                    </tbody>
                </Table>
            </Container>
        
            <Modal show={show} onHide={handleClose}>
                <CreateReimbursement propCreateReimbursement={propCreateReimbursement}></CreateReimbursement>
            </Modal>
        </>
    )

}