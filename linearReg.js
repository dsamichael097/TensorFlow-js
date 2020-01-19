
/*

The map function used below, maps a set of values to another set of values
that is, if Map(a,0,1,10,20);
It sets the values for a from 10 to 20, if they are between 0 and 1
the same goes for reverse operation

*/
const x_val = [];
const y_val = [];

let m,b;

const learningRate = 0.05;
const optimizer = tf.train.sgd(learningRate);

function setup(){
	createCanvas(500,500);
	stroke(255);
	strokeWeight(8);
	setFrameRate(10);
	m = tf.variable(tf.scalar(random(1)));
	b = tf.variable(tf.scalar(random(1)));
}

// Function that calculates the mean squared error between the predicted points and the actual points
function loss(pred,label){
	return pred.sub(label).square().mean();
}

function predict(x_val){
	//To predict the value of y, we need to run it in the formula
	// ye = mx + b;
	// But to use tensorflow math functions, we'll first need to convert 
	// the array accepted to a tensorflow
	const x = tf.tensor1d(x_val);
	// x and b are the slope and y intercept that will be adjusted as per the learning rate
	// of the algorithm, to minimize the error
	const y = x.mul(m).add(b);
	return y;
}


function draw(){
	background(0);
	//line(0,0,500,500);
	
	// Train the Model
	// Since the parameters to loss, needs to be tensors, we need to convert y_val to a tensor
	// The optimizer trains the model, and adjusts the values of the tensor variables m and b
	// So that the error calculated is minimum
	if(x_val.length > 0){
		tf.tidy(() => {
			const ys = tf.tensor1d(y_val);
			optimizer.minimize(() => loss(predict(x_val), ys));
		});
	}
	
	
	for(var i=0; i<x_val.length; i++){
		let x = map(x_val[i],-1,1,0,width);
		let y = map(y_val[i],1,-1,0,height);
		point(x,y);
	}
	
	const x_line = [-1,1];
		const y_ten = tf.tidy(() => predict(x_line));
		// dataSync() function converts the tensor to a normal array
		// however this is not the best technique, but it works none the less
		const y_line = y_ten.dataSync();
		y_ten.dispose();
	
	
		let x1 = map(x_line[0],-1,1,0,width);
		let x2 = map(x_line[1],-1,1,0,width);
		
		
		let y1 = map(y_line[0],1,-1,0,height);
		let y2 = map(y_line[1],1,-1,0,height);
	
		line(x1,y1,x2,y2);
	
	
	
}

// mousePressed() is activated as soon as mouse buttons are pressed
function mousePressed(){
	let x = map(mouseX,0,width,-1,1);
	let y = map(mouseY,0,height,1,-1);
	
	x_val.push(x);
	y_val.push(y);
}