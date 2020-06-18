export interface FormatedFoto {
  url: string;
  title: string;
}

export interface FlickrResp {
  photos: FlickrPhotos;
  stat: string;
}

export interface FlickrPhotos {
  page: number;
  pages: number;
  perpage: number;
  photo: Array<FlickrPhoto>;
  total: string;
}

export interface FlickrPhoto {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
