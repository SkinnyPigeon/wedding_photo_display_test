var MainView = function() {
  this.pictures = [];
  this.url = "https://wedding--photo-test.herokuapp.com/pictures";
  this.getPictures();
}

MainView.prototype = {

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
        this.display();
      }
    }
    request.send( null );
  },

  display: function() {
    var pictureSpace = document.getElementById( 'picture-space' );
    // pictureSpace;
    var list = document.createElement( 'ul' );
    pictureSpace.appendChild( list );
    for( var i = 0; i < this.pictures.length; i++ ) {
      var picture = document.createElement( 'img' );
      var text = this.pictures[i].url;
      picture.src = text;
      picture.style.maxWidth = 40 + "%"
      list.appendChild( picture );
    }
  },


}

module.exports = MainView;