

import './App.css';
import Buttons from './components/buttons/Buttons';
import MainForm from './components/forms/MainForm';


import NavBar from './components/navbar/Navbar';
import MainTable from './components/table/MainTable';


function App() {
  return (
    <div>
        <NavBar />
        <Buttons />
        <MainTable />
        <MainForm />
    </div>
    
  );
}

export default App;
