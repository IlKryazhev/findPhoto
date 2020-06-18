import { environment } from '../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { FlickrService } from './flickr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormatedFoto } from './flickr.interfaces';
import { concatAll, debounceTime, distinctUntilChanged, map, switchMap, tap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.scss']
})
export class FlickrComponent implements OnInit {

  isLoading = false;
  isMoreLoading = false;

  search = new FormControl('');

  photos: Array<FormatedFoto>;

  page = 1;

  constructor(
    private flickr: FlickrService
  ) { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        tap(() => this.isLoading = true),
        tap(() => this.page = 1),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => this.flickr.requestPhoto(query))
      )
      .subscribe(value => {
        this.photos = value;
        this.isLoading = false;
      });
  }

  getMorePhotos() {
    if (this.search.value) {
      this.isMoreLoading = true;
      this.page++;
      this.flickr.requestPhoto(this.search.value, this.page.toString())
        .subscribe((res) => {
          res.forEach(item => this.photos.push(item));
          this.isMoreLoading = false;
        });
    }
  }

}
