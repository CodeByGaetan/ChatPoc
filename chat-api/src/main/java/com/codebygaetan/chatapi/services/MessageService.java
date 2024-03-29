package com.codebygaetan.chatapi.services;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.Chat;
import com.codebygaetan.chatapi.models.Message;

@Service
public class MessageService {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  public void dispatchToCustomerWithDelay(Chat chat) {
    dispatchWithDelay("/topic/customer", chat);
  }

  public void dispatchToEmployeeWithDelay(Chat chat) {
    dispatchWithDelay("/topic/employee", chat);
  }

  public void dispatchToEmployee(Chat chat) {
    simpMessagingTemplate.convertAndSend("/topic/employee", chat);
  }

  public void dispatchToBoth(Chat chat) {
    dispatchToCustomerWithDelay(chat);
    dispatchToEmployee(chat);
  }

  public void sendMessage(Integer chatId, Message message) {
    simpMessagingTemplate.convertAndSend("/topic/chat/" + chatId, message);
  }

  // DELAYED DISPATCH

  private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

  public void dispatchWithDelay(String destination, Chat chat) {
    Runnable sendMessage = new Runnable() {
      public void run() {
        simpMessagingTemplate.convertAndSend(destination, chat);
      }
    };
    scheduler.schedule(sendMessage, 1, TimeUnit.SECONDS);
  }

}
