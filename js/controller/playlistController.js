export default class PlaylistController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        console.log("In init, view is:", this.view);
        console.log("bindCreatePlaylist?", typeof this.view.bindCreatePlaylist);
        this.view.bindCreatePlaylist(this.handleCreatePlaylist.bind(this));
        this.view.bindDeletePlaylist(this.handleDeletePlaylist.bind(this));
        this.view.bindAddSong(this.handleAddSong.bind(this));
        this.view.bindDeleteSong(this.handleDeleteSong.bind(this));
        this.loadPlaylists();
    }

    async handleCreatePlaylist(data) {
        console.log("Creating playlist with data:", data);
        await this.model.createPlaylist(data);
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


    async loadPlaylists() {
        const playlists = await this.model.getPlaylists();
        this.view.renderPlaylists(playlists);
    }
}