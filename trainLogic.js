// focus on getting the train name all the time
$("#trainname-input").focus(); 


//  Initialize Firebase
var config = {
    apiKey: "AIzaSyBw4riau4rBbxJVbq25VJ4M56B05avAkXU",
    authDomain: "myawesomeproject-b0b11.firebaseapp.com",
    databaseURL: "https://myawesomeproject-b0b11.firebaseio.com",
    projectId: "myawesomeproject-b0b11",
    storageBucket: "myawesomeproject-b0b11.appspot.com",
    messagingSenderId: "297765318469"
};

firebase.initializeApp(config);

var database = firebase.database();



//  Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // make sure the time is in HH:MM format

  // if ( $("#starttime-input").length !==5){
  //       alert("Please enter start time correct format (HH:mm):");
  //       $("#starttime-input").focus();
  //     }


  // Grabs user input
  var trainName   = $("#trainname-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency   = $("#frequency-input").val().trim();
  var starttime   = $("#starttime-input").val().trim();
  //var empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainname:   trainName,
    destination: destination,
    frequency:   frequency,
    starttime:   starttime
    
  };

  // Uploads train data to the database
  //database.ref().push(newTrain);
  database.ref('trains/' + trainName).set(newTrain);
  var d= new Date();
  var militarynow = d.getTime();

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.starttime);
  console.log(militarynow);

  // Alert
  //alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainname-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#starttime-input").val("");
  // focus back on train name input
  $("#trainname-input").focus();
  
});

// this line repopulates the data sets from firebase after something has been added or updated
database.ref("trains/").on("child_changed", function(childSnapshot, prevChildKey) {
  console.log("this is under child_changed event of firebase")
  //console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName   = childSnapshot.val().trainname;
  var destination = childSnapshot.val().destination;
  var frequency   = childSnapshot.val().frequency;
  var starttime   = childSnapshot.val().starttime;
  var timenow     = moment();
  var firsttrain  = childSnapshot.val().starttime;
  var interval    = childSnapshot.val().frequency;
  var nexttrain   = moment().startOf('day');
  var trainhour   = firsttrain.split(":")[0];
  var trainmin    = firsttrain.split(":")[1];

  nexttrain.add(trainhour, "h");
  nexttrain.add(trainmin,"m");
  //console.log("nexttrain:"+nexttrain.format('MMMM Do YYYY, HH:mm'));
  //console.log("hour:"+ trainhour);
  //console.log("min:"+ trainmin);


  // loop for getting the next train by interval
  while (nexttrain < timenow){
    nexttrain.add(interval,"m");
        //console.log("nexttrain:"+nexttrain.format('MMMM Do YYYY, HH:mm'));
  }
  console.log("nexttrain:"+nexttrain.format('MMMM Do YYYY, HH:mm'));
  var remainingtime=nexttrain.fromNow();
  // console.log(remainingtime.format('MMMM Do YYYY, HH:mm'));
  console.log(remainingtime);

  //trainhour=trainhour[0];
  //document.write("time now:" + timenow.format('MMMM Do YYYY, h:mm:ss a'));
  //document.write("<br>typeof timenow"+typeof(timenow));
  //document.write("<br>next train:" + nexttrain.format("HH:mm"));
  console.log(timenow);

  var nexttrainOut=nexttrain.format('HH:mm');

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(starttime);


  var timeStart=moment(starttime,"hh:mm");
  console.log(timeStart);
  

  // next arrival calculation
  var nextArr = "";

  //minutes away calculation
  var minAway= "";

   // Add each train's data into the table
   $("#train-table > tbody").append("<tr class='train' id='"+trainName+"'><td>" + trainName + "</td><td>" + destination + "</td><td>"+starttime+"</td><td>"+ frequency + "</td><td>"+nexttrainOut+"</td><td>"+remainingtime+"</td><td>&nbsp;<button id='"+trainName+"'>Edit</button>&nbsp;<button>Delete</button></td></tr>");
  // empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

// $(".train").click(function(){
//     console.log("you have selected "+$("tr").id());//

//   });

});


//this line starts populating the firebase database list on page load
database.ref("trains/").on("child_added", function(childSnapshot, prevChildKey) {
  console.log("this is under child_added event of firebase")
  //console.log(childSnapshot.val());

  //populateData();
  // Store everything into a variable.
  var trainName   = childSnapshot.val().trainname;
  var destination = childSnapshot.val().destination;
  var frequency   = childSnapshot.val().frequency;
  var starttime   = childSnapshot.val().starttime;
  var timenow     = moment();
  var firsttrain  = childSnapshot.val().starttime;
  var interval    = childSnapshot.val().frequency;
  var nexttrain   = moment().startOf('day');
  var trainhour   = firsttrain.split(":")[0];
  var trainmin    = firsttrain.split(":")[1];

      nexttrain.add(trainhour, "h");
      nexttrain.add(trainmin,"m");
      //console.log("nexttrain:"+nexttrain.format('MMMM Do YYYY, HH:mm'));
      //console.log("hour:"+ trainhour);
      //console.log("min:"+ trainmin);

      // loop for getting the next train by interval
      while (nexttrain < timenow){
        nexttrain.add(interval,"m");
            //console.log("nexttrain:"+nexttrain.format('MMMM Do YYYY, HH:mm'));
      }
      console.log("nexttrain:"+nexttrain.format('MMMM Do YYYY, HH:mm'));
      var remainingtime=nexttrain.fromNow();
      // console.log(remainingtime.format('MMMM Do YYYY, HH:mm'));
      console.log(remainingtime);

      //trainhour=trainhour[0];
      //document.write("time now:" + timenow.format('MMMM Do YYYY, h:mm:ss a'));
      //document.write("<br>typeof timenow"+typeof(timenow));
      //document.write("<br>next train:" + nexttrain.format("HH:mm"));
      console.log(timenow);

      var nexttrainOut=nexttrain.format('HH:mm');

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(starttime);

  // next arrival calculation
  var nextArr = "";


  //minutes away calculation
  var minAway= "";

   // Add each train's data into the table
   $("#train-table > tbody").append("<tr class='train' id='"+trainName+"'><td>" + trainName + "</td><td>" + destination + "</td><td>"+starttime+"</td><td>"+ frequency + "</td><td>"+nexttrainOut+"</td><td>"+remainingtime+"</td><td>&nbsp;<button id='"+trainName+"'>Edit</button>&nbsp;<button>Delete</button></td></tr>");


   
// $(".train").click(function(){
//  var trid = $(".train").text();
//     //= $(".train").id();
//     console.log("you have selected "+trid);//
//     console.log("==========================")
//     console.log(typeof(trid));

//   });

  //empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});



