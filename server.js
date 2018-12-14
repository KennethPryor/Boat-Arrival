var config = {
    apiKey: "AIzaSyA_BU7ZAkJ2TXI_fAd7QrY2epFQYImfQI4",
    authDomain: "boat-arrival.firebaseapp.com",
    databaseURL: "https://boat-arrival.firebaseio.com",
    projectId: "boat-arrival",
    storageBucket: "boat-arrival.appspot.com",
    messagingSenderId: "588492785314"
};

firebase.initializeApp(config);

var dataRef = firebase.database().ref();

// Initial Values
var boat_name = "";
var boat_destination = "";
var boat_arrival = 0;
var boat_frequency = 0;

// Capture Button Click
$("#add-boat").on("click", function (event) {
    event.preventDefault();

    boat_name = $("#boat_name").val().trim();
    boat_destination = $("#boat_destination").val().trim();
    boat_arrival = $("#boat_arrival").val().trim();
    boat_frequency = $("#boat_frequency").val().trim();

    var tFrequency = boat_frequency;

    var firstTime = boat_arrival;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillBoat = tFrequency - tRemainder;
    console.log("MINUTES TILL Boat: " + tMinutesTillBoat);

    var nextBoat = moment().add(tMinutesTillBoat, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextBoat).format("hh:mm"));

    var newBoat = {

        boat_name: boat_name,
        boat_destination: boat_destination,
        boat_arrival: firstTime,
        boat_frequency: tMinutesTillBoat,
    };

    dataRef.push(newBoat);

    console.log(boat_name);
    console.log(boat_arrival);
});

dataRef.on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().boat_name);
    console.log(childSnapshot.val().boat_destination);
    console.log(childSnapshot.val().boat_arrival);
    console.log(childSnapshot.val().boat_frequency);

    // full list of items to the well
    $("#boat_tbody").append(`
    <tr>
        <td>${childSnapshot.val().boat_name}</td>
        <td>${childSnapshot.val().boat_destination}</td>
        <td>${childSnapshot.val().boat_arrival}</td>
        <td>${childSnapshot.val().boat_frequency}</td>
    </tr>
    `)

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

