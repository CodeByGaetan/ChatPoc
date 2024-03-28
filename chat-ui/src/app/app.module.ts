import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponent,
    CustomerComponent,
    EmployeeComponent,
    ConnectionsComponent,
    HomeComponent,
    TopBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
