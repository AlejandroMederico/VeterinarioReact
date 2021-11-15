import Pagina from './Pagina';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavbarPagina from './componente/NavbarPagina';

function App() {
  return (
    <div className='container'>
        <NavbarPagina/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pagina titulo={'Mascotas'} url={"mascota"}/>} />
            <Route path="/duenos" element={<Pagina titulo={'Duenos'} url={"duenos"}/>} />
            <Route path="/veterinarias" element={<Pagina titulo={'Veterinar@s'} url={"veterinarias"}/>} />
            <Route path="/consultas" element={<Pagina titulo={'Consultas'} url={"consultas"}/>} />
            {/* <Route path="expenses" element={<Pagina titulo={'Mascotas'} url={"mascota"}/>} /> */}
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
