# QRoom

## Description

An idea to connect people with each other easily with just a click of a button

## Stacks used in the project

### Backend

1. Node (node)
2. Express
3. ApolloServer
4. Graphql


### Database 

PostgreSQL

### Frontend

Next.js

### Other utilities used

1. cors(for cross origin credentials)
2. urql(to connect the frontend to backend)
3. typeORM(for creating queries and mutations)
4. grapql-code-gen(to generate custom hooks for queries and mutation for frontend)


## Features

### Authentication 

The authentication used is custom made using mutations in ***typeORM*** and all the passwords are hashed and are not visible in the logging or the call from the frontend

### Room creation

The rooms are created just with a simple name and can be secured with password and you can invite anyone with just providing the name and password 

Moreover the rooms have an 12 digit uuid attached that makes them hard to be guessed 

### Messaging

Live messaging with anyone having them in the same room as yourself 



# Images of the website

## Register Page
![register](https://github.com/jueviole-grace/qRoom/blob/master/github%20assets/register.png?raw=true)

## Login Page
![login](https://github.com/jueviole-grace/qRoom/blob/master/github%20assets/login.png?raw=true)

## Home Page
![Home Page](https://github.com/jueviole-grace/qRoom/blob/master/github%20assets/home%20page.png?raw=true)

## Room Window 
![room window](https://github.com/jueviole-grace/qRoom/blob/master/github%20assets/room%20window.png?raw=true)

## Messages
![Messaes](https://github.com/jueviole-grace/qRoom/blob/master/github%20assets/message.png?raw=true)
