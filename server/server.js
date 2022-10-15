
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3009;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'crud'
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/infos/insert", (req, res) => {

  const username = req.body.username;
  const date = req.body.date;
  const adress = req.body.adress;
  const password = req.body.password;
  const insertInfos = "INSERT INTO `infos`(`username`, `date`, `adress`, `password`) VALUES (?, ?, ?, ?)";

  connection.query(insertInfos, [username, date, adress, password]);
});


app.get("/auth/check", (req, res) => {

  const checkDb = "SELECT * FROM infos";

  connection.query(checkDb, function(err, result, fields){

    res.send(result);
  });
  
});

app.post("/user", (req, res) => {

  const usernameSession = req.body.username;
  const passwordSession = req.body.password;
  const userInfos = "SELECT `username`, `date`, `adress`, `password` FROM `infos` WHERE username = ? AND password = ?";

  connection.query(userInfos, [usernameSession, passwordSession], function(err, result, fields){

    res.send(result);
  });
});

app.post("/updateUsername", (req, res) => {

  const id = req.body.id;
  const newUsername = req.body.newUsername;
 
  const updateUsername = "UPDATE `infos` SET `username`= ? WHERE id = ?";

  connection.query(updateUsername, [newUsername, id]);
});

app.post("/updateAdress", (req, res) => {

  const id = req.body.id;
  const newAdress = req.body.newAdress;
 
  const updateAdress = "UPDATE `infos` SET `adress`= ? WHERE id = ?";

  connection.query(updateAdress, [newAdress, id]);
});

app.post("/updatePassword", (req, res) => {

  const id = req.body.id;
  const newPassword = req.body.newPassword;
 
  const updatePassword = "UPDATE `infos` SET `password`= ? WHERE id = ?";

  connection.query(updatePassword, [newPassword, id]);
});

app.post("/delete", (req, res) => {

  const id = req.body.id;
 
  const deleteInfos = "DELETE FROM `infos` WHERE id = ?";

  connection.query(deleteInfos, [id]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})