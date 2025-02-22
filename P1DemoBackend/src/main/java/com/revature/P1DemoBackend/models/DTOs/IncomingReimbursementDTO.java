package com.revature.P1DemoBackend.models.DTOs;

//Here's another DTO - but we aren't leaving out a password or anything
//This time we want to make a cleaner request body when inserting a new reimbursement

//We don't want to have to insert an entire user object to insert a reimbursement
//What if the reimbursement has like 10 objects it depends on? that's gonna be ugly JSON

//SOLUTION: just pass in the User's ID instead of the whole object

//Side note: we'll also leave out reimbId since the DB handles that

import com.revature.P1DemoBackend.models.User;

public class IncomingReimbursementDTO {

    private String description;
    private int amount;
    private String status;
    private int userId;

    //boilerplate------------------

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, int amount, String status, int userId) {
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.userId = userId;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                '}';
    }
}