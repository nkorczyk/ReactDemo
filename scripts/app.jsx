var CourseMedia = ({ data }) => (<img src={data.image} alt="cover" />);
var NewLabel = ({ data }) => (data.is_new ? <span className="label label-default">Nowy!</span> : null);
var CoursePromoLabel = ({ data }) => (data.is_promo ? <b>Kurs jest w Promocji!</b> : null);
var Button = (props) => (
    <button className="btn btn-default" {...props}>
        {props.icon ? <span className={"glyphicon glyphicon-" + props.icon}></span> : null}
        {' '}
        {props.label}
    </button>
);
var CartButton = ({in_cart, className = "btn btn-block", icon, label}) => {
    return (in_cart ? 
    <Button className={className + " btn-danger"} icon={icon || "remove"} label={label || "Usuń z koszyka"} /> :
    <Button className={className + " btn-success"} icon={icon || "shopping-cart"} label={label ||"Dodaj do koszyka"} />
    );
}
var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        <Button label="Dodaj do ulubionych kursów" icon="star" />
    </div>
);
var CourseDetails = ({ data }) => (
    <div>
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
        <CartButton in_cart={true} />
    </div>
);

var Course = (props) => {
    var { data } = props;
    return (
        <div className="media">
            {/* Course media column */}
            <div className="media-left">
                <CourseMedia {...props} />
            </div>

            {/* Course content column */}
            <div className="media-body">
                <h3>{data.title} <NewLabel {...props} /></h3>
                <p>{data.description}</p>

                {/* Promotion */}
                <CoursePromoLabel {...props} />

                {/* Course Actions */}
                <CourseActions {...props} />
            </div>

            {/* Course details collumn */}
            <div className="media-right">
                <CourseDetails {...props} />
            </div>
        </div>
    );
};

var CoursesList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1> Kursy </h1>
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} />)}
            </div>
        </div>
    );
};

var ShoppingCartList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1> Koszyk </h1>
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} />)}
            </div>
        </div>
    );
};

var list = [], page = 1, perpage = 3;
document.getElementById('show_more').addEventListener('click', function () {
    page++;
    update();
});

var cart_list = courses_data.slice(0, 1);

function update() {
    var count = page * perpage;
    list = courses_data.slice(0, count);
    ReactDOM.render(
        <div>
            <ShoppingCartList list={cart_list} />
            <CoursesList list={list} />
        </div>, document.getElementById('root'));
}

update();
