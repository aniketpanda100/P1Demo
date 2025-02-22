package com.revature.P1DemoBackend.controllers;


import com.revature.P1DemoBackend.models.DTOs.IncomingReimbursementDTO;
import com.revature.P1DemoBackend.models.DTOs.OutgoingReimbursementDTO;
import com.revature.P1DemoBackend.models.DTOs.OutgoingUserDTO;
import com.revature.P1DemoBackend.models.Reimbursement;
import com.revature.P1DemoBackend.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true") //allows HTTP requests from anywhere
public class ReimbursementController {

    //autowire the service
    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    //A method that inserts a new reimbursement into the DB
    @PostMapping
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody IncomingReimbursementDTO reimbursementDTO){

        //send the DTO to the service and return the reimbursement object that comes back
        return ResponseEntity.accepted().body(reimbursementService.insertReimbursement(reimbursementDTO));

    }

    //Return all reimbursements to the client
    @GetMapping //GET requests ending in /reimbursements will go here
    public ResponseEntity<List<OutgoingReimbursementDTO>> getAllReimbursements(){

        //Let's return the Reimbursements in one line
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());

        //the parameter to .ok() is the RESPONSE BODY
        //AKA the data we're sending back

    }

    //Return all reimbursements to the client
    @GetMapping("/{userId}") //GET requests ending in /reimbursements will go here
    public ResponseEntity<List<OutgoingReimbursementDTO>> getReimbursementsByUser(@PathVariable int userId){

        //Let's return the Reimbursements in one line
        return ResponseEntity.ok(reimbursementService.getReimbursementsByUser(userId));

        //the parameter to .ok() is the RESPONSE BODY
        //AKA the data we're sending back

    }

    @PatchMapping()
    public ResponseEntity<OutgoingReimbursementDTO> updateMessageById(@RequestBody OutgoingReimbursementDTO reimb){
        return ResponseEntity.accepted().
                body(reimbursementService.updateReimbursementStatus(reimb.getReimbId(), reimb.getStatus()));
    }

}