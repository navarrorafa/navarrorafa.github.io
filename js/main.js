// document.addEventListener('DomContentLoaded',()=> {

//variables

/** @type {String} Url fixa del API */
const api = "https://api.pexels.com/v1";
/** @type {String} llave de permiso de la api */
const token = "QOqsi5EgeebCWBirHaswGRZXrLjG4CvKrDvH9JeFnFwzkL7dCPLB3oXD";
const fragment = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();
/** @type {String} metodo para a expresion regular para el input buscar */
const regec = "";

/** @type {Object} Traigo la div que pinta el min*/
const divTendenciaMin = document.querySelector("#divTendenciaMin");
/**@type {Object} Traigo la Div que pinta el Max */
const divTendenciaMax = document.querySelector("#divTendenciaMax");
/** @type {Object} Traime el Boton que amplia la tendencia */
const btnAmpliar = document.querySelector("#btnAmpliar");
/** @type {Object} Boton que minimiza la tendencia  */
const btnMinimizar = document.querySelector("#btnMinimizar");
/** @type {Object} boton que de busca de imagem */
const btnBuscar = document.querySelector("#btnBuscar");
/** @type {object} Div creada para que no borre el boton Ampliar*/
const galeriaImg = document.querySelector("#galeriaImg");
/** @type {Object} traigo del html la DIV galeria buscar */
const galeriaBuscar = document.querySelector('#galeriaBuscar');

//array
/**@type {Array<String>} Para pintar imagens especifica de Tendencias */
const arrayTendencias = [{
    id: "photos/2071779",
    categoria: "flower"
},
{
    id: "photos/3648269",
    categoria: "brasil"
},
{
    id: "photos/1545743",
    categoria: "coches"
},
{
    id: "photos/9197946",
    categoria: "naturaleza"
},
{
    id: "photos/1151282",
    categoria: "playas"
},
{
    id: "photos/2951921",
    categoria: "perros"
},
{
    id: "photos/4610780",
    categoria: "animales"
},
{
    id: "photos/3358880",
    categoria: "castelos"
}
]


//eventos
// 1-evento click para el Buscar 
btnBuscar.addEventListener('click', () => {
    pintarBusca()
});

//2- evento click para el  tendencias
/** Evento click para el boton ampliar */


/** Evento para que oculte la Div min y Mostre Div max  */
btnAmpliar.addEventListener('click', () => {
    eventoBtnAmpliar()
    pintarTendenciaMaxima()
});
/** Evento para que oculte la Div max y Mostre Div min */
btnMinimizar.addEventListener('click', () => {
    ocultar()
    pintarTendenciaMinima()
});






//funciones para los eventos 

/** Funcion que ejecuta */
const eventoBtnAmpliar = () => {
    divTendenciaMax.classList.add('flexConteiner');
    btnAmpliar.classList.add('ocultar');
    galeriaImg.classList.add('ocultar');
    galeriaImg.classList.remove('flexConteiner')
    btnAmpliar.classList.add('ocultar')
    btnAmpliar.classList.remove("flexConteiner")

}

const ocultar = () => {
    divTendenciaMax.classList.add('ocultar');
    btnAmpliar.classList.remove('ocultar');
    galeriaImg.classList.add('flexConteiner');
    galeriaImg.classList.remove('ocultar');
    divTendenciaMax.classList.remove('flexConteiner');
    btnAmpliar.classList.add('flexConteiner')
}




//funcion
/**
 * crear la funcion dinamica del banco de datos para hacer el fetch y json.
 * @param {String} api 
 * @returns el json
 */
const apiGlobal = async (api) => {

    try {
        /** @type {Object} Me trae la ApiPexels(url) para o dom*/
        const repositorio = await fetch(api, {
            method: "get",
            headers: {
                Authorization: token
            }
        });

        if (repositorio.ok) {
            const datos = await repositorio.json()

            return {
                ok: true,
                datos
            }

        } else {
            throw "Problemas ao carregar el API"

        }

    } catch (error) {
        return {
            ok: false,
            datos: error
        }


    }


}




/**
 * Funcion hecha para que me haga sorteo de el arrayTencia para que me mostre de forma random na Div minimizar
 * @returns um array de objetos com 3 elementos del arrayTendencia 
 */
const tendenciaSorteo = async () => {
    /**@type {Array} Array vacio para hacer el push del array */
    const sorteo = [];
    /**Uso el for para criar uno array de 3 */
    for (let i = 0; i < 3; i++) {
        /**@type {Array} array vacio para que pueda hacer la comparacion */
        let nuevaTendencia;
        /**Crio uno while para que no se repita el mismo array en la nueva funcion */
        while (!nuevaTendencia || sorteo.includes(nuevaTendencia)) {
            nuevaTendencia = arrayTendencias[Math.floor(Math.random() * arrayTendencias.length)];
        }

        sorteo.push(nuevaTendencia);
    }

    return sorteo;
};

/** Funcion que pinta lo que esta dentro de la Div Minima*/
const pintarTendenciaMinima = async () => {
    /** @type {Object} traigo la Div Minimo para el DOM */
    const divTendenciaMin = document.querySelector("#divTendenciaMin")
    galeriaImg.innerHTML = "";
    /** @type {Function} llamo la funcion para que traiga el array Sorteado para tendencia */
    const sorteo = await tendenciaSorteo();

    /** Uso el for para que me pinte */
    for (let i = 0; i < 3; i++) {
        /**  */
        const { ok, datos } = await apiGlobal(`${api}/${sorteo[i].id}`);

        /** @type {Object} Crea la Div (card) pra informacoes da imagem */
        const cardTendencia = document.createElement("DIV");
        cardTendencia.classList.add("styleTendencia")
        /** @type {Object} Crea una Div para poner la imagem y pueda trabajar la image */
        const cardImg = document.createElement("DIV");
        cardImg.classList.add("cardImgDiv")
        /** @type {Object} Crea la etiqueta imagen */
        const img = document.createElement("IMG")
        img.src = datos.src.medium;
        /**@type {Object} crea la etiqueta P para que de um titulo a imagen */
        const pTendencia = document.createElement("P")
        pTendencia.textContent = arrayTendencias[i].categoria

        cardImg.append(img)
        cardTendencia.append(cardImg, pTendencia)
        fragment.append(cardTendencia)

    }

    galeriaImg.append(fragment)

}


/** funcion para pintar a DIV de tendencias Maximas */
const pintarTendenciaMaxima = async () => {

    /** @type {Object} Trae la DIv de tendencia maxima para el DOm */
    const divTendenciaMax = document.querySelector("#divTendenciaMax")
    /**Usado para que pinte todo el array de tendencia na div maxima  */
    for (let i = 0; i < arrayTendencias.length; i++) {

        const { ok, datos } = await apiGlobal(`${api}/${arrayTendencias[i].id}`);
        // console.log(datos);
        //crio el DIv do card
        const cardTendencia = document.createElement("DIV");
        cardTendencia.classList.add("styleTendencia")
        // crio el div para img
        const cardImg = document.createElement("DIV");
        cardImg.classList.add("cardImgDiv")
        //crio el elemento
        const img = document.createElement("IMG")
        img.src = datos.src.medium;
        const pTendencia = document.createElement("P")
        pTendencia.textContent = arrayTendencias[i].categoria

        cardImg.append(img)
        cardTendencia.append(cardImg, pTendencia)
        fragment.append(cardTendencia)

    }
    divTendenciaMax.append(fragment)





}



const pintarBusca = async () => {

    const buscar = await inputBuscar.value;
    const regex = "";
    console.log(buscar)
    // if (!regex.test()) {
    //     mensajeError.textContent = "formato invalido";
    //     return;
    // }
    const { ok, datos } = await apiGlobal(`${api}/search?query=${buscar}`);



    try {
       
            datos.forEaach((item) => {
            console.log(item.photos)
            const cardBuscar = document.createElement("DIV");
            cardBuscar.classList.add("styleTendencia")
            // crio el div para img
            const cardImg = document.createElement("DIV");
            cardImg.classList.add("cardImgDiv")
            //crio el elemento
            const img = document.createElement("IMG")
            img.src = item[i].src.medium;
            console.log(img)
            //
            const altImg = document.createElement("P")
            altImg.textContent = "teste"

            cardImg.append(img)
            cardBuscar.append(cardImg, altImg)

        });
        galeriaBuscar.append(fragment)
    } catch (error) {
        console.log("Erro a pintar pagina ")
    }

}






//funciones a llamar 
pintarTendenciaMinima()

// });//LOAD
