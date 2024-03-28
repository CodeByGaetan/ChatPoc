package com.codebygaetan.chatapi.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.Customer;

@Service
public class CustomerSessionService {
  private Map<String, Customer> customerSessions = new HashMap<>();

  public void addCustomerSession(String sessionId, Customer customer) {
    customerSessions.put(sessionId, customer);
  }

  public void removeCustomerSession(String sessionId) {
    customerSessions.remove(sessionId);
  }

  public Customer getCustomerBySession(String sessionId) {
    return customerSessions.get(sessionId);
  }
}
