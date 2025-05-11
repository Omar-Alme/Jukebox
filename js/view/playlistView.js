export default class PlaylistView {
    constructor() {
        this.form = document.getElementById('createPlaylistForm');
        this.listContainer = document.getElementById('playlist-list');
        this.genreFilter = document.getElementById('genreFilter');
        this.artistFilter = document.getElementById('artistFilter');
        this.sortSelect = document.getElementById('sortBy');
    }

    bindCreatePlaylist(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('playlist-name').value;
            const genre = document.getElementById('playlist-genre').value;

            callback({
                name,
                genre,
            });
            this.form.reset();
        });
    }

    renderPlaylists(playlists) {
        this.listContainer.innerHTML = '';

        playlists.forEach(p => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="playlist">
                <strong>${p.name}</strong>
                <p style="margin: 0.3rem 0 0.5rem;">Genre: <em>${p.genre}</em></p>
                <a href="playlist.html?id=${p._id}">
                <button class="view-btn">👁️ View</button>
                </a>
            </div>
`;

            this.listContainer.appendChild(div);
        });

        // Populate genre filter
        const genres = [...new Set(playlists.map(p => p.genre))];
        this.genreFilter.innerHTML = '<option value="">All</option>';
        genres.forEach(g => {
            const option = document.createElement('option');
            option.value = g;
            option.textContent = g;
            this.genreFilter.appendChild(option);
        });

        // Populate artist filter
        const artists = [...new Set(playlists.map(p => p.artist))];
        this.artistFilter.innerHTML = '<option value="">All</option>';
        artists.forEach(a => {
            const option = document.createElement('option');
            option.value = a;
            option.textContent = a;
            this.artistFilter.appendChild(option);
        });



        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                this.onDelete(id);
            });
        });

        document.querySelectorAll('.add-song-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = form.getAttribute('data-id');
                const title = form.title.value.trim();
                const artist = form.artist.value.trim();
                const duration = form.duration.value.trim();
                const spotifyUrl = form.spotifyUrl.value.trim();

                if (title && artist && duration) {
                    this.onAddSong(id, {
                        title,
                        artist,
                        duration,
                        spotifyUrl
                    });
                    form.reset();
                }
            });
        });

        document.querySelectorAll('.toggle-add-song-btn').forEach(button => {
            const id = button.getAttribute('data-id');
            button.addEventListener('click', () => {
                const form = document.querySelector(`form.add-song-form[data-id="${id}"]`);
                form.style.display = form.style.display === 'none' ? 'block' : 'none';
            });
        });


        document.querySelectorAll('.delete-song-btn').forEach(button => {
            const playlistId = button.getAttribute('data-playlist-id');
            const songIndex = button.getAttribute('data-song-index');

            button.addEventListener('click', () => {
                this.onDeleteSong(playlistId, parseInt(songIndex));
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            const id = button.getAttribute('data-id');
            button.addEventListener('click', () => {
                const form = document.querySelector(`form.edit-playlist-form[data-id="${id}"]`);
                form.style.display = form.style.display === 'none' ? 'block' : 'none';
            });
        });

        document.querySelectorAll('.edit-playlist-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = form.getAttribute('data-id');
                const name = form.name.value.trim();
                const genre = form.genre.value.trim();
                const artist = form.artist.value.trim();

                if (name && genre && artist) {
                    this.onEditPlaylist(id, {
                        name,
                        genre,
                        artist
                    });
                }
            });
        });

    }

    bindDeletePlaylist(callback) {
        this.onDelete = callback;
    }
    bindAddSong(callback) {
        this.onAddSong = callback;
    }

    bindDeleteSong(callback) {
        this.onDeleteSong = callback;
    }

    bindEditPlaylist(callback) {
        this.onEditPlaylist = callback;
    }

    bindFilterByGenre(callback) {
        this.genreFilter.addEventListener('change', (e) => {
            callback(e.target.value);
        });
    }

    bindSortBy(callback) {
        this.sortSelect.addEventListener('change', (e) => {
            callback(e.target.value);
        });
    }

    bindFilterByArtist(callback) {
        this.artistFilter.addEventListener('change', (e) => {
            callback(e.target.value);
        });
    }

}