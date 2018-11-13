import React from 'react';

import { CoursesSearch } from './CoursesSearch';
import { CourseForm } from './CourseForm';

export const CoursesEditor = React.createClass({

	getInitialState: function () {
		return {
			selected: null
		}
	},

	select: function (course) {
		this.setState({
			selected: course
		})
	},


	render: function () {
		return <div>
			<div className={this.state.selected ? "col-xs-4" : "col-xs-12"}>
				<h1> Edytor Kursów </h1>
				<hr />
				<CoursesSearch courses={this.props.courses} onSelect={this.select} selected={this.state.selected}></CoursesSearch>
			</div>
			{this.state.selected ? <div className="col-xs-8">
				<CourseForm course={this.state.selected}
					onCancel={() => this.select(null)}
					onSave={(course) => this.props.saveCourse(course)}></CourseForm>
				<ul>
					{this.props.revisions[this.state.selected.id] &&
						this.props.revisions[this.state.selected.id].map((version) => <li onClick={() => this.select(version.revision)} key={version.timestamp}>{version.timestamp}</li>)}
				</ul>
			</div> : null}
		</div>
	}
})