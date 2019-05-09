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

    async delResource (url, id) {
        const res = await fetch(`${this._baseUrl}${url}${id}`,
            {
                method: 'DELETE',
            });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async editResource (url, id, body, title, date, author) {
        const res = await fetch(`${this._baseUrl}${url}${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "title": title,
                                        "body": body,
                                        "date": date,
                                        "author": author
                })
            });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async createResource (url, body, title, date, author) {
        const res = await fetch(`${this._baseUrl}${url}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "title": `${title}`,
                                        "body": `${body}`,
                                        "date": `${date}`,
                                         "author": `${author}`
                })
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

    deleteCurrentPost (id) {
        return this.delResource('posts/', id);
    }

    editCurrentPost (id, body, title, date, author) {
        return this.editResource('posts/', id, body, title, date, author);
    }

    createPost (body, title, date, author) {
        return this.createResource('posts', body, title, date, author);
    }

    addComment (id, body) {
        return this.postResource(`comments`, id, body);
    }
}




