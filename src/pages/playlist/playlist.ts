import { Component } from '@angular/core';
import { NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeService } from '../../providers/YoutubeService';


@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})


export class PlaylistPage {
  videos: Observable<any[]>;

  constructor(
    private navParams: NavParams,
    private youtubeService: YoutubeService,
    private youtube: YoutubeVideoPlayer,
    private platform: Platform) {
    let listId = this.navParams.get('id');
    this.videos = this.youtubeService.getListVideos(listId);
  }

  openVideo(video) {
    if (this.platform.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }

}
