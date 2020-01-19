// setup() function is a library function in p5.js which helps to setup the variables and canvas 
// before starting to perform any operations on it
function setup(){
	createCanvas(400,400); //Creates the canvas of size 400 * 400
	stroke(255); //It is used to set color for the stroke
	strokeWeight(6); //Gives thickness to the stroke
	background(0); //Sets the background color of the canvas
	//setFrameRate(1); is used to restrict the no. of times draw() will be called in a second
}


//Draw function is a library function of p5.js which is used for drawing canvas 
// elements on the screen very easily, without much js code
function draw(){
	const arr = [];

	for(var i=0; i<200; i++){
		arr[i] = Math.random() * 100;
	}

	const shape = [2,20,5];

	// Since tensors are immutable any operation performed on the tensors
	// creates a new tensor, and these tensors go on occupying space in the GPU
	// so, to get rid of the extra tensors created, we need to clear the tensors that are not used
	// tf.tidy() is one function which does it, but the code which creates tensors need to be within the tidy()
	// dispose() is another function, which is called on the object name
	tf.tidy(function(){
		const vals = tf.tensor3d(arr,shape);
	}); 
	
	// OR vals.dispose();

	//vals.print();
	console.log(tf.memory().numTensors); //Shows the number of tensors currently active in the system
	
	noLoop();
}