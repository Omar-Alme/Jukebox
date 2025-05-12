export default class PlaylistController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentGenreFilter = "";
        this.currentSort = "name";
        this.fullPlaylistList = [];

    }

    init() {
        console.log("In init, view is:", this.view);
        console.log("bindCreatePlaylist?", typeof this.view.bindCreatePlaylist);
        this.view.bindCreatePlaylist(this.handleCreatePlaylist.bind(this));
        this.view.bindDeletePlaylist(this.handleDeletePlaylist.bind(this));
        this.view.bindEditPlaylist(this.handleEditPlaylist.bind(this));

        this.view.bindFilterByGenre(this.handleFilterByGenre.bind(this));
        this.view.bindResetGenreFilter(this.handleFilterByGenre.bind(this));

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


    handleFilterByGenre(genre) {
        this.currentGenreFilter = genre;
        const filtered = genre ?
            this.fullPlaylistList.filter(p => p.genre === genre) :
            this.fullPlaylistList;

        this.view.renderPlaylists(filtered);
    }


    async loadPlaylists() {
        let playlists = await this.model.getPlaylists();
        console.log("Playlists loaded:", playlists);

        this.fullPlaylistList = playlists;

        const filtered = this.currentGenreFilter ?
            playlists.filter(p => p.genre === this.currentGenreFilter) :
            playlists;

        this.view.renderPlaylists(filtered);
    }
}