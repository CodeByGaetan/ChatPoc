package com.codebygaetan.chatapi.services;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.MessageData;
import com.codebygaetan.chatapi.models.User;
import com.codebygaetan.chatapi.models.UserType;

@Service
public class CustomerMessageService {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

  private User automateUser = new User("Automate 🤖", 0, UserType.automate);

  public void sendBusyMessage(Integer chatId) {
    String path = "/topic/chat/" + chatId;

    MessageData messageData = new MessageData();
    messageData.setContent(
        "Tous nos conseillés sont occupés, veuillez réessayer ultérieurement.");
    messageData.setSender(automateUser);

    sendMessageAfterDelay(path, messageData);
  }

  public void sendDispatchMessage(Integer chatId, String affectedEmployeeName) {
    String path = "/topic/chat/" + chatId;

    MessageData messageData = new MessageData();
    messageData.setContent(
        "Vous êtes en relation avec notre conseiller : " + affectedEmployeeName);
    messageData.setSender(automateUser);

    sendMessageAfterDelay(path, messageData);
  }

  private void sendMessageAfterDelay(String path, MessageData messageData) {
    Runnable sendMessage = new Runnable() {
      public void run() {
        simpMessagingTemplate.convertAndSend(path, messageData);
      }
    };

    scheduler.schedule(sendMessage, 1, TimeUnit.SECONDS);
  }

}
