package com.revature.P1DemoBackend.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component //Make the class a bean
@Entity //This makes the class a DB entity
@Table(name = "reimbursements")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbId;

    private String description;

    private int amount;

    private String status;

    /* FK connection to the users table PK

     -cascade: defines how changes to User records will affect reimbursement records
        -cascade.ALL = any change to User will be reflected in dependent records

     -fetch: defines when the data gets loaded
        -FetchType.EAGER = dependencies are loaded when the app starts
        -FetchType.LAZY = dependencies are loaded on an as-needed basis

      -What's a dependency? In this case, reimbursements has a FK to User
        -User is a dependency of reimbursements
        -When we fetch a reimbursement, the DB fetches the appropriate user

     -JoinColumn: this is how we reference the PK of the users table*/
    /*
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;
    */

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    //boilerplate-----------------


    public Reimbursement() {
    }

    public Reimbursement(int reimbId, String description, int amount, String status, User user) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbId() {
        return reimbId;
    }

    public void setReimbId(int reimbId) {
        this.reimbId = reimbId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}