const CoursesSearch = React.createClass({
    getInitialState: function () {
        return {
            'query': '',
            'filtered_list': []
        };
    },
    filterList: function (event) {
        event.persist();
        clearTimeout(this.pending);
        this.pending = setTimeout(() => {
            let query = event.target.value;

            this.setState({
                filtered_list: this.props.courses.filter((course) => (
                    query.length >= 3 &&
                    (course.title.toLowerCase().includes(query.toLowerCase())
                        || course.description.toLowerCase().includes(query.toLowerCase())
                        || course.author.toLowerCase().includes(query.toLowerCase()))
                ))
            });
        }, 500);
    },
    render: function () {
        return <div>
            <input type="text" className="form-control" onChange={this.filterList} placeholder="Filtruj listę kursów" />
            <hr />
            <div className="list-group">
                {this.state.filtered_list.map((course) => (
                    <a href="#" key={course.id} className={"list-group-item " + (this.props.selected === course ? "active" : "")}
                        onClick={() => this.props.onSelect(course)}>
                        <h4 className="list-group-item-heading">{course.title}</h4>
                        <p className="list-group-item-text">{course.author}</p>
                    </a>
                ))}
            </div>
        </div>;
    }
});
