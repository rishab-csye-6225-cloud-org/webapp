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

#giving permissions to folder where webapp is copied to read, write, and execute to all 
#owner , onwe-group and outside world as well
#cd /
chmod -R 755 /home/ec2-user/
ls -al

mkdir /home/ec2-user/webapp


echo "Permissions on the webapp configured"

cp /tmp/webapp.zip /home/ec2-user/webapp/webapp.zip
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




