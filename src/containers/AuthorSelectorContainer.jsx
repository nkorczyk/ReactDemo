import React from 'react';
import connect from '../connect';

const AuthorSelectorContainer = connect(
	({authors}) => ({authors_list: authors.list})
)((props) => (
	<select className="form-control" value={props.value} onChange={props.onChange}>
		{props.authors_list.map((author) => <option key={author} value={author}>{author}</option>)}
	</select>
))

export default AuthorSelectorContainer;
							