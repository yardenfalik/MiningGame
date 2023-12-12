const SIZE = 50;
var htmlData = "";
var mine = new Array(SIZE);
var playerPosition = [0, 0];
var randoms = new Array(100);
var diamondCounter = 0;

initMine();

function initMine()
{
    for(var i = 0; i < randoms.length; i++)
    {
        randoms[i] = new Array(2);
        randoms[i][0] = getRandomInt(50);
        randoms[i][1] = getRandomInt(50);
    }

    for (var i = 0; i < mine.length; i++)
    {
        mine[i] = new Array(SIZE);
        for(var k = 0; k < mine.length; k++)
        {
            mine[i][k] = ' '
        }
    }
    mine[0][0] = '0';
    updateMine();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    mine[playerPosition[0]][playerPosition[1]] = checkForDiamond();
    switch (event.key) {
      case "ArrowDown":
        playerDown();
        break;
      case "ArrowUp":
        playerUp();
        break;
      case "ArrowLeft":
        playerLeft();
        break;
      case "ArrowRight":
        playerRight();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    updatePlayer();
    updateMine();
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // the last option dispatches the event to the listener first,
  // then dispatches event to window
  
function checkForDiamond()
{
    for(var i = 0; i < randoms.length; i++)
    {
        if(playerPosition[0] == randoms[i][0] && playerPosition[1] == randoms[i][1])
        {
            diamondCounter++;
            updateScore();
            return '⟡';
        }
    }

    return ' ';
}

function updateScore()
{
    document.getElementById("counter").innerText = diamondCounter;
}


function playerDown()
{
    playerPosition[0] += 1;
}

function playerUp()
{
    playerPosition[0] -= 1;
}

function playerRight()
{
    playerPosition[1] += 1;
}

function playerLeft()
{
    playerPosition[1] -= 1;
}

function updatePlayer()
{
    mine[playerPosition[0]][playerPosition[1]] = '0';
}

function updateMine()
{
    htmlData = "";
    for(var i = 0; i < mine.length; i++)
    {
        for(var k = 0; k < mine.length; k++)
        {
           htmlData += mine[i][k] + '  ';
        }
        htmlData += '\n\n'
    }

    document.getElementById("mine").textContent = htmlData;
    console.log(htmlData);
}



