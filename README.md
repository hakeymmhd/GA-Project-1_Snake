# GA-Project-1_Snake
A 2D snake game adapted from the original Nokia mobile game, with an added feature of local multiplayer using a shared keyboard. The goal is to get the snake to eat as many squares as possible without hitting the four walls or itself, or in the case of multiplayer, each other. 

The multiplayer mode can be interpreted as both a competitive and a co-op game mode to test how well a pair of players can work together. 

# Game link: 
https://hakeymmhd.github.io/GA-Project-1_Snake/

# Game Instructions and Controls:
- In single player mode, use the arrow keys on the keyboard to control the direction of snake mvoement.
- In multiplayer mode, use the arrow keys on the keyboard to control Player 1 movement, and W-A-S-D for Player 2 on the same keyboard. 

<ins>Player 1:</ins>  
Up arrow - Go up  
Left arrow - Go left  
Down arrow - Go down  
Right arrow - Go right  
   
<ins>Player 2:</ins>  
W - Go up  
A - Go left  
S - Go down  
D - Go right  

# Technologies used:
- HTML and HTML Canvas element for graphics
- CSS
- Javascript
- Jquery and VanillaJS for DOM manipulation

-*-*-*-*-
# Accomplished features:
- Snake only operates within canvas boundary
- Game ends when snake hits canvas boundary or itself (or collides with Player 2)
- Dynamic live score counter that continually updates on the DOM, and reflects the number of players in each game mode
- Snake body gets longer with each point
- Start game with spacebar to allow players to get ready
- Option to restart the game after the game ends
- Audio plays when snake gets points and when game ends

-*-*-*-*-
# Difficulties encountered:
- Had to remove pause function as it is difficult to pause a setInterval
- Program suffered intermittent hang. Narrowed the issue down to the recurring function containing the setInterval.
- Implementing classes for 2 unique instances and 2 different game modes and have them interact with each other

-*-*-*-*-
# Learning points:
- setTimeout does not work very well possibly because it involves recurring the host function. 
- requestAnimationFrame is hard to implement to control the speed while matching corresponding food square size and location
- setInterval eliminates program hang problem

-*-*-*-*-
# Wishlist:
- "I'm feeling brave" option with Halloween style jump scare on random points
- Customisable controls
- Mobile application support
- Top score feature



