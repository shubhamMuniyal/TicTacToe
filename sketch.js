let players=['X', 'O'];

let board=[
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let available=[];
let currentPlayer, count=0;

function setup() {
    createCanvas(400, 400);
    frameRate(4);
    currentPlayer=floor(random(players.length));
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            available.push([i,j]);
        }
    }
}

function nextTurn(){
    currentPlayer=(currentPlayer+1)%players.length;
    let randomAvail=floor(random(available.length));
    let i=available[randomAvail][0];
    let j=available[randomAvail][1];
    available.splice(randomAvail,1);
    board[i][j]=players[currentPlayer];
    // console.log(currentPlayer);
    
}

function equals3(a, b, c){
    return (a==b && b==c && (a=='X' || a=='O'));
}

function checkWinner(){
    for(let i=0;i<3;i++){
        if(equals3(board[i][0], board[i][1], board[i][2]) ){
            return board[i][0];
        }
    }

    for(let i=0;i<3;i++){
        if(equals3(board[0][i], board[1][i], board[2][i]) ){
            return board[0][i];
        }
    }
    if(equals3(board[0][0], board[1][1], board[2][2]) ){
        return board[0][0];
    }
    if( equals3(board[2][0], board[1][1], board[0][2]) ){
        return board[2][0];
    }
    if(available.length==0){
        return "tie";
    }
    return null;
}

function draw() {
   
    w=width/3;
    h=height/3;
    background(89);
    line(w,0,w,height);
    line(w*2,0,w*2,height);
    line(0,h,width,h);
    line(0,2*h,width,2*h);

    strokeWeight(6);

    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            let x=i*w+w/2;
            let y=j*h+h/2;
            let xr=w/4;
            let spot=board[i][j];
            if (spot == 'X'){
                
                line(x-xr,y-xr,x+xr,y+xr);
                line(x-xr,y+xr,x+xr,y-xr);
            }
            else if (spot == 'O'){
                ellipse(x,y, xr*2);
            }
        }
    }
    // console.log(count++);
    console.log(second());
    let winner=null;
    winner=checkWinner();
    if(winner!=null){
        console.log("winner is"+winner);
        noLoop();
    }
    else{
        nextTurn();
    }
    
}