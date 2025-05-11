export default class PlaylistView {
    constructor() {
        this.form = document.getElementById('createPlaylistForm');
        this.listContainer = document.getElementById('playlist-list');
    }

    bindCreatePlaylist(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('playlist-name').value;
            const genre = document.getElementById('playlist-genre').value;
            const artist = document.getElementById('playlist-artist').value;

            callback({
                name,
                genre,
                artist
            });
            this.form.reset();
        });
    }

    renderPlaylists(playlists) {
        this.listContainer.innerHTML = '';

        playlists.forEach(p => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${p.name}</strong> - ${p.genre} - ${p.artist}
                    <button data-id="${p._id}" class="delete-btn">🗑️ Delete</button>

                    <div class="songs">
                        <ul>
                            ${(p.songs || []).map(song => `<li>${song.title} (${song.duration})</li>`).join('')}
                        </ul>

                        <form data-id="${p._id}" class="add-song-form">
                            <input type="text" name="title" placeholder="Song title" required />
                            <input type="text" name="duration" placeholder="Duration" required />
                            <button type="submit">Add Song</button>
                        </form>
                        </div>

                        <ul>
                            ${(p.songs && p.songs.length > 0)
                                ? p.songs.map((song, index) => `
                                <li>
                                    ${song.title} (${song.duration})
                                    <button class="delete-song-btn" data-playlist-id="${p._id}" data-song-index="${index}">🗑️</button>
                                </li>
                                `).join('')
                                : '<li>No songs yet.</li>'
                            }
                        </ul>
                    </div>
`;
            this.listContainer.appendChild(div);
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
                const duration = form.duration.value.trim();

                if (title && duration) {
                    this.onAddSong(id, {
                        title,
                        duration
                    });
                    form.reset();
                }
            });
        });

        document.querySelectorAll('.delete-song-btn').forEach(button => {
            const playlistId = button.getAttribute('data-playlist-id');
            const songIndex = button.getAttribute('data-song-index');

            button.addEventListener('click', () => {
                this.onDeleteSong(playlistId, parseInt(songIndex));
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
}