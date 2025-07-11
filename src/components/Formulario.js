import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {obtenerDiferenciaYear} from '../helper';
import {calcularMarca}from '../helper';
import {obtenerPlan} from '../helper';


const Campo= styled.div`
        display: flex;
        margin-bottom: 1rem;
        align-items: center;

`;

const Label = styled.label`
        flex: 0 0 100px;
`;

const Select = styled.select`
        display: block;
        width: 100%;
        padding: 1rem;
        border: 1px solid #e1e1e1;
        -webkit-appearance: none;
`;

const Button = styled.button`
        background-color: #00838f;
        font-size: 16px;
        width: 100%;
        padding: 1rem;
        color: #fff;
        text-transform: uppercase;
        font-weight: bold;
        border: none;
        transition: background-color .3s ease;
        margin-top:2rem;

        &:hover{
            background-color: #26c6da;
            cursor: pointer;
        }
`;

const Error =styled.div`
        background-color: red;
        color: white;
        padding: 1rem;
        width: 100%;
        text-align: center;
        margin-bottom: 2rem;
`;

const InputRadio = styled.input`
        margin: 0 1rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

        const [datos, guardarDatos] = useState({
            marca:'',
            year: '',
            plan: ''

        });

        const [error , guardarError] = useState(false);

  // extraer valores del state
   const {marca, year, plan} = datos;

   // leer datos del formulario y colocarlos en el state
   const obtenerInformacion = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
   }

   const cotizarSeguro = (e) => {
        e.preventDefault();

        if(marca.trim() === '' || year.trim()  === '' || plan.trim() === '' ){
            guardarError(true);
            return;
        }

        guardarError(false);

        // una base de 2000
        let resultado= 15000;

        //obtener diferencia años

        const diferencia = obtenerDiferenciaYear(year);
       


        //por cada año restar 3%
        resultado -= ((diferencia * 3) * resultado) / 100;
        

        //americano 15%
        //asiatico 5%
        //europeo 30%
        resultado = calcularMarca(marca) * resultado;
        console.log(resultado);

        //basico aumenta 20%
        //completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
       
        guardarCargando(true);

        setTimeout(() => {
           // elimina el spinner
             guardarCargando(false);
              // pasa total al componente principal
        guardarResumen({
            cotizacion : Number(resultado) ,
            datos
        });

        }, 3000);

      
   }


    return ( 
        <form
                onSubmit={cotizarSeguro}
        >
            {error ? <Error> Todos los campos son obligatorios</Error>    : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                        name='marca'
                        value={marca}
                        onChange={obtenerInformacion}
                
                >
                    <option value=''>-- Seleccione --</option>
                    <option value="americano">Américano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>


                </Select>
            </Campo>
             <Campo>
                <Label>Año</Label>
                <Select
                         name='year'
                        value={year}
                         onChange={obtenerInformacion}
                >
                    <option value=''>-- Seleccione --</option>
                     <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>


                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                        type='radio'
                        name='plan'
                        value='basico'
                        checked = {plan === "basico"}
                         onChange={obtenerInformacion}
                        /> Basico
                 <InputRadio
                        type='radio'
                        name='plan'
                        value='full'
                        checked = {plan === "full"}
                         onChange={obtenerInformacion}
                        /> Full

            </Campo>

                <Button type='submit'>Cotizar</Button>
        </form>
     );
}

Formulario.prototype = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
 
export default Formulario;