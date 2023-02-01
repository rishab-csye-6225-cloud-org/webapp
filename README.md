# Assignment 1

## Name = Rishab Rajesh Agarwal

## NUID = 002766211

## Email = agarwal.risha@northeastern.edu


## Instructions to run the Assignment

1. Clone the repository
2. Go to the webapp folder first 
    - Install node modules : npm i
    - Add the .env file (with all the environment variables) in the root directory

3. Start the Postgres database
    - brew services start postgresql@14

4. Start the server
    - npm start

5. Use Postman inorder to test the REST Api requests


## The assignment was to build the REST Api endpoints like Get, Put, Post, etc with proper validations and http status codes.

## The steps followed for the assignment were as follows:
1. Used npm commands to locally install the necessary libraries 
2. Developed the REST API endpoints using nodejs 
3. Utilized Postgres as the database
4. Handeled the error/edge cases using proper error responses and also http status codes
5. Implemented all the types of request as mentioned in the swagger document
6. Used Sequelize as the ORM in order for mapping purposes
7. Wrote test cases using supertest library and mocha
8. Created a workflow file (yaml) wherein have written basic workflow which checkouts the code, installs node environment and dependencies and runs the test cases
9. If the workflow passes then only I am allowed to merge the changes in the main org repo
10. Have also set branch protection rules for main branch
11. Also, checked the workflow after failing it as it should not allow the user to merge the changes in the main org repo if the workflow fails
12. Followed the structure as professor explained inorder to commit code to the main org repo
