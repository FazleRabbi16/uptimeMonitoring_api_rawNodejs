# uptimeMonitoring_api_rawNodejs
Run the project following step's
--------------------------------
Step 1 - install nodejs
--------------------------------
Install nodejs in your machine if not . Go to website and download for your machine and setup
Nodejs website : https://nodejs.org/en 

--------------------------------
Step 2 - install yarn globally
--------------------------------
Install yarn via npm command
open your CMD and run the comment "npm install --global yarn"
To check yarn version installed or not"yarn --version"

-----------------------------------------
Step 3 - install node module in project
-----------------------------------------
add node_module to project via this command "yarn install".This is uptime checker so you need run/re-run the server every time . So we need nodemon for solve this issue.Add nodeman in dev dependencies by run this command
yarn add nodemon --dev

Global installations might have some drawbacks, such as potential version conflicts between projects.So i choice add it dev dependencies.
 
 





