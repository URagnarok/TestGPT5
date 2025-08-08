// script.js
document.addEventListener('DOMContentLoaded', () => {
    const dungeonMap = document.getElementById('dungeon-map');
    const combatResult = document.getElementById('combat-result');
    const healthElement = document.getElementById('health');
    const manaElement = document.getElementById('mana');
    const levelElement = document.getElementById('level');
    
    // Generate the dungeon map
    const generateDungeon = () => {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            dungeonMap.appendChild(cell);
        }
    };

    // Character stats
    let health = 100;
    let mana = 50;
    let level = 1;

    // Update stats
    const updateStats = () => {
        healthElement.textContent = `Health: ${health}`;
        manaElement.textContent = `Mana: ${mana}`;
        levelElement.textContent = `Level: ${level}`;
    };

    // Attack button functionality
    const attackButton = document.getElementById('attack');
    attackButton.addEventListener('click', () => {
        combatResult.textContent = 'You attack the enemy!';
        health -= 10; // Just an example of damage
        updateStats();
    });

    // Use Spell button functionality
    const useSpellButton = document.getElementById('use-spell');
    useSpellButton.addEventListener('click', () => {
        if (mana >= 10) {
            combatResult.textContent = 'You cast a spell!';
            mana -= 10;
            updateStats();
        } else {
            combatResult.textContent = 'Not enough mana!';
        }
    });

    // Inventory button functionality
    const openInventoryButton = document.getElementById('open-inventory');
    openInventoryButton.addEventListener('click', () => {
        combatResult.textContent = 'Opening Inventory...';
        // Inventory logic can be added here
    });

    // Initialize game
    generateDungeon();
    updateStats();
});
