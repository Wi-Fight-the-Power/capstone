# Sketchi
Sketchi is a PWA Pictionary style game

# Live Site: sketchi-draw.herokuapp.com

## Team Members

Jeremy Cook

Shawn Gay

William Guan

William Watson

# Overview

Sketchi allows you to create rooms to play with friends, and offers real time communication with an in-game chat feature. While we can't guarantee it won't get competitive, you'll be able to have back and forth banter with all involved.

# What Sketchi Offers

- Easy to understand gameplay: With or without our instructions, it'll only take 1 round to figure out how everything works, and that's when things get Sketchi!

- Everyone can score: That's right! Even as the drawer, you can earn points if everyone else is able to figure out what you're drawing!

- Flexibility: If you think your current word is Sketchi, simply shuffle and select another to draw, but be careful as the clock is ticking!

- Be creative: With drawing features such as colors, board colors and line size, you can go full Da Vinci (in 90 seconds)!

- Easy lobby access: Creating a lobby and providing friends with the room code takes no time at all, and you can create unique usernames without the hassle of email confirmation!

# Functionality & MVP
- Create/Join Lobby
- Drawer
- Guesser/s
- Real-time point/scoring system
- Live Chat

# Technologies
Sketchi is a PWA built using React (with Redux), React Konva, Socket.io, Material UI, Node, and Express

- React - Client-side JavaScript framework

- React Konva - JavaScript library for drawing canvas graphics using React

- Node - Premier JavaScript web server

- Material UI - Design system

- Socket.io - JavaScript library for realtime web applications

- PWA (Progressive Web App) using React - Allows for mobile and web accessibility

- Noun-JSON - List of nouns used each round at random

# Challenges 

Drawer turn rotation - Towards the latter end of testing, we began noticing that players were either being skipped from being drawer (based on the order in which users joined) or they were drawing for multiple turns in a row. This was a tricky issue because multiple times in localhost, this issue would not occur, but would occur upon deployment to heroku. Since the sockets had a slight delay, the parameter that would trigger the rotation was being triggered back to back. In our case, once a rounds timer would hit zero, the turn rotation would occur twice instead of once, leading to player 2 being skipped. In order to fix this, the parameters were altered to be more specific. In this case, we added a set timeout to the socket (750ms) so that the rotation wouldn't trigger until after the timeout expired, meaning the parameter wouldn't trigger a second rotation.

![image](https://user-images.githubusercontent.com/20148275/113599975-5c2b1280-960d-11eb-9822-8773dd924739.png)

Username consistency - One issue that we had throughout most of our testing was having multiples of the same user render in one game (the scoreboard). At first, we were using local storage to hold a users information for that particular browser session. Over time, we switched to making usernames specific to only the specific room that the user was joining. By prompting them to create a username while technically already in the room (this renders once they fill out their username), they only have that specified name in that particular room until they leave (sockets really came in handy here). 

![image](https://user-images.githubusercontent.com/20148275/113599556-c8f1dd00-960c-11eb-9e49-2e53f7c8eacb.png)

