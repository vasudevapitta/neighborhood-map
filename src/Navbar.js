import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Navbar extends Component {

	handleEvent=(name)=>{
		const singleMarker = this.props.markers.find(marker => marker.title === name.venue.name);
		window.google.maps.event.trigger(singleMarker, 'click')
	}

	updateMarkers(e){
    const listItems = document.getElementsByTagName('li');
    const listItemsArray = Array.from(listItems);

    const visibleListItems = listItemsArray.filter(li=>li.offsetParent!=null);
    
    const listIds = visibleListItems.map(item=>item.getAttribute('id'));  
    
    this.props.markers.forEach(marker=>{
    	let name=marker.title.toLowerCase()
    	if(!name.includes(e)){	
    		marker.setVisible(false)
    	}
    	else {
    		marker.setVisible(true)
    	}
    })
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
	   	this.updateMarkers(e.target.value);

/*	const searchText = e.target.value;
    const newMarkers = this.props.markers.filter(marker => marker.title.indexOf(searchText))
    this.props.changeState(newMarkers);*/
	}

	render(){
		return(
			<div id='navbar' aria-role='navigation'>
			<input type='search' id='myInput'
			onChange={this.handleSearch}
			placeholder="Search for Restaurants.."
			/>
			<ul id='myUL' aria-role='list'>
					{ 
						this.props.venues.map(eachVenue=>{
								return (
									<li
									key={eachVenue.venue.id}
									onClick={()=>this.handleEvent(eachVenue)}
									onKeyPress={()=>this.handleEvent(eachVenue)}
									id={eachVenue.venue.name}
									aria-role='link'
									>
									<a href="#"
									aria-label={eachVenue.venue.name}
									aria-role="link">
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