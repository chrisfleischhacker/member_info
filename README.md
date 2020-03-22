# member_info

git clone https://github.com/chrisfleischhacker/member_info.git

cd app

meteor npm install

meteor npm install --save bcrypt

meteor add momentjs:moment

meteor remove autopublish

meteor remove insecure

meteor npm run start



From scratch:
git clone https://github.com/ics-software-engineering/meteor-application-template-react.git website
cd website/app
meteor npm install
meteor npm install --save bcrypt
meteor add momentjs:moment
meteor remove autopublish
meteor remove insecure
meteor npm run start

To move: 
remove the .meteor/local folder
remove the node_modules folder
*move
meteor npm install
meteor npm install --save bcrypt
meteor add momentjs:moment
meteor remove autopublish
meteor remove insecure
meteor npm run start


git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/chrisfleischhacker/member_info.git
git push -u -v origin master


DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy https://galaxy.meteor.com/abc --settings ../config/settings.json

mongodb+srv://abcDbUser:abc@cluster0-1ucxx.mongodb.net/test?retryWrites=true&w=majority

$ SET DEPLOY_HOSTNAME=galaxy.meteor.com
$ meteor deploy abc --settings ../config/settings-production.json