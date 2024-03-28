package com.codebygaetan.chatapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.codebygaetan.chatapi.models.MessageData;
import com.codebygaetan.chatapi.services.CustomerMessageService;
import com.codebygaetan.chatapi.services.EmployeeSessionService;

@Controller
public class MessageController {

  @Autowired
  private SimpMessagingTemplate template;

  @Autowired
  private CustomerMessageService customerMessageService;

  @Autowired
  private EmployeeSessionService employeeSessionService;

  @MessageMapping("/chat")
  public void chatTransfer(MessageData message) throws Exception {

    String path = "/topic/chat/" + message.getChatId();

    MessageData messageData = new MessageData();
    messageData.setContent(message.getContent());
    messageData.setChatId(message.getChatId());
    messageData.setSender(message.getSender());

    this.template.convertAndSend(path, messageData);

    if (!employeeSessionService.isEmployeeAvailable()) {
      customerMessageService.sendBusyMessage(message.getChatId());
    }

  }

}
