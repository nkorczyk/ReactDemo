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
