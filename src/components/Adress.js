import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Username() {

    const [newAdress, setNewAdress] = useState('');
    const [toggle, setToggle] = useState(true);

    const navigate = useNavigate();

    const updateAdress = (e) => {

        e.preventDefault();
    
        if(newAdress.length < 10 ){
    
            setToggle(false);
        }
      
        else{

            Axios.post("http://localhost:3009/updateAdress", {

            id: localStorage.getItem('id'),
            newAdress: newAdress,

            })

            setToggle(true);
            
            navigate('/profil');
        }
    }

    return (
    <div className='content'>
        <h1>Profil</h1>
        <form className='login' onSubmit={updateAdress}>
            {!toggle && <h3 style={{color: 'red'}}>Veuillez réessayer</h3>}
            
            <label>Adresse</label>
            <input style={{borderColor: !toggle && 'red'}} type="text" placeholder="Nouvelle adresse" onChange={e => setNewAdress(e.target.value)} id="adress" name="adress" />
            <button id="update">Modifier</button>
        </form>
    </div>
    )
}
