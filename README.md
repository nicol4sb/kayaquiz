The Kaya quiz allows to play with the 3 factors that compound into our carbon emissions.
This is a tool that supports workshops we do live, and quick quizzes done purely online in autonomy.

Dev manual :
Git clone
Run the node backend on port 5000 :
$ nodemon index.js & # nodemon will reload automatically the changes
The db is embedded by the backend.

Run the frontend on port 3000 (backend calls will be proxied to 5000)
$ npm run start

Deployment :
Build the frontend : npm run build
Git commit and push

Login to the prod machine
$ ssh root@ machine on digitalocean
sudo to the kaya user

git pull

sudo restart the kaya service
sudo systemctl restart kay

=============================================
On the server, nginx 
- redirects http to https
- redirects to the local serve on 5000
- manages the certificates

kayquiz service on Linux
deploy.sh to deploy

=============================================
DB table structure 
sqlite> PRAGMA table_info(QUIZ_ANSWERS);
0|id|INTEGER|0||1
1|timestamp|DATETIME|0|CURRENT_TIMESTAMP|0
2|ip|TEXT|0||0
3|result|TEXT|0||0
4|SSP|TEXT|0||0
5|browser_lang|TEXT|0||0
sqlite> ALTER TABLE QUIZ_ANSWERS ADD COLUMN facilitator TEXT;
sqlite> PRAGMA table_info(QUIZ_ANSWERS);
0|id|INTEGER|0||1
1|timestamp|DATETIME|0|CURRENT_TIMESTAMP|0
2|ip|TEXT|0||0
3|result|TEXT|0||0
4|SSP|TEXT|0||0
5|browser_lang|TEXT|0||0
6|facilitator|TEXT|0||0

sqlite> PRAGMA table_info(EMAILS);
0|id|INTEGER|0||1
1|email|TEXT|0||0

sqlite> PRAGMA table_info(FACILITATORS);
0|id|INTEGER|0||1
1|name|TEXT|1||0
2|creation_date|DATETIME|0|CURRENT_TIMESTAMP|0

