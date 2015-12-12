
/*global variables*/

width = 8;
length = 8;
grid = userBoard.board;
opponGrid = oppBoard.board;
var MAX = 20;
var userTurn = false;
var start = false;
var count = 0;


/*function that calls the functions*/
function showGrid() {
if (start == false)
{
	var beginGame = document.getElementById("startGameDiv");
	beginGame.innerHTML = startGameButton();
	startMove();
}
else if (start == true){
var beginGame = document.getElementById("startGameDiv");
	beginGame.innerHTML = ""; //get rid of start game interface
	
    var theGrid = document.getElementById("gridDiv");
	var oppGrid = document.getElementById("opponentGrid");
    theGrid.innerHTML = genGrid(width, length, grid);
	oppGrid.innerHTML = genOpponentGrid(width, length, opponGrid);
	addOppClickHandlers();
	//GENERATE AI BOATS (5) //possibly add more?
	genRandomOppBoatPlacement(opponGrid);
	genRandomOppBoatPlacement(opponGrid);
	genRandomOppBoatPlacement(opponGrid);
	genRandomOppBoatPlacement(opponGrid);
	genRandomOppBoatPlacement(opponGrid);
	
	//load user interface for user to place boats
	var boats = document.getElementById("boatPlacement");
	boats.innerHTML = placeBoatsInterface();
	drawCanvas() 
	
	}
}

function drawCanvas() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FFFFFF";
ctx.font = "15px Arial";
var gradient = ctx.createLinearGradient(0,0,c.width,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
ctx.fillStyle = gradient;
ctx.fillText("Welcome, Please follow the instructions below",10,50);
}

//loads start page, must press 'Start Game!' to load actual game page
function startGameButton() {
var html = "";

html += "<h1>Welcome to Battleship!</h1>"
html += "Documentation for this project can be found here: <a href = 'documentation.html' target = '_blank'>Documentation</a>"
html += "<p>In this version of battleship, you and your opponent will each be given 5 boats to place on the board</p>"
html += "<p>and each boat will be 4 squares long.</p>"
html += "<p>After you place all your boats, you will attack first. Attack by clicking on one of the squares in the enemy's grid</p>"
html += "<p>If you or your opponent hit a boat, the square will turn red. If you miss, the square will turn blue.</p>"
html += "<h2>Have fun!</h2>"

html += "<input type = 'button' onclick = 'startGame()' value = 'Start Game!'></input>";

return html;
}

//startGame() function allows page to move on from start game page
function startGame() {
start = true;
showGrid();
}


//generates the AI grid
function genOpponentGrid(width, length, grid){
	var row = length;
var col = width;
var g = grid;
var html = "";
var r = 0;
var c = 0;
var gClass = "white";



html += "<h1><p>Enemy Grid</p></h1>";

html += "<table border = '1' id = 'enemy'><br><br>"; //opening table tag
for (r = 0; r < row; r++)
{
	html += "<tr>";
		for ( c = 0; c < col; c++)
		{
			
					html +=	"<td class =\"" + gClass + "\">" + "</td>";
					
		}//end nested for loop
		
	html += "</tr>";

}//end of for loop

html += "</table>";


return html;
}



//generates the user grid
function genGrid(width, length, grid){
var row = length;
var col = width;
var g = grid;
var html = "";
var r = 0;
var c = 0;
var gClass = "white";



html += "<h1><p>Your Grid</p></h1>";

html += "<table border = '1' id = 'userGrid'><br><br>"; //opening table tag
for (r = 0; r < row; r++)
{
	html += "<tr>";
		for ( c = 0; c < col; c++)
		{
			
					html +=	"<td class =\"" + gClass + "\">" + "</td>";
					
		}//end nested for loop
		
	html += "</tr>";

}//end of for loop

html += "</table>";


return html;

}//end function

//adds click handlers to the AI grid
function addOppClickHandlers(){
var oppGrid = document.getElementById("opponentGrid");
var cells = oppGrid.getElementsByTagName("td");

for (var i = 0; i < cells.length; i++)
{
cells[i].onclick = function (){ 
		var miss = "miss";
		var hit = "hit";
		var col = this.cellIndex;
		var row = this.parentNode.rowIndex;
		var dispCol = col + 1;
		var dispRow = row + 1;
		var coords = document.getElementById("gridCoords");
		var v = document.getElementById('explosionSound');
		var m = document.getElementById('miss');
	
if (userTurn == true)	
{
		if (oppBoard.board[row][col] == 1) //if part of boat is in this location
	{
		this.className = "hit"; 
		v.play();
		oppBoard.board[row][col] = 2; //2 indicates clicked and hit
		coords.innerHTML = "<h2 style ='float: center'> cell: (" + dispRow + "," + dispCol + ") has been modified!</h2>"; //displays message notifying user that grid has been modified for testing purposes //possibly remove
		oppBoard.hits++;; //increment hit count for AI grid model (for testing if gameOver())
		userTurn = false; //switch to AI's turn
		window.setTimeout(AIAttack, 2000);
	}
	else if (oppBoard.board[row][col] == 0) //if nothing is in this location
	{
		this.className = "miss";
		m.play();
		oppBoard.board[row][col] = 3; //3 indicates clicked and missed
		coords.innerHTML = "<h2 style ='float: center'> cell: (" + dispRow + "," + dispCol + ") has been modified!</h2>";
		userTurn = false; //switch to AI's turn
		window.setTimeout(AIAttack, 2000);
	}
	else if (oppBoard.board[row][col] = 2) 
	{
		coords.innerHTML = "<h1>You already clicked here! Please choose another square</h1>";
	}
	else if (oppBoard.board[row][col] == 3)
	{
		coords.innerHTML = "<h1>You already clicked here! Please choose another square</h1>";
	}
	
	gameOver(oppBoard.board);//check to see if game is over and who has won
}
else
	{
	//
	}
}
}
}//end function

		
function AIAttack()
{

var grid = userBoard.board;

var m = document.getElementById('miss');
var v = document.getElementById('explosionSound');
var x = Math.floor(Math.random()*8);
var y = Math.floor(Math.random()*8);
var gridTable = document.getElementById("userGrid"); //get a pointer to the users grid
var cell = gridTable.rows[x].cells[y]; //get pointer to cell

while (grid[x][y] == 3 || grid[x][y] == 2) //if AI attempts to 'click' a square that it has already clicked
	{
		x = Math.floor(Math.random()*8); //generate new random number
		y = Math.floor(Math.random()*8); //generate new random number
		cell = gridTable.rows[x].cells[y]; //point to the newly generated cell
	}

	if (grid[x][y] == 1)
		{
		cell.className = "hit";
		v.play();
		grid[x][y] = 2; //update the model to square being hit
		userBoard.hits++;
		userTurn = true;
		}
	else if (grid[x][y] == 0)
		{
		cell.className = "miss";
		m.play();
		grid[x][y] = 3; //update the model to square being missed
		userTurn = true;
		}

gameOver(grid); //check if game is over
	
		
	
}

//checks if the game is over
//by checking if MAX squares have been marked 'hit' on either grid
function gameOver(theGrid) 
{
var endGame = document.getElementById("endDiv");
	if (userBoard.hits == MAX)
		{
			userTurn = false;
			endGame.innerHTML += "Game over! The Computer has beat you!";
			endGame.innerHTML += "<p>To begin a new game, refresh the page<p>";
		}
	else if (oppBoard.hits == MAX)
		{
			userTurn = false;
			endGame.innerHTML += "<h2>YOU WINNNNNNN!!!!!</h2>";
			endGame.innerHTML += "<p>To begin a new game, refresh the page<p>";
		}
	
}

//generates random boat placement for AI grid
function genRandomOppBoatPlacement(oppGrid) 
 {

var o = "";
var x = Math.floor(Math.random()*8);//generate random number between 0-7 for x coordinate
var y = Math.floor(Math.random()*8);//generate random number between 0-7 for y coordinate
var ran = Math.floor(Math.random()*2);//generate random number for orientation (0 = vertical 1 = horizontal)


/* randomly choose boats orientation */
if (ran == 1) 
{o = "horizontal"}
else if (ran == 0) {o = "vertical"};

var gridTable = document.getElementById("enemy"); //get a pointer to the enemy grid
var cell = gridTable.rows[x].cells[y]; //get a pointer to the specified cell

while(checkIfValidLocation(oppGrid, x, y, o) == false) //if location selected won't fit a whole boat, generate new coordinates
{
	//generate new coordinates and check again again
	x = Math.floor(Math.random()*8);
	y = Math.floor(Math.random()*8);
	cell = gridTable.rows[x].cells[y]; 
}


if (o == 'vertical')
	{
		if (x <= 3) //if row 0-3
			{
			for (var i = 0; i < 4; i++) //fill in cells accordingly
				{
				 oppGrid[x + i][y] = 1; //update the model
				}
			}
		else if (x >= 4) //if row 4-7
			{
			for (var i = 0; i < 4; i++) //fill in cells accordingly
				{
				oppGrid[x - i][y] = 1; //update the model
				}
			}
		
	}
else if (o == 'horizontal')
	{
		if (y <= 3) //if in column 0-3
			{
			for (var i = 0; i < 4; i++)//fill in cells accordingly
				{
				oppGrid[x][y + i] = 1; //update the model
				}
			}
		else if (y >= 4)//if in column 4-7
			{
			for (var i = 0; i < 4; i++)//fill in cells accordingly
				{
				oppGrid[x][y - i] = 1; //update the model
				}
			}
	}


}

//function that takes in the model of the enemy grid, and checks if the given coordinate is a valid location to randomly place boat
function checkIfValidLocation(oppGrid, x, y, o){


if (y <= 3 && o == 'horizontal') //y coord is 0-3 and orientation is horizontal (grid won't try to place boat in the left direction)
{
	if (oppGrid[x][y] == 1 || oppGrid[x][y+1] == 1 || oppGrid[x][y+2] == 1 || oppGrid[x][y+3] == 1) //if any of the squares right of coordinate are filled
		{
			return false;
		}
	else return true;
}
else if (y >= 4 && o == 'horizontal') //y coord is 4-7 (grid won't try to place boat in right direction)
{
	if (oppGrid[x][y] == 1 || oppGrid[x][y-1] == 1 || oppGrid[x][y-2] == 1 || oppGrid[x][y-3] == 1) //if any squares 3 spaces left of given coordinate are filled return false
		{
			return false;
		}
	else return true;
}
else if (x <= 3 && o == 'vertical') //x coord is 0-3 and orientation is vertical
{
	if (oppGrid[x][y] == 1 || oppGrid[x+1][y] == 1 || oppGrid[x+2][y] == 1 || oppGrid[x+3][y] == 1)
		{
			return false;
		}
	else return true;
}
else if (x >= 4 && o == 'vertical') //x coord is 4-7 and orientation is vertical
{
	if (oppGrid[x][y] == 1 ||  oppGrid[x-1][y] == 1 || oppGrid[x-2][y] == 1 || oppGrid[x-3][y] == 1)
	{
		return false;
	}
	else return true;
}
else
		return false;
	
}// end check function



function placeBoatsInterface()
{
var html = "";

	html += "<h2>Select X and Y starting coordinates for 5 ships</h2>"
	html += "<h5>Please enter X value for the starting position of a boat (must be a value from 1-8)</h5> <input name = 'boatStart' type = 'text' maxlength='1' id = 'boatX'/>"
	html += "<h5>Please enter Y value for the starting position of a boat (must be a value from 1-8)</h5> <input name = 'boatStart' type = 'text' maxlength='1' id = 'boatY'/>"
	html += "<h5>Please select the orientation you would like this ship to be</h5> <select id = 'orientation'><option value = 'vertical'>Vertical</option> <option value = 'horizontal'>Horizontal</option>"

	html += "<input type = 'button' onclick = 'placeBoat(userBoard.board, count)' value = 'Submit'></input>"



return html;

}

//removes the text when a boat placement error is given to user
function closeDiv(){
document.getElementById("gridCoords").style.display=" none";
}

//places a single boat for the user
function placeBoat(grid, count){
var x = document.getElementById('boatX').value - 1;//get row of the table
var y = document.getElementById('boatY').value - 1;//get column of the table
var o = document.getElementById('orientation').value;//get user input orientation

var gridTable = document.getElementById("userGrid"); //get a pointer to the users grid
var cell = gridTable.rows[x].cells[y]; //get a pointer to the specified cell

var message = document.getElementById("gridCoords");
message.innerHTML = ""; //before changing the gridCoords div to display: inline, make sure it has nothing in it.
document.getElementById("gridCoords").style.display=" inline";





if (checkIfValidLocation(grid, x, y, o) == false) //check if the boat won't intersect with any other placed boats
	{
		message.innerHTML = "Boat will not fit in this location, please re-evaluate placement";
		window.setTimeout(closeDiv, 5000); //after 5 seconds, remove the message
		
	}
else if (checkIfValidLocation(grid, x, y, o) == true)
{

cell.className = "boat"; //change cell to black, indicating that part of a ship is present
grid[x][y] = 1; //update the model info

if (o == 'vertical')
	{
		if (x <= 3) //if row 0-3
			{
			for (var i = 0; i < 4; i++) //fill in cells accordingly
				{
				 cell = gridTable.rows[x + i].cells[y];
				 cell.className = "boat";
				 grid[x + i][y] = 1; //update the model
				 
				}
			}
		else if (x >= 4) //if row 4-7
			{
			for (var i = 0; i < 4; i++) //fill in cells accordingly
				{
				cell = gridTable.rows[x - i].cells[y];
				cell.className = "boat";
				grid[x - i][y] = 1; //update the model
				
				}
			}
		
	}
else if (o == 'horizontal')
	{
		if (y <= 3) //if in column 0-3
			{
			for (var i = 0; i < 4; i++)//fill in cells accordingly
				{
				cell = gridTable.rows[x].cells[y + i];
				cell.className = "boat";
				grid[x][y + i] = 1; //update the model
				
				}
			}
		else if (y >= 4)//if in column 4-7
			{
			for (var i = 0; i < 4; i++)//fill in cells accordingly
				{
				cell = gridTable.rows[x].cells[y - i];
				cell.className = "boat";
				grid[x][y - i] = 1; //update the model
				
				}
			}
	}
	count++ //boat has been placed, increment count (max 4 boats)
	
if (checkIfMaxBoats(grid) == true)
		{
		var placeBoatInterface = document.getElementById("boatPlacement");
		placeBoatInterface.innerHTML = ""; //remove the interface so user cannot add more boats
		var canvasElement = document.getElementById("canvasDiv");
		canvasElement.style.display = " none";
		}
}//end else (is valid location)

}

function checkIfMaxBoats(grid)
{
	var placeBoatInterface = document.getElementById("boatPlacement");
	var count = 0;
	
	var gridLength = 8; //grid is 8x8
	
	for (var i = 0; i < gridLength; i++)
		{
			for (var j = 0; j < gridLength; j++)
			{
				if (grid[i][j] == 1) //if square has a '1' (indicates boat is placed)
					{
						count++; //increment count
					}
				else
					{
						//do nothing
					}
			}
			
		}
		
	if (count == MAX)
	{
		userTurn = true; //allows user to now begin clicking on enemy grid.
		return true;
		
	}
	else
	{
		return false;
	}
		
}

/*
ANIMATION
*/

var bsImg
var msPerFrame = 5;
var frameCount;
var moveDist = 1;
var bsDivWidth;
var bsBottom;


function startMove() {
bsImg = document.getElementById("bsImg");

var bsDiv = document.getElementById("animationDiv");
bsDivWidth = bsDiv.offsetWidth;

bsBottom = -1024;
setTimeout(moveImg, msPerFrame);
}

function moveImg(){
bsBottom += moveDist;
bsImg.style.bottom = bsBottom + "px";

if (bsBottom < 0){
	{
	setTimeout(moveImg, msPerFrame);
	}
}
}

/*
End Animation
*/


/*
//part of Assignment 5, possibly remove for final assignment?
function genLogin(){
 var html = "";
 html += "<h1>Welcome to Battleship!</h1><br><br>"
 html += "<h1>Username</h1><input type = 'text' id = 'username'><br>"
 html += "<h1>Password</h1><input type = 'password' id = 'pw'><br>"
 html += "<input type = 'button' onclick = 'loadSyncPost()' value = 'Login'></input>"
 
 return html;
}
//part of Assignment 5, possibly remove for final assignment?
function clearLocalStorage(){
localStorage.clear();
if (localStorage.length == 0)
	{
	alert("Local Storage has been cleared");
	}

}

//will not count for XMLHttpRequest inclusion for final assignment, possibly remove.
function loadSyncPost() {
var username = document.getElementById("username").value; //retrieve username
var pw = document.getElementById("pw").value; //retrieve password
var user = "userName=" + username;
var password = "&password=" + pw;
var data = user + password; //put it in a format that Ajax will accept
//begin request
var localRequest = new XMLHttpRequest();
localRequest.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
localRequest.send(data);

if (localRequest.status == 200) //correct status code returned
{
	var feedback = document.getElementById("loginDiv");
	var responseJson = JSON.parse(localRequest.response);

	
	if (responseJson["result"] == "valid")
		{
		feedback.style.right = "10px";
		feedback.style.top = "10px";
		var timeStamp = responseJson["timestamp"];
		var name = responseJson["userName"];
		var login = name + " " + timeStamp;
		
		localStorage.setItem('cs2550timestamp', login);
		var loginInfo = localStorage.getItem("cs2550timestamp")
		
		feedback.innerHTML = "<h1>Login Successful!</h1><br><h3>" + loginInfo + "</h3><br>"
		feedback.innerHTML += "<input type = 'button' onclick= 'clearLocalStorage()' value = 'Clear Local Storage'></input>"
		
		loginSuccessful = true;
		showGrid();
		}
		else 
		{
		feedback.innerHTML = responseJson["result"];
		feedback.innerHTML += "<h1>Unable to login!</h1>";
		}
} //end if
else
{
feedback.innerHTML = "<h1>Error has occurred...</h1>";
}
}
*/
