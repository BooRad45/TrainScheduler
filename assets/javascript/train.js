var config = {
	apiKey: "AIzaSyBiKv7aoS0Mii6icJ9ZAoj2CvYUPAtrNIA",
    authDomain: "train-scheduler-d27cd.firebaseapp.com",
    databaseURL: "https://train-scheduler-d27cd.firebaseio.com",
    storageBucket: "train-scheduler-d27cd.appspot.com",
    messagingSenderId: "9085562345"
};
firebase.initializeApp(config);

var name = "";
var destination = "";
var start = "";
var rate = 0;
var monthsWorked = 0;
var totalBilled = 0;
var currentDate = moment().format('MM/DD/YY');

$("#submit").on("click", function(event){
	event.preventDefault();
	// adding user input into an array called row
	var row = [
		name = $("#trainName").val().trim(),
		destination = $("#destination").val().trim(),
		// using moment to grab start date user submitted in order to be able to calculate months worked
		start = moment($("#firstTrain").val().trim()).format('MM/DD/YY'),
		//using .diff to subtract start date from current date, we want the result in months, turn result to an integer
		monthsWorked = parseInt( moment().diff(moment($("#firstTrain").val().trim()), 'months') ),
		rate = parseInt($("#frequency").val().trim()),
		totalBilled =  monthsWorked * rate
	]
	console.log(start);
	// creating a new table row when submit is clicked
	var newRow = $("<tr>");
	// adding table data for each variable in row array
	for(i=0;i<6;i++){
  		var data = $("<td>").text(row[i]);
  		newRow.append(data);
	}; 
	// adding new row to top of table
	$("#rows").prepend(newRow);	
	// clearing forms after you submit
	$(".form-control").val("");
	console.log("$"+totalBilled);
	console.log(monthsWorked)

})