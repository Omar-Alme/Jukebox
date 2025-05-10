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
`;
            this.listContainer.appendChild(div);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                this.onDelete(id);
            });
        });
    }

    bindDeletePlaylist(callback) {
  this.onDelete = callback;
}
}

