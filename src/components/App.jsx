import React from 'react';
import { Nav, Tabs, TabPanel } from './Nav';
import { CoursesEditor } from './CoursesEditor';
import Button from './Button';
import {CoursesListContainer, ShoppingCartListContainer, FavouritesCoursesListContainer} from '../containers/courses_list';

const App = React.createClass({

	getChildContext: function () {
		return {
			labels: {
				add_fav: "Dodaj do Ulubionych",
				remove_fav: "Usuń z Ulubionych",
			},
		}
	},

	childContextTypes: {
		labels: React.PropTypes.object,
	},

	render: function () {
		return (
			<div>
				<div className="container">
					<Nav onChange={this.props.navigateTo} activeTab={this.props.activeTab} ></Nav>
					<div className="row">
						<div className="col-xs-12">
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.props.activeTab}>
								<TabPanel name="Wyszukiwarka">
									<CoursesEditor courses={this.props.courses_source}></CoursesEditor>
								</TabPanel>
								<TabPanel name="Koszyk">
									<ShoppingCartListContainer />
								</TabPanel>
								<TabPanel name="Ulubione">
									<FavouritesCoursesListContainer />
								</TabPanel>
								<TabPanel name="Kursy">
									<CoursesListContainer />
									<hr />
									<button className="btn btn-default btn-block" onClick={this.props.loadMore}> Pokaż więcej ... </button>
								</TabPanel>
							</Tabs>
						</div>
					</div>
				</div>
				<footer className="footer">
					<div className="container">
						<p> </p>
					</div>
				</footer>
			</div>
		)
	}
})

export default App 