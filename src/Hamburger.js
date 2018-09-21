import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Hamburger extends Component {
	showHide=()=>{
			const navBar = document.getElementById('navbar');
			navBar.classList.toggle('hide');
	}

	render(){
			return(
			<div className='header'>
			<div className='ham'
			onClick={this.showHide}
			>☰</div>
			</div>
		)
	}
}

export default Hamburger