import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { spotifyKeys } from './spotify.keys';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private client_id = spotifyKeys.client_id;
  private client_secret = spotifyKeys.client_secret;
  private token = spotifyKeys.token;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;


  constructor(private _http: Http) {
  }

  searchMusic(str:string, type='artist') {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    this.searchUrl = `https://api.spotify.com/v1/search?q=${str}&offset=0&limit=20&type=${type}&market=US`;
    return this._http.get(this.searchUrl, { headers })
      .map(res => res.json());
  }

  getArtist(id:string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    this.artistUrl = `https://api.spotify.com/v1/artists/${id}`;
    return this._http.get(this.artistUrl, { headers })
      .map(res => res.json());
  }

  getAlbums(artistId: string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    this.albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
    return this._http.get(this.albumsUrl, { headers })
      .map(res => res.json());
  }

  getAlbum(id: string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    this.albumUrl = `https://api.spotify.com/v1/albums/${id}`;
    return this._http.get(this.albumUrl, { headers })
      .map(res => res.json());
  }

}
