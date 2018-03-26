import { searchAlbuns } from '../src/main';

global.fetch = require('node-fetch');

const albuns = searchAlbuns('Rush');

albuns.then(data => console.log(data.albums.items.map(item => console.log(item.name))));
