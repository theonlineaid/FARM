## Farm Stack Aplication

```
sudo apu update
sudo apt install python3-pip
sudo pip install "fastapi[standard]"
pip install uvicorn

uvicorn main:app --reload

sudo python3 -m venv venv
source venv/bin/activate
pip install "fastapi[all]" "motor[srv]" beanie aiostream
pip freeze > requirements.txt

```


## DB Backup in interactive mode

```
mongodump --host localhost --port 27017 --username "username" --password "password" --authenticationDatabase admin --out /data/db/backup-$(date +\%Y\%m\%d)
chmod -R 777 ./backup_mongo

```