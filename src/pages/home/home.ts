import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { YoutubeService } from '../../providers/YoutubeService';
import { PlaylistPage } from '../playlist/playlist';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  public channelId = 'UCZZPgUIorPao48a1tBYSDgg';
  public playlists: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public youtubeService: YoutubeService) {
  }

  searchPlaylists() {
    this.playlists = this.youtubeService.getPlaylistsForChannel(this.channelId);

    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });

      alert.present();
    })
  }

  openPlaylist(id) {
    this.navCtrl.push(PlaylistPage, {
      id: id
    });
  }

}
