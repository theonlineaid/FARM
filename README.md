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
mongodump --host localhost --port 27017 --username db --password password --out=/backup/ (--authenticationDatabase admin --db db --collection todo_lists --out=/backup/)

if you use atlus use it ==```mongodump --uri="mongodb+srv://db:password@cluster0.arfre.mongodb.net/farm" --out=/backup/```

```


To restore the backup that you created with `mongodump` in MongoDB Atlas (or a local MongoDB instance), you will need to use the `mongorestore` command.

Here’s how to restore your backup:

### Step 1: Verify the Backup Files
First, ensure that you have the backup files in the correct location (e.g., `/backup/` directory) and that they contain the `farm` database and its collections.

The directory structure should look something like this:
```
/backup/
  └── farm/
      ├── todo_lists.bson
      ├── todo_lists.metadata.json
      ├── admin/
      └── ...
```

### Step 2: Run `mongorestore`
To restore the backup to your MongoDB Atlas cluster, use the `mongorestore` command. You need to specify the connection string for your MongoDB Atlas cluster, and point to the directory where the backup is stored.

#### Example Command to Restore a Backup

```bash
mongorestore --uri="mongodb+srv://farm:farmstack@cluster0.arfre.mongodb.net/farm" /backup/farm
```

### Explanation of the Command:
- `--uri="mongodb+srv://farm:farmstack@cluster0.arfre.mongodb.net/farm"`: This is your MongoDB Atlas connection string, specifying the username, password, cluster URL, and target database (`farm`).
- `/backup/farm`: This is the directory where your backup files are located. Make sure this points to the correct backup folder.

If you only want to restore a specific collection (e.g., `todo_lists`), you can specify that collection like so:

```bash
mongorestore --uri="mongodb+srv://farm:farmstack@cluster0.arfre.mongodb.net/farm" --nsInclude="farm.todo_lists" /backup/farm/todo_lists.bson
```

This command restores only the `todo_lists` collection from the backup.

### Step 3: Verify the Restoration
After running the `mongorestore` command, you can verify that the data was restored by logging into MongoDB Compass or using the Mongo shell:

1. **Using MongoDB Compass**:
   - Open MongoDB Compass and connect to your cluster using the same connection string.
   - Navigate to the `farm` database and check for the `todo_lists` collection.

2. **Using Mongo shell**:
   Connect to the database and check if the collection exists and contains documents:
   ```bash
   mongo "mongodb+srv://farm:farmstack@cluster0.arfre.mongodb.net/farm"
   show collections
   db.todo_lists.find().limit(5).pretty()
   ```

### Optional Flags for `mongorestore`:
- **`--drop`**: If you want to drop the existing data in the `farm` database before restoring (use with caution), you can add the `--drop` flag:
  ```bash
  mongorestore --uri="mongodb+srv://farm:farmstack@cluster0.arfre.mongodb.net/farm" --drop /backup/farm
  ```

- **`--gzip`**: If your backup is compressed using `gzip`, add the `--gzip` flag:
  ```bash
  mongorestore --uri="mongodb+srv://farm:farmstack@cluster0.arfre.mongodb.net/farm" --gzip /backup/farm
  ```

### Step 4: Troubleshooting
- If you encounter any issues during the restore (e.g., authentication errors, connection errors), check your MongoDB Atlas cluster's settings and ensure the `farm` user has the necessary roles (e.g., `readWrite` for the `farm` database).
- Verify that the backup files are not corrupted.

### Conclusion
Now your MongoDB backup should be restored to your MongoDB Atlas cluster.

Let me know if you run into any issues or need further assistance!