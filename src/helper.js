//obtiene la diferencia de años

export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year ;
}

// calcula el total a pagar segun la marca
export function calcularMarca(marca){
    let incremento;

    switch(marca){
        case 'europeo' :
            incremento = 1.30;
            break;
            case 'americano' :
                incremento = 1.15;
                break;
                case 'asiatico' :
                    incremento = 1.05;
                    break;
                    default:
                        break;
    }
    return incremento;
}

// calcula tipo de seguro full o basico
export function obtenerPlan(plan){
    return (plan === 'basico')? 1.20 : 1.50;
}


// muestra en mayuscula la primer letra del resumen 
export function primeraMayuscula(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}