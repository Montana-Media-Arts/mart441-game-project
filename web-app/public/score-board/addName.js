function names(){
  var clientName, clientScore;

  clientName = document.getElementById("clientName");
  clientScore = document.getElementById("clientScore");

  clientName.innerHTML = "Alex";
  clientScore.innerHTML = "20098";

}

names();

function addScore(){
  var name, score, date, pos, arr, clientName, clientScore;

  arr = document.getElementById("topscores");
  read = document.getElementById("topscores").lastChild.id.value;

  name = document.getElementById("UserNameNew");
  score = document.getElementById("scoreNew");
  date = document.getElementById("dateNew");

  clientName = document.getElementById("clientName");
  clientScore = document.getElementById("clientScore");
//    Name = document.getElementById(read."Name");

  //presentName = document.getElementById("UserName");

  name.innerHTML = clientName.innerHTML;
  score.innerHTML = clientScore.innerHTML;

  // name.innerHTML = "Hola";
  //score.innerHTML = "123242";
  date.innerHTML = new Date().toDateString();

  name.id = "UserName";
  score.id = "score";
  date.id = "date";

  arr.innerHTML += "<tr> \n" +
  "<td class = 'UserName' id = 'UserNameNew'></td> \n <td class = 'Score' id = 'scoreNew'></td> \n <td id = 'dateNew' class = 'Date' id = 'date'></td> \n </tr>";

}

  // firstScore();
  addScore();
