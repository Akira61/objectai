let classifier;
let video;
let label = "";
let confidence = "";
let wiki = "";

function modelLoaded() {
    console.log("Model loaded ✅");
  classifier.predict(modelResults);
}

function modelResults(error, results){
  if(!error) {
    label = "Label: " + results[0].label;
    confidence = "Confidence " + results[0].confidence;
    goWiki(results[0].label);
    classifier.predict(modelResults);// make a loop
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', video, modelLoaded);
}

function draw() {
  background(0);
  image(video, 0, 0, width, width * video.height / video.width);
  fill(255);
  textSize(24);
  text(label, 10, height - 80);
  text(confidence, 10, height - 50);
  text(wiki, 10, height - 50);

}


function goWiki(param){
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${param}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.query.search[0].snippet);
        wiki = "wikipedia \n" + data.query.search[0].snippet;
        createP(wiki);
    })
}