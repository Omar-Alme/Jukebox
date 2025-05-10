const API_KEY = '62df15ac2cec969340b6ef02629ebf52b1bcf';
const DB_URL = 'https://jukebox-b37f.restdb.io/rest/playlist';

export default class MusicModel {
    async getPlaylists() {
        const res = await fetch(DB_URL, {
            headers: {
                'x-apikey': API_KEY
            }
        });
        return await res.json();
    }

    async createPlaylist(data) {
        const res = await fetch(DB_URL, {
            method: 'POST',
            headers: {
                'x-apikey': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
}