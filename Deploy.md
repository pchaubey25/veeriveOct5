Pushing the code to github
https://www.youtube.com/watch?v=wrb7Gge9yoE&t=10s
- Create a new repository on github
- follow other steps as detailed in the video

==================================================================
PUSHING DB FROM COMPASS TO ATLAS

1. STEP 1 - GO TO C:\Program Files\MongoDB\mongodb-database-tools-windows-x86_64-100.10.0\bin\
AND RUN MONGODUMP.EXE. iT WILL CREATE A DUMP FILE IN THE SAME FOLDER.
2. STEP 2 - GO TO COMMAND PROMPT AND RUN THE FOLLOWING COMMAND
mongorestore --uri "mongodb+srv://chaubeyp@veerive.tta8g.mongodb.net/veerive-db-v1?retryWrites=true&w=majority" "C:\Program Files\MongoDB\mongodb-database-tools-windows-x86_64-100.10.0\bin\dump\veerive-db-v1"

ORIGINAL CONNECTION STRING - NOTE PASSWORD AND APPNAME ATTRIBUTE HAS BEEN REMOVED
mongorestore --uri "mongodb+srv://chaubeyp:<password>@veerive.tta8g.mongodb.net/?retryWrites=true&w=majority&appName=veerive" C:\Program Files\MongoDB\mongodb-database-tools-windows-x86_64-100.10.0\bin\dump\veerive-db-v1
ENTER PASSWORD AND IT WILL WORK
==================================================================

