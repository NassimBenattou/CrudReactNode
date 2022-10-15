import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Username() {

    const [newUsername, setNewUsername] = useState('');
    const [toggle, setToggle] = useState(true);

    const navigate = useNavigate();

    const updateUsername = (e) => {

        e.preventDefault();
    
        if(newUsername.length < 6 ){
    
            setToggle(false);
        }
      
        else{

            Axios.post("http://localhost:3009/updateUsername", {

            id: localStorage.getItem('id'),
            newUsername: newUsername,

            }).then(
            localStorage.setItem('username', newUsername),
            );

            setToggle(true);
            
            navigate('/profil');
        }
    }

    return (
    <div className='content'>
        <h1>Profil</h1>
        <form className='login' onSubmit={updateUsername}>
            {!toggle && <h3 style={{color: 'red'}}>Veuillez réessayer</h3>}
            
            <label>Nom d'utilisateur</label>
            <input style={{borderColor: !toggle && 'red'}} type="text" placeholder="Nouveau nom d'utilisateur" onChange={e => setNewUsername(e.target.value)} id="username" name="username" />
            <button id="update" onClick={updateUsername}>Modifier</button>
        </form>
    </div>
    )
}
