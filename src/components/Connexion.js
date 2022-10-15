import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Connexion() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    const checkConnexion = (e) => {

        e.preventDefault();

        Axios.get("http://localhost:3009/auth/check").then(resp => {
            
            for (let i = 0; i < resp.data.length; i++) {

                if(username === resp.data[i].username && password === resp.data[i].password ){
                    navigate('/profil');
                    localStorage.setItem('id', resp.data[i].id);
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);

                }
                else{
                    setToggle(false);
                }
            }
        });
    }

  return (
      <div className="content">
        <h1>Connexion</h1>
        <form className='login' onSubmit={checkConnexion}>
            {!toggle && <h3 style={{color: 'red'}}>Nom d'utilisateur inexistant ou mot de passe erroné</h3>}
            <input style={{borderColor: !toggle && 'red'}} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nom d'utilisateur" id="username" name="username" />
            <input style={{borderColor: !toggle && 'red'}} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" id="password" name="password"/>
            <button className="buttons">Se connecter</button>
        </form>
    </div>
  )
}
