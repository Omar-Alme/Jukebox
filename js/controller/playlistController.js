export default class PlaylistController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentGenreFilter = "";
        this.currentArtistFilter = '';
        this.currentSort = "name";
    }

    init() {
        console.log("In init, view is:", this.view);
        console.log("bindCreatePlaylist?", typeof this.view.bindCreatePlaylist);
        this.view.bindCreatePlaylist(this.handleCreatePlaylist.bind(this));
        this.view.bindDeletePlaylist(this.handleDeletePlaylist.bind(this));
        this.view.bindAddSong(this.handleAddSong.bind(this));
        this.view.bindDeleteSong(this.handleDeleteSong.bind(this));
        this.view.bindEditPlaylist(this.handleEditPlaylist.bind(this));

        this.view.bindFilterByGenre(this.handleFilterByGenre.bind(this));
        this.view.bindSortBy(this.handleSortBy.bind(this));
        this.view.bindFilterByArtist(this.handleFilterByArtist.bind(this));

        this.loadPlaylists();
    }

    async handleCreatePlaylist(data) {
        console.log("Creating playlist with data:", data);
        await this.model.createPlaylist(data);
        this.loadPlaylists();
    }

    async handleEditPlaylist(id, updatedData) {
        console.log("Editing playlist with id:", id, "and data:", updatedData);
        await this.model.updatePlaylist(id, updatedData);
        this.loadPlaylists();
    }


    async handleDeletePlaylist(id) {
        console.log("Deleting playlist with id:", id);
        await this.model.deletePlaylist(id);
        this.loadPlaylists();
    }

    async handleAddSong(playlistId, songData) {
        console.log("Adding song to playlist with id:", playlistId, "and data:", songData);
        await this.model.addSongToPlaylist(playlistId, songData);
        this.loadPlaylists();
    }

    async handleDeleteSong(playlistId, songIndex) {
        console.log("Deleting song at index:", songIndex, "from playlist with id:", playlistId);
        await this.model.deleteSongFromPlaylist(playlistId, songIndex);
        this.loadPlaylists();
    }

    handleFilterByGenre(genre) {
        this.currentGenreFilter = genre;
        this.loadPlaylists();
    }

    handleSortBy(sort) {
        this.currentSort = sort;
        this.loadPlaylists();
    }

    handleFilterByArtist(artist) {
        this.currentArtistFilter = artist;
        this.loadPlaylists();
    }



    async loadPlaylists() {
        let playlists = await this.model.getPlaylists();
        console.log("Playlists loaded:", playlists);

        if (this.currentGenreFilter) {
            playlists = playlists.filter(p => p.genre === this.currentGenreFilter);
        }

        if (this.currentArtistFilter) {
            playlists = playlists.filter(p => p.artist === this.currentArtistFilter);
        }


        this.view.renderPlaylists(playlists);
    }
}