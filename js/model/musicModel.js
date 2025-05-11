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

    async deletePlaylist(id) {
        const res = await fetch(`${DB_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY
            }
        });

        if (!res.ok) {
            throw new Error("Failed to delete playlist");
        }

        return true;
    }

    async addSongToPlaylist(playlistId, song) {
        // Fetch current playlist
        const res = await fetch(`${DB_URL}/${playlistId}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY
            }
        });

        const playlist = await res.json();
        const updatedSongs = [...(playlist.songs || []), song];

        // Send PATCH request to update songs
        const patchRes = await fetch(`${DB_URL}/${playlistId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY
            },
            body: JSON.stringify({
                songs: updatedSongs
            })
        });

        return await patchRes.json();
    }

    async deleteSongFromPlaylist(playlistId, songIndex) {
        const res = await fetch(`${DB_URL}/${playlistId}`, {
            headers: {
                "x-apikey": API_KEY
            }
        });
        const playlist = await res.json();

        const updatedSongs = playlist.songs || [];
        updatedSongs.splice(songIndex, 1);

        // Update playlist
        const updateRes = await fetch(`${DB_URL}/${playlistId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY
            },
            body: JSON.stringify({
                songs: updatedSongs
            })
        });

        return await updateRes.json();
    }

    async updatePlaylist(id, updatedData) {
  const res = await fetch(`${DB_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": API_KEY
    },
    body: JSON.stringify(updatedData)
  });

  return await res.json();
}

}