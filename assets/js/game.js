// BEGIN Utility Functions

// Function to random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

// Function to set player name
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}

// END Utility Functions

// BEGIN Global Variables

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 50;
        this.money = 10;
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading your attack by 6 points for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling your health by 20 points for 7 dollars.");
            this.health += 20;
            this.money -+ 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robot Trouble",
        attack: randomNumber(10, 14)
    }
];

// END Global Variables

// Combat/fight function
var fight = function(enemy) {
    // Repeat the fight as long as the enemy robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        // Ask player if they want to fight or skip the fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // If player skips, leave the fight and lose money
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // Subtract money from player for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("Player Money = ", playerInfo.money);
                break;
            // If the player doesn't skip, run fight again
            }
            // If player chooses to fight, run the fight sequence
        } else if (promptFight === "fight" || promptFight === "FIGHT") {
            // Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
            // Check enemy's health; if <=0, exit the fight loop
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            // Check player's health; if <=0, exit the fight loop
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        // If player enters anything other than fight or skip, prompt to enter valid response
        } else {
            window.alert("You need to choose a valid option. Try Again!");
        }
    }
}

// Function to start a new game
var startGame = function() {
    // Reset player stats at beginning of each new game
    playerInfo.reset();
    // Fight through each enemy in the enemyInfo array
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Welcome player to game/round
            window.alert("Welcome to Robot Gladiators - Round " + (i + 1) + "!");
            debugger;
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            // Give player the option to shop if there are still enemies and player is not dead
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over. Would you like to shop before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        // If player's robot has died, announce game over
        } else {
            window.alert("You have lost your robot in battle - game over!");
            break;
        }
    }
    endGame();
}

// Function to end game
var endGame = function() {
    // If the player's still alive, they win; if not, they lose
    if (playerInfo.health > 0) {
        window.alert("Great job – you survived! Your score is: " + playerInfo.money);
    } else {
        window.alert("You've lost your robot in battle.");
    }
    // Ask if the player would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon.");
    }
}

var shop = function() {
    // Ask what the player would like to purchase
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health for $7, UPGRADE your attack for $7, or LEAVE the shop? Please enter 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            // Increase health, decrease money
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            // Increase attack, decrease money
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store!");
            // Do nothing, ending the function
            break;
        default:
            window.alert("You did not pick a valid option. Please try again.");
            // Call shop function again
            shop();
            break;
    }
}

// Start the game when the page loads
startGame();