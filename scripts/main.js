class GameCanvas {

	constructor(canvas, canvasWidth, canvasHeight) {
		this.canvas = canvas;
		canvas.height = canvasHeight;
		canvas.width = canvasWidth;
		this.startXGrassPos = 5;
	}

	clearCanvas() {
		this.drawRectangle(0, 0, this.canvas.width, this.canvas.height, "black");
	}

	drawBird(x, y) {
		try {
			this.drawRectangle(x - 10, y - 10, 20, 20, "red");
		} catch (e) {
			throw new Error("Wrong bird positiom. Cosider bird size is 20px: " + e)
		}
	}

	drawRectangle(x, y, width, height, color) {
		this.validateXPosition(x);
		this.validateYPosition(y);
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}

	validateXPosition(x) {
		if (!(x => 0 && x <= this.canvas.width)) {
			throw new Error("Wrong X position")
		}
	}

	validateYPosition(y) {
		if (!(y => 0 && y <= this.canvas.height)) {
			throw new Error("Wrong Y position")
		}
	}

	drawGrass() {

		this.drawRectangle(0, this.canvas.height - 30, this.startXGrassPos, this.canvas.height, "green");
		if (this.startXGrassPos <= this.canvas.width) {
			this.startXGrassPos += this.canvas.width / 110;


		}
	}
}

class Pointer {
	constructor(pipe) {
		this.pipe = pipe;
		this.number = 0;
		this.pointer = document.querySelector(".pointer").innerHTML;
	}
	count() {
		//if()
		this.number++;

	}
}

class GameAction {

	constructor(gameCanvas) {
		this.gameCanvas = gameCanvas;
		this.birdPosx = 20;
		this.birdPosY = 20;
		this.gravity = 4;
	}

	birdFreeFall() {
		this.birdPosY = this.birdPosY + this.gravity;
		this.redrawCanvas();
	}

	changeGravityKeyDownSpace() {
		this.gravity = -this.gravity;
	}

	redrawCanvas() {
		this.gameCanvas.clearCanvas();
		this.gameCanvas.drawBird(this.birdPosx, this.birdPosY);
	}

	moveXToCenter() {
		if (this.birdPosx <= 120) {
			this.birdPosx++;
		}
	}


}

class Pipe {
	constructor(gameAction, gameCanvas) {
		this.gameAction = gameAction;
		this.gameCanvas = gameCanvas;

		//DataRadom pipe
		this.pipePosXStart = this.gameCanvas.canvas.width;
		this.pipeWidth = 80;
		this.pipePosXEnd = this.pipePosXStart + this.pipeWidth;
		this.pipeSpaceBetweet = 200;
		this.pipeColor = "red";

		//Data upper pipe
		this.upperPipeYstartPos = 0;
		this.upperPipeYEndPos = 300;



		//Data lower pipe
		this.lowerPipeEndPos = this.gameCanvas.canvas.height;
		this.lowerPipeStartPos = this.upperPipeYEndPos + this.pipeSpaceBetweet;

	}
	createNewPipe() {
		if (this.pipePosXStart + this.pipeWidth <= 0) {
			this.upperPipeYEndPos = Math.floor((Math.random() * this.gameCanvas.canvas.height ) - this.pipeSpaceBetweet);
			console.log(this.upperPipeYEndPos);
			this.pipePosXStart = this.gameCanvas.canvas.width;

		}
		this.createPipe();
	}

	createUpperPipe(){
		this.gameCanvas.drawRectangle(this.pipePosXStart, this.upperPipeYstartPos, this.pipeWidth, this.upperPipeYEndPos, this.pipeColor);
	}

	createLowerPipe(){
		this.gameCanvas.drawRectangle(this.pipePosXStart, this.lowerPipeStartPos, this.pipeWidth, this.lowerPipeEndPos, this.pipeColor)
	}

	createPipe() {
		this.createUpperPipe();
		this.createLowerPipe();

		this.makePipeRun();
	}

	changePipeColor(){

	}


	makePipeRun() {
		if (this.pipePosXEnd >= 0) {
			this.pipePosXStart -= 5;
			console.log(this.pipePosXStart);
		}
	}
}


const gameCanvas = new GameCanvas(document.querySelector("canvas"), 666, 666);
const gameAction = new GameAction(gameCanvas);
const pipe = new Pipe(gameAction, gameCanvas)
const pointer = new Pointer(pipe);

function game() {
	gameAction.birdFreeFall();
	gameCanvas.drawGrass();
	gameAction.moveXToCenter();
	pipe.createNewPipe();
}

setInterval(game, 1000 / 60);