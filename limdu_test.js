var limdu = require('limdu');


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
	{input: "I want an apple", output: "apl"},
	{input: "I want a banana", output: "bnn"},
	{input: "I want chips", output: "cps"},
	{input: "I want chocolate", output: "chl"},
	{input: "Yes, want chocolate", output: "chl"},
	{input: "chocolat", output: "chl"},
	{input: "i want coca", output: "sda"},
	{input: "i want fanta", output: "sda"},
	{input: "i want sprite", output: "sda"},
]);

console.dir(intentClassifier.classify("I want chips and i want fanta"));  // ['apl','bnn']

