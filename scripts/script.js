var div = React.DOM.div;
var font_size = 3;
var progress = 20;
var data = courses_data[0];

var course = function() {
    return div({id:'kurs', className:'media course'}, 
                div({className:'media-left'},
                    React.createElement('img', {className:'media-object', alt:'Miniatura Kursu', src:data.image})
                ),
                div({className:'media-body'},
                    React.createElement('h3', {className:'media-heading', style:{fontSize:font_size + 'em'}}, data.title), 
                    React.createElement('p', {style:{fontSize:(font_size/2) + 'em'}}, data.description), 'Ładowanie...',
                    div({className:'progress'},
                        div({className:'progress-bar progress-bar-success progress-bar-striped active', style:{width:progress + '%'}},
                            React.createElement('span', {}, progress + ' %')
                        )
                    )
                )
            );
}

document.getElementById('grow').addEventListener('click', function() {
    font_size = font_size + 1;
    render();
});

document.getElementById('shrink').addEventListener('click', function() {
    font_size = font_size === 1 ? font_size : (font_size - 1);
    render();
});

var interval;
document.getElementById('start').addEventListener('click', function() {
    interval = setInterval(function() {
        progress = progress + 1;
        render();
    }, 300);
});

document.getElementById('stop').addEventListener('click', function() {
    clearInterval(interval);
    render();
});

document.getElementById('reset').addEventListener('click', function() {
    progress = 0;
    clearInterval(interval);
    render();
});

function render() {
    ReactDOM.render(course(), document.getElementById('root'));
}

render();
