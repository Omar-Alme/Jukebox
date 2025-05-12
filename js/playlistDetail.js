import PlaylistDetailController from './controller/playlistDetailController.js';
import MusicModel from './model/musicModel.js';
import PlaylistDetailView from './view/playlistDetailView.js';

const model = new MusicModel();
const view = new PlaylistDetailView();
const controller = new PlaylistDetailController(model, view);

controller.init();
