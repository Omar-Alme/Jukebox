export default class PlaylistView {
    constructor() {
        this.form = document.getElementById('createPlaylistForm');
        this.listContainer = document.getElementById('playlist-list');
        this.genreFilter = document.getElementById('genreFilter');
        this.resetGenreBtn = document.getElementById('reset-genre-filter-btn');
        
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
            <img class="playlist-image" src="../assets/playlist.jpeg" alt="${p.name}" class="playlist-image">
            <strong>${p.name}</strong>
            <p style="margin: 0.3rem 0 0.5rem;">Genre: <em>${p.genre}</em></p>
            <a href="playlist.html?id=${p._id}">
                <button class="view-btn">👁️ View</button>
            </a>
            <button class="delete-btn" data-id="${p._id}">🗑️ Delete</button>
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

        // Populate genre filter
        const genres = [...new Set(playlists.map(p => p.genre))];
        this.genreFilter.innerHTML = '<option value="">Pick a genre</option>';
        genres.forEach(g => {
            const option = document.createElement('option');
            option.value = g;
            option.textContent = g;
            this.genreFilter.appendChild(option);
        });
    }

    bindDeletePlaylist(callback) {
        this.onDelete = callback;
    }

    bindEditPlaylist(callback) {
        this.onEditPlaylist = callback;
    }

    bindFilterByGenre(callback) {
        this.genreFilter.addEventListener('change', (e) => {
            callback(e.target.value);
        });
    }

    bindResetGenreFilter(callback) {
        this.resetGenreBtn.addEventListener('click', () => {
            this.genreFilter.value = ""; 
            callback("");
        });
    }

}