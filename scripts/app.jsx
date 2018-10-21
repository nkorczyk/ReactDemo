var data = {
    "id": 0,
    "title": "Kurs Programowanie w jQuery - w Praktyce",
    "description": "Poznaj jQuery, czyli najbardziej popularną bibliotekę JavaScript na Świecie! Z jQuery korzystają niemal wszystkie nowoczesne serwisy WWW, a nasz Kurs stanowi niezwykle praktyczne i wyczerpujące omówienie tej biblioteki od podstaw, aż po bardziej zaawansowane techniki. Jeśli znasz już HTML i CSS oraz przynajmniej podstawy JavaScript, jQuery to kolejna obowiązkowa pozycja na Twojej drodze do tworzenia świetnych serwisów internetowych. ",
    "image": "http://eduweb.pl/Images/Training/miniaturka-do-opisu-kursu_27ded9b2-af48-4118-a02a-e35fe950a9be.png",
    "author": "Piotr Palarz",
    "duration": "8 godzin",
    "categories": ["JavaScript", "jQuery"],
    "is_new": true,
    "is_promo": true
};
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

var Course = function (data) {
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

ReactDOM.render(Course(data), document.getElementById('root'));