import React from 'react';

import { CoursesSearch } from './CoursesSearch';
import { CourseForm } from './CourseForm';
import Loader from '../containers/Loader';

export const CoursesEditor = React.createClass({

	render: function () {
		return <div>
			<div className={this.props.selected ? "col-xs-4" : "col-xs-12"}>
				<h1> Edytor Kursów </h1>
				<hr />
				<CoursesSearch results={this.props.results} onSelect={this.props.select} onSearch={this.props.search} selected={this.props.selected}></CoursesSearch>
			</div>
			<Loader>
				{this.props.selected ? <div className="col-xs-8">
					<CourseForm course={this.props.selected}
						onCancel={() => this.props.select(null)}
						onSave={(course) => this.props.saveCourse(course)}></CourseForm>
					{this.props.revisions[this.props.selected.id] ?
						<ul>
							{this.props.revisions[this.props.selected.id]
								.map((version) => <li onClick={() => this.props.select(version.revision)} key={version.timestamp}>{version.timestamp}</li>)}
						</ul> : null
					}
				</div> : null}
			</Loader>
		</div>
	}
})