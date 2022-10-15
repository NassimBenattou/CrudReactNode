import React from 'react';
import { useNavigate } from 'react-router';


export default function Connexion() {

  const link = useNavigate();

  return (
    <div className='content'>
        <button className="buttons" onClick={() => link("/inscription")}>S'inscrire</button><br />
        <button className="buttons" onClick={() => link("/connexion")}>Se connecter</button>
    </div>
  )
}
