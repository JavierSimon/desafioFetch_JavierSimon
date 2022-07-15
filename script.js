//boton enviar
let botonEnviar = document.querySelector ('button')

//Nombre de la ciudad que aparece al buscar
let nombreCiudad =  document.querySelector("#ciudad")

//temperatura del lugar
let temperaturaActual =  document.querySelector("#temperatura")

// cuantos grados hace
let grados =  document.querySelector("#grados")

//dibujo del clima
let icono =  document.querySelector("#wicon")

//descripcion del clima
let descripcion =  document.querySelector("#descripcion")

// input donde se escribe lo que se quiere buscar
let input = document.querySelector ('input')



let cargarCiudad = () => {
     //el valor de la ciudad es el valor de lo que escribo dentro del input
     let ciudad = input.value
     let container = document.querySelector(".container")
     
     if(ciudad.length === 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Vacío',
          });
        container.style.display = "none"
     } else{
        container.style.display = "block"
     }


     let peticion = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=95176c8edea30e33338e0eaddd53a916`)
     

     peticion.then(respuesta => respuesta.json()).then(data=> {
          
        //estoy haciendo que el div que contiene los datos se hace visible cuando busco el lugar 
          container.style.visibility = "visible"
            
          //nombre de la ciudad del lugar donde la llamo
          nombreCiudad.textContent = data.name;
          
          //temperatura en ºC del lugar
          temperaturaActual.textContent = Math.floor(data.main.temp - 273.15
          ) + 'ºC';
              
          //icono del clima
          icono.setAttribute ('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png')
              
          // descripcion del clima
          descripcion.textContent = data.weather[0].description   
     }).catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ciudad inexistente',
          });
          container.style.display = "none"
     })
}

botonEnviar.addEventListener ('click', cargarCiudad)
input.addEventListener("keydown", function(e){
    if(e.keyCode === 13){
        cargarCiudad()
    }
})