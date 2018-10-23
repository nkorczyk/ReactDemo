const CoursesList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1> Kursy </h1>
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
                    {/* Promotion */}
                    <CoursePromoLabel data={data} />

                    {/* Course Actions */}
                    <div className="btn-group pull-right">
                        <Button label="Szczegóły kursu" />
                        <StateButton />
                    </div>
                </Course>)}
            </div>
        </div>
    );
};

const StateButton = React.createClass({
    getInitialState: function () {
        return {
            active: this.props.active
        };
    },
    getDefaultProps: function () {
        return {
            active: true
        }
    },
    setActive: function () {
        this.setState({
            active: true
        });
    },
    setInactive: function () {
        this.setState({
            active: false
        });
    },
    render: function () {
        return (
            this.state.active ?
                <Button label="Usuń z ulubionych" icon="star" onClick={this.setInactive} /> :
                <Button label="Dodaj do ulubionych" icon="star-empty" onClick={this.setActive} />
        );
    }
});

const ShoppingCartList = ({ list }) => (
    <div>
        <h1> Koszyk </h1>
        <hr />
        <div>
            {list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
                <div className="btn-group pull-right">
                    <Button label="Szczegóły kursu" />
                    <Button label="Przenieś do ulubionych" icon="star" />
                </div>
                <div><b>Autor: </b> <br /> <b>Czas trwania: </b> {data.duration} </div>
            </Course>)}
        </div>
    </div>
);

function StateStore() {
    this.state = {};

    this.dispatchEvents = () => {
        this.callback(this.state);
    };

    this.callback = function () { };

    this.addListener = (callback) => {
        this.callback = callback;
    };

    this.createAction = function (handler) {
        var state = this.state;
        return function () {
            handler.apply(state, arguments);
            AppState.dispatchEvents();
        }
    };

    this.createActions = function (handlersMap) {
        var actions = {};
        for (let name in handlersMap) {
            actions[name] = this.createAction(handlersMap[name]);
        }
        return actions;
    };
}

var AppState = new StateStore();
AppState.state = {
    page: 1,
    list: courses_data.slice(0, 3),
    courses: courses_data
};

var actions = AppState.createActions({
    loadMore: function (event) {
        var page = this.page + 1;
        this.page = page;
        this.list = this.courses.slice(0, this.page * 3);
    }
});

const App = React.createClass({
    getInitialState: function () {
        return this.props.store.state;
    },
    componentDidMount: function () {
        AppState.addListener((state) => {
            this.setState({
                page: state.page,
                list: state.list
            });
        });
    },
    render: function () {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            {/* <ShoppingCartList list={cart_list} /> */}
                            <CoursesList list={this.state.list} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr />
                            <button className="btn btn-default btn-block" onClick={actions.loadMore}> Pokaż więcej ... </button>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <p> </p>
                    </div>
                </footer>
            </div>
        );
    }
});

ReactDOM.render(<App store={AppState} />, document.getElementById('root'));
