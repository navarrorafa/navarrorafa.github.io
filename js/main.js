// document.addEventListener('DomContentLoaded',()=> {

//variables

/** @type {String} Url fixa del API */
const api = "https://api.pexels.com/v1";
/** @type {String} llave de permiso de la api */
const token = "QOqsi5EgeebCWBirHaswGRZXrLjG4CvKrDvH9JeFnFwzkL7dCPLB3oXD";
/** @type {object}  usada para fragmentar os append */
const fragment = document.createDocumentFragment();
/**@type {Number} Para definir o numero da pagina  */
let page = 1;
/** @type {String} para recoger el valor del query */
let query = "";
/**@type {String} para recoger el valor de la orientacion */
let orientacion ="";

//  QUERY
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
/** @type {Object} Dom del select btn orientacion */
const btnOrientation = document.querySelector('#btnOrientation')
/** @type {object} Div creada para que no borre el boton Ampliar*/
const galeriaImg = document.querySelector("#galeriaImg");
/** @type {Object} traigo del html la DIV galeria buscar */
const galeriaBuscar = document.querySelector('#galeriaBuscar');
/** @type {Object} Dom da DIVGALERIA  */
const divGaleria = document.querySelector('#divGaleria');
/**@type {Object} El id del boton Anterior */
const btnBack = document.querySelector("#btnBack");
/**@type {Object} El id del boton Seguinte */
const btnNext = document.querySelector("#btnNext")



//array
/**@type {Array<String>} Para pintar imagens especifica de Tendencias */
const arrayTendencias = [{
    id: "photos/2071779",
    categoria: "flower"
},
{
    id: "photos/3648269",
    categoria: "Brasil"
},
{
    id: "photos/1545743",
    categoria: "car"
},
{
    id: "photos/9197946",
    categoria: "naturaleza"
},
{
    id: "photos/1151282",
    categoria: "beach"
},
{
    id: "photos/2951921",
    categoria: "Dogs"
},
{
    id: "photos/4610780",
    categoria: "Animals"
},
{
    id: "photos/3358880",
    categoria: "castle"
}
];


//eventos
/** Evento para capturar o valor da busca  */
btnBuscar.addEventListener('click', () => {
    page = 1
    query = inputBuscar.value
    pintarBusca()
});

/** evento para trocar a orientacao da imagens */
btnOrientation.addEventListener('change', () => {
    divGaleria.innerHTML = "";
    orientacion = btnOrientation.value
    page = 1
    pintarBusca()
});

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


/** Evento usado para capturar a categoria da imagem e pintar */
document.addEventListener('click', (ev) => {
    /**para recoger el valor de la categoria */
    if (ev.target.closest('.cardImgTendencia')) {
        query= ev.target.closest('.cardImgTendencia').dataset.categoria;
        page =1
        pintarBusca()
    }

    if (ev.target == btnBack) {
        page -= 1;
        btnPaginar()
        pintarBusca()
      
    }

    if (ev.target ==btnNext) {
        page += 1;
        btnPaginar()
        pintarBusca()
        
   
       
    } 
 });


//FUNCIONES PARA O EVENTO

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

//FUNCION
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
        cardImg.classList.add("cardImgTendencia")
        cardImg.setAttribute('data-categoria', sorteo[i].categoria)
        /** @type {Object} Crea la etiqueta imagen */
        const img = document.createElement("IMG")
        img.src = datos.src.medium;
        /**@type {Object} crea la etiqueta P para que de um titulo a imagen */
        const pTendencia = document.createElement("P")
        pTendencia.textContent = sorteo[i].categoria

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
        //crio el DIv do card
        const cardTendencia = document.createElement("DIV");
        cardTendencia.classList.add("styleTendencia")
        // crio el div para img
        const cardImg = document.createElement("DIV");
        cardImg.classList.add("cardImgTendencia");
        cardImg.setAttribute('data-categoria', arrayTendencias[i].categoria)
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

/** funcion que crea os elementos e pinta a busca de las imagens */
const pintarBusca = async () => {
    console.log(query)
    console.log(orientacion)
    divGaleria.innerHTML = "";
    // query = await inputBuscar.value;
    // orientacion = await btnOrientation.value
    const regexBuscar = /^(?!.*[\s!$"·$&/()]).+$/
    console.log(query)
    const { ok, datos } = await apiGlobal(`${api}/search?query=${query}&orientation=${orientacion}&page=${page}&per_page=10`);
    console.log(datos)
    if (!regexBuscar.test(query)) {
        alert("formato invalido")
        return;
    }
    try {

        datos.photos.forEach((item) => {
            const cardBuscar = document.createElement("DIV");
            cardBuscar.classList.add("styleCardBuscar")
            // cardBuscar.classList.add("flexConteiner")
            // crio el div para img
            const cardImg = document.createElement("DIV");
            cardImg.classList.add("cardImgGaleria")
            //crio el elemento
            const img = document.createElement("IMG")
            img.src = item.src.medium;
            const fotografo = document.createElement("P")
            fotografo.textContent = item.photographer;
            const altImg = document.createElement("P")
            altImg.textContent = item.alt


            cardImg.append(img)
            cardBuscar.append(cardImg, fotografo, altImg)
            fragment.append(cardBuscar)

        });
        divGaleria.append(fragment)
    } catch (error) {
        console.log("Erro a pintar pagina ")
    }

}

const btnPaginar =async  () => {
    const { ok, datos } = await apiGlobal(`${api}/search?query=${query}&orientation=${orientacion}&page=${page}&per_page=10`);

    if (page == 1) {
        btnBack.classList.add("ocultar");
        btnBack.classList.remove("flexConteiner")

    }else {
       btnBack.classList.add("flexConteiner");
       btnBack.classList.remove("ocultar")
    }

    if(datos.photos.length < 10) {
        btnNext.classList.add("ocultar");
        btnNext.classList.remove("flexConteiner")
    }else {
        btnNext.classList.add("flexConteiner");
        btnNext.classList.remove("ocultar")
        
    }

    if(datos.photos.length == 0){
        alert("Lo siento pero no hay mas fotos")
        btnNext.classList.add("ocultar");
        btnNext.classList.remove("flexConteiner")
    }
}

//funciones a llamar 
pintarTendenciaMinima()






// });//LOAD
