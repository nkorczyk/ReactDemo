import React from 'react';
import { Nav, Tabs, TabPanel } from './Nav';
import { CoursesEditor } from './CoursesEditor';
import Button from './Button';
import {CoursesListContainer, ShoppingCartListContainer, FavouritesCoursesListContainer} from '../containers/courses_list';

const App = React.createClass({

	getInitialState: function () {
		return this.props.store.state;
	},

	componentDidMount: function () {
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list,
				activeTab: state.activeTab
			})
		})
	},

	getChildContext: function () {
		return {
			labels: {
				add_fav: "Dodaj do Ulubionych",
				remove_fav: "Usuń z Ulubionych",
			},
			actions: this.props.actions,
			state: this.state
		}
	},

	childContextTypes: {
		labels: React.PropTypes.object,
		actions: React.PropTypes.object,
		state: React.PropTypes.object
	},

	render: function () {
		return (
			<div>
				<div className="container">
					<Nav onChange={this.props.actions.navigateTo} activeTab={this.state.activeTab} ></Nav>
					<div className="row">
						<div className="col-xs-12">
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.state.activeTab}>
								<TabPanel name="Wyszukiwarka">
									<CoursesEditor courses={this.state.courses_source}></CoursesEditor>
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
									<button className="btn btn-default btn-block" onClick={this.props.actions.loadMore}> Pokaż więcej ... </button>
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