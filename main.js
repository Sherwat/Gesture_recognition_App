Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    image_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
};

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Hjpm23kK8/model.json', modelLoaded);

function modelLoaded(){
    console.log("!!!Model Loaded!!!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The Prediction is" + predection;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}


function gotResult(error, results){
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        predection = results[0].label;
        speak();
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = '&#128076;';
        }
        if(results[0].label == "Clap")
        {
            document.getElementById("update_emoji").innerHTML = '&#128075;';
        }
        if(results[0].label == "Punch")
        {
            document.getElementById("update_emoji").innerHTML = '&#9994;';
        }
        if(results[0].label == "Thumbs - Up")
        {
            document.getElementById("update_emoji").innerHTML = '&#128077;';
        }
        if(results[0].label == "High - Five")
        {
            document.getElementById("update_emoji").innerHTML = '&#128400;';
        }
    }
}