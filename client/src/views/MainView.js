var MainView = function() {
  this.pictures = [];
  this.url = "https://wedding--photo-test.herokuapp.com/pictures";
  this.photos = [];
  this.position = 0;
  this.numberOfPhotos = 0;
  this.lastPhoto = 1;
  this.loopCheck = false;
  this.initialLength = 0;
  this.newLength = 0;
  this.getPictures();
}

MainView.prototype = {

  noOfPhotos: function() {
    return this.photos.length;
  },

  addPhoto: function( photo ) {
    this.photos.push( photo );
    this.numberOfPhotos += 1;
  },

  pickPhoto: function() {
    this.lengthCheck();
    this.newPhotoCheck();
    this.randomNumber();
    var link = this.photos[ this.position ];
    this.position += 1;
    return link;
  },

  lengthCheck: function() {
    if( this.position >= this.numberOfPhotos ) {
      this.lastPhoto = this.position;
      this.position = 0;
      this.loopCheck = true;
    };
  },

  newPhotoCheck: function() {
    if( this.numberOfPhotos > this.lastPhoto && this.loopCheck ) {
      this.position = this.lastPhoto;
      this.loopCheck = false;
    }
  },

  randomNumber: function() {
    if( this.loopCheck ) {
      this.position = Math.floor(Math.random() * (this.lastPhoto - 1));
    }
  },


  getPictures: function() {
    // setInterval( function() {
      var pictureSpace = document.getElementById( 'picture-space' );
      pictureSpace.innerText = "";
      var request = new XMLHttpRequest();
      request.open( 'GET', this.url );
      request.setRequestHeader("Content-Type", "application/json")
      request.onload = () => {
        if( request.status === 200 ) {
          var pictures = JSON.parse( request.responseText );
          this.pictures = pictures;
          this.display();
        }
      }
      request.send( null );
    // }.bind( this ), 7000 );
  },

  display: function() {
          console.log( this.pictures );
    var pictureSpace = document.getElementById( 'picture-space' );
    pictureSpace.innerText = "";
    var max = this.pictures.length - 1;
    var i = this.randomNumber();
    console.log( this.pictures[i] );
    var picture = document.createElement( 'img' );
    var url = this.pictures[i].url;
    console.log( url )
    picture.src = url;
    picture.style.maxWidth = 50 + "%";
    pictureSpace.appendChild( picture );
  },


}

module.exports = MainView;