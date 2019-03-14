// Firebase configuration
    var config = {
        apiKey: "AIzaSyD5AbpUEa77xhzffPGkHkp7br7la7ToLbU",
        authDomain: "train-scheduler-eb73a.firebaseapp.com",
        databaseURL: "https://train-scheduler-eb73a.firebaseio.com",
        projectId: "train-scheduler-eb73a",
        storageBucket: "train-scheduler-eb73a.appspot.com",
        messagingSenderId: "77033284186"
      };

    firebase.initializeApp(config);

    var database = firebase.database();

// Variables needed
    var trainName = ""
    var destination = "";
    var frequency = 0;
    var minutes = 0;
    var firstTrain = 0;

    function getsInput(event){
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        trainName = $("#train-input").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        firstTrain = moment($("#first-time").val().trim(), "hh:mm").format("LT");
        var currentTime = moment().format("LT");

        var trainInput = {
            name: trainName,
            destination: destination,
            start: firstTrain,
            freqency: frequency,

          };

        database.ref().push(trainInput);
        
        // Console Logging the above data
        console.log("This is the train's name: " + trainName)
        console.log("This is the train's destination: " + destination)
        console.log("This is the train's frequency: " + frequency)
        console.log("This is the time of the first train: " + firstTrain)
        console.log("This is the current time: " + currentTime)

        
        
        // Clears all text boxes
        $("#train-input").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#first-time").val("");
    }

  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().freqency;
    var firstTrain = childSnapshot.val().start
    // Calculates the freqency 
    frequency = Number(frequency);
    console.log("New frequency: " + frequency + " minutes." )


    // Current Time
    var currentTime = moment();
    console.log("This is the current time: " + moment(currentTime).format("hh:mm"));

    // First Time
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("Converted Time: " + firstTimeConverted);

    // Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    // Time remaining
    var remainder = diffTime % frequency
    console.log("The is the time apart: " + remainder);

    // Minutes till train
    var minAway = frequency - remainder
    console.log("This is the remainder of time: " + minAway)

    // Next Train
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm")
    console.log("This is the time of the next train: " + nextTrain)

    // Creates new row with data
    var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway),
    );

    // Appends the row to the table
    $("#train-display").append(newRow);
  })

$(document).on("click", "#add-train-submit", getsInput)

// })