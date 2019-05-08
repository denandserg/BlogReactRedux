export default class ApiBlogService {
    _baseUrl = 'https://simple-blog-api.crew.red/';

    async getResource (url) {
        const res = await fetch(`${this._baseUrl}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    getAllPosts () {
        return this.getResource(`posts`);
    }

    getCurrentPost (id) {
        return this.getResource(`posts/${id}?_embed=comments`);
    }
}

//const api = new ApiBlogService();


//api.getCurrentPost(26).then((body) => {console.log(body)});

