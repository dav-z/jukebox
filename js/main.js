let elPause = document.getElementById('pause')
  , elPlay = document.getElementById('play')
  , elForward = document.getElementById('forward')
  , elBackward = document.getElementById('backward')
  , elRandom = document.getElementById('random')
  , elVolume;

function Song( title, artist, file ){
  this.title = title;
  this.artist = artist;
  this.file = file;
}
function Player( el ) {
  this.el = el;
  this.currentSong = 0;
  this.songs = [];
  this.newSongIndex = 0;
}

Player.prototype.addSong = function( song ){
  if( song instanceof Song ){
    this.songs.push(song);
    document.getElementById('list').innerHTML += "<li id='" + this.newSongIndex + "'>" + song.artist + " - " + song.title + "</li>";
      this.newSongIndex ++;
    return true;
    if ( !song instanceof Song ) return false;
  }
};

Player.prototype.play = function(){
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
Player.prototype.pause = function(){
  this.el.pause();
  document.getElementById('play').style.display = "inline-block";
  document.getElementById('pause').style.display = "none";
};
Player.prototype.random = function(){
  this.currentSong = parseInt(Math.random()*this.songs.length);
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
Player.prototype.playNext = function(){
  this.currentSong = (this.currentSong + 1) % this.songs.length;
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  console.log( this.el.src);
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
Player.prototype.playPrevious = function(){
  if( this.currentSong >= 1 ){
    this.currentSong = (this.currentSong - 1) % this.songs.length;
  }
  if( this.currentSong === 0 ){
    this.currentSong = this.songs.length - 1;
  }
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  console.log( this.el.src);
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
// Player.prototype.selectSong = function(){
//   this.el.src = path + this.songs[this.newSongIndex].file;
//   this.el.play();
// };
Player.prototype.end = function(){
  this.currentSong = (this.currentSong + 1) % this.songs.length;
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  console.log( this.el.src);
};

document.addEventListener("DOMContentLoaded",function(){

  Jukebox = new Player(document.querySelector("audio"));

  elVolume = document.getElementById('volume');
  noUiSlider.create(elVolume,{
    start: 0.8,
    range: {
      min: 0,
      max: 1
    }
  });
  elVolume.noUiSlider.on('slide',function(){
    // get the value of the slider
    // set the player volume to that value
    document.querySelector('audio').volume = parseFloat(elVolume.noUiSlider.get());
  });

  elPlay.addEventListener("click", function(){
    Jukebox.play();
  });
  elPause.addEventListener("click", function(){
    Jukebox.pause();
  });
  elForward.addEventListener("click", function(){
    Jukebox.playNext();
  });
  elBackward.addEventListener("click", function(){
    Jukebox.playPrevious();
  });
  elRandom.addEventListener("click", function(){
    Jukebox.random();
  });

  document.querySelector('audio').addEventListener("ended", function(){
    Jukebox.end();
  });
  // elSelectSong.addEventListener("click", function(){
  //   Jukebox.selectSong();
  // });
  var Rugrats = new Song( "Theme", "Rugrats", "audio/Rugrats.mp3");
  var Sjowgren = new Song( "Seventeen", "Sjowgren", "audio/Sjowgren.mp3");
  var TameImpala = new Song( "The Less I Know The Better", "Tame Impala", "audio/TameImpala.mp3");
  var DeptfordGoth = new Song( "Feel Real", "Deptford Goth", "audio/DeptfordGoth.mp3");
  var WillowSmith = new Song( "Jimi", "Willow Smith", "audio/WillowSmith.mp3");
  var Vulfpeck = new Song( "Back Pocket", "Vulfpeck", "audio/Vulfpeck.mp3");
  var BeachHouse = new Song( "Myth", "Beach House", "audio/BeachHouse.mp3");
  var NeutralMilkHotel = new Song( "Holland, 1945", "Neutral Milk Hotel", "audio/NeutralMilkHotel.mp3");
  var JBalvin = new Song( "Ginza", "J Balvin", "audio/JBalvin.mp3");
  var SufjanStevens = new Song( "To Be Alone With You", "Sufjan Stevens", "audio/SufjanStevens.mp3");
  var PorterRobinson = new Song( "Lionhearted", "Porter Robinson", "audio/PorterRobinson.mp3");
  var SanHolo = new Song( "We Rise", "San Holo", "audio/SanHolo.mp3");
  Jukebox.addSong(Rugrats);
  Jukebox.addSong(Sjowgren);
  Jukebox.addSong(TameImpala);
  Jukebox.addSong(DeptfordGoth);
  Jukebox.addSong(WillowSmith);
  Jukebox.addSong(Vulfpeck);
  Jukebox.addSong(BeachHouse);
  Jukebox.addSong(NeutralMilkHotel);
  Jukebox.addSong(JBalvin);
  Jukebox.addSong(SufjanStevens);
  Jukebox.addSong(PorterRobinson);
  Jukebox.addSong(SanHolo);

  for(i=0; i<Jukebox.songs.length ; i++){
    console.log(i);
   elSelectSong = document.getElementsByTagName('li')[i];
   elSelectSong.addEventListener("click", function(){
     currentSong = Jukebox.songs[this.getAttribute('id')];
     Jukebox.el.src = currentSong.file;
     document.getElementsByTagName('h3')[0].innerText = currentSong.artist + " - " + currentSong.title;
     Jukebox.el.play();
     document.getElementById('pause').style.display = "inline-block";
     document.getElementById('play').style.display = "none";
   })
 };
});
