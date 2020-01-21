import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap, catchError } from "rxjs/operators";

@Injectable()
export class SpotifyService {
  token:any;
  
  constructor(private http:HttpClient) { }

  getBearer(){
    //mando a heroku una peticion para que me mande el bearer
                                                                      //      clientID                      clientSecret
    const urlPrueba = 'https://guido-spotyapp.herokuapp.com/spotify/129b6cbc21524b289d99b007061c06ba/d6a81d156cfb4d41acadf14b7fccda1d'      
    return this.http.get(urlPrueba)
               .pipe(
                 tap((token:any)=>{
                   this.token=token.access_token
                   console.log(this.token);

                 }))
  }

  getQuery(query:string){
      const URL=`https://api.spotify.com/v1/${query}`;
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
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
