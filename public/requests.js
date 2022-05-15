import md5_encode from './MD5.js'

/**
 *  добавление eventListener на кнопку поиска трека
 */
const search_input = document.querySelector('.header__search');
search_input.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        send_request('GET','track.search',search_input.value).then(
            res => get_content('search',res.results.trackmatches.track)
        )
    }
});

/**
 *  добавление eventListener на кнопку любимых треков
 */
const fav_button = document.querySelector('.fav');
fav_button.addEventListener('click', function() {
    send_request('GET','user.getlovedtracks').then(
        res => get_content('favorites',res.lovedtracks.track)
    )
});

/**
 *
 * @param method метод Апи (GET или POST)
 * @param request_method параметр запроса - метод
 * @param track название трека
 * @param artist имя артиста
 * @returns {Promise} Выполненный промис
 */
async function send_request(method,request_method,track= '',artist='') {
    const url = 'http://ws.audioscrobbler.com/2.0/'
    const api_key = '906db58ae0258689ba249d53210358ee';
    if (method === 'GET') {
        if (request_method === 'track.search') {
            const response = await fetch(`${url}?api_key=${api_key}&method=${request_method}&track=${track}&format=json`, {
                method: 'GET'
            });
            return await response.json()
        }
        else if (request_method === 'user.getlovedtracks') {
            const response = await fetch(`${url}?api_key=${api_key}&method=${request_method}&user=Foxyb0y&format=json`, {
                method: 'GET'
            });
            return await response.json();
        }
        else {
            alert('Ошибка отправки запроса')
        }
    }
    else if (method === 'POST') {
        const sk = 'PEJSZfVNq8UlcfpQoiME1HzKEaFYAClf';
        const secret = '04e5fe9b4835a8387149c2770345a9af';
        const params = new URLSearchParams( {'track': track,'artist': artist,'api_key': api_key,
            'api_sig': `${md5_encode(api_key,artist,sk,track,secret)}`,'sk': sk,'method': request_method});
        const response = fetch(url, {
            method: 'POST',
            body: params,
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
        return await response.json();
    }
}

/**
 *
 * @param response_content определяет какой контент нужно получить
 * @param track_array массив треков
 * @param track название трека
 * @param artist имя артиста
 */
function get_content(response_content,track_array,track=null,artist=null) {
    const content = document.querySelector('.content');
    content.innerHTML = "";
    if (track_array.length !== 0) {
        track_array.forEach((track) => {
            const content_favorite = document.createElement("div");
            const favorite_image = document.createElement("img");
            const favorite_headline = document.createElement("p");
            const favorite_quantity = document.createElement("p");
            content_favorite.className = "content__favorite";
            favorite_image.className = "favorite__image";
            favorite_headline.className = "favorite__headline";
            favorite_quantity.className = "favorite__quantity";
            favorite_image.src = track.image[3]["#text"];
            if (response_content === 'search') {
                favorite_headline.textContent = track.artist;
            }
            if (response_content === 'favorites') {
                const unlove_button = document.createElement("button")
                favorite_headline.textContent = track.artist.name;
                unlove_button.className = 'unlove_button';
                unlove_button.textContent = 'удалить';
                content_favorite.appendChild(unlove_button);
                unlove_button.addEventListener('click', function() {
                    send_request('POST','track.unlove',track.name,track.artist.name)
                });
            }
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
}
