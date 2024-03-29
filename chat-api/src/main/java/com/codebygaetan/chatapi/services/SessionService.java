package com.codebygaetan.chatapi.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.User;

@Service
public class SessionService {
  private Map<String, User> sessions = new HashMap<>();

  public void addSession(String sessionId, User user) {
    sessions.put(sessionId, user);
  }

  public User getUserBySessionId(String sessionId) {
    return sessions.get(sessionId);
  }

  public void removeSession(String sessionId) {
    sessions.remove(sessionId);
  }

  public User getAvailableEmployee() {
    for (User user : sessions.values()) {
      if (!user.getIsCustomer()) {
        return user;
      }
    }
    return null;
  }
}
