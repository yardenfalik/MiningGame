//--------------------
var Database = {"gold" : 0, "miningToolLevel" : 0, "minerIsActive" : 0, "minerInterval" : 10000, "goldPerInterval" : 1, "diamondsMine" : 0};
//--------------------
var goldSpan = document.getElementById("goldSpan");
var upgradeToolButton = document.getElementById("upgradeToolButton");
var automaticMinerButton = document.getElementById("automaticMinerButton");
var upgradeAutomaticMinerButton = document.getElementById("upgradeAutomaticMinerButton");
var automaticMinerCounterTitle = document.getElementById("automaticMinerCounterTitle");
var openDiamondMineButton = document.getElementById("openDiamondMineButton");
var diamondsMineTitle = document.getElementById("diamondsMineTitle");

//temoprerly
function give()
{
    Database["gold"] += 200;
    updateDisplay();
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
        console.log(savedData);
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

function mine()
{
    Database["gold"] += Database["miningToolLevel"] + 1;
    updateDisplay();
}

function checkButtons()
{
    if(Database["gold"] >= 30 && Database["miningToolLevel"] <= 5)
    {
        upgradeToolButton.style.visibility = "visible";
    }
    else
    {
        upgradeToolButton.style.visibility = "hidden";
    }

    if(Database["gold"] >= 100 && Database["minerIsActive"] == 0)
    {
        automaticMinerButton.style.visibility = "visible";
    }
    else
    {
        automaticMinerButton.style.visibility = "hidden";
    }

    if((Database["minerInterval"] > 1000 && Database["gold"] >= 200) && Database["minerIsActive"] == 1)
    {
        upgradeAutomaticMinerButton.style.visibility = "visible";
        upgradeAutomaticMinerButton.innerText = "Upgrade your automatic miner (it will mine 1 second faster) (200 gold)";
    }
    else if((Database["minerInterval"] == 1000 && Database["gold"] >= Database["goldPerInterval"] * 200) && Database["minerIsActive"] == 1)
    {
        upgradeAutomaticMinerButton.style.visibility = "visible";
        upgradeAutomaticMinerButton.innerText = "Upgrade your automatic miner (it will mine 1 more per second) (" + Database["goldPerInterval"] * 200 + " gold)";
    }
    else
    {
        upgradeAutomaticMinerButton.style.visibility = "hidden";
    }
    
    if(Database["goldPerInterval"] >= 5 && Database["diamondsMine"] == 0)
    {
        openDiamondMineButton.style.visibility = "visible";
    }
    else
    {
        openDiamondMineButton.style.visibility = "hidden";
    }

    if(Database["diamondsMine"] == 1)
    {
        diamondsMineTitle.style.visibility = "visible";
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
}