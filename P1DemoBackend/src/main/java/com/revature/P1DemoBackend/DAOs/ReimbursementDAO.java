package com.revature.P1DemoBackend.DAOs;

import com.revature.P1DemoBackend.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository //Make this Interface a bean
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer > {

    //Find a list of reimbursements by their User's id
    public List<Reimbursement> findByUser_UserId(int userId);

    public Reimbursement findByReimbId(int reimbId);

    //Why User_UserId?
    //We're digging into the User object in the Reimbursement object
    //...in order to access the primary key field of User (userId)

    //Find a list of reimbursements by status
    //public List<Reimbursement> findByStatus (String status);

}



