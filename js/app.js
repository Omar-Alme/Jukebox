import PlaylistController from './controller/playlistController.js';
import MusicModel from './model/musicModel.js';
import PlaylistView from './view/playlistView.js';

const app = new PlaylistController(
    new MusicModel(),
    new PlaylistView()
);

const view = new PlaylistView();
console.log("View object:", view);
console.log("bindCreatePlaylist exists?", typeof view.bindCreatePlaylist);


app.init();