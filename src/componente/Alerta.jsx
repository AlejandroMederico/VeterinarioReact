import {Fragment, React, useState} from 'react'
import { Alert} from 'react-bootstrap'

export default function Alerta({titulo,parrafo,tipo,inicio}) {
const [show, setShow] = useState(inicio);
  return (
      <Fragment>
        {show ===  true ?
            <Alert variant={tipo} onClose={() => setShow(false)} dismissible>
              <Alert.Heading>{titulo}</Alert.Heading>
              <p>{parrafo}</p>
            </Alert>
        :<div></div>

        }
      </Fragment>          
)}