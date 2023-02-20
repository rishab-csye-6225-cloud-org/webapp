#systemd configuration start
sudo cp /tmp/webapp.service /lib/systemd/system/webapp.service
sudo rm -rf /tmp/webapp.service
echo "Webapp service copied success"

sudo systemctl daemon-reload
sudo systemctl start webapp
sudo systemctl status webapp
sudo systemctl enable webapp

echo "Done with the configuration for the AMI. Thank You!"
