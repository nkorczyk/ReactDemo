import React from 'react';

const Provider = React.createClass({

	getInitialState: function(){
		return this.props.store.getState();
	},

	componentDidMount: function(){
		this.props.store.subscribe(() => {
			this.setState(this.props.store.getState())
		});
	},

	getChildContext: function(){
		return {
			actions: this.props.actions,
			state: this.state
		}
	},

	childContextTypes:{
		actions: React.PropTypes.object,
		state: React.PropTypes.object
	},

	render: function(){
		return <div>{this.props.children}</div>;
	}
})

export default Provider;