import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { map } from 'rxjs/operators';
import { video } from '../../models/youtube.models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: video[]=[];
    
  constructor( private youtubeServices:YoutubeService) {
    
   }

  ngOnInit(): void {
    this.cargarVideos();
  }
  
  cargarVideos(){
    this.youtubeServices.getVideos().subscribe( videos => {
      this.videos.push(...videos);
      console.log(this.videos)
    } );
  }

  mostrarVideo( video:video){

    Swal.fire({
      html:`
      <h4>${video.title}</h4>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
      frameborder="0" 
      allow="accelerometer; 
      autoplay; 
      clipboard-write; 
      encrypted-media; 
      gyroscope; 
      picture-in-picture" 
      allowfullscreen></iframe>
      `
    });
  }
}
