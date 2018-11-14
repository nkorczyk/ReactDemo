import React from 'react';
import connect from '../connect';

const AuthorSelectorContainer = connect(
	({authors}) => ({authors_list: authors.list, authors_map: authors.map})
)((props) => (
	<select className="form-control" value={props.value} onChange={(e) => props.onChange(props.authors_map[parseInt(e.target.value)])}>
		{props.authors_list.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
	</select>
))

export default AuthorSelectorContainer;
							