# GA-Project-1_Snake
A 2D snake game adapted from the original Nokia mobile game, with an added feature of local multiplayer using a shared keyboard. The goal is to get the snake to eat as many squares as possible without hitting the four walls or itself, or in the case of multiplayer, each other. 

The multiplayer mode can be interpreted as both a competitive and a co-op game mode to test how well a pair of players can work together. 

# Game link: 

-*-*-*-*-
Minimum features:
- Snake only operates in canvas boundary (done)
- Game ends when snake hits canvas boundary or itself (or collides with Player 2) (done)
- Score counter (done)
- Snake body gets longer with each point (done)
- Start game with spacebar (removed pause function as it is difficult to pause a setInterval)

-*-*-*-*-
good to have: 
- collision course detection and alert
- higher levels in form of higher speed
- varying game modes (single & multiplayer game mode done)
- sound when snake gets a point 

-*-*-*-*-
Wishlist:
- "I'm feeling brave" option with Halloween style jump scare on random points
- console toggle appended on DOM
- customisable controls

-*-*-*-*-
Learning points:
- setTimeout does not work very well possibly because it involves recurring the host function. 
- requestAnimationFrame is hard to implement to control the speed while matching corresponding food square size and location
- setInterval eliminates program hang problem
