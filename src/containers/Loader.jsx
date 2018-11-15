import connect from '../connect';
import React from 'react';

const LoaderContainer = connect(
    ({ isLoading }) => ({ isLoading })
)((props) => props.isLoading ? <div className="loader"></div> : (props.children || null)
)

export default LoaderContainer;