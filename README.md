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
8. Passwords are encrypted and stored using bcrypt and salt
9. Wrote test cases using supertest library and mocha
10. Created a workflow file (yaml) wherein have written basic workflow which checkouts the code, installs node environment and dependencies and runs the test cases
11. If the workflow passes then only I am allowed to merge the changes in the main org repo
12. Github Actions is used for the above process wherein unit test cases are run and a node environment is created by the necessary commands in the node.js.yml file 
13. The above action is triggered when a pull request to the org main branch is created
14. Have also set branch protection rules for main branch(org)
15. Also, checked the workflow after failing it as it should not allow the user to merge the changes in the main org repo if the workflow fails
16. Followed the structure as professor explained inorder to commit code to the main org repo



# Assignment 2

## The assignment was to build the REST Api endpoints  like Get, Put, Post, etc - Web application for Product as it is an Inventory Management system with proper validations and http status codes. 

## For database bootstrapping we are using sequelize orm which would help in creating the database schema automatically once defined in the model even if we drop the entire table.

## Along with building web app, we are also working on AWS wherein we are working on setting up AWS Organization , IAM wherein we need to create users for each accounts which are root,dev and demo.

## We also need to create a group in each accounts for TA where we will be granting access to all the TAs(readOnlyAccess).

## Instructions to run the Assignment

1. Clone the organization's (rishab-csye-6225-cloud-org)  webapp(main) repository
2. Go to the webapp folder first 
    - Install node modules : npm install
    - Add the .env file (with all the environment variables) in the root directory

3. Start the Postgres database
    - brew services start postgresql@14

4. Start the server
    - npm start

5. Use Postman inorder to test the REST Api requests for the Product


## Steps followed for the assignment 2 were as follows:
1. Used npm commands to locally install the necessary libraries 
2. Developed the REST API endpoints for Product(Inventory Management) using nodejs 
3. Utilized Postgres as the database
4. Handeled the error/edge cases using proper error responses and also http status codes
5. Used Sequelize ORM for database Bootstrapping as it will automatically create the table schema as per specified in the model (product,user,etc)
6. Implemented all the types of request as mentioned in the swagger document except(Patch as it was optional)
7. In terms of AWS, created a root account under NEU email id
8. Then created an organization wherein added two accounts dev and demo
9. In root account created IAM user and granted AdminAccess to it
10. Created group of TA wherein added all the TA accounts and generated tha passwords for each TA user account and copied that in a sheet 
11. Repeated the above step for all three accounts root, dev and demo
12. Created tya IAM user with admin access in all three accounts 
13. Further added MFA for all three IAM user accounts
14. Also, added MFA for my root account
15. Finally after the above steps and generating the passwords I mailed all these information to the respective TAs



# Assignment 4

## The assignment was to build Custom AMI using Packer which will be used by the AWS EC2 Instance.

## We need to use Terraform inorder to build the Infrastructure which involves creating the entire network involving vpc, subnets, ec2 instance, attach security groups to the instance  through terraform.

## After the above setup we need to test our web application endpoints on the deployed EC2 instance which has our application up and running. Even when the application is rebooted it should by default start the application and we should be able to hit the endpoints

## Commands I used when developing this assignment
1. Packer init for initializing the packer  
 - packer init

2. Packer validate -> inorder to validate the syntax of the written file
 - packer validate --var-file=file.pkrvars.hcl ./

3. Packer build -> to build the packer file 
 - packer build --var-file=file.pkrvars.hcl ./

Above, I am passing a variables file inorder to make some parameters dynamic based on region


## Steps followed for the assignment 4 were as follows:
1. Created a Packer file wherein I defined all my configurations.
2. Added some provisioners for files and shell scripting.
3. Ran the file using packer commands
4. Also used systemd to auto up my application even if reboot
5. Used packer variables to run the packer to build ami
6. Also mad github workflows for validating and building the ami
7. If workflow fails then it will not allow to merge 
8. Using github secrets for credentials 
9. Also, applied a workflow for when the code is merged
10. Wrote a shell script that the packer will use to provision the configuration on the ami machine

11. Also, wrote the terrafome for setting up the infrastructure wherein my AMI would run automatically with the help of ami and systemd configuration

# Assignment 5

## The assignment was to build REST Api for Image of the product related to the user that created that particular product. Had to incorporate S3 inorder to store images to the s3 bucket as the object.

## We need to use Terraform inorder to build the Infrastructure which involves creating the entire network involving vpc, subnets, ec2 instance, attach security groups to the instance  through terraform and also need to take take of the RDS instance and create IAM Policy and create a role inorder to attach it to the EC2 instance


## Commands I used when developing this assignment
1. Packer init for initializing the packer  
 - packer init

2. Packer validate -> inorder to validate the syntax of the written file
 - packer validate --var-file=file.pkrvars.hcl ./

3. Packer build -> to build the packer file 
 - packer build --var-file=file.pkrvars.hcl ./

Above, I am passing a variables file inorder to make some parameters dynamic based on region

## Steps followed for the assignment 5 were as follows:
1. Created rest apis for images that were tied to product and the user.
2. Used aws-sdk inorder to connect to s3 and do all the necessary transactions.
3. Used multer as a middleware to upload files to express server
4. After the development, wrote terraform code to setup RDS, created policies IAM, Role for Ec2 and also other configurations.
5. Also used systemd to auto up my application even if reboot.
6. Launched/deployed the infrastructure with the application created
7. Tested the application on the deployed ec2 server using the RDS and S3.
8. Also, wrote user data script inorder to setup the ec2 server.
9. Used packer for building the AMI by making some changes in the previous packer file.


# Assignment 7

## The assignment was to install Cloudwatch Agent in our AMI that is we have to make changes to our Packer file and run some commands to install the cloud watch agent.

## Need to attach IAM policy for our cloudwatch agent to access the cloudwatch and push logs and custom metrics to the AWS CloudWatch.

## Need to make changes in Terraform to attach the policy to the role attached to the EC2 instance.

## Steps followed for the assignment 7 were as follows:
1. Made changes to the Packer file by adding script to install cloudwatch agent 
2. Created a json file to configure the cloudwatch as this file will be referenced by the cloudwatch agent.
3. Used statsd to create custom metrics inorder to count the no of rest api calls to each request
4. Made changes to the user-data script and added script to start the cloudwatch agent.
5. Deployed the infrastructure and tested the changes in the dev environment.
6. Checked if the logs and metrics are working as expected. 


# Assignment 9

## The assignment was to work on CI/CD pipeline wherein had to update the launch template version to take latest AMI id with latest changes in the code.

## Need to configure the workflow such that after accepting the latest AMI id built through packer need to pass that to the launch template and then make an instance refresh.

## Steps followed for the assignment 9 were as follows:
1. Made changes to the Packer file by adding post processor that included a file called manifest.json which consisted of all the meta data of the Packer
2. Made changes in the workflow by adding a command to extact the ami id from the packer build
3. Added a command to update the launch template with latest Ami id.
4. Added a command refresh the instances that needs to be updated with the latest AMI id
5. Made changes to the webapp code by adding a checking API point named "cicd" for testing purpose

