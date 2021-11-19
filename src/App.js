import Pagina from './Pagina';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavbarPagina from './componente/NavbarPagina';
import { useState } from 'react';

function App() {
  const [busquedaGenerica, setbusquedaGenerica] = useState("")
  const busqueda = (e) => {
    setbusquedaGenerica(e)
  }
  return (
    <div className='container'>
      <NavbarPagina busqueda={busqueda} />
      <BrowserRouter>
        <Routes>
          <Route path="/" 
            element={<Pagina titulo={'Mascotas'} url={"mascota"} busquedaGenerica={busquedaGenerica} />} />
          <Route path="/duenos" 
          element={<Pagina titulo={'Duenos'} url={"duenos"} busquedaGenerica={busquedaGenerica} />} />
          <Route path="/veterinarias" 
          element={<Pagina titulo={'Veterinar@s'} url={"veterinarias"} busquedaGenerica={busquedaGenerica} />} />
          <Route path="/consultas" 
          element={<Pagina titulo={'Consultas'} url={"consultas"} busquedaGenerica={busquedaGenerica} />} />
          {/* <Route path="expenses" element={<Pagina titulo={'Mascotas'} url={"mascota"}/>} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
