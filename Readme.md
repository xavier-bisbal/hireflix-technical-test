# My thought diary

- 07.08.2020 11:29

I read carefully the Hireflix Technical test specs to clearly understand what has to be done and the time frame
First I have to read again the specs to be sure I don't miss anything
Second I will review the existing code
Third I will elaborate a first architecture plan
Fourth I have to refresh the basics of react and install the ide

First things first, let's grab a cup of coffee

- 07.08.2020 11:59

I have to keep in mind to build reusable components

- 07.08.2020 12:09

As my computer is brand new I have to install an ide and node.js
After a quick investigation, I installed Visual Studio Code

- 07.08.2020 13:16

Open project and install all dependencies (npm install)

- 07.08.2020 13:34

I cannot make it run (error). I will try to create a Hireflix account and follow the steps in the technical specs

- 07.08.2020 14:09

After some googling I found the reason it didn't run and execution error was it is prepared to be run in a linux os

- 07.08.2020 14:44

Let's review all code
After reviewing the code I decided to refactor start.js to avoid duplicated code

- 07.08.2020 17:24

I had a look to the api project and I found getInterview implementation was missing. I decided to implement it copying the other similar methods
Let's install postman to speed up try & error process while investigating hireflix api ...
After some time investigating using inspect and postman I get the query for getInvertiew
Let's code it
I should have asked for api documentation > I will send an email asking for help

- 07.08.2020 19:29

Looks like I have to use expressjs to route the api calls

- 09.08.2020 10:34

I got an email from Antonio seggesting me to use https://www.graphqlbin.com/
I got the api schema, bingo!
Let's investigate now the UI and Bulma framework

- 09.08.2020 11:26

Building some UI components
Resizing the window works but it needs to be improved because with some sizes it does not display all cards

- 10.08.2020 21.50

Finishing UI
The invite modal should check the data typed by the user > TO-DO

- 11.08.2020 13.00

Let's refactor the code to make it more clear and reusable

- 11.08.2020 16:36

Now I will investigate dockerizing the app

- 11.08.2020 18:03

It was easier than expected. I followed a tutorial and it worked the first time (that does not happen often)

After writing a couple of documents I have to run this commands:

docker build -t sample:dev .
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 80:3000 -p 3001:3001 -e CHOKIDAR_USEPOLLING=true sample:dev

- 11.08.2020 21:12

Adding play button
Refreshing UI after adding inviting candidate
Doing some rescaling test
Fixing some UI issues

- 12.08.2020 0:33

Writing to-do and final conclusions
Pushing all commits

# TO-DO (pending improvements):

Move all inline styles to css file or variables
Make the DetailHeader (back button + title component) more flexible to support candidate list header (Title + button) so both views can share the component
Add validations to invite form (also some UI tips and icons would be nice to have)

# Conclusions:

I prefer react than plain js, html, css
A lot to learn to be efficient and clean :) I would like to learn more

