var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
var enemyNames = ["Roborto","Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Combat/fight function
var fight = function(enemyName) {
    // Repeat the fight as long as the enemy robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        // Ask player if they want to fight or skip the fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // If player skips, leave the fight and lose money
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Subtract money from player for skipping
                playerMoney = playerMoney - 2;
                console.log("Player Money = ", playerMoney);
                break;
            // If the player doesn't skip, run fight again
            }
            // If player chooses to fight, run the fight sequence
        } else if (promptFight === "fight" || promptFight === "FIGHT") {
            // Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth = enemyHealth - playerAttack;
            // Log a resulting message to the console so we know that it worked
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
            // Check enemy's health; if <=0, exit the fight loop
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable
            playerHealth = playerHealth - enemyAttack;
            // Log a resulting message to the console so we know that it worked
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
            // Check player's health; if <=0, exit the fight loop
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
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
    playerHealth = 100;
    playerAttack = 50;
    playerMoney = 10;
    // Fight through each enemy in the enemyNames array
    for (var i = 0; i < enemyNames.length; i++) {
        // debugger;
        if (playerHealth > 0) {
            // Welcome player to game/round
            window.alert("Welcome to Robot Gladiators - Round " + (i + 1) + "!");
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);
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
    if (playerHealth > 0) {
        window.alert("Great job – you survived! Your score is: " + playerMoney);
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

// Start the game when the page loads
startGame();