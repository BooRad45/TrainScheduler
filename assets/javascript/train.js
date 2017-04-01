$(document).ready(function() {
var config = {
	  apiKey: "AIzaSyBiKv7aoS0Mii6icJ9ZAoj2CvYUPAtrNIA",
    authDomain: "train-scheduler-d27cd.firebaseapp.com",
    databaseURL: "https://train-scheduler-d27cd.firebaseio.com",
    storageBucket: "train-scheduler-d27cd.appspot.com",
    messagingSenderId: "9085562345"
};

firebase.initializeApp(config);

var database = firebase.database();
var now = moment();


// 2. Submit button for adding Trains

$("#submit").on("click", function(event){
	event.preventDefault();

  // Current Time
  
	var	trainName = $("#trainName").val().trim();
	var	destination = $("#destination").val().trim();
	var	firstTrainTime = $("#firstTrain").val().trim();
	var	frequencyMin = parseInt( $("#frequency").val().trim() );


////// From the brain of Michael Desantis -- all credit to him on this section/////////////
   // var tFrequency = frequencyMin;
    // How often train arrives
    // var firstTime = firstTrainTime;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time 
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm")); //console log in military time
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequencyMin;
    console.log(tRemainder); //If numerator is less than demoninator then numerator is remainder with modulus
    // Minute Until Train
    var tMinutesTillTrain = frequencyMin - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
 
		

var newTrainInfo = {
    name: trainName,
    dest: destination,
    firstTrain: firstTrainTime,
    frequency: frequencyMin,
    next: nextTrain,
    minutes: tMinutesTillTrain
  };

console.log(firstTrainTime);

  // Uploads train data to the database
  database.ref().push(newTrainInfo);

  // Logs everything to console
  console.log(newTrainInfo.name);
  console.log(newTrainInfo.dest);
  console.log(newTrainInfo.firstTrain);
  console.log(newTrainInfo.frequency);
  console.log(newTrainInfo.next);
  console.log(newTrainInfo.minutes);

  // Alert
  alert("Train successfully added");

  $(".form-control").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when admin adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrainTime = childSnapshot.val().firstTrain;
  var frequencyMin = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().next;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequencyMin);
  console.log(nextTrain);



	// Add each train's data into the table
  $("#current-trains > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequencyMin + "</td><td>" + nextTrain + "</td><td>");
});
});

