// get album
// get album tracks

import chai, { expect } from 'chai';

import { getAlbum, getAlbuns, getAlbumTracks } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });
  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    // Verifica se o fetch ocorre
    it('it should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    // Verifica se o fetch ocorre com a URL desejada
    it('should call fetch with the correct url', () => {
      const album = getAlbum('2BTZIqw0ntH9MvilQ3ewNY');
      expect(stubedFetch).have.been.calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY');

      const album2 = getAlbum('2BTZIqw0ntH9MvilQ3ewNO');
      expect(stubedFetch).have.been.calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY');
    });
    // se o dado é recebido pela promise
    it('should return the correct data from the promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbuns', () => {
    // Verifica se o fetch ocorre
    it('it should call fetch method', () => {
      const albuns = getAlbuns();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    // Verifica se o fetch ocorre com a URL desejada
    it('should call fetch with the correct url', () => {
      const albuns = getAlbuns(['2BTZIqw0ntH9MvilQ3ewNY', '2BTZIqw0ntH9MvilQ3ewNC']);
      expect(stubedFetch).have.been.calledWith(
        'https://api.spotify.com/v1/albums/?ids=2BTZIqw0ntH9MvilQ3ewNY,2BTZIqw0ntH9MvilQ3ewNC'
      );
    });
    // se o dado é recebido pela promise
    it('should return the correct data from the promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbuns(['2BTZIqw0ntH9MvilQ3ewNY', '2BTZIqw0ntH9MvilQ3ewNC']);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumsTracks', () => {
    it('it should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    // Verifica se o fetch ocorre com a URL desejada
    it('should call fetch with the correct url', () => {
      const tracks = getAlbumTracks('2BTZIqw0ntH9MvilQ3ewNY');
      expect(stubedFetch).have.been.calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY/tracks');
    });
    // se o dado é recebido pela promise
    it('should return the correct data from the promise', () => {
      promise.resolves({ album: 'name' });
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(tracks.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
