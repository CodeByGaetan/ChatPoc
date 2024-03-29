package com.codebygaetan.chatapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.codebygaetan.chatapi.models.Message;
import com.codebygaetan.chatapi.services.ChatService;
import com.codebygaetan.chatapi.services.MessageService;

@Controller
public class MessageController {

  @Autowired
  private ChatService chatService;

  @Autowired
  private MessageService messageService;

  @MessageMapping("/chat/{chatId}")
  public void chatTransfer(@DestinationVariable Integer chatId, Message message) throws Exception {

    chatService.addMessageToChat(chatId, message);

    messageService.sendMessage(chatId, message);
  }

}
