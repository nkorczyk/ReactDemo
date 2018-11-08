import React from 'react';

const Provider = React.createClass({

	getInitialState: function() {
		return this.props.store.state;
	},

	componentDidMount: function () {
		this.props.store.addListener((state) => {
			this.setState(state);
		})
	},

	getChildContext: function () {
		return {
			actions: this.props.actions,
			state: this.state
		}
	},

	childContextTypes: {
		actions: React.PropTypes.object,
		state: React.PropTypes.object
	},

	render: function() {
		return this.props.children;
	}
});

export default Provider;