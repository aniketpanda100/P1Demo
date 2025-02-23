package com.revature.P1DemoBackend.controllers;

import com.revature.P1DemoBackend.aspects.ManagerOnly;
import com.revature.P1DemoBackend.models.DTOs.OutgoingReimbursementDTO;
import com.revature.P1DemoBackend.models.DTOs.OutgoingUserDTO;
import com.revature.P1DemoBackend.models.User;
import com.revature.P1DemoBackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //Make this class a bean and turn HTTP response bodies into JSON
@RequestMapping("/users") //Requests ending in /users will go to this Controller
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true") //allow requests from anywhere
public class UserController {

    //Autowire the UserService to use its methods
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Return all users to the client
    @GetMapping //GET requests ending in /users will go here
    @ManagerOnly //Only admins can use this method, thanks to our custom annotation
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(){

        //Let's return the Users in one line
        return ResponseEntity.ok(userService.getAllUsers());

        //the parameter to .ok() is the RESPONSE BODY
        //AKA the data we're sending back
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteMessageById(@PathVariable int userId){
        userService.deleteUserById(userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<OutgoingReimbursementDTO> updateMessageById(@PathVariable int userId){
        userService.updateUserRole(userId);
        return ResponseEntity.accepted().build();
    }


}