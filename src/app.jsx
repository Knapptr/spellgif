import React, {Component} from "react";
import "./App.css";

class App extends Component {
	state = {
		isLoaded: false,
		spellsList: {},
		query: ""
	};
	onSubmit(e) {
		e.preventDefault();
		fetch("http://dnd5eapi.co/api/spells/",
			{mode: 'cors'})
			.then(res => res.json())
			.then(spells => {
				this.setState({spellsList: spells});
			});
	}

	render() {
		return (<form onSubmit={this.onSubmit}><button>Init Search</button></form>)
	}
}
export default App;
