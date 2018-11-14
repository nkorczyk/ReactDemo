import React from 'react';

export const CoursesSearch = React.createClass({

	getInitialState: function(){
		return {
			'query': '',
			'filtered_list':[]
		}
	},

	filterList: function(event){

		event.persist();

		clearTimeout(this.pending);

		this.pending = setTimeout(()=>{
			let query = event.target.value;

			if(query.length >= 3){
				this.props.onSearch(query)
			}

		},500)

	},

	componentDidMount: function(){
		this.refs.query.focus();
	},

	onKeyUp: function(e){
		let UP = 38, DOWN = 40;
		let selected = this.props.selected;
		let index = selected? this.props.results.indexOf(selected) : -1

		if(e.keyCode === DOWN){
			index++
		}else if(e.keyCode === UP){
			index--
		}

		let course = this.props.results[index];

		if(course){
			this.props.onSelect(course)
		}
	},

	render: function(){
		return <div onKeyUp={this.onKeyUp}>
			<input ref="query" type="text" className="form-control" onChange={this.filterList} placeholder="Filtruj listę kursów" />
			<hr/>
			<div className="list-group">
				{this.props.results.map((course)=>(
					<a href="#" key={course.id} className={"list-group-item " + (this.props.selected === course? "active":"")}
					   onClick={()=>this.props.onSelect(course)}>
						<h4 className="list-group-item-heading"> {course.title} </h4>
						<p className="list-group-item-text"> {course.author.name} </p>
					</a>
				))}
			</div>
		</div>
	}
})