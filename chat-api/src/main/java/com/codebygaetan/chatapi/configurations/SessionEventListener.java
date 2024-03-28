package com.codebygaetan.chatapi.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.codebygaetan.chatapi.models.Customer;
import com.codebygaetan.chatapi.models.User;
import com.codebygaetan.chatapi.models.User.Type;
import com.codebygaetan.chatapi.services.CustomerMessageService;
import com.codebygaetan.chatapi.services.CustomerSessionService;
import com.codebygaetan.chatapi.services.EmployeeMessageService;
import com.codebygaetan.chatapi.services.EmployeeSessionService;

@Component
public class SessionEventListener {

  @Autowired
  private EmployeeSessionService employeeSessionService;

  @Autowired
  private CustomerSessionService customerSessionService;

  @Autowired
  private CustomerMessageService customerMessageService;

  @Autowired
  private EmployeeMessageService employeeMessageService;

  @EventListener
  public void handleConnectionEvent(SessionConnectEvent event) {
    StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());

    String sessionId = sha.getSessionId();
    String userName = (String) sha.getFirstNativeHeader("name");
    Integer userId = Integer.parseInt(sha.getFirstNativeHeader("id"));
    Type userType = Type.valueOf((String) sha.getFirstNativeHeader("user-type"));

    User user = new User();
    user.setName(userName);
    user.setId(userId);
    user.setUserType(userType);

    if (user.getUserType() == Type.employee) {
      employeeSessionService.addEmployeeSession(sessionId, user);
    } else {

      if (!employeeSessionService.isEmployeeAvailable()) {
        customerMessageService.sendBusyMessage(userId);
        return;
      }

      User affectedEmployee = employeeSessionService.getAvailableEmployee();

      Customer customer = new Customer();
      customer.setName(userName);
      customer.setId(userId);
      customer.setEmployeeId(affectedEmployee.getId());
      customer.setStatus(Customer.Status.JOIN);

      customerSessionService.addCustomerSession(sessionId, customer);

      employeeMessageService.sendDispatchMessage(customer);

      customerMessageService.sendDispatchMessage(userId, affectedEmployee.getName());
    }
  }

  @EventListener
  public void handleDisconnectionEvent(SessionDisconnectEvent event) {
    StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());

    String sessionId = sha.getSessionId();

    Customer customer = customerSessionService.getCustomerBySession(sessionId);

    if (customer != null) {
      customer.setStatus(Customer.Status.LEAVE);
      employeeMessageService.sendDispatchMessage(customer);
      customerSessionService.removeCustomerSession(sessionId);
    } else {
      employeeSessionService.removeEmployeeSession(sessionId);
    }

  }

}
