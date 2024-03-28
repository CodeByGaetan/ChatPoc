package com.codebygaetan.chatapi.models;

import lombok.Data;

@Data
public class MessageData {
  private String content;
  private Integer chatId;
  private User sender;
}
