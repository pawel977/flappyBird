class GameCanvas{

	constructor(canvas, canvasWidth, canvasHeight){
		this.canvas = canvas;
		canvas.height = canvasHeight;
		canvas.width = canvasWidth;
		this.startXGrassPos = 5;
	}
	
	clearCanvas(){
		this.drawRectangle(0, 0, this.canvas.width, this.canvas.height, "black");
	}
	
	drawBird(x, y){
		try{
			this.drawRectangle(x-10, y-10, 20, 20, "red");
		}catch(e){
			throw new Error("Wrong bird positiom. Cosider bird size is 20px: " + e)
		}
	}
	
	drawRectangle(x, y, width, height, color){
		this.validateXPosition(x);
		this.validateYPosition(y);
		let ctx  = this.canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}
	
	validateXPosition(x){
		if(!(x => 0 && x <= this.canvas.width)){
			throw new Error("Wrong X position")
		}
	}
	
	validateYPosition(y){
		if(!(y => 0 && y <= this.canvas.height)){
			throw new Error("Wrong Y position")
		}
	}
	
	drawGrass(){
		
		this.drawRectangle(0, this.canvas.height - 30, this.startXGrassPos , this.canvas.height, "green");
		if(this.startXGrassPos <= this.canvas.width){ 
			this.startXGrassPos += this.canvas.width/110;
		
			
		}
	}
}
	
class Pointer{
	constructor(pipe){
		this.pipe = pipe;
		let number = 0;
		const pointer = document.querySelector(".pointer").innerHTML;
	}
	count(){
		//if()
		this.number++;
		
	}
}

class GameAction{

	constructor(gameCanvas){
		this.gameCanvas = gameCanvas;
		this.birdPosx = 20;
		this.birdPosY = 20;
		this.gravity = 4;
	}
	
	birdFreeFall(){
		this.birdPosY = this.birdPosY + this.gravity;
		this.redrawCanvas();
	}
	
	changeGravity(gravity){
		this.gravity = gravity;
	}

	redrawCanvas(){
		this.gameCanvas.clearCanvas();
		this.gameCanvas.drawBird(this.birdPosx, this.birdPosY);
	}
	
	moveXToCenter(){
		if(this.birdPosx <= 120){
			this.birdPosx ++;
		}
	}
	
	
}

class Pipe{
	constructor(gameAction, gameCanvas){
		this.gameAction = gameAction;	
		this.gameCanvas = gameCanvas;
		console.log(gameCanvas);
		
		
		//pipeData
		this.pipeWidth = 90; 
		this.pipePosXStart = this.gameCanvas.canvas.width;
		this.pipePosXEnd = this.pipePosXStart + this.pipeWidth;
		this.pipeColor = "orange";
		this.speedOfPipes = 5;
		this.pipePosYStartUpperPipe = 0;
		
		//upperPipe Data
		this.pipePosYEndUpperPipe = this.pipePosYStartUpperPipe + 200;
		this.UpperPipeHeight = 200;
		
		//lowerPipe Data
		this.pipePosYStartLowerPipe = this.gameCanvas.canvas.height;
		this.pipePosYEndLowerPipe = 300//this.canvas.height;
		
	}
		
		createUpperPipe(){
			this.gameCanvas.drawRectangle(this.pipePosXStart, 0,
											this.pipeWidth, this.pipePosYEndUpperPipe, "orange");
			
		}
		
		createLowerPipe(){
			this.gameCanvas.drawRectangle(this.pipePosXStart, this.pipePosYStartLowerPipe,
											this.pipeWidth, -this.pipePosYEndLowerPipe, "orange");
			//console.log(this.pipePosXStart - this.pipeWidth, this.pipePosYStartLowerPipe,
				//							this.pipeWidth, - this.pipePosYEndLowerPipe,)
			
		}
		
		moveBothPipesRun(){			
			if(this.pipePosXEnd >= 0){
				this.pipePosXStart -= this.speedOfPipes;
				console.log()
			}
			
			
		}
		
		
		createNewPipe(){
			this.createUpperPipe();
			this.createLowerPipe();
			this.moveBothPipesRun();
			if(this.pipePosXStart + this.pipeWidth <= 0){
				this.pipePosXStart  = this.gameCanvas.canvas.width;
				console.log(this.pipePosXStart)
			}
		}
}


const gameCanvas = new GameCanvas(document.querySelector("canvas"), 666, 666);
const gameAction = new GameAction(gameCanvas);
const pipe = new Pipe(gameAction, gameCanvas)
const pointer = new Pointer(pipe);
setInterval(() =>{
	
				gameAction.birdFreeFall();
				gameCanvas.drawGrass();
				gameAction.moveXToCenter();
				pipe.createNewPipe();
				
			},
			1000/60);

			
