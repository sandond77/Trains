  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqP2YTYovmgjn4dbbuTDvUYIRk0fr8I30",
    authDomain: "trains-ca113.firebaseapp.com",
    databaseURL: "https://trains-ca113.firebaseio.com",
    projectId: "trains-ca113",
    storageBucket: "",
    messagingSenderId: "901192573237"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").click(function(event){
  event.preventDefault();

  var name = $("#name").val().trim();
  var destination = $("#destination").val().trim();
  var firsttrain = moment($("#firsttrain").val().trim(),'HH:mm').format("x");
  var frequency = $("#frequency").val().trim();
  var trains = {
    name: name,
    destination: destination,
    firsttrain: firsttrain,
    frequency: frequency
  }

  database.ref().push(trains);

  name = $("#name").val("");
  destination = $("#destination").val("");
  firsttrain = $("#firsttrain").val("");
  frequency = $("#frequency").val("");
})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firsttrain = childSnapshot.val().firsttrain;
  var frequency = childSnapshot.val().frequency;
  var next = moment(firsttrain,'x')
  var now = moment().format("x");

  while (now > next){
    next = next.add(frequency,"m");
  }

  var away = moment(next,"x").diff(moment(now,"x"),"m")+1

  next = moment(next,"x").format("HH:mm");
  
  now = moment(now,"x").format("HH:mm")

  $("#trainstable > tbody").append(
    '<tr><td>' + name + '</td>' +
    '<td>' + destination + '</td>' +
    '<td>' + frequency + '</td>' +
    '<td>' + next + '</td>' +
    '<td>' + away + '</td><tr>' 
  )

  $("#updated").text("Current Train Schedule " + "(Updates every minute, Last Updated - "+ now +")");
});




setInterval(function(){
  alert("page is updating");
  $("#tablebody").empty();


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firsttrain = childSnapshot.val().firsttrain;
  var frequency = childSnapshot.val().frequency;
  var next = moment(firsttrain,'x')
  var now = moment().format("x");

  while (now > next){
    next = next.add(frequency,"m");
  }

  var away = moment(next,"x").diff(moment(now,"x"),"m")+1

  next = moment(next,"x").format("HH:mm");
  
  now = moment(now,"x").format("HH:mm")

  $("#trainstable > tbody").append(
    '<tr><td>' + name + '</td>' +
    '<td>' + destination + '</td>' +
    '<td>' + frequency + '</td>' +
    '<td>' + next + '</td>' +
    '<td>' + away + '</td><tr>' 
  )

  $("#updated").text("Current Train Schedule " + "(Updates every minute, Last Updated - "+ now +")");
  });
},60000);