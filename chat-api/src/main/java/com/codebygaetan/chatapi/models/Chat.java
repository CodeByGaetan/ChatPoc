package com.codebygaetan.chatapi.models;

import java.util.ArrayList;

import lombok.Data;

@Data
public class Chat {
  private Integer id;
  private User customer;
  private User employee;
  private ArrayList<Message> messages;
  private Status status;

  public enum Status {
    REFUSED,
    OPENED,
    CLOSED
  }

}
