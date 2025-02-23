package com.revature.P1DemoBackend.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component //1 of 4 stereotype annotations (make a class a bean)
@Entity //This makes the class a DB entity
@Table(name = "users") //This annotation lets us specify the name of the DB table
public class User {

    @Id //This annotation makes this field the PK in the DB table
    @GeneratedValue(strategy = GenerationType.IDENTITY) //This annotation makes the PK auto-increment
    private int userId;

    //We don't need to specify @Column UNLESS we want to define a name, or constraints

    @Column(nullable = false) //so now every User needs a username
    //TODO: this should probably be unique
    private String username;

    private String firstName;

    private String lastName;

    private String password;

    private String role = "user"; //we set a default value for role
    //but we can specify a different role when we create a User if we need to

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Reimbursement> reimbursements = new HashSet<>();

    //boilerplate-----------------------------------------------

    //right click -> generate -> choose the boilerplate you want

    public User() {
    }

    public User(int userId, String username, String firstName, String lastName, String password, String role) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

}
