#!/bin/bash
sudo yum update
sudo yum upgrade -y

echo "Inside the AMI Machine"

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
node -v


ls -a
sudo amazon-linux-extras enable postgresql14
sudo yum install postgresql-server -y
sudo postgresql-setup initdb
#sudo PGSETUP_INITDB_OPTIONS=" --auth=trust" postgresql-setup --initdb --unit postgresql --debug

sudo sed -i 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf

sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
sudo -u postgres psql
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'Rishab16';"

echo "password changed"

echo "made changes in the conf file"

sudo cat /var/lib/pgsql/data/pg_hba.conf

#sudo systemctl restart postgresql  


ls
mkdir webapp  #ideally this i can ignore

sudo cp /tmp/webapp.zip /home/ec2-user/webapp/webapp.zip  


#echo "Permissions on the webapp configured"
#giving permissions to folder where webapp is copied to read, write, and execute to all 
#owner , onwe-group and outside world as well
sudo chmod -R 777 /home/ec2-user/

cd /home/ec2-user/webapp/
pwd
ls
#unzip webapp.zip -d /home/ec2-user/
unzip webapp.zip
pwd
ls

pwd

echo "In webapp folder "
#cd webapp/

#setting env variables so that the application can use it
# export DB_HOSTNAME=localhost
# export DB_PASSWORD=Rishab16
# export DB_USER=postgres
# export DB_NAME=postgres
# export DB_PORT=5432
# export APP_PORT=9000

npm i
npm test




