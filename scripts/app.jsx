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
                    <CourseActions data={data} />
                </Course>)}
            </div>
        </div>
    );
};

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

const App = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            list: this.props.list.slice(0, 3)
        }
    },
    loadMore: function () {
        var page = this.state.page + 1;
        this.setState({
            page: page,
            list: this.props.list.slice(0, page * 3)
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
                            <button className="btn btn-default btn-block" onClick={this.loadMore}> Pokaż więcej ... </button>
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

ReactDOM.render(<App list={courses_data} />, document.getElementById('root'));
