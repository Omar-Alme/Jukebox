import PlaylistController from './controller/PlaylistController.js';
import MusicModel from './models/MusicModel.js';
import PlaylistView from './views/PlaylistView.js';

const app = new PlaylistController(
  new PlaylistView(),
  new MusicModel()
);

app.init();