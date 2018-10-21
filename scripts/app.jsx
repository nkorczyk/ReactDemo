var data = {
    title: 'Temat kursu',
    description: 'Opis kursu',
    image: 'http://placehold.it/150x150',
    author: 'Testowy Autor',
    duration: '6h',
    is_new: true,
    is_promo: true
};

var course = (
    <div className="media">
        {/* Course media column */}
        <div className="media-left">
            <img src={data.image} alt="cover" />
        </div>
        {/* Course content column */}
        <div className="media-body">
            <h3>{data.title} {data.is_new ? <span className="label label-default">Nowy!</span> : null}</h3>
            <p>{data.description}</p>
            {/* Promotion */}
            {data.is_promo ? <b>Kurs jest w Promocji!</b> : null}
        </div>

        {/* Course details collumn */}
        <div className="media-right">
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
        </div>
    </div>
);

ReactDOM.render(course, document.getElementById('root'));