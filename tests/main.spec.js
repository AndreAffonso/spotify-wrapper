import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });
  describe('smoke tests', () => {
    // search (genérico) busca mais de um tipo
    // search albuns
    // search artists
    // search playlists

    it('should exist search method', () => {
      expect(search).to.exist;
    });

    it('should exist searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Nirvana', 'artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=artist');

        const albuns = search('Nirvana', 'album');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbuns = search('Nirvana', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=artist,album');
      });
    });

    it('should return the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artist = search('Nirvana', 'artist');
      expect(artist.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Search Artists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=artist');

      const artists2 = searchArtists('Akon');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Akon&type=artist');
    });
  });

  describe('Search Albuns', () => {
    it('should call fetch function', () => {
      const albuns = searchAlbuns('Nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albuns = searchAlbuns('Nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=album');
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=track');
    });
  });

  describe('Search Playlist', () => {
    it('should call fetch function', () => {
      const tracks = searchPlaylists('Nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchPlaylists('Nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=playlist');
    });
  });
});
