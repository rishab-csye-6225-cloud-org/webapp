# Assignment 1

## Name = Rishab Rajesh Agarwal

## NUID = 002766211

## Email = agarwal.risha@northeastern.edu

## The assignment was to build the REST Api endpoints  like Get, Put, Post, etc - Web application using a technology stack that meets Cloud-Native Web Application Requirements with proper validations and http status codes.

## This application uses Nodejs inorder to build the backend using express and Postgres database is been used as the database

## Instructions to run the Assignment

1. Clone the organization's (rishab-csye-6225-cloud-org)  webapp(main) repository
2. Go to the webapp folder first 
    - Install node modules : npm install
    - Add the .env file (with all the environment variables) in the root directory

3. Start the Postgres database
    - brew services start postgresql@14

4. Start the server
    - npm start

5. Use Postman inorder to test the REST Api requests



## Build & Deploy steps followed for the assignment were as follows:
1. Used npm commands to locally install the necessary libraries 
2. Developed the REST API endpoints using nodejs 
3. Utilized Postgres as the database
4. Handeled the error/edge cases using proper error responses and also http status codes
5. A .gitignore file is maintained wherein all the necessary files/folders are ignored like .env , node_modules, package-lock.json, etc
6. Implemented all the types of request as mentioned in the swagger document
7. Used Sequelize as the ORM in order for mapping purposes
8. Wrote test cases using supertest library and mocha
9. Created a workflow file (yaml) wherein have written basic workflow which checkouts the code, installs node environment and dependencies and runs the test cases
10. If the workflow passes then only I am allowed to merge the changes in the main org repo
11. Githun Actions is used for the above process wherein unit test cases are run and a node environment is created by the necessary commands in the node.js.yml file 
12. The above action is triggered when a pull request to the org main branch is created
13. Have also set branch protection rules for main branch(org)
14. Also, checked the workflow after failing it as it should not allow the user to merge the changes in the main org repo if the workflow fails
15. Followed the structure as professor explained inorder to commit code to the main org repo
