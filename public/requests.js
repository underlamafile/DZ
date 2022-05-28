import md5_encode from './MD5.js'

/**
 *  добавление eventListener на кнопку поиска трека
 */
const search_input = document.querySelector('.header__search');
search_input.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        send_request('GET',{method:'track.search',param:`&track=${search_input.value}`,track:search_input.value}).then(
            res => {
                if (res?.hasOwnProperty('results')) {
                    get_content('search',res.results.trackmatches.track)
                }
                else {
                    alert('Произошла ошибка поиска, повторите попытку')
                }
            }
        )
    }
});

/**
 *  добавление eventListener на кнопку любимых треков
 */
const fav_button = document.querySelector('.fav');
fav_button.addEventListener('click', function() {
    send_request('GET',{method:'user.getlovedtracks',param:'&user=Foxyb0y'}).then(
        res => get_content('favorites',res.lovedtracks.track)
    )
});



/**
 *
 * @param method метод Апи (GET или POST)
 * @param params
 * @returns {Promise} Выполненный промис
 */
async function send_request(method,params) {
    const url = 'https://ws.audioscrobbler.com/2.0/';
    const api_key = '906db58ae0258689ba249d53210358ee';
    try {
        if (method === 'GET') {
            const response = await fetch(`${url}?api_key=${api_key}&method=${params.method}${params.param}&format=json`, {
                method: 'GET'
            });
            return await response.json()
        } else if (method === 'POST') {
            const sk = 'PEJSZfVNq8UlcfpQoiME1HzKEaFYAClf';
            const secret = '04e5fe9b4835a8387149c2770345a9af';
            const url_params = new URLSearchParams({
                'track': params.track, 'artist': params.artist, 'api_key': api_key,
                'api_sig': `${md5_encode(api_key, params.artist, sk, params.track, secret)}`, 'sk': sk, 'method': params.method
            });
            const response = await fetch(url, {
                method: 'POST',
                body: url_params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
    } catch (err) {
        alert(`Произошла ошибка ${err.message}`);
        throw new Error(`Произошла ошибка ${err.message}`);
    }
}

//request_method,require_param='',track= '',artist=''

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
    if (track_array.length) {
        document.querySelectorAll('.unlove_button').forEach(unlove => {
            unlove.removeEventListener('click', unlove.listener)
        });
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
                const unlove_button = document.createElement("button");
                unlove_button.track_name = track.name;
                unlove_button.artist_name = track.artist.name;
                favorite_headline.textContent = track.artist.name;
                unlove_button.className = 'unlove_button';
                unlove_button.textContent = 'удалить';
                unlove_button.listener = function () {
                    send_request('POST', {
                        method: 'track.unlove', param: '',
                        track: unlove_button.track_name, artist: unlove_button.artist_name
                    })
                }
                content_favorite.appendChild(unlove_button);
                unlove_button.addEventListener('click',unlove_button.listener);
            }
            favorite_quantity.textContent = track.name;
            content.appendChild(content_favorite);
            content_favorite.appendChild(favorite_image);
            content_favorite.appendChild(favorite_headline);
            content_favorite.appendChild(favorite_quantity);
        })
    }
    else {
        const error = document.createElement("p");
        error.className = "error";
        error.textContent = 'Трек или исполнитель не найден, повторите запрос';
        content.appendChild(error)
    }
}
