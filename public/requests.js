import md5_encode from './MD5.js'

/**
 * Функция добавления eventListener на кнопку поиска трека
 */
(function() {
    let search_input = document.querySelector('.header__search');
    search_input.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            search_track(search_input.value)
        }
    });
})();

/**
 * Функция добавления eventListener на кнопку любимых треков
 */
(function() {
    let fav_button = document.querySelector('.fav');
    fav_button.addEventListener('click', function() {
        get_favorites();
    });
})();

/**
 *
 * Функция посылает GET-запрос и отображает результат поиска на странице
 * @param {string} track_name Название трека, который ищем
 *
 */
async function search_track(track_name) {
    let api_key = '906db58ae0258689ba249d53210358ee';
    let response = await fetch(`http://ws.audioscrobbler.com/2.0/` +
        `?method=track.search&track=${track_name}&api_key=${api_key}&format=json`, {
        method: 'GET'
    });
    response.json().then(res => {
        let content = document.querySelector('.content');
        content.innerHTML = "";
        //console.log(res.results.trackmatches.track)
        let track_array = res.results.trackmatches.track;
        if (track_array.length !== 0) {
            track_array.forEach((track) => {
                let content_favorite = document.createElement("div");
                let favorite_image = document.createElement("img");
                let favorite_headline = document.createElement("p");
                let favorite_quantity = document.createElement("p");
                content_favorite.className = "content__favorite";
                favorite_image.className = "favorite__image";
                favorite_headline.className = "favorite__headline";
                favorite_quantity.className = "favorite__quantity";
                favorite_image.src = track.image[3]["#text"];
                favorite_headline.textContent = track.artist;
                favorite_quantity.textContent = track.name;
                content.appendChild(content_favorite);
                content_favorite.appendChild(favorite_image);
                content_favorite.appendChild(favorite_headline)
                content_favorite.appendChild(favorite_quantity);
            })
        }
        else {
            content.innerHTML = '<p class="error">Трек или исполнитель не найден, повторите запрос</p>';
        }
    })
}

/**
 * Функция посылает GET-запрос и отображает понравившиеся треки на странице
 */
async function get_favorites() {
    let api_key = '906db58ae0258689ba249d53210358ee';
    let response = await fetch(`http://ws.audioscrobbler.com/2.0/` +
        `?method=user.getlovedtracks&user=Foxyb0y&api_key=${api_key}&format=json`, {
        method: 'GET'
    });
    if (!response.ok) {
        alert("Ошибка, проверьте параметры запроса")
    }
    response.json().then(res => {
        let content = document.querySelector('.content');
        content.innerHTML = "";
        let loved_tracks_array = res.lovedtracks.track;
        loved_tracks_array.forEach((track) => {
            let content_favorite = document.createElement("div");
            let favorite_image = document.createElement("img");
            let favorite_headline = document.createElement("p");
            let favorite_quantity = document.createElement("p");
            let unlove_button = document.createElement("button")
            content_favorite.className = "content__favorite";
            favorite_image.className = "favorite__image";
            favorite_headline.className = "favorite__headline";
            favorite_quantity.className = "favorite__quantity";
            unlove_button.className = 'unlove_button';
            unlove_button.textContent = 'удалить';
            favorite_image.src = track.image[3]["#text"]
            favorite_headline.textContent = track.artist.name;
            favorite_quantity.textContent = track.name;
            content.appendChild(content_favorite);
            content_favorite.appendChild(favorite_image);
            content_favorite.appendChild(favorite_headline)
            content_favorite.appendChild(favorite_quantity);
            content_favorite.appendChild(unlove_button);
            unlove_button.addEventListener('click', function() {
                unlove_track(track.name,track.artist.name);
            });
        })
    })
}

/**
 *
 * Функция посылает POST-запрос и удаляет трек при нажатии на кнопку "удалить",
 * после этого если снова нажать на "Любимые треки", то список обновится
 * @param {string} track_name Название трека
 * @param {string} artist Имя артиста
 *
 */
async function unlove_track(track_name,artist) {
    let api_key = '906db58ae0258689ba249d53210358ee';
    let sk = 'PEJSZfVNq8UlcfpQoiME1HzKEaFYAClf';
    let secret = '04e5fe9b4835a8387149c2770345a9af';
    const params = new URLSearchParams( {'track': `${track_name}`,'artist': `${artist}`,'api_key': `${api_key}`,
        'api_sig': `${md5_encode(api_key,artist,sk,track_name,secret)}`,'sk': `${sk}`,'method': 'track.unlove'});
    let response = await fetch(`http://ws.audioscrobbler.com/2.0/`, {
        method: 'POST',
        body: params,
        headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                '(KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
            'Content-Type':'application/x-www-form-urlencoded'}
    })
    if (!response.ok) {
        alert("Ошибка, проверьте параметры запроса")
    }
}