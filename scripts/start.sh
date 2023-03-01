#!/bin/bash
sudo yum update
sudo yum upgrade -y

echo "Inside the AMI Machine"

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
node -v

ls
mkdir webapp

ls -al


sudo cp /tmp/webapp.zip /home/ec2-user/webapp/webapp.zip
cd webapp/
pwd
ls
unzip webapp.zip  -d /home/ec2-user/webapp/
pwd
    
ls
rm -rf webapp.zip
ls
pwd

echo "In webapp folder"

npm i
npm test




