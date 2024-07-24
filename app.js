let gameboard=document.getElementById('gameboard')
let context=gameboard.getContext("2d")
let scoreText=document.getElementById('scoreVal')
let HEIGHT=gameboard.height
let WIDTH=gameboard.width
let UNIT=25
let foodX;
let foodY;
let snake=[{x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}]
let xVel=25
let yVel=0
let score=0
let active=true
let started=false
let paused=true
window.addEventListener('keydown',keyPress)
starGame()
function starGame(){
	context.fillStyle='#212121'
	context.fillRect(0,0,WIDTH,HEIGHT)
	createFood()
	drawSnake()
	displayFood()
}
function clearBoard(){
	context.fillStyle='#212121'
	context.fillRect(0,0,WIDTH,HEIGHT)
}
function createFood(){
	foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
	foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
}
function displayFood() {
	context.fillStyle='red'
	context.fillRect(foodX,foodY,UNIT,UNIT)
}
function drawSnake(){
	context.fillStyle='aqua'
	context.strokeStyle='#212121'
	snake.forEach((snakeVal)=>{
		context.fillRect(snakeVal.x,snakeVal.y,UNIT,UNIT)
		context.strokeRect(snakeVal.x,snakeVal.y,UNIT,UNIT)
	})
}
function moveSnake(){
	let head={x:snake[0].x+xVel,y:snake[0].y+yVel}
	snake.unshift(head)
	if(snake[0].x==foodX && snake[0].y==foodY){
		score+=1
		scoreText.innerText=score
		createFood()
	}
	else{
		snake.pop()
	}
	
}
function nextTick(){
	if(active && !paused){
		if(score<5){
		setTimeout(()=>{
			clearBoard()
			displayFood()
			moveSnake()
			drawSnake()
			gameOver()
			nextTick()
		},200)}
		else{
			setTimeout(()=>{
			clearBoard()
			displayFood()
			moveSnake()
			drawSnake()
			gameOver()
			nextTick()
		},100)
		}
	}
	else if(!active){
		clearBoard()
		let msg="Game Over !!"
		context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(msg,WIDTH/2,HEIGHT/2)
	}
}
function keyPress(event){
	if(!started){
		started=true
		nextTick()
	}
	if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
	active=true
	let LEFT=37
	let UP=38
	let RIGHT=39
	let DOWN=40
	switch(true){
		case(event.keyCode==LEFT && xVel!=UNIT):
			xVel=-UNIT
			yVel=0
			break;
		case(event.keyCode==UP && yVel!=UNIT):
			xVel=0
			yVel=-UNIT
			break;
		case(event.keyCode==RIGHT && xVel!=-UNIT):
			xVel=UNIT
			yVel=0
			break;
		case(event.keyCode==DOWN && yVel!=-UNIT):
			xVel=0
			yVel=UNIT
			break

	}
}
function gameOver(){
	switch(true){
	case(snake[0].x<0):
	case(snake[0].x>=WIDTH):
	case(snake[0].y<0):
	case(snake[0].y>=HEIGHT):
		active=false
		break;
	}
	for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            active = false;
        }
    }
}