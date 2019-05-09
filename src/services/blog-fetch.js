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

    async postResource (url, id, body) {
        const res = await fetch(`${this._baseUrl}${url}`,
             {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "postId": id, "body": body })
             });
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

    addComment (id, body) {
        return this.postResource(`comments`, id, body)
    }
}

