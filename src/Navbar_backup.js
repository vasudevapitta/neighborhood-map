import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Navbar extends Component {

	handleEvent=(name)=>{
		const singleMarker = this.props.markers.find(marker => marker.title === name.venue.name);
		window.google.maps.event.trigger(singleMarker, 'click')
	}

	updateMarkers(){
    const listItems = document.getElementsByTagName('li');
    const listItemsArray = Array.from(listItems);

    const visibleListItems = listItemsArray.filter(li=>li.offsetParent!=null);
    const listIds = visibleListItems.map(item=>item.getAttribute('id'));
    
    /*for(let i=0; i<listIds.length; i++){
    	this.props.markers.forEach((marker)=>{
	    		if(marker.title!==listIds[i]){
	    			marker.setVisible(false);
	    		}
    	})
    }*/
    
  	}

	handleSearch=(e)=>{
		var input, filter, ul, li, a, i;
	    input = document.getElementById("myInput");
	    filter = input.value.toUpperCase();
	    ul = document.getElementById("myUL");
	    li = ul.getElementsByTagName("li");

	    for (i = 0; i < li.length; i++) {
	        a = li[i].getElementsByTagName("a")[0];
	        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
	        }
	    }
	   	this.updateMarkers();

/*	const searchText = e.target.value;
    const newMarkers = this.props.markers.filter(marker => marker.title.indexOf(searchText))
    this.props.changeState(newMarkers);*/
	}

	render(){
		return(
			<div id='navbar'>
			<input type='search' id='myInput'
			onChange={this.handleSearch}
			placeholder="Search for Restaurants.."
			/>
			<ul id='myUL'>
				{
					this.props.venues.map(eachVenue=>{
						return (
							<li
							key={eachVenue.venue.id}
							onClick={()=>this.handleEvent(eachVenue)}
							onKeyPress={()=>this.handleEvent(eachVenue)}
							id={eachVenue.venue.name}
							>
							<a href="#">
							{eachVenue.venue.name}
							</a>
							</li>
						)
					})
				}
			</ul>
			</div>
		)
	}
}

export default Navbar;