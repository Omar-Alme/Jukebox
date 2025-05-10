const API_KEY = '681fce0272702c5d63b3d535';
const DB_URL = 'https://jukebox-b37f.restdb.io/rest/playlist';

export default class MusicModel {
    async getPlaylists() {
        const res = await fetch(DB_URL, {
            headers: {
                'x-apikey': API_KEY,
                'Cache-Control': 'no-cache'
            }
        });
        return await res.json();
    }

    async createPlaylist(data) {
        const res = await fetch(DB_URL, {
            method: 'POST',
            headers: {
                'x-apikey': API_KEY,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const err = await res.text();
            console.error("Failed to create playlist:", err);
        }

        return await res.json();
    }
}