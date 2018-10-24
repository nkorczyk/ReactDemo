const Tabs = (props) => {
    let tabs = React.Children.toArray(props.children);

    return <div>{tabs.filter(tab => props.activeTab === tab.props.name)}</div>;
};

const TabPanel = (props) => {
    return <div>{props.children}</div>;
};

const TabsNav = (props) => {
    let tabs = React.Children.toArray(props.children);

    return <ul className={props.className || "nav nav-tabs"}>
        {tabs.map(tab => <li
            key={tab.props.name}
            className={tab.props.activeTab === tab.props.name ? 'active' : ''}
            onClick={(e) => props.onChange(tab.props.name, e)}>
            {tab}
        </li>)}
    </ul>;
};

const Tab = (props) => {
    return props.children || <a href="#">{ props.name}</a>;
};

const Nav = (props) => {
    return <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">EduKursy</a>
            </div>
            <TabsNav className="nav navbar-nav navbar-left" onChange={props.onChange} activeTab={props.activeTab}>
                <Tab name="Kursy"></Tab>
                <Tab name="Ulubione"></Tab>
            </TabsNav>
            <TabsNav className="nav navbar-nav navbar-right" onChange={props.onChange} activeTab={props.activeTab}>
                <Tab name="Koszyk"><a href="#"><span className="glyphicon glyphicon-shopping-cart"></span> Koszyk</a></Tab>
            </TabsNav>
        </div>
    </nav>;
};

const App = React.createClass({
    getInitialState: function () {
        return this.props.store.state;
    },
    componentDidMount: function () {
        AppState.addListener((state) => {
            this.setState({
                page: state.page,
                courses_list: state.courses_list,
                favourites_list: state.favourites_list,
                activeTab: state.activeTab
            });
        });
    },
    render: function () {
        return (
            <div>
                <div className="container">
                    <Nav onChange={actions.navigateTo} activeTab={this.state.activeTab}></Nav>
                    <div className="row">
                        <div className="col-xs-12">
                            <Tabs activeTab={this.state.activeTab}>
                                <TabPanel name="Koszyk">
                                    <ShoppingCartList list={this.state.cart_list} />
                                </TabPanel>
                                <TabPanel name="Ulubione">
                                    <FavouritesCoursesList list={this.state.favourites_list} />
                                </TabPanel>
                                <TabPanel name="Kursy">
                                    <CoursesList list={this.state.courses_list} />
                                    <hr />
                                    <button className="btn btn-default btn-block" onClick={actions.loadMore}> Pokaż więcej ... </button>
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
        );
    }
});
