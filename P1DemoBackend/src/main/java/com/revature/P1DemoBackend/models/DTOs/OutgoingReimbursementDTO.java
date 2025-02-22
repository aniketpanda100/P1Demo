package com.revature.P1DemoBackend.models.DTOs;

import com.revature.P1DemoBackend.models.Reimbursement;

public class OutgoingReimbursementDTO {

    private int reimbId;
    private String description;
    private int amount;
    private String status;
    private int userId;

    public OutgoingReimbursementDTO() {
    }

    public OutgoingReimbursementDTO(int reimbId, String description, int amount, String status, int userId, String username) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.userId = userId;
    }

    public OutgoingReimbursementDTO(Reimbursement r) {
        this.reimbId = r.getReimbId();
        this.description = r.getDescription();
        this.amount = r.getAmount();
        this.status = r.getStatus();
        this.userId = r.getUser().getUserId();
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "OutgoingReimbursementDTO{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                '}';
    }
}
