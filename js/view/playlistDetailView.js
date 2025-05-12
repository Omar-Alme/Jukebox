export default class PlaylistDetailView {
    constructor() {
        this.nameEl = document.getElementById('playlist-name');
        this.genreEl = document.getElementById('playlist-genre');
        this.songList = document.getElementById('song-list');
        this.form = document.getElementById('add-song-form');
        this.artistFilter = document.getElementById('artistFilter');
        this.resetFilterBtn = document.getElementById('reset-artist-filter-btn');
    }

    renderPlaylist(playlist) {
        this.nameEl.textContent = playlist.name;
        this.genreEl.textContent = `Genre: ${playlist.genre}`;
    }

    renderSongs(songs, filterArtist = '') {
        this.songList.innerHTML = '';

        if (!songs || songs.length === 0) {
            this.songList.innerHTML = '<li>No songs in this playlist yet.</li>';
            return;
        }

        let filteredSongs = songs;
        if (filterArtist) {
            filteredSongs = songs.filter(song => song.artist === filterArtist);
        }

        if (!filteredSongs || filteredSongs.length === 0) {
            this.songList.innerHTML = '<li>No songs match the selected artist.</li>';
            return;
        }

        filteredSongs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
        ${song.title} – <em>${song.artist}</em> (${song.duration})
        ${song.spotifyUrl ? `<a href="${song.spotifyUrl}" target="_blank" title="Listen on Spotify">🎧</a>` : ''}
        <button class="delete-song-btn" data-index="${index}">🗑️</button>
        `;
            this.songList.appendChild(li);
        });

        // Add delete listeners
        document.querySelectorAll('.delete-song-btn').forEach(button => {
            const index = parseInt(button.getAttribute('data-index'));
            button.addEventListener('click', () => {
                this.onDeleteSong(index);
            });
        });

        const artists = [...new Set(songs.map(song => song.artist))];
        this.artistFilter.innerHTML = '<option value="">Pick an artist</option>';
        artists.forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            this.artistFilter.appendChild(option);
        });
    }

    bindAddSong(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const song = {
                title: this.form.title.value.trim(),
                artist: this.form.artist.value.trim(),
                duration: this.form.duration.value.trim(),
                spotifyUrl: this.form.spotifyUrl.value.trim()
            };

            if (song.title && song.artist && song.duration) {
                callback(song);
                this.form.reset();
            }
        });
    }

    bindDeleteSong(callback) {
        this.onDeleteSong = callback;
    }

    bindToggleAddForm() {
        const toggleBtn = document.getElementById('toggle-add-form-btn');
        toggleBtn.addEventListener('click', () => {
            this.form.style.display = this.form.style.display === 'none' ? 'block' : 'none';
        });
    }

    bindFilterByArtist(callback) {
        this.artistFilter.addEventListener('change', (e) => {
            callback(e.target.value);
        });
    }

    bindResetArtistFilter(callback) {
        this.resetFilterBtn.addEventListener('click', () => {
            this.artistFilter.value = "";
            callback("");
        });
    }


}