import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { video, YouTubeModels } from '../models/youtube.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  
  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey    : string = 'AIzaSyDnu5P8OYtdHHV17QLF0htG37GZHdo1E_A';
  private playList  : string = 'UUuaPTYj15JSkETGnEseaFFg';
  private next      : string = 'CAUQAA';


  constructor(
      private http:HttpClient
  ) { 
    
   }

   getVideos(){
      
    const URL = `${this.youtubeUrl}/playlistItems`
    const PARAMS = new HttpParams()
      .set('part','snippet')
      .set('maxResults','20')
      .set('playlistId',this.playList)
      .set('key',this.apiKey)
      .set('pageToken',this.next)

    return this.http.get<YouTubeModels>(URL,{params:PARAMS})
      .pipe( map( (resp) =>{
        this.next = resp.nextPageToken;
        return resp.items
      }),
      map( items =>{
        return items.map( video => video.snippet);
      }));
   }
}
