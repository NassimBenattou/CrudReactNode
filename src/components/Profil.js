import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profil() {

  const [userProfil, setUserProfil] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userAdress, setUserAdress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const usernameSession = localStorage.getItem('username');
  const passwordSession = localStorage.getItem('password');

  const navigate = useNavigate();

  useEffect(() => {
    
    if(usernameSession){

      Axios.post("http://localhost:3009/user", {

        username: usernameSession, 
        password: passwordSession,

      }).then(response => {

        for (let i = 0; i < response.data.length; i++) {
          
          var birthday = new Date(response.data[i].date);
          var dd = birthday.getDay();
          var mm = birthday.getMonth();
          var yyyy = birthday.getFullYear();

          if(dd < 10) dd = '0' + dd;
          if(mm < 10) mm = '0' + mm;

          setUserProfil(response.data[i].username);
          setUserDate(dd+"/"+mm+"/"+yyyy);
          setUserAdress(response.data[i].adress);
          setUserPassword(response.data[i].password);
        }
      })
    }

    else{
      navigate('/');
    }
  });

  const updateUsername = (e) => {

    e.preventDefault();

    navigate('/username');
  }

  const updateAdress = (e) => {

    e.preventDefault();

    navigate('/adress');
  }

  const updatePassword = (e) => {

    e.preventDefault();

    navigate('/password');
  }

  const deconnexion = (e) => {
   
    e.preventDefault();

    localStorage.clear();

    alert("Vous avez été déconnecté avec succès !");

    navigate('/connexion');
  }

  const deleteUser = (e) => {

    e.preventDefault();

    Axios.post("http://localhost:3009/delete", {

    id: localStorage.getItem('id'),

    });

    localStorage.clear();

    alert("Votre profil a été supprimé avec succès !");

    navigate("/connexion");
  }

  return (
    <div className='content'>
      <h1>Profil</h1>
        <form className='login' >
         <label>Nom d'utilisateur</label>
            <input type="text" placeholder={userProfil} id="username" name="username" disabled/>
            <button id="update" onClick={updateUsername}>Modifier</button>

          <label>Adresse</label>
            <input type="text" placeholder={userAdress} id="adress" name="adress" disabled/>
            <button id="update" onClick={updateAdress}>Modifier</button>

          <label>Mot de passe </label>
            <input type="password" placeholder={userPassword} id="password" name="password" disabled/>
            <button id="update" onClick={updatePassword}>Modifier</button>

          <label>Date de naissance</label>
            <input type="text" placeholder={userDate} id="date" name="date" disabled/>
        </form>
        <button className="buttons" onClick={deconnexion}>Déconnexion</button><br />
        <button id="delete" onClick={deleteUser}>Supprimer</button> 
    </div>
  )
}
