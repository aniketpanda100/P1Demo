package com.revature.P1DemoBackend.models.DTOs;

//This is a Data Transfer Object (DTO)
//They are often used to model data that is being sent between client and server

import com.revature.P1DemoBackend.models.User;

//In this case, we want to send User info without including that raw password
//Yes, we could have just made a different constructor in the User class
//Check the reimbursement DTOs for more interesting uses of DTOs
public class OutgoingUserDTO {

    private int userId;
    private String username;
    private String role;
    private String firstName;
    private String lastName;

    //boilerplate----------------------


    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int userId, String username, String role, String firstName, String lastName) {
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //see this in use in get all users in UserService
    public OutgoingUserDTO(User u) {
        this.userId = u.getUserId();
        this.username = u.getUsername();
        this.role = u.getRole();
        this.firstName = u.getFirstName();
        this.lastName = u.getLastName();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}