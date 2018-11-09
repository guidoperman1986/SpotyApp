import { Component,Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  nuevasCanciones:any[]=[];
  cargo:boolean;
  error:boolean;
  mensageError:string;

  constructor(private spotify:SpotifyService) {
      this.error=false;

      this.spotify.getNewReleases()
                  .subscribe((data:any)=>{
                      console.log(data);
                      this.nuevasCanciones=data;
                      this.cargo=true;
                  },(errorServicio)=>{
                        console.log(errorServicio);
                        this.error=true;
                        this.cargo=true;
                        //this.mensageError=error

                  });
  }

  ngOnInit() {
  }

}
