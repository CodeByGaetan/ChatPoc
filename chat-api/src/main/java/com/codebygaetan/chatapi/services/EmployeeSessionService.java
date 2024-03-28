package com.codebygaetan.chatapi.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.User;

@Service
public class EmployeeSessionService {
  private Map<String, User> employeeSessions = new HashMap<>();

  public void addEmployeeSession(String sessionId, User user) {
    employeeSessions.put(sessionId, user);
  }

  public void removeEmployeeSession(String sessionId) {
    employeeSessions.remove(sessionId);
  }

  public Boolean isEmployeeAvailable() {
    return !employeeSessions.isEmpty();
  }

  public User getAvailableEmployee() {
    return employeeSessions.values().iterator().next();
  }

}
