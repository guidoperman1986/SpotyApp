import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  artista: any={};
  loading:boolean;
  topTracks: any[] = [];

  constructor(private router:ActivatedRoute,
              private spotify:SpotifyService) {
                  this.router.params.subscribe(params=>{
                          this.getArtista(params["id"]);
                          this.getTopTracks(params["id"]);
                });
  }

  getArtista(id:string){
    this.spotify.getArtista(id).subscribe( artist=>{
                              this.artista=artist;
                              this.loading = false;
                             });
  }

  getTopTracks(id:string){
    this.spotify.getTopTracks(id).subscribe(topTracks=>{
                  console.log(topTracks);
                  this.topTracks=topTracks;
      });
  }
}
