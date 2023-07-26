import mysql.connector,os
import urllib.request
from PIL import Image

# Database credentials

conn = mysql.connector.connect(host=host, user=user, password=password, database=database)

if conn.is_connected():
    print("Connected to database")

cursor = conn.cursor()

query = "SELECT * FROM resourcesmaster_01 WHERE resources LIKE '%youtube.com/watch?v=%'"
cursor.execute(query)
a  = cursor.fetchall()
for index,data in enumerate(a):
    if os.path.exists(f"{data[0]}.jpg"):
        continue
    else:   
        try:
            vid_id = str(data[4]).split("?v=")[1]
            vid_id =  vid_id.split("&")[0]
            vid_id =  vid_id.split("?list")[0]
            img_url = "https://img.youtube.com/vi/" + vid_id + "/hqdefault.jpg"
            print(img_url)
            img = Image.open(urllib.request.urlopen(img_url))
            
            img = img.crop((0, 45, img.width, img.height-45))
            img.save(f"{data[0]}.jpg")
        except:
            print(f'Skipping record {data[4]}')
            continue
