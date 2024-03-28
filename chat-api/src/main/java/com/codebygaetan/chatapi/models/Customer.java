package com.codebygaetan.chatapi.models;

import lombok.Data;

@Data
public class Customer {
  private String name;
  private Integer id;
  private Integer employeeId;
  private Status status;

  public enum Status {
    JOIN, LEAVE
  }
}
