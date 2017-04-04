# Concept Description and Basic Gameplay

The project is a fighting game and is based on the ability for multiple players to login and compete against each other. The basic gameplay will either have WASD directions or Mouse click as a means of control. If possible, a version will be made for mobile or tweaks will be made to make it more mobile friendly. Four pixel-based players of differing colors will be placed into the "arena" like level as they enter the game. There will be differing levels but the number has yet to be decided. Extra players will either play on a different stage or have to wait in a queue until they are allowed in. These extra players may be allowed to spectate an ongoing match if they want till a server instance is available.

There are several possible ideas for an overall theme. One idea was a giant pillow-fight. Another was more of a tag system. What is important to note is that it fill focus on the generic jump/kick/punch of most fighting games. It will also include projectile powerups that could be thrown at other players and may have additional power ups. Each player will have a yet to be determined amount of health. The screen will either be rotating, scrolling or a looping screen. This has also yet to be decided.

**Note:** Pros/Cons list created to help come to informed decisions. If we've actually decide on something, we can ~~strike out~~ the things we don't want.

## Pros/Cons:
Here are some Pros/Cons for each!

### Multi-Player handling:
How will we handle more than one player?
#### New stages:
##### Pros:
- Will allow players to enter the game right away.
- May allow players that are less experienced with the game to enter with other players who are inexperienced.
- May allow players to play with others in similar timezones.
##### Cons:
- May take more coding and more memory to put together
- May be difficult to coordinate.
#### Queue:
##### Pros:
- It is unnecessary to make other stages.
- It doesn't require as much memory or RAM.
- Once someone dies (or is KO'd) they have a long "timeout" before they can re-join.
##### Cons:
- Players may have to wait a long time before being able to play.
- Players may drop out if they have to wait for a while.

### Gameplay:
How will we control the players?

#### WASD - directional (Computer-First):

#### Current Decision

Both WASD & Arrow Keys

##### Pros:
- It is much easier to control the characters in WASD.
- Allows for other keys to be used to do other things like shoot and switch weapons (if needed).
- Leaves the right hand free if we want to use the mouse
for aiming, etc.
- Mobile problem may be solved using a digital joystick.
##### Cons:
- Becomes a pain in the neck if we want to transfer it to mobile later.
- People have to have a keyboard to play.

#### Mouse and Click (Phone-First):
##### Pros:
- Will make it easier to convert to phones later.
- Mobile devices are more wide-spread, meaning it will be more convenient for players to join, and they can play anywhere they want.
##### Cons:
- The movements and strikes may be slightly more difficult to control than they woud be with keystrokes.
- Less options if you want more than striking.

### Screen Layout:
What will our basic stage be like?

#### Rotating screen:
##### Pros:
- Players have control over more surface area.
- It's a creative solution to having a limited screen that doesn't scroll or loop.
- Adds another dimension to fighting by promoting more tactics and forcing the players to think in multiple directions.
- It adds a certain charm and difficulty to the game to have to worry about other players attacking from above or the sides.
- Multiple sides of "platforms" or other objects can be utilized as shields or as places to hide behind.
##### Cons:
- May be confusing for players.
- May be difficult to code for individual control (and perspective).
- May be confusing for people just entering.

#### Scrolling Screen:
##### Pros:
- Allows a lot of room for players
- not too difficult to code
##### Cons:
- Too much room might make it hard to find other players
- would have to be sort of generic in design to scroll infinitely

#### Looping Screen:
##### Pros:
- "POW" level- exit one side come out the other- simple
- not too difficult to code
- allows for interesting design elements.
##### Cons:
- Might be slightly confusing depending on the size of the arena
- Players might be able to hide in the "cusp" between sides
- Could be slightly jarring
