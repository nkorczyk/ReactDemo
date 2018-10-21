var NewLabel = function (data) {
    return data.is_new ? <span className="label label-default">Nowy!</span> : null;
};
var CoursePromoLabel = function (data) {
    return data.is_promo ? <b>Kurs jest w Promocji!</b> : null;
};
var CourseActions = function (data) {
    return (
        <div className="btn-group pull-right">
            <button className="btn btn-default">Szczegóły kursu</button>
            <button className="btn btn-default">Dodaj do ulubionych kursów</button>
            <button className="btn btn-default">Dodaj do koszyka</button>
        </div>
    );
};
var CourseDetails = function (data) {
    return (
        <table className="table course_details">
            <tbody>
                <tr>
                    <th>Autor</th>
                    <td>{data.author}</td>
                </tr>
                <tr>
                    <th>Czas trwania</th>
                    <td>{data.duration}</td>
                </tr>
            </tbody>
        </table>
    );
};
var CourseMedia = function (data) {
    return <img src={data.image} alt="cover" />
};

var Course = function (props) {
    var data = props.data;
    return (
        <div className="media">
            {/* Course media column */}
            <div className="media-left">
                {CourseMedia(data)}
            </div>

            {/* Course content column */}
            <div className="media-body">
                <h3>{data.title} {NewLabel(data)}</h3>
                <p>{data.description}</p>

                {/* Promotion */}
                {CoursePromoLabel(data)}

                {/* Course Actions */}
                {CourseActions(data)}
            </div>

            {/* Course details collumn */}
            <div className="media-right">
                {CourseDetails(data)}
            </div>
        </div>
    );
};

var CoursesList = function (props) {
    var list = props.list;
    return (
        <div>
            {list.map(function (data) {
                return <Course data={data} key={data.id} />
            })}
        </div>
    );
};

var list = [], page = 1, perpage = 3;
document.getElementById('show_more').addEventListener('click', function () {
    page++;
    update();
});

function update() {
    var count = page * perpage;
    list = courses_data.slice(0, count);
    ReactDOM.render(<CoursesList list={list} />, document.getElementById('root'));
}

update();
