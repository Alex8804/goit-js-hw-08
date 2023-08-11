import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const lsKeys = {
  time: 'videoplayer-current-time',
};

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const lastTime = JSON.parse(localStorage.getItem(lsKeys.time)) ?? [];

player.on('timeupdate', throttle(onPlay, 1000));
player.setCurrentTime(lastTime);

function onPlay(data) {
  localStorage.setItem(lsKeys.time, JSON.stringify(data.seconds));
}
