import md5_encode from "./MD5";

class HttpsRequest {
    url:string = 'https://ws.audioscrobbler.com/2.0/';
    api_key:string = '906db58ae0258689ba249d53210358ee';
    sk:string = 'PEJSZfVNq8UlcfpQoiME1HzKEaFYAClf';
    secret:string = '04e5fe9b4835a8387149c2770345a9af';
    format:string = 'json';
    api_method:string;
    method:string;

    constructor(api_method:string,method:string) {
        this.api_method = api_method
        this.method = method;
    }
}

class GetRequest extends HttpsRequest {
    user?: string

    constructor(request: HttpsRequest, user?: string) {
        super(request.api_method, request.method);
        this.user = user
    }

    async getTracks(value: string | undefined) {
        try {
            let fetchUrl;
            if (value) {
                fetchUrl = `${this.url}?api_key=${this.api_key}&method=${this.method}&track=${value}&format=${this.format}`;
            } else {
                fetchUrl = `${this.url}?api_key=${this.api_key}&method=${this.method}&user=${this.user}&format=${this.format}`;
            }
            const response = await fetch(fetchUrl, {
                method: this.api_method
            });
            return await response.json()
        } catch (err: any) {
            alert(`Произошла ошибка ${err.message}`);
            throw new Error(`Произошла ошибка ${err.message}`);
        }
    }
}

class PostRequest extends HttpsRequest {
    constructor(request: HttpsRequest) {
        super(request.api_method, request.method);
    }

    async deleteTrack(track: string,artist:string) {
        const params = new URLSearchParams( {'track': `${track}`,'artist': `${artist}`,'api_key': `${this.api_key}`,
            'api_sig': `${md5_encode(this.api_key,artist,this.sk,track,this.secret)}`,'sk': `${this.sk}`,'method': `${this.method}`});
        let response = await fetch(this.url, {
            method: 'POST',
            body: params,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                    '(KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36', 'Content-Type':'application/x-www-form-urlencoded'}
        })
        if (!response.ok) {
            alert("Ошибка, удаление совершить не удалось");
            throw new Error('Ошибка, проверьте параметры запроса')
        }
    }
}

export {HttpsRequest,GetRequest,PostRequest};