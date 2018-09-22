import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Navbar from './Navbar'
import Hamburger from './Hamburger'

window.gm_authFailure=()=>{ 
 alert('OOPS! An Error occured while fetching GoogleMaps API! Please try again later.');
};

//variable to handle api failure
const fourSquareFailMsg = 'OOPS! An Error occured while fetching data from FourSquare API! Please try again later.';

class App extends Component {
  state = {
    venues: [],
    markers: []
  }

  //do this right after the component is added to the DOM
  componentDidMount(){
    this.getVenues()//invoking getVenues function
  }

  updateMarkers(){
    const listItems = document.getElementsByTagName('li');
    const listItemsArray = Array.from(listItems);

    const visibleListItems = listItemsArray.filter(li=>li.offsetParent!=null);
    const listIds = visibleListItems.map(item=>item.getAttribute('id'));
  }

  loadMap=()=>{
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyByxHn5EYEBHNx0XmfvEpl7AkuOlPpgM0w&callback=googleSuccess');
    window.googleSuccess = this.googleSuccess;
  }

  getVenues=()=>{
    //getting information from foursquare Api
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: 'TXPRFFW531BT5D2U50VWNYAGPZ44QIOR3CEFIJWR45VPVUCM',
      client_secret: 'QOBKH5IV1SZZYG5F2BBOF0IC4YVIOXSAH1XMWMJ51WYAEXRK',
      query: 'food',
      near: 'Harrisburg',
      v: '20180920' //YYYYDDMM
    }

    //installed axios- npm install axios //axios is similar to fetch
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({//setting the state with the data we got from the ajax call
        venues: response.data.response.groups[0].items,
      }, this.loadMap()) //calling this.loadMap() as a callback - which gets invoked after our ajax call is successful
    })
    .catch(err=>{
      alert(`${fourSquareFailMsg} ${err}`)
    })
  }
  
  googleSuccess=()=>{

      //creating a map
       let myMap = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.263, lng: -76.890},
          zoom: 14
        });

       const infoWindow = new window.google.maps.InfoWindow()

       //looping through the venues array which is inside this.state to generate markers
       this.state.venues.map(eachVenue => {
        console.log(eachVenue);
        const name = `${eachVenue.venue.name}`;
        const address = `${eachVenue.venue.location.formattedAddress}`;

        /*const imgURL = getImgURL=(id)=>{
          const prefix = ;
          const suffix = ;
          const size = ;
          const url = prefix+size+suffix
        }*/

        var contentString = `<div>
        <img id='img'>
        <h3>${name}</h3>
        <p>${address}</p>
        </div>`;

        //animate marker
        function toggleBounce(marker) {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function(){
            marker.setAnimation(null);
          }, 2000);
        }
        
        //creating a marker for each venue
        const myMarker = new window.google.maps.Marker({
          position: {lat: eachVenue.venue.location.lat, lng: eachVenue.venue.location.lng},
          map: myMap,
          title: eachVenue.venue.name,
        });

        //adding eventlistener to each marker
        myMarker.addListener('click', function(e) {

          toggleBounce(this);

          //change the content
           infoWindow.setContent(contentString)

          //open an infoWindow
          infoWindow.open(myMap, myMarker);

        });

        this.setState({
          markers: [...this.state.markers, myMarker]
       });

      });
  }

  render() {
    return (
      <main>
      <Navbar
      venues = {this.state.venues}
      map = {this.state.myMap}
      markers = {this.state.markers}
      changeState = {this.updateMarkers}
      />
      <Hamburger/>
      <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url){
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.defer = true;
  script.src = url;
  script.onerror = window.gm_authFailure;
  index.parentNode.insertBefore(script, index);//parent.parentNode.insertBefore(child, parent);
}

export default App;
