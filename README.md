# Chat - Your Car Your Way

Proof of Concept (POC) for the Chat Feature in the Your Car Your Way app.

The Front-end uses :  
![Static Badge](https://img.shields.io/badge/Angular-14.1.3-red)

The Back-end uses :  
![Static Badge](https://img.shields.io/badge/Java-11-orange)
![Static Badge](https://img.shields.io/badge/Maven-4.0.0-purple)
![Static Badge](https://img.shields.io/badge/Spring_Boot-2.7.3-green)
![Static Badge](https://img.shields.io/badge/Lombok-1.18.24-red)

> Spring Boot starter dependency :  
> ![Static Badge](https://img.shields.io/badge/WebSocket-grey)

## Getting started

### Clone the project

Clone the project in the directory of your choice :

> git clone https://github.com/CodeByGaetan/ChatYCYW.git

### Back-end

- Open your IDE (VS Code, Eclipse, etc.) in the directory : `/ChatYCYW/chat-api`
- Run `mvn spring-boot:run` to launch the back-end in developpment mode
- Or run `mvn package` to build the project and then run `java -jar target/chat-api-0.0.1-SNAPSHOT.jar` to launch the built package.

### Front-end

- Open your IDE (VS Code, Eclipse, etc.) in the directory : `/ChatYCYW/chat-ui`
- Run `npm install` to install the dependencies
- Run `ng build` to build the project. The build artifacts will be stored in the `/ChatYCYW/chat-ui/dist/` directory.
- Run `ng serve` to start the front-end development server
- To use the app, navigate to http://localhost:4200/

### Database

The SQL script for the database implementation of Your Car Your Way app is located at : `/data.sql`
