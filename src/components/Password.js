import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Username() {

    const [newPassword, setNewPassword] = useState('');
    const [toggle, setToggle] = useState(true);

    const navigate = useNavigate();

    const updatePassword = (e) => {

        e.preventDefault();
    
        if(newPassword.length < 6 ){
    
            setToggle(false);
        }
      
        else{

            Axios.post("http://localhost:3009/updatePassword", {

            id: localStorage.getItem('id'),
            newPassword: newPassword,

            }).then(
              localStorage.setItem('password', newPassword),
            );

            setToggle(true);
            
            navigate('/profil');
        }
    }

    return (
    <div className='content'>
        <h1>Profil</h1>
        <form className='login' onSubmit={updatePassword}>
            {!toggle && <h3 style={{color: 'red'}}>Veuillez réessayer</h3>}
            
            <label>Mot de passe</label>
            <input style={{borderColor: !toggle && 'red'}} type="password" placeholder="Nouveau mot de passe" onChange={e => setNewPassword(e.target.value)} id="password" name="password" />
            <button id="update">Modifier</button>
        </form>
    </div>
    )
}
