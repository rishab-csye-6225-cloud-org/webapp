#!/bin/bash

#adding cloudwatch configuration
echo "CloudWatch Agent downloading..."
cd
ls 
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
sudo rpm -U ./amazon-cloudwatch-agent.rpm
//sudo yum install amazon-cloudwatch-agent

echo "Cloudwatch agent downloaded successfully!!"

echo "copying the cloudwatch-config.json file to /opt directory..."
sudo cp /home/ec2-user/webapp/cloudwatch-config.json /opt/cloudwatch-config.json