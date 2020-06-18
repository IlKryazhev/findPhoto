import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatAll, filter, map, pluck, tap, toArray } from 'rxjs/operators';
import { FlickrResp, FormatedFoto } from './flickr.interfaces';


@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  key = '078742eee9840a33273a85633bcd6429';

  private static formatPhoto(photo: any) {
    return {
      url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      title: photo.title
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  requestPhoto(query: string, page: string = '1'): Observable<Array<FormatedFoto>> {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${query}&page=${page}&format=json&nojsoncallback=1`;
    return this.http.get<FlickrResp>(url)
      .pipe(
        filter(res => res.stat === 'ok'),
        pluck('photos', 'photo'),
        concatAll(),
        map(photo => FlickrService.formatPhoto(photo)),
        toArray()
      );
  }
}
