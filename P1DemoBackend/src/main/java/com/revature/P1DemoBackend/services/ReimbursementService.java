package com.revature.P1DemoBackend.services;

import com.revature.P1DemoBackend.DAOs.UserDAO;
import com.revature.P1DemoBackend.DAOs.ReimbursementDAO;
import com.revature.P1DemoBackend.models.DTOs.IncomingReimbursementDTO;
import com.revature.P1DemoBackend.models.DTOs.OutgoingReimbursementDTO;
import com.revature.P1DemoBackend.models.User;
import com.revature.P1DemoBackend.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    //Autowire the UserDAO and ReimbursementDAO
    private final UserDAO userDAO;
    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public ReimbursementService(UserDAO userDAO, ReimbursementDAO reimbursementDAO) {
        this.userDAO = userDAO;
        this.reimbursementDAO = reimbursementDAO;
    }


    //Insert a new reimbursement into DB (get user by ID and make a reimbursement object with it)
    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO){

        //TODO: input validation

        //Skeleton Reimbursement object first
        //0 for id since the DB will handle that
        //null for the User since we need to get it first
        Reimbursement newReimbursement = new Reimbursement(
                0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                reimbursementDTO.getStatus(),
                null
        );

        //We need to use the userId from the DTO to get a User from the DB
        //findById() returns an Optional
        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());

        //if the user doesn't exist it will be empty. Let's check for that
        if(user.isEmpty()){
            //TODO: throw an exception
        } else {
            //If the user exists, we can set it in the reimbursement object
            newReimbursement.setUser(user.get());
            //get() is how we extract data from an optional
        }

        //save the new reimbursement to the DB, and return it to the controller
        return reimbursementDAO.save(newReimbursement);
    }

    //Get all reimbursements from the DB
    public List<OutgoingReimbursementDTO> getAllReimbursements(){

        //For get all, we don't have to do much user input validation
        //There's no user input! We just want to get all the data
        List<Reimbursement> returnedReimbursements = reimbursementDAO.findAll();

        //convert the reimbursements into a List of OutgoingReimbursementDTOs
        //we're gonna use our special "Reimbursement args" constructor from the DTO
        List<OutgoingReimbursementDTO>reimbursementDTOs = new ArrayList<>();

        //loop through the reimbursements , convert them, and add to DTO list
        for(Reimbursement r: returnedReimbursements){
            reimbursementDTOs.add(new OutgoingReimbursementDTO(r));
        }

        return reimbursementDTOs;
    }

    //Get all reimbursements from the DB
    public List<OutgoingReimbursementDTO> getReimbursementsByUser(int userId){

        //For get all, we don't have to do much user input validation
        //There's no user input! We just want to get all the data
        List<Reimbursement> returnedReimbursements = reimbursementDAO.findByUser_UserId(userId);

        //convert the reimbursements into a List of OutgoingReimbursementDTOs
        //we're gonna use our special "Reimbursement args" constructor from the DTO
        List<OutgoingReimbursementDTO>reimbursementDTOs = new ArrayList<>();

        //loop through the reimbursements , convert them, and add to DTO list
        for(Reimbursement r: returnedReimbursements){
            reimbursementDTOs.add(new OutgoingReimbursementDTO(r));
        }

        return reimbursementDTOs;
    }

    public OutgoingReimbursementDTO updateReimbursementStatus(int reimbId, String status) {
        Reimbursement reimbursement = reimbursementDAO.findByReimbId(reimbId);
        reimbursement.setStatus(status);
        return new OutgoingReimbursementDTO(reimbursementDAO.save(reimbursement));
    }

}