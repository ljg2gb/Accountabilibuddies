# AccountibiliBuddies

## General Info

AccountibiliBuddies is a one-week, fullstack, Mod 2 project. It is an accountability app inspired by the challenges of working and socializing remotely during the CoVid crisis. The app allows the user to create accountability groups with friends, and add tasks to be completed within each group. Each task tracks group members and their progress in working towards these goals. 

## Technologies

* Ruby on Rails 
* ActiveRecord
* JavaScript
* HTML/CSS 

## Video

[walkthrough](https://youtu.be/ECMCJ1QmmPw)

## Setup

To run the app, first clone down the repo to your local device. This application is written with a Rails backend and JavaScript frontend. The backend can be found [here](https://github.com/nolan-dyke/mod2_project) and the frontend can be found [here](https://github.com/ljg2gb/frontend_Mod2_Project). The backend comes equipped with all necessary gems. Install these gems using 

`$ bundle install`

Run the migrations:

`$ rails db:migrate`

This app already contains some seeds. To use them, run:

`$ rails db:seed`

The backend should be served on port 3000. This can be done using the command:

`$rails s`
 
The frontend should be served on port 3001. This can be done using, for example: 

`$lite-server`

From here, you can navigate the website.

## Functionality

* Login or create new user

* Create new groups with descriptions

* Add users to groups

* Create tasks within groups

* Track all group member progress for each task

* Remove self from group



## Down the Pipeline

* Add fully functioning login with authorization.
* Add ability to friend users and filter users by friends.
* Make status editable only by logged in user. 
* Add commenting functionality to tasks.

## Authors

Lydia Gregory [GitHub](https://github.com/ljg2gb)

Nolan Dyke [GitHub](https://github.com/nolan-dyke)


