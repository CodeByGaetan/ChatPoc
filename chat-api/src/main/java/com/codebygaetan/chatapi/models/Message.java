package com.codebygaetan.chatapi.models;

import lombok.Data;

@Data
public class Message {
  private String content;
  private Boolean toCustomer;
}
