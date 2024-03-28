package com.codebygaetan.chatapi.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
  private String name;
  private Integer id;
  private UserType userType;
}
