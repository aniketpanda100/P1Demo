package com.revature.P1DemoBackend.services;

import com.revature.P1DemoBackend.DAOs.UserDAO;
import com.revature.P1DemoBackend.models.DTOs.OutgoingUserDTO;
import com.revature.P1DemoBackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service //Make this class a bean
public class UserService {

    //Autowire the DAO so we can use its method
    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    //Get all users from the DB
    public List<OutgoingUserDTO> getAllUsers(){

        //For get all, we don't have to do much user input validation
        //There's no user input! We just want to get all the data
        List<User> returnedUsers = userDAO.findAll();

        //convert the users into a List of UserDTOs
        //we're gonna use our special "User args" constructor from the DTO
        List<OutgoingUserDTO> userDTOs = new ArrayList<>();

        //loop through the users, convert them, and add to DTO list
        for(User u : returnedUsers){
            userDTOs.add(new OutgoingUserDTO(u));
        }

        return userDTOs;

        //return userDAO.findAll(); <- the method used to just be this

    }

    public void deleteUserById(int userId) {
        userDAO.deleteById(userId);
    }

    public void updateUserRole(int userId) {
        User user = userDAO.findByUserId(userId);
        user.setRole("manager");
        userDAO.save(user);
    }



}