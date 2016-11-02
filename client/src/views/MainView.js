var MainView = function() {
  this.pictures = [];
  this.url = "https://wedding--photo-test.herokuapp.com/pictures";
  this.getPictures();
}

MainView.prototype = {

  randomNumber: function( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 )) + min;
  },

  getPictures: function() {
    setInterval( function() {
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
    }.bind( this ), 7000 );
  },

  display: function() {
    var pictureSpace = document.getElementById( 'picture-space' );
    // var list = document.createElement( 'ul' );
    // pictureSpace.appendChild( list );
    // for( var i = 0; i < this.pictures.length; i++ ) {
    //   var picture = document.createElement( 'img' );
    //   var text = this.pictures[i].url;
    //   picture.src = text;
    //   picture.style.maxWidth = 40 + "%"
    //   list.appendChild( picture );
    // }
    pictureSpace.innerText = "";
    var max = this.pictures.length - 1;
    var i = this.randomNumber( 0, max );
    console.log( i );
    console.log( max );
    var picture = document.createElement( 'img' );
    var url = this.pictures[i].url;
    picture.src = url;
    picture.style.maxWidth = 50 + "%";
    pictureSpace.appendChild( picture );
  },


}

module.exports = MainView;