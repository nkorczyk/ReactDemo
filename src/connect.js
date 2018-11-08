import React from 'react';

const connect = (
    stateToProps,
    actionsToProps,
    mergeProps) => (Component) => {
	const Container = (props, context) => {

        stateToProps = stateToProps || ((state) => state);
        actionsToProps = actionsToProps || ((actions) => actions);
        mergeProps = mergeProps || ((stateProps, actionsProps, props) => ({...stateProps, ...actionsProps, ...props}));

		const stateProps = stateToProps(context.state);
		const actionsProps = actionsToProps(context.actions);
		const mergedProps = mergeProps(stateProps, actionsProps, props);

		return <Component {...mergedProps} />
	}

	Container.contextTypes = {
		state: React.PropTypes.object,
		actions: React.PropTypes.object
	};

	return Container;
};

export default connect;