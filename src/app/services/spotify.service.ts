import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";

@Injectable()
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery(query:string){
      const URL=`https://api.spotify.com/v1/${query}`;
      const headers = new HttpHeaders({
          'Authorization': 'Bearer BQAENZAP_EYB68VJcE5MPo-0I9EaxD1rOuNw-zLvem6GpXTJgX3K5_jMoaiQquRJeNPcJCVujUaFnMqFSR0'
      });
      return this.http.get(URL,{headers});
  }

  getNewReleases(){
      return this.getQuery('browse/new-releases?limit=20')
                 .pipe(map(data=>data["albums"].items));
  }

  getArtistas(termino:string){
      return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                 .pipe(map(data=>data["artists"].items));
  }

  getArtista(id:string){
    return this.getQuery(`artists/${id}`);
               //.pipe(map(data=>data["artists"].items)); }
  }
  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe(map(data=>data["tracks"]));

  }
}
