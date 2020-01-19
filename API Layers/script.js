
// It is used to define what kind of model
// we will be using. Sequential model executes all the 
// layers in sequence, i.e, the input, followed by hidden, followed by output
const model = tf.sequential();

// The dense function states that the nodes of the two layers are fully connected
const hidden = tf.layers.dense({
	units : 4, // The no. of nodes this layer will have
	inputShape : [3], // Defines the no. of inputs that the first layer will have in an array type
	activation : 'sigmoid' // The Activation function
});

const output = tf.layers.dense({
	units : 1,
	activation : 'sigmoid'
});

//Add the layers to the model
model.add(hidden);
model.add(output);

//Initialize the optimizer with a learning curve that will minimize the loss
const adamOpt = tf.train.adam(0.05);

//Once all things are set, compile the model
model.compile({
	optimizer : adamOpt,
	loss : tf.losses.meanSquaredError
});

// Once the model is compiled and ready, we need to train the model
// To train the model, we need to pass the train data to the fit() function

// The fit function takes two parameters, the input 2d tensor and an o/p 2d tensor
// The third param, that is config is optional, which includes epochs and other such things

const input = tf.tensor2d([
	[0,1,2],
	[1,2,3],
	[2,3,4],
	[3,4,5],
	[4,5,6],
	[5,6,7],
	[6,7,8],
	[7,8,9],
	[8,9,10],
	[9,10,11],
	[10,11,12],
	[11,12,13]
]);

const actIp = tf.tensor2d([
	[0,1,2],
	[1,2,3],
	[2,3,4],
	[3,4,5],
	[4,5,6],
	[5,6,7],
	[6,7,8],
	[7,8,9],
	[8,9,10],
	[9,10,11],
	[10,11,12],
	[11,12,13]
]);

const op = tf.tensor2d([
	[1],
	[2],
	[3],
	[4],
	[5],
	[6],
	[7],
	[8],
	[9],
	[10],
	[11],
	[12]
]);

//Training the model with labels, i.e known o/p

train().then(() => {
	console.log("Training Complete");
	console.log("Predicting O/p now...");
	const actOp = model.predict(actIp);
	actOp.print();
});

async function train(){
	for(var i=0; i<100; i++){
		const response = await model.fit(input,op,{epochs : 20, shuffle : true});
		console.log(response.history.loss[0]);
	}
}




 