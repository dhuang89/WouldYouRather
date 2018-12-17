# Would You Rather Project

This project is for the Udacity React course. The starter repository containing a fake database can be found [here](https://github.com/udacity/reactnd-project-would-you-rather-starter). To run the app, clone the repo, navigate to directory, then run ```npm install```. Once finished, enter ```npm start```. Next, navigate to localhost:3000 on a web browser.

## Application Overview
The app allows the user to play the "Would You Rather?" game. The user is presented with a question that has two choices. The user makes a selection and continues onto the next one. At first, the user is required to log into the app. This can be done by simply selecting a name from the list and clicking "Log In". At the homepage, the user will see a navigation bar in the top right, containing the options: 

* Play game
* Add a question
* Leaderboard 
* Log out

The *Play game* section will present the users with a tab view. The tab view allows the user to see switch between sections that display questions they have and have not answered. Clicking on an unanswered question will let the user make a selection, while clicking on an answered question will show how the user answered. It also shows statistics on how the other players have answered. 

Users can navigate to *Add a question* to add more questions to the game. In this section, the users can add two options in the fields, click submit, and see the new question populate on the homepage. The lists on the homepage are ordered with the most recently asked questions on top. 

The *Leaderboard* section shows a list of users, ordered by whoever has asked and answered the most questions. The sum of what the user has asked and answered is displayed next to the user's name and avatar image. When the user completes some questions and comes back, they can see the number next to their name increase. 

Once the user is done playing the game, they can simply click *Log out* and be taken back to the Log In screen. 
