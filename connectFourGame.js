var player1 = prompt("Player 1 ,you will be blue , enter your  name  ");
var player1Color = 'rgb(86, 151, 255)';
var player1Score = 0;

var player2 = prompt("Player 2 , you will be red , enter your  name  ");
var player2Color = 'rgb(237, 45, 73)';
var player2Score = 0;

var game_on = true;
var table = $('table tr');

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}
// function to return  color of cell
function returnColor(rowNumber,colNumber){
  return table.eq(rowNumber).find('td').eq(colNumber).find('button').css('background-color');
}
//fnction to change color of cell
function changeColor(rowNumber,colNumber,color){
  return table.eq(rowNumber).find('td').eq(colNumber).find('button').css('background-color',color);
}
 //function to check color of the bottom cell

 function checkBottom(colNumber){
   var bottomColor = returnColor(5,colNumber);
   for (var row = 5 ; row > -1 ; row--){
     bottomColor = returnColor(row,colNumber)
     if(bottomColor === 'rgb(128, 128, 128)' ){
       return row
     }
   }
 }
 // function to check if colors match or not
function checkMatch(firstCell,secondCell,thirdCell,fourthCell){
  return (firstCell ==  secondCell && firstCell === thirdCell && firstCell === fourthCell && firstCell !== 'rgb(128, 128, 128)' && firstCell !== undefined);

}
// function to check if there horizantal match // NOTE: in horizantal check the row is fixed and column is variable
function horizantalCheck(){
  for (var row = 0; row < 6 ; row++) {
    for (var col = 0 ; col < 4 ; col++){
      if( checkMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){

        return true;

      }else {
        continue;
      }
    }
  }
}
// function to check if there  vertical match // NOTE: in vertical check the row is variable and column is fixed
function verticalCheck(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if ( checkMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){

        return true;
      }
      else{
        continue;
      }

    }
  }
}
// function to check if there diagonal match // NOTE: in diagonal check row is variable and column is variable
function diagonalCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7;row++) {
      if ( checkMatch(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){

        return true;
      }else if (checkMatch(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {

        return true;
      }
      else {
        continue;
      }
        }
  }
}
// function to end the game

function endgame(currentName){
  if(currentPlayer === 1){
    player2Score += 1;
  }else {
    player1Score += 1;
  }

  $('h3').fadeOut('fast');
  $('h2').fadeOut('fast');
  $('h1').text(currentName+" has won! Refresh your browser to play again!").css("fontSize", "50px")
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click',function(){

  var setCol = $(this).closest("td").index();
  //test area



  var rowAvailable = checkBottom(setCol);

  changeColor(rowAvailable,setCol,currentColor);

  if( horizantalCheck() || verticalCheck() || diagonalCheck()){
    endgame(currentName);
  }
  currentPlayer = currentPlayer * -1 ;

  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }else {
    currentName = player2 ;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player2Color;
  }
    

})
