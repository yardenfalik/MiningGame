//--------------------
var Database = {"gold" : 0, "diamond" : 0, "miningToolLevel" : 0, "minerIsActive" : 0, "minerInterval" : 10000, "goldPerInterval" : 1, "diamondsMine" : 0, "manualIsActive" : 0, "darkMode" : 0};
//--------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const slot = urlParams.get('slot')
//--------------------
var goldSpan = document.getElementById("goldSpan");
var upgradeToolButton = document.getElementById("upgradeToolButton");
var automaticMinerButton = document.getElementById("automaticMinerButton");
var upgradeAutomaticMinerButton = document.getElementById("upgradeAutomaticMinerButton");
var automaticMinerCounterTitle = document.getElementById("automaticMinerCounterTitle");
var openDiamondMineButton = document.getElementById("openDiamondMineButton");
var diamondsMineTitle = document.getElementById("diamondsMineTitle");
var miningToolLevelDisplay = document.getElementById("miningToolLevelDisplay");
var buyManualButton = document.getElementById("buyManualButton");
var manualButton = document.getElementById("manual");

//temoprerly
function give()
{
    Database["gold"] += 200;
    updateDisplay();
}

function startGame()
{
    if(slot == 1)
    {
        if (localStorage.getItem('database')) 
        {
            const savedData = localStorage.getItem('database');
            if(savedData)
            {
                Database = JSON.parse(savedData);
            }
            updateDisplay();
        }
    }

    if(Database["darkMode"] == 1)
    {
        colors();
        Database["darkMode"] == 1;
    }
}

function colors()
{
    var bodyComp = document.body;
    bodyComp.classList.toggle("dark-mode");
    if(Database["darkMode"] == 1)
    {
        Database["darkMode"] = 0;
    }
    else
    {
        Database["darkMode"] = 1;
    }
}

function save()
{
    localStorage.setItem('database', JSON.stringify(Database));
}

function load()
{
    if (localStorage.getItem('database')) 
    {
        const savedData = localStorage.getItem('database');
        if(savedData)
        {
            Database = JSON.parse(savedData);
        }
        updateDisplay();
    }
    else
    {
        console.log("LocalStorage is not supported.");
    }

}

function buyDiamondsMine()
{
    if(Database["gold"] >= 10000)
    {
        Database["gold"] -= 10000;
        Database["diamondsMine"] = 1;
        diamondsMineTitle.style.visibility = "visible";
    }
    updateDisplay();
}

function automaticMiner() {
    setInterval(() => {
        Database["gold"] += Database["goldPerInterval"];
        updateDisplay();
    }, Database["minerInterval"]);
}

function upgradeTool()
{
    Database["miningToolLevel"] ++;
    Database["gold"] -= 30;
    updateDisplay();
}

function upgradeAutomaticMiner()
{
    if(Database["minerInterval"] != 1000)
    {
        Database["minerInterval"] -= 1000;
        Database["gold"] -= 200;
    }
    else
    {
        Database["gold"] -= Database["goldPerInterval"] * 200;
        Database["goldPerInterval"]++;
    }
    automaticMiner();
    updateDisplay();
}

function buyAutomaticMiner()
{
    Database["minerIsActive"] = 1;
    automaticMiner();
    Database["gold"] -= 100;
    updateDisplay();
}

function buyManual()
{
    Database["manualIsActive"] = 1;
    Database["gold"] -= 5;
    updateDisplay();
}

function mine()
{
    Database["gold"] += Database["miningToolLevel"] + 1;
    updateDisplay();
}

function checkButtons()
{
    if(Database["gold"] >= 30 && Database["miningToolLevel"] < 4)
    {
        upgradeToolButton.style.display = "block";
    }
    else
    {
        upgradeToolButton.style.display = "none";
    }

    if(Database["gold"] >= 100 && Database["minerIsActive"] == 0)
    {
        automaticMinerButton.style.display = "block";
    }
    else
    {
        automaticMinerButton.style.display = "none";
    }

    if((Database["minerInterval"] > 1000 && Database["gold"] >= 200) && Database["minerIsActive"] == 1)
    {
        upgradeAutomaticMinerButton.style.display = "block";
        upgradeAutomaticMinerButton.innerText = "Upgrade your automatic miner (it will mine 1 second faster) (200 gold)";
    }
    else if((Database["minerInterval"] == 1000 && Database["gold"] >= Database["goldPerInterval"] * 200) && Database["minerIsActive"] == 1)
    {
        upgradeAutomaticMinerButton.style.display = "block";
        upgradeAutomaticMinerButton.innerText = "Upgrade your automatic miner (it will mine 1 more per second) (" + Database["goldPerInterval"] * 200 + " gold)";
    }
    else
    {
        upgradeAutomaticMinerButton.style.display = "none";
    }
    
    if(Database["goldPerInterval"] >= 5 && Database["diamondsMine"] == 0)
    {
        openDiamondMineButton.style.display = "block";
    }
    else
    {
        openDiamondMineButton.style.display = "none";
    }

    if(Database["diamondsMine"] == 1)
    {
        diamondsMineTitle.style.visibility = "visible";
    }

    if(Database["manualIsActive"] == 0 && Database["gold"] >= 5)
    {
        buyManualButton.style.display = "block";
    }
    else
    {
        buyManualButton.style.display = "none";
    }
}

function updateDisplay()
{
    checkButtons();
    goldSpan.innerText = Database["gold"];

    if(Database["minerIsActive"] == 1)
    {
        automaticMinerCounterTitle.innerText = "Your automatic miner speed is currently "+ Database["goldPerInterval"] +" gold every "+ Database["minerInterval"] / 1000 +" seconds";
    }

    miningToolLevelDisplay.innerText = "Your mining tool level is " + (Database["miningToolLevel"] + 1);

    if(Database["manualIsActive"] == 1)
    {
        manualButton.style.display = "block";
    }
}

startGame();