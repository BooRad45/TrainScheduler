var config = {
	apiKey: "AIzaSyBiKv7aoS0Mii6icJ9ZAoj2CvYUPAtrNIA",
    authDomain: "train-scheduler-d27cd.firebaseapp.com",
    databaseURL: "https://train-scheduler-d27cd.firebaseio.com",
    storageBucket: "train-scheduler-d27cd.appspot.com",
    messagingSenderId: "9085562345"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Submit button for adding Trains

$("#submit").on("click", function(event){
	event.preventDefault();

	var now = moment();
	console.log(now);
	var	trainName = $("#trainName").val().trim();
	var	destination = $("#destination").val().trim();
	var	firstTrainTime = moment( $("#firstTrain").val().trim() ).format('HH:mm');
	var	nextArrival = moment();
	var minutesAway;
	var	frequencyMin = parseInt( $("#frequency").val().trim() );
		

var newTrainInfo = {
    name: trainName,
    dest: destination,
    firstTrain: firstTrainTime,
    frequency: frequencyMin
    // next: nextArrival,
    // minutes: minutesAway
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
  var nextArrival = childSnapshot.val().next;
  var minutesAway = childSnapshot.val().minutes;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequencyMin);
  console.log(nextArrival);
  console.log(minutesAway);


	// Add each train's data into the table
  $("#current-trains > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequencyMin + "</td><td>" + nextArrival + "</td><td>" + minutesAway);

});

