# SpinAndAnswer-API
## WIKI
https://github.com/ColeMacGrath/SpinAndAnswer-API/wiki

## About Game
The game consist in a roulette which will ask different questions focused on computer area
### Rules
* Users earn points in each game
* Users can register new questions, but they must be approved by an administrator
* The games will always be in duel mode (with time) and you can choose a random opponent or just from your group of friends
* In case of not responding in time and will be considered as erroneous, then a following questions will be prosecuted
* For each question you will have a time to answer approximately forty-five seconds
### Characteristics
* The games are of ten questions each one
* The roulette defines topic
* The topics have a color and an icon or figure that identifies them
* The questions appear with time and three options to choose. 
* The category of the question will always appear
* Choosing a response indicates whether the answer was correct or not, but the correct answer is NOT indicated
* The games show questions and categories in a random way as well as the options
* They categories are at least six, e.g. (database, software engineering, algorithm, history, logic, web, networks)

## Getting started
### Prerequisites
#### Operative Systems
* Microsoft Windows x86 / x64
* macOS
* Linux Distributions x86 / x64
* Linux Distributions ARM
#### Browsers
* Internet Explorer 11 or above
* Microsoft Edge 17 or above
* Safari 11 or above
* Chrome 49 or above
* Firefox 61 or above
#### Packages
* [Node Node Package Manager](https://www.npmjs.com/)
* A git client
* Heroku CLI for [deploy](https://www.npmjs.com/)
* [Postman](https://www.getpostman.com/) for testing purposes
* [Mailer](https://nodemailer.com/about/)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## Installation
1. Clone repository [SpinAndAnswer-API](https://github.com/ColeMacGrath/SpinAndAnswer-API.git)
2. If you want to use the included package.json just run the command `npm install`
3. In case you want to take the base project you should install the following packages
### Packages
* `npm install express --save`
* `npm install mysql --save`
### Optional packages
* [Nodemon](https://nodemon.io/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
4. Data Base Management System Installation (MySQL)
5. Run the scripts in the [database.sql](https://1drv.ms/u/s!ArVWVB2r2uzhgpFrh58BmGmSjAYh4A) file

## Testing and Deploy
### Testing
1. Go to folder path by terminal
2. Initialize the application by `node app.js` if you're running only local, by `heroku web local` if you are already logged in Heroku or by nodemon if you prefer it
#### Local testing
* For local testing you need to change the postman URL for your local one, then run
* Ensure [database](https://1drv.ms/u/s!ArVWVB2r2uzhgpFrh58BmGmSjAYh4A) is created with the correct parameters
#### Online testing
* For online testing just run [postman collection](https://1drv.ms/u/s!ArVWVB2r2uzhgpFqcXVkW3q5PrZjHA)
#### Testing Note
For testing purposes two types of users shown below have been created, for run postman Collection just log in with any of the accounts.
#### Permissions
* Non-Admin Users:
1. Modify it's own information
2. See it's friend requests
3. Add or remove a friend
4. Create a question (Must be approved by an administrator)
5. Create a new game
6. Review results of it's games
7. Play: Answer questions into a game
* Admin: It has administrator privileges and has the power to:
1. Perform any action that a non-admin user executes
2. Approve or eliminate questions
3. Remove users
4. See all questions
5. See all users
6. See all games
7. See any specific question
8. See any specific user 
#### Users for test
#### Admin
* Mail: admin@spinandanswer.com
* Password: password
#### User (without admin privileges)
* Mail: user@spinandanswer.com
* Password: password

## Deployment
### Get Heroku repository
1. Login into Heroku as a collaborator `heroku login`
2. Get Heroku repository `heroku git:clone -a spinandanswer` or use the one hosted in GitHub
3. Add your changes into Heroku repository `git add `
4. Commit into Heroku repository `git commit -am "make it better"`
5. Push into Heroku repository `git push heroku master`
6. Finally check your changes in [Heroku App URL](https://spinandanswer.herokuapp.com)

## License
ISC

## Authors
* [Moisés Córdova](https://github.com/ColeMacGrath)
* [Rosa Sánchez](https://github.com/rolesaji)
## Acknowledgements
Nancy Michelle Torres Villanueva for her repository repository "[expressjs-101 - Step by step to learn ExpressJS](https://github.com/nmicht/expressjs-101)"
