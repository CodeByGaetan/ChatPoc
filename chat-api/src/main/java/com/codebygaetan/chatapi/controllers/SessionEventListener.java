package com.codebygaetan.chatapi.controllers;

import java.util.ArrayList;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.codebygaetan.chatapi.models.Chat;
import com.codebygaetan.chatapi.models.Message;
import com.codebygaetan.chatapi.models.User;
import com.codebygaetan.chatapi.services.ChatService;
import com.codebygaetan.chatapi.services.MessageService;
import com.codebygaetan.chatapi.services.SessionService;

@Component
public class SessionEventListener {

  @Autowired
  private SessionService sessionService;

  @Autowired
  private ChatService chatService;

  @Autowired
  private MessageService messageService;

  @EventListener
  public void handleConnectionEvent(SessionConnectEvent event) {
    StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());

    String sessionId = sha.getSessionId();

    String firstName = (String) sha.getFirstNativeHeader("firstName");
    String lastName = (String) sha.getFirstNativeHeader("lastName");
    String email = (String) sha.getFirstNativeHeader("email");
    Boolean isCustomer = Boolean.parseBoolean(sha.getFirstNativeHeader("isCustomer"));

    User user = new User();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setEmail(email);
    user.setIsCustomer(isCustomer);

    sessionService.addSession(sessionId, user);

    if (!user.getIsCustomer()) {

      ArrayList<Chat> chats = chatService.getChatsByEmployee(user);

      for (Chat chat : chats) {
        messageService.dispatchToEmployeeWithDelay(chat);
      }

      return;
    }

    User affectedEmployee = sessionService.getAvailableEmployee();

    Random random = new Random();
    int chatId = random.nextInt(9000) + 1000;

    Chat chat = new Chat();
    chat.setId(chatId);
    chat.setCustomer(user);
    chat.setEmployee(affectedEmployee);
    chat.setMessages(new ArrayList<Message>());

    if (affectedEmployee == null) {
      chat.setStatus(Chat.Status.REFUSED);
      messageService.dispatchToCustomerWithDelay(chat);
    } else {
      chat.setStatus(Chat.Status.OPENED);
      chatService.addChat(chat);
      messageService.dispatchToBoth(chat);
    }
  }

  @EventListener
  public void handleDisconnectionEvent(SessionDisconnectEvent event) {
    StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
    String sessionId = sha.getSessionId();

    User user = sessionService.getUserBySessionId(sessionId);

    if (user == null) {
      return;
    }

    sessionService.removeSession(sessionId);

    if (!user.getIsCustomer()) {
      return;
    }

    Chat chat = chatService.getChatByCustomer(user);
    if (chat != null) {
      chat.setStatus(Chat.Status.CLOSED);
      messageService.dispatchToEmployee(chat);
      // TODO, AFTER POC - Send Chat by email
      chatService.removeChat(chat);
    }

  }

}
