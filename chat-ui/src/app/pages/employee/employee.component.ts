import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Customer } from 'src/app/models/Customer';
import { MessageData } from 'src/app/models/MessageData';
import { User, UserType } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { RandomService } from 'src/app/services/random.service';
import { StompService } from 'src/app/services/stomp.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  public user: User = {
    name: 'John SAV',
    id: this.randomService.genererId(),
    userType: UserType.employee,
  };

  customers: Customer[] = [];

  constructor(
    private randomService: RandomService,
    private stompService: StompService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.stompService.connect(this.user);

    this.stompService.subscribe('/topic/customers', (message: Message) => {
      const customer: Customer = JSON.parse(message.body);
      if (customer.employeeId === this.user.id) {
        if (customer.status === 'JOIN') {
          this.customers.push(customer);

          this.stompService.subscribe(
            `/topic/chat/${customer.id}`,
            (message: Message) => {
              const messageData: MessageData = JSON.parse(message.body);
              if (messageData.sender.userType != UserType.automate) {
                this.chatService.addMessageToChat(customer.id, messageData);
              }
            }
          );
        } else {
          this.customers = this.customers.filter((c) => c.id !== customer.id);
          this.chatService.removeChat(customer.id);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
  }
}
