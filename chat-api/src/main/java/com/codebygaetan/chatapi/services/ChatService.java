package com.codebygaetan.chatapi.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.codebygaetan.chatapi.models.Chat;
import com.codebygaetan.chatapi.models.Message;
import com.codebygaetan.chatapi.models.User;

@Service
public class ChatService {
  private ArrayList<Chat> chats = new ArrayList<Chat>();

  public void addChat(Chat chat) {
    chats.add(chat);
  }

  public Chat getChatByCustomer(User customer) {
    for (Chat chat : chats) {
      if (chat.getCustomer().equals(customer)) {
        return chat;
      }
    }
    return null;
  }

  public void removeChat(Chat chat) {
    chats.remove(chat);
  }

  private Chat getChatById(Integer chatId) {
    for (Chat chat : chats) {
      if (chat.getId().equals(chatId)) {
        return chat;
      }
    }
    return null;
  }

  public void addMessageToChat(Integer chatId, Message message) {
    Chat chat = getChatById(chatId);

    if (chat == null) {
      return;
    } else {
      ArrayList<Message> messages = chat.getMessages();
      if (messages == null) {
        messages = new ArrayList<Message>();
        messages.add(message);
      } else {
        messages.add(message);
      }
      chat.setMessages(messages);
    }
  }

  public ArrayList<Chat> getChatsByEmployee(User user) {

    ArrayList<Chat> employeeChats = new ArrayList<Chat>();
    for (Chat chat : chats) {
      if (chat.getEmployee().equals(user)) {
        employeeChats.add(chat);
      }
    }

    return employeeChats;
  }

}
