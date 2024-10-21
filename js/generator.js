let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');

let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
            document.getElementById('season-selector').style.display = "block";
        }
    })
})


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
    let seasonNumber = document.getElementById('numeroTemporada').value;

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=1d79b0abc34e3411aed8ee793526693d&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                    console.log(datos)
                    let tags = '';
    
                    datos.genres.forEach((genre, index) => {
                        if (index > 2) {
                            return
                        }
                        tags += `<li>${genre.name}</li>`          

                    });

                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        <li>
                        <a href="#!" class="episode" 
                        option-1-lang="Sub"
                        option-1-server="SB"
                        option-1-url=""
                        >
                        <div class="episode__img">
                        <img src="https://image.tmdb.org/t/p/w300${episode.still_path}" onerror="this.style='display:none';">
                        <div class="episode__no-image"><i class="fa-regular fa-circle-play"></i></div>
                        </div>
                        <div class="epsiode__info">
                        <h4 class="episode__info__title">${episode.episode_number} - ${episode.name}</h4>
                        <div class="episode__info__duration">${runtime}</div>
                        </div>
                        </a>
                        </li>
                        `
                    })
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="${season.season_number}">Temporada ${season.season_number}</option>
                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = `  
<b class='none the-entry-rate'>${(datos.vote_average.toFixed(1) / 2).toFixed(1)}</b>
<b class='none the-entry-type'>Serie • Sub</b>
<img style="display: none; width: 0" src="https://image.tmdb.org/t/p/w300${datos.poster_path}"/>


<div class="swiper-slide">
    <div class="big_slider_item">
        <div class="big_slider_item--bg" style="background: url('https://image.tmdb.org/t/p/w1280${datos.backdrop_path}') no-repeat center center / cover;"></div>
        <div class="big_slider_item--info max-width">
        <h1 class="bs-title">${datos.name}</h1>
    
            <ul class="big_slider_item--info_tags">
                <li>${datos.first_air_date.slice(0,4)}</li>
                <li>Sub</li>
            </ul>
            <ul class="big_slider_item--info_category">
            ${tags}
            </ul>

            <ul class="big_slider_item--info_rating">
                <li class="big_slider_item--info_rating-stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                </li>
                <li class="big_slider_item--info__rate-numbers">
                ${(datos.vote_average.toFixed(1) / 2).toFixed(1)} <i class="fa-solid fa-star"></i>
                </li>
              <li><span>(${datos.vote_count})</span></li>
            </ul>
    
            <p class="big_slider_item--info_resume">${datos.overview}</p>
    
            <!-- <h1 class="big_slider_item--info_opt-text">¡Nueva Temporada!</h1> -->
            <!--more-->
            <ul class="big_slider_item--info_buttons">
                <li>
                    <a href="#!" class="btn-play">
                        <span class="material-symbols-rounded">
                            play_arrow
                            </span>
                    </a>
                </li>
                <li>
                    <button class="btn fav-btn" fav-id="TV${datos.id}">
                        <span class="material-symbols-rounded">
                            playlist_add
                        </span>
                        Agregar a mi lista
                    </button>

                    <div class="blogger-entry-data" style="display: none;" entry-type="Serie • Sub" entry-bg="https://image.tmdb.org/t/p/w300${datos.poster_path}" entry-title="${datos.name}"></div>

                    </li>
                 <li>
                    <button class="btn" id="dwnld-btn">
                        <span class="material-symbols-outlined"> download </span> 
                        Descargar
                    </button>
                </li>
            </ul>
    
        </div>
    </div>
</div>

<div class="max-width season-list" id="allEpList">
    <div class="select-season">
        <h2>Episodios</h2>
        <select name="" id="select-season">
        ${seasonsOption}
        </select>
    </div>

<div id="temps">
        
<ul class="caps-grid animation" id="season-1">

${episodeList}

</ul><!--Siguiente temporada debajo-->
  
  
</div>
</div>

<div class="the-best-player">
    <div class="player-bg" style="background: url('https://image.tmdb.org/t/p/w1280${datos.backdrop_path}') no-repeat center center / cover;"></div>
    <div class="max-width-header">
        <div class="header-title-info">
            <h1 class="header-title-info_tit">${datos.name}</h1>
            <p class="header-title-info_sub"></p>
        </div>
        <div class="header-actions">
            <a href="#allEpList" class="back-episode-list">
                <span class="material-symbols-outlined"> format_list_bulleted </span>
                <p>Episodios</p>
            </a>
            <div class="prev-episode">
                <span class="material-symbols-outlined"> arrow_back </span>
                <p>Anterior</p>
            </div>
            <div class="next-episode">
                <p>Siguente</p>
                <span class="material-symbols-outlined"> arrow_forward </span>
            </div>
        </div>
    </div>

    <div class="options_grid" id="optionsGrid">      
    </div>

    <div class="iframe-container">
    <iframe frameborder="0" src="" scrolling="no" allowfullscreen></iframe> 
    </div>

    <div class='seo-title' style='color:#fff;max-height: 80px;overflow: auto;'> <span style='display: block;text-align: left;'>Etiquetas:</span>
    <b:if cond='data:post.title'><b:if cond='data:post.link'><b:else/>
        
    Descargar <span class="color">${datos.name}</span> 1080p en Latino,
    descargar, <span class="color">${datos.name}</span> online,
    <span class="color">${datos.name}</span> 1080p por Fembed, Descargar 
        <span class="color">${datos.name}</span> película completa español latino,
        <span class="color">${datos.name}</span> online latino,
    <span class="color">${datos.name}</span>  pelicula completa latino,
    <span class="color">${datos.name}</span>  descargar Uptobox,
        <span class="color">${datos.name}</span> link 1fitcher,
    <span class="color">${datos.name}</span>  pelicula gratis, ver 
    <span class="color">${datos.name}</span>  gratis, descargar 
        <span class="color">${datos.name}</span> full latino, descargar
        <span class="color">${datos.name}</span> Castellano, Ver 
    <span class="color">${datos.name}</span>  Online HD Español Latino, Descargar o Ver
        <span class="color">${datos.name}</span> en HD 720p y HD 1080p español Latino por Fembed, Uptobox y 1fichier 1 link Gratis,
        <span class="color">${datos.name}</span>, <span class="color">${datos.name}</span> pelisplus, <span class="color">${datos.name}</span> pelispedia, 
        <span class="color">${datos.name}</span> miradetodo, <span class="color">${datos.name}</span> cuevana 3, <span class="color">${datos.name}</span> repelis,
        <span class="color">${datos.name}</span> gnula, Ver <span class="color">${datos.name}</span> online en español latino, <span class="color">${datos.name}</span>
        película completa online, descargar <span class="color">${datos.name}</span> online gratis, original film, marvel studios, uqload, 
        fembed, streamsb, doodstream, streamtape, utptobox, voex.
        </b:if>
        </b:if>
    </div>
</div>

<!-- HTML DE BOTONES -->
<div class="download" id="modal-view">
<div class="opciones-descarga">
<center><i class="fa fa-times-circle" id="cerrar-modal"></i></center>
<div id="listop" class="lat"> <div class="nom">ESPAÑOL LATINO</div>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">DoodStream </a><span> 1080p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">StreamSB </a><span> 1080p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">Streamlare </a><span> 720p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">Uptobox </a><span> 720p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">Voex </a><span> 480px </span></li>
</div>
<div id="listop" class="esp"> <div class="nom">CASTELLANO</div>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">DoodStream </a><span> 1080p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">StreamSB </a><span> 1080p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">Streamlare </a><span> 720p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">Uptobox </a><span> 720p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">Voex </a><span> 480px </span></li>
</div>
<div id="listop" class="sub"> <div class="nom">SUBTITULADO</div>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">DoodStream </a><span> 1080p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">StreamSB </a><span> 1080p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">Streamlare </a><span> 720p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">Uptobox </a><span> 720p </span></li>
<li><a href=" https://shrinke.me/qH9OcHrw " target="_blank">Voex </a><span> 480px </span></li>
</div>
<div id="listop" class="ing"> <div class="nom">INGLES</div>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">DoodStream </a><span> 1080p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">StreamSB </a><span> 1080p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">Streamlare </a><span> 720p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">Uptobox </a><span> 720p </span></li>
<li><a href=" https://fc-lc.com/0qYGjWV " target="_blank">Voex </a><span> 480px </span></li>
</div>
</div>
</div>
                    `;
                    
                    let seasonOnly = `
                    <ul class="caps-grid hide" id="season-${seasonNumber}">
                    ${episodeList}
                    </ul><!--Siguiente temporada debajo-->
    
    
    
                    `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
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
                console.log(datos)


                datos.genres.forEach((genre, index) => {
                    if (index > 2) {
                        return
                    }
                    tags += `<li>${genre.name}</li>`          

                });


                    let template = document.getElementById('html-final');

                    let justHtml = `
<b class='none the-entry-rate'>${(datos.vote_average.toFixed(1)/2).toFixed(1)}</b>
<b class='none the-entry-type'>Peli • Lat • Sub</b>
<img style="display: none; width: 0" src="https://image.tmdb.org/t/p/w300${datos.poster_path}"/>
<!--more-->

<div class="the-best-player">
    <div class="player-bg" style="background: url('https://image.tmdb.org/t/p/w1280${datos.backdrop_path}') no-repeat center center / cover;"></div>
    <div class="max-width-header">
        <div class="header-title-info">
            <h1 class="header-title-info_tit">${datos.title}</h1>
            <p class="header-title-info_sub"></p>
        </div>
        <div class="header-actions">
            <a href="#allEpList" class="back-episode-list">
                <span class="material-symbols-outlined"> format_list_bulleted </span>
                <p>Volver</p>
            </a>
        </div>
    </div>

    <div class="options_grid" id="optionsGrid">
        <div class="option-btn option-btn-active" data-link="">OPCIÓN 1</div>        
       <div class="option-btn" data-link="">OPCIÓN 2</div>    
    </div>

    <div class="iframe-container">
    <iframe src="" class="" frameborder="0" allowfullscreen="" ></iframe>
    </div>

    <div class='seo-title' style='color:#fff;max-height: 80px;overflow: auto;'> <span style='display: block;text-align: left;'>Etiquetas:</span>
    <b:if cond='data:post.title'><b:if cond='data:post.link'><b:else/>
        
    Descargar <span class="color">${datos.title}</span> 1080p en Latino,
    descargar, <span class="color">${datos.title}</span> online,
    <span class="color">${datos.title}</span> 1080p por Fembed, Descargar 
        <span class="color">${datos.title}</span> película completa español latino,
        <span class="color">${datos.title}</span> online latino,
    <span class="color">${datos.title}</span>  pelicula completa latino,
    <span class="color">${datos.title}</span>  descargar Uptobox,
        <span class="color">${datos.title}</span> link 1fitcher,
    <span class="color">${datos.title}</span>  pelicula gratis, ver 
    <span class="color">${datos.title}</span>  gratis, descargar 
        <span class="color">${datos.title}</span> full latino, descargar
        <span class="color">${datos.title}</span> Castellano, Ver 
    <span class="color">${datos.title}</span>  Online HD Español Latino, Descargar o Ver
        <span class="color">${datos.title}</span> en HD 720p y HD 1080p español Latino por Fembed, Uptobox y 1fichier 1 link Gratis,
        <span class="color">${datos.title}</span>, <span class="color">${datos.title}</span> pelisplus, <span class="color">${datos.title}</span> pelispedia, 
        <span class="color">${datos.title}</span> miradetodo, <span class="color">${datos.title}</span> cuevana 3, <span class="color">${datos.title}</span> repelis,
        <span class="color">${datos.title}</span> gnula, Ver <span class="color">${datos.title}</span> online en español latino, <span class="color">${datos.title}</span>
        película completa online, descargar <span class="color">${datos.title}</span> online gratis, original film, marvel studios, uqload, 
        fembed, streamsb, doodstream, streamtape, utptobox, voex.
        </b:if>
        </b:if>
    </div>
</div>


<div class="swiper-slide">
    <div class="big_slider_item">
        <div class="big_slider_item--bg" style="background: url('https://image.tmdb.org/t/p/w1280${datos.backdrop_path}') no-repeat center top / cover;"></div>
        <div class="big_slider_item--info max-width">
            <h1 class="bs-title">${datos.title}</h1>
    
            <ul class="big_slider_item--info_tags">
                <li>${datos.release_date.slice(0,4)}</li>
                <li>Subtitulada</li>
            </ul>
            <ul class="big_slider_item--info_category">
            ${tags}
            </ul>

            <ul class="big_slider_item--info_rating">
                <li class="big_slider_item--info_rating-stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <!-- <i class="fa-solid fa-star-half-stroke"></i> -->
                </li>
                <li class="big_slider_item--info__rate-numbers">
                ${(datos.vote_average.toFixed(1)/2).toFixed(1)} <i class="fa-solid fa-star"></i>
                </li>
                <span></span>
            </ul>
    
            <p class="big_slider_item--info_resume">${datos.overview}</p>
    
            <!-- <h1 class="big_slider_item--info_opt-text">¡Nueva Temporada!</h1> -->
    
            <ul class="big_slider_item--info_buttons">
                <li>
                    <a href="#!" class="btn-play">
                        <span class="material-symbols-rounded">
                            play_arrow
                        </span>
                    </a>
                </li>
                <li>
                    <button class="btn fav-btn" fav-id="P${datos.id}">
                        <span class="material-symbols-rounded">
                            playlist_add
                        </span>
                        Agregar a mi lista
                    </button>
                    <div class="blogger-entry-data" style="display: none;" entry-type="Peli • Lat • Sub" entry-bg="https://image.tmdb.org/t/p/w780${datos.poster_path}" entry-title="${datos.title}"></div>

                </li>
                <li>
                    <button class="btn" id="dwnld-btn">
                        <span class="material-symbols-outlined"> download </span> 
                        Descargar
                    </button>
                </li>
            </ul>
    
        </div>
    </div>
</div>

`;                  
                    template.innerText = justHtml;
                    let templateHTML = template.innerText;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
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



