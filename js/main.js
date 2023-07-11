//variables
const api = "https://api.pexels.com/v1";

const divTendenciaMin = document.querySelector("#divTendenciaMin");
const divTendenciaMax = document.querySelector("#divTendenciaMax")
const btnAmpliar = document.querySelector("#btnAmpliar");
const btnMinimizar = document.querySelector("#btnMinimizar");
const btnBuscar = document.querySelector("#btnbuscar");

//array
const arrayTendencias = [{
    id: "photos/1408221",
    categoria: "flower"
},
{
    id: "photos/3648269",
    categoria: "brasil"
},
{
    id:"photos/11547364" ,
    categoria: "coches"
    },
    {
    id: "photos/9197946",
    categoria:  "naturaleza"
    },
    {
    id:"photos/1770310",
    categoria: "playas"
    },
    {
    id: "photos/2951921",
    categoria: "perros"
    },
    {
    id: "photos/726478",
    categoria: "animales"
    },
    {
    id: "photos/12489712",
    categoria: "castelos"
    }
]


//eventos
// 1-evento click para el Buscar 
// btnBuscar.addEventListener('click', (ev) => {
    
//   });

//2- evento click para el  tendencias
btnAmpliar.addEventListener('click', () => {
    divTendenciaMax.style.display = 'block';
    divTendenciaMin.style.display = 'none';
  });
  
    btnMinimizar.addEventListener('click', () => {
    divTendenciaMax.style.display = 'none';
    divTendenciaMin.style.display = 'block';
    tendenciaSorteo()
  });


//funcion


// 1- crear la funcion dinamica del banco de datos para hacer el fetch y json.
const apiGlobal = async (api) => {

    try {

        const repositorio = await fetch(api, {
            method: "get",
            headers: {
                Authorization:"QOqsi5EgeebCWBirHaswGRZXrLjG4CvKrDvH9JeFnFwzkL7dCPLB3oXD"}
        });

        if (repositorio.ok) {
            const datos = await repositorio.json()
      
            return {
                ok : true,
                datos
            }

        } else {
            throw "Problemas ao carregar el API"

        }

    } catch (error) {
         return {
            ok : false,
            datos : error
         }
     

    }


}


const pintar = async () => {

const {ok,datos} = await apiGlobal(`${api}/${arrayTendencias[0].id}`)
console.log(datos)

}
// pintar();











// 2 - pintar lo repositorio na tendencias minimizadas
// 2.1 - crear la funcion que busque las seguintes 3 categorias diferente na imagem .
const pintarTendenciaMinima = async () => {
   const divTendenciaMin = document.querySelector("#divTendenciaMin")
   
    // const sorteo = await tendenciaSorteo();

   for (let i = 1 ; i <= 3; i++){
    const {ok,datos} = await apiGlobal(`${api}/${arrayTendencias[i].id}`);

      console.log(datos);
      //crio el DIv do card
      const cardTendencia = document.createElement("DIV");
      cardTendencia.classList.add("styleTendencia")
      // crio el div para img
      const cardImg = document.createElement("DIV");
      cardImg.classList.add("cardImgDiv")
      //crio el elemento
      const img = document.createElement("IMG")
      img.src = datos;
      const pTendencia = document.createElement("P")
      pTendencia.textContent = arrayTendencias[i].categoria
    
      cardImg.append(img)
     cardTendencia.append(cardImg,pTendencia)
     divTendenciaMin.append(cardTendencia)
   }
   
}
pintarTendenciaMinima()

// const tendenciaSorteo = async () => {
//     const sorteo = [];
//     for (let i = 0; i < 3; i++) {
//       let nuevaTendencia;
  
//       while (!nuevaTendencia || sorteo.includes(nuevaTendencia)) {
//         nuevaTendencia = arrayTendencias[Math.floor(Math.random() * arrayTendencias.length)];
//       }
  
//       sorteo.push(nuevaTendencia);
//     }
//     console.log(sorteo);
//     return sorteo;
//   };



//   console.log(sorteo)
  




//3 - pintar o repositorio nas tendencias Maximixadas

const pintarTendenciaMaxima = async () => {
    
    
    const divTendenciaMax = document.querySelector("#divTendenciaMax")
    
  for (let i = 0 ; i < arrayTendencias.length ;i++) {
    const {ok,datos} = await apiGlobal(`${api}/${arrayTendencias[i].id}`);
    // console.log(datos);
      //crio el DIv do card
      const cardTendencia = document.createElement("DIV");
      cardTendencia.classList.add("styleTendencia")
  // crio el div para img
      const cardImg = document.createElement("DIV");
      cardImg.classList.add("cardImgDiv")
  //crio el elemento
      const img = document.createElement("IMG")
      img.src = `${api}/${arrayTendencias[i].id}`;
      const pTendencia = document.createElement("P")
      pTendencia.textContent = arrayTendencias[i].categoria
    
      cardImg.append(img)
     cardTendencia.append(cardImg,pTendencia)
     divTendenciaMax.append(cardTendencia)}
     
 
   
    
 }
 pintarTendenciaMaxima()

 //funciones a llamar 
//  tendenciaSorteo()
