const CoursesList = ({ list }) =>
    (
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
                        <FavButton active={AppState.state.favourites_map[data.id]}
                            onActivate={() => actions.addFavourite(data.id)}
                            onDeactivate={() => actions.removeFavourite(data.id)} />
                    </div>
                </Course>)}
            </div>
        </div>
    );