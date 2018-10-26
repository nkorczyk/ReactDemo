const CourseCategoriesEditor = React.createClass({
    getInitialState: function () {
        return {
            categories: this.props.categories
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            categories: nextProps.categories
        });
    },
    addCategory: function (category) {
        let categories = this.state.categories;

        if (categories.indexOf(category) !== -1) {
            return;
        }

        categoriesSource.add(category);

        this.setState({
            categories: [...categories, category]
        }, () => {
            this.props.onChange(this.state.categories);
        });
    },
    removeCategory: function (category) {
        let categories = [...this.state.categories];

        let index = categories.indexOf(category);

        if (index === -1) {
            return;
        }

        categories.splice(index, 1);

        this.setState({
            categories: categories
        }, () => {
            this.props.onChange(this.state.categories);
        });
    },

    onAdd: function (e) {
        this.addCategory(this.refs.typeahead.value);
    },
    selectedCategory: function (e, value) {
        this.addCategory(value);
        $(this.refs.typeahead).typeahead('val', '');
    },
    keyupCategory: function (e) {
        let value = $(this.refs.typeahead).typeahead('val');

        if (value && e.keyCode == 13) {
            this.addCategory(value);
            $(this.refs.typeahead).typeahead('val', '');
        }
    },
    componentDidMount: function () {
        $(this.refs.typeahead).typeahead({
            hint: true, highlight: true, minlength: 2
        }, {
                name: 'categories',
                source: categoriesSource
            });

        $(this.refs.typeahead).on('typeahead:select', this.selectedCategory);
        $(this.refs.typeahead).on('keyup', this.keyupCategory);
    },
    componentWillUnmount: function () {
        $(this.refs.typeahead).typeahead('destroy');
        $(this.refs.typeahead).off('typeahead:select', this.selectedCategory);
        $(this.refs.typeahead).off('keyup', this.keyupCategory);
    },
    render: function () {
        return <div>
            <ul className="nav">
                {this.state.categories.map((cat) =>
                    <li key={cat}>
                        <span className="btn btn-xs" onClick={e => this.removeCategory(cat)}>&times;</span>
                        <span> {cat} </span>
                    </li>
                )}
            </ul>
            <br />
            <div className="form-group">
                <input type="text" className="form-control" ref="typeahead" />
                <input type="button" className="btn btn-default" value="Dodaj" onClick={this.onAdd} />
            </div>
        </div>
    }
});
