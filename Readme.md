# Hireflix Technical test

Thanks for taking your time to do our technical test. For this test we would like you to create a small application that simulate a small part of our application, to do that we will provide you a boilerplate of 2 services

- **Front-Admin**: This will be a React.js front end application, where you will be asked to update to display the list of candidates for a given position on our system
- **Api-Middleware**: This will be a small APi rest with part of the CRUD needed for the front end to work, this API already has the method to connect with our API.

## Setup

For this test you will act as the developer working for a company who wants to integrate with Hireflix. In order to do that you will have to register, verify your account and get the API keys for your middleware. It would be useful to familiarize yourself with the Hireflix product and what we do.

1. Register an Account on [Hireflix](https://hireflix.com/register), an follow the register process, (Please remember to validate your email address).

1. Go To [My Account -> Api Keys](https://admin.hireflix.com/en/my-account/api-keys) and create a new API KEY, you will need it during the setup of the API service

1. Create a position (a new job offer in our system). Create a dummy role (for example, CTO for Hireflix!) and add two questions you would typically find in a job interview.

1. Fork this repository and add tech@hireflix.com as a collaborator so we can review your test

1. Inside each service you will need to create a copy of the `.env.dist` and named it `.env`, in this file change ENV variables needed for each system to work correctly

    On `apis/middleware` add the API KEY created on step 2 and the ID of the position created un step 3 (you can find the position id on the URL when navigating to the position inside Hireflix https://admin.hireflix.com/en/jobs/xxxxxxxx), should have the MongoId (ObjectID) format

1. Install the dependencies of each service

1. After finish the installation and setup of each service you can run `npm start` **on the root of this repository (INSTEAD OF INSIDE OF EACH SERVICE)** to start both services on dev mode (This will also start a watcher that will transpile your code after any change).

This will start both services. the **frontend on the port 3000** and the **api on the port 3001**

## What we want from you

- Create a frontend application using react, you can see the mockups [here](https://www.figma.com/file/N6aQ0euQDKU8AbMnxBbyWc/Design?node-id=0%3A1). We are not specting a pixel perfect front, but attention to details will by taken account.

- Create the neccesary endpoints on the API service that will be need it by the front to archive this design.

- Dockerize both services

- Create the kubernetes resource definitions needed it to deploy this application on kubernetes

- You have up to a week to finish this assignment, if for any reason you need more time please let us now.

- Please add a file or README explaining your thinking process that led to your answer. Why you used one module or another or why you chose one pattern or another.

- Each service has the necessary libraries to complete the task, you are free to add any library but add an explaination of why you think the library was neccesary

- Try to make this test to reflect your real skills and how you feel comfortable coding. Think about best practices, code quality, maintainability, etc. We might or might not apply chaos monkey practices with your code :D

- Feel free to ask any questions you might have. Once you submit the test we will review it and we will schedule an interview to talk about the code!

May the Force be with you
