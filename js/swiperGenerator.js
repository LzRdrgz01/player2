let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');

let types = document.querySelectorAll('input[type=radio][name=type]');




function convertMinutes(minutess){
    let hours = Math.floor(minutess / 60) ,
    minutes = Math.floor(minutess % 60),
    total = '';

    if (minutess < 60){
        total = `${minutes}m`
        return total
    } else if (minutess > 60){
      total = `${hours}h ${minutes}m`
      return total
    } else if (minutess = 60){
        total = `${hours}h`
        return total
    }
}

function generar() {
    let serieKey = document.getElementById('numero').value;
    let languaje = "es-MX"

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    console.log(datos)
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name}, `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = ` 
<!-- ${datos.name} -->
<div class='swiper-slide'>
<div class='big_slider_item'>
    <div class='big_slider_item--bg' style='background: url("https://image.tmdb.org/t/p/w780/${datos.backdrop_path}") no-repeat center center / cover;'/>
    <div class='big_slider_item--info max-width'>
        <img alt='' class='big_slider_item--info_logo' src='LOGO_URL'/>

        <ul class='big_slider_item--info_tags'>
            <li>${datos.first_air_date.slice(0,4)}</li>
            <li>Subtitulada</li>
        </ul>
        

        <p class='big_slider_item--info_resume'>${datos.overview}</p>

        <ul class='big_slider_item--info_buttons'>
            <li>
                <a class='btn-play' href='ENTRADA_URL'>
                    <span class='material-symbols-rounded'>
                        play_arrow
                        </span>
                </a>
            </li>
            <li>
                <button class='btn fav-btn' fav-id='TV${datos.id}'>
                    <span class='material-symbols-rounded'>
                        playlist_add
                    </span>
                    Agregar a mi lista
                </button>
				
                <div entry-bg='https://image.tmdb.org/t/p/w780/${datos.backdrop_path}' entry-rate='4.9' entry-title='${datos.name}' entry-type='Serie • Sub' style='display: none;'/>
            </li>
        </ul>

    </div>
</div>
</div>
`;
                    
                    
    
                    const btnCopiar = document.getElementById('copiar');
    
                    
                    template.innerText = justHtml;
                   
    
                    let templateHTML = template.innerText;
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(justHtml);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name}, `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });

               
            
                    let template = document.getElementById('html-final');

                    let justHtml = `
<!-- ${datos.title} -->
<div class='swiper-slide'>
<div class='big_slider_item'>
    <div class='big_slider_item--bg' style='background: url("https://image.tmdb.org/t/p/w780/${datos.backdrop_path}") no-repeat center center / cover;'/>
    <div class='big_slider_item--info max-width'>
        <img alt='' class='big_slider_item--info_logo' src='LOGO_URL'/>

        <ul class='big_slider_item--info_tags'>
            <li>${datos.release_date.slice(0,4)}</li>
            <li>Subtitulada</li>
        </ul>
        

        <p class='big_slider_item--info_resume'>${datos.overview}</p>

        <ul class='big_slider_item--info_buttons'>
            <li>
                <a class='btn-play' href='ENTRADA_URL'>
                    <span class='material-symbols-rounded'>
                        play_arrow
                        </span>
                </a>
            </li>
            <li>
                <button class='btn fav-btn' fav-id='P${datos.id}'>
                    <span class='material-symbols-rounded'>
                        playlist_add
                    </span>
                    Agregar a mi lista
                </button>
				
                <div entry-bg='https://image.tmdb.org/t/p/w780/${datos.backdrop_path}' entry-rate='4.9' entry-title='${datos.title}' entry-type='Serie • Sub' style='display: none;'/>
            </li>
        </ul>

    </div>
</div>
</div>
`;                  
                    template.innerText = justHtml;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(justHtml);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${datos.poster_path}`)
                    genTitle.innerText = datos.title;
                    genSeasons.innerText = "";
                    genYear.innerText = datos.release_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }           
        }

    }

    cargarPeliculas();
}

generar();



