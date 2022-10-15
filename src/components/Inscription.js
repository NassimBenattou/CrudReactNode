import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
    
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [adress, setAdress] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();


    const checkRegister = (e) => {

        e.preventDefault();
        
        const currentDate = new Date();
        const majority = currentDate.getFullYear() - 18;
        const birthday = new Date(date);
        const checkYear = birthday.getFullYear();

        if(username.length < 6 || password.length < 6 || adress.length < 10){
            
            setToggle(false);  
        }

        else if(majority < checkYear){
            
            setToggle(false);
            alert('Vous devez être majeur pour vous inscrire');
        }
        else{

            setToggle(true);
            Axios.post("http://localhost:3009/infos/insert", {

                username: username, 
                date: date, 
                adress: adress, 
                password: password,
                
            }).then(
                alert('Inscription réalisée avec succès')
                ).then(
                    navigate('/connexion')
                );
        }    
    }
    
    return (
      
        <div className="content">
            <h1>Inscription</h1>
            <form className='login' onSubmit={checkRegister}>
                {!toggle && <h3 style={{color: 'red'}}>Veuillez réessayer</h3>}
                
                <label>Nom d'utilisateur</label>
                <input style={{borderColor: !toggle && 'red'}} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Jean_Dupont" id="username" name="username" />

                <label>Date de naissance</label>
                <input style={{borderColor: !toggle && 'red'}} type="date" value={date} onChange={e => setDate(e.target.value)} id="date" name="date" />
        
                <label>Adresse</label>
                <input style={{borderColor: !toggle && 'red'}} type="text" value={adress} onChange={e => setAdress(e.target.value)} placeholder="115 rue de la paix" id="adress" name="adress" />

                <label>Mot de passe</label>
                <input style={{borderColor: !toggle && 'red'}} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" id="password" name="password"/>
               
                <button className="buttons">S'inscrire</button>
            </form>
        </div>
    )
}
