import React from 'react';
import {Draggable} from './DragNDrop'
import {Course, CoursePromoLabel, CourseDetails} from './Course'
import Button from './Button'
import {FavButtonContainer} from '../containers/buttons';

import AppState from '../AppState'
// import actions from '../actions'

if (module.hot) {
  module.hot.accept();
}

export const CoursesList = ({list}, context) => (
	<div>
		<h1> Kursy </h1>
		<hr />
		<div>
			{list.map((data) => <Draggable key={data.id} data={data} image={data.image}>
					<Course data={data} Details={CourseDetails}>
				  		{/* Promotion */}
			  			<CoursePromoLabel data={data} />

				  		{/* Course Actions */}
						<div className="btn-group pull-right">
							<Button label="Szczególy kursu" />
							<FavButtonContainer id={data.id} />
						</div>
					</Course>
				</Draggable>
			)}
		</div>
	</div>
)

CoursesList.contextTypes = {
	actions: React.PropTypes.object
};