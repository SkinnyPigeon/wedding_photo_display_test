var NewView = function() {
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
};

NewView.prototype = {

  getPictures: function() {
    var pictureSpace = document.getElementById( 'picture-space' );
    pictureSpace.innerText = "";
    var request = new XMLHttpRequest();
    request.open( 'GET', this.url );
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = () => {
      if( request.status === 200 ) {
        var pictures = JSON.parse( request.responseText );
        this.pictures = pictures;
        this.photos = this.pictures;
        this.initialLength = this.photos.length;
        this.numberOfPhotos = this.initialLength;
        this.display();
      }
    }
    request.send( null );
  },

  display: function() {
    setInterval( function() {
      var pictureSpace = document.getElementById( 'picture-space' );
      pictureSpace.innerText = "";
      var picture = document.createElement( 'img' );
      var url = this.pickPhoto();
      picture.src = url;
      picture.style.maxWidth = 50 + "%";
      pictureSpace.appendChild( picture );
      this.checkForMorePhotos();
    }.bind( this ), 2000 );
  },

  checkForMorePhotos: function() {
    var request = new XMLHttpRequest();
    request.open( 'GET', this.url );
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = () => {
      if( request.status === 200 ) {
        var pictures = JSON.parse( request.responseText );
        this.pictures = pictures;
        this.newLength = this.pictures.length;
        console.log( this.newLength );
        this.automaticallyAddTheNewPhotos();
      }
    }
    request.send( null );
  },

  noOfPhotos: function() {
    return this.photos.length;
  },

  addPhoto: function( photo ) {
    this.photos.push( photo );
    this.numberOfPhotos += 1;
  },

  automaticallyAddTheNewPhotos:function() {
    if( this.newLength > this.initialLength ) {
      for( var i = this.initialLength; i < this.newLength; i++ ) {
        this.addPhoto( this.pictures[i] );
      }
      this.initialLength = this.newLength;
    }
  },

  pickPhoto: function() {
    this.lengthCheck();
    this.newPhotoCheck();
    // this.randomNumber();
    var link = this.photos[ this.position ].url;
    this.position += 1;
    console.log( this.position );
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


};

module.exports = NewView;
