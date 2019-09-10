let classifier;
let video;


function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  video.hide();
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

function gotQuote(response) {
  console.log(response);
  if (response && response.total > 0) {
    var item = response.result[Math.floor(Math.random() * response.total)];

    // Show the translated result
    document.getElementById('quote').innerHTML = item.value;

  }
}

// When we get a result
function gotResult(err, results) {

  // Check if confidence is more than 60%
  if(results && results[0].confidence > 0.6) {

    console.log(results[0].label + ' ' + nf(results[0].confidence, 0, 2));

    let query = results[0].label.split(",")[0].split(" ")[0]
    console.log('Tag: ' + query);
    document.getElementById('tag').innerHTML = "Tag: " + query;

    // Make a API request with `query` parameter and get a quote from Chuck Norris
    const url = `https://api.chucknorris.io/jokes/search?query=${query}`;
    loadJSON(url, gotQuote);

  }

  classifyVideo();



}
