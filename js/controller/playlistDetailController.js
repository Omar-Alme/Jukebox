export default class PlaylistDetailController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.playlistId = new URLSearchParams(window.location.search).get('id');
        this.fullSongList = [];
    }

    async init() {
        const playlist = await this.model.getPlaylistById(this.playlistId);
        this.playlist = playlist;
        this.fullSongList = playlist.songs || [];

        this.view.renderPlaylist(playlist);
        this.view.renderSongs(playlist.songs);
        this.view.bindFilterByArtist(this.handleFilterByArtist.bind(this));
        this.view.bindResetArtistFilter(this.handleFilterByArtist.bind(this));


        this.view.bindAddSong(this.handleAddSong.bind(this));
        this.view.bindDeleteSong(this.handleDeleteSong.bind(this));
        this.view.bindToggleAddForm();
    }

    async handleAddSong(song) {
        console.log("Adding song:", song);
        await this.model.addSongToPlaylist(this.playlistId, song);
        const updated = await this.model.getPlaylistById(this.playlistId);

        this.fullSongList = updated.songs;
        this.view.renderSongs(this.fullSongList);
    }

    async handleDeleteSong(index) {
        console.log("Deleting song at index:", index);
        await this.model.deleteSongFromPlaylist(this.playlistId, index);
        const updated = await this.model.getPlaylistById(this.playlistId);

        this.fullSongList = updated.songs;
        this.view.renderSongs(this.fullSongList);
    }

    handleFilterByArtist(artist) {
        const filtered = artist
            ? this.fullSongList.filter(song => song.artist === artist)
            : this.fullSongList;
            
        this.view.renderSongs(this.playlist.songs, artist);
    }

}