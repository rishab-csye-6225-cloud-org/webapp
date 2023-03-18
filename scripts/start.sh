#!/bin/bash
sudo yum update
sudo yum upgrade -y

echo "Inside the AMI Machine"

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
node -v
sudo amazon-linux-extras enable postgresql14
sudo yum clean metadata && sudo yum install postgresql -y
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

#adding cloudwatch configuration
echo "CloudWatch Agent downloading..."
cd ..
ls 
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
sudo rpm -U ./amazon-cloudwatch-agent.rpm










