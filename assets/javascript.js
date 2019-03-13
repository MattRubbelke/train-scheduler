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

        // Calculates the freqency 
        frequency = Number(frequency);
        console.log("New frequency: " + frequency + " minutes." )
        var nextTrain = moment().add(frequency, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm")
        console.log("This is the time of the next train: " + nextTrain)

        // Inputs train information in Table
        $("#train-name-display").append(trainName);
        $("#destination-display").append(destination);
        $("#frequency-display").append(frequency);
        $("#arrival-display").append(nextTrain);
        $("#minutes-display").append(minutes);
    }

$(document).on("click", "#add-train-submit", getsInput)

// })