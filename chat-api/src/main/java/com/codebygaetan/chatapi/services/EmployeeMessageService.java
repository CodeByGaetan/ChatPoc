package com.codebygaetan.chatapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.Customer;

@Service
public class EmployeeMessageService {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  public void sendDispatchMessage(Customer customer) {
    simpMessagingTemplate.convertAndSend("/topic/customers", customer);
  }

}
