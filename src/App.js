
import {Routes, Route} from "react-router-dom";
import Accueil from './components/Accueil';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
import Profil from './components/Profil';
import Username from './components/Username';
import Adress from './components/Adress';
import Password from './components/Password';
import './components/Crud.css';

 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/username" element={<Username />} />
        <Route path="/adress" element={<Adress />} />
        <Route path="/password" element={<Password />} />
      </Routes> 
    </div>
  );
}

export default App;
