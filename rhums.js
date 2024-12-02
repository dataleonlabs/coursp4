var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });

const rhums = {
    'captain_morgan': { qty: 10, price: 30},
    'barcadi': { qty: 19, price: 10},
    'old_nick': { qty: 5, price: 30},
}

// First, define our base classifier type (a multi-label classifier based on winnow):
var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
	binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
});

// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
var WordExtractor = function(input, features) {
	input.split(" ").forEach(function(word) {
		features[word]=1;
	});
};

// Initialize a classifier with the base classifier type and the feature extractor:
var intentClassifier = new limdu.classifiers.EnhancedClassifier({
	classifierType: TextClassifier,
	featureExtractor: WordExtractor
});

// Train and test:
intentClassifier.trainBatch([
	{input: "Je veux boire un barcadi", output: "barcadi"},
	{input: "J'aime du barcardi", output: "barcadi"},
	{input: "Rien du tout", output: "rien"},
	{input: "Je veux juste de l'eau", output: "rien"},
	{input: "je n'aime pas vos boisons", output: "rien"},
	{input: "je viens juste prendre du pain", output: "rien"},
	{input: "Aurevoir et à demain", output: "rien"},
	{input: "Je veux boire un captain_morgan", output: "captain_morgan"},
	{input: "J'aime du captain_morgan", output: "captain_morgan"},
	{input: "Je veux boire un old_nick", output: "old_nick"},
	{input: "J'aime du old_nick", output: "old_nick"},
]);

console.log('Bonjour')
const rhum_want = prompt("Le rhum qui vous aimez ?");
predicted_response = intentClassifier.classify(rhum_want);
console.log(predicted_response)

if (predicted_response[0] == "rien") {
	console.log('merci et aurevoir !')
} else {
	console.log("La boison", predicted_response[0], "est de", rhums[predicted_response[0]]['price'])
} 
