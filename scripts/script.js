const div = React.DOM.div;
const font_size = 3;
var index = 0;
var data = courses_data[index];
const dataLength = courses_data.length - 1;

var course = function (data) {
    return div({ id: 'kurs', className: 'media course' },
        div({ className: 'media-left' },
            React.createElement('img', { className: 'media-object', alt: 'Miniatura Kursu', src: data.image })
        ),
        div({ className: 'media-body' },
            React.createElement('h3', { className: 'media-heading', style: { fontSize: font_size + 'em' } }, data.title),
            React.createElement('p', { style: { fontSize: (font_size / 2) + 'em' } }, data.description),
            data.is_new ? React.createElement('p', { style: { fontSize: (font_size / 2) + 'em', fontWeight: 'bolder' } }, 'Nowość!') : null,
            data.is_promo ? React.createElement('p', { style: { fontSize: (font_size / 2) + 'em', fontWeight: 'bolder' } }, 'Promocja!') : null
        )
    );
};

document.getElementById('grow').addEventListener('click', function () {
    font_size = font_size + 1;
    render();
});

document.getElementById('shrink').addEventListener('click', function () {
    font_size = font_size === 1 ? font_size : (font_size - 1);
    render();
});

document.getElementById('prev').addEventListener('click', function () {
    index = index === 0 ? 0 : index - 1;  
    render();
});

document.getElementById('next').addEventListener('click', function () {
    index = index === dataLength ? dataLength : index + 1;
    render();
});

function render() {
    data = courses_data[index];
    ReactDOM.render(course(data), document.getElementById('root'));
}

render();
