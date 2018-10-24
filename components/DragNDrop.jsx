const Draggable = (props) => {
    function onDragStart (event) {
        if (props.image) {
            let img = new Image();
            img.src = props.image;
            event.dataTransfer.setDragImage(img, 10, 10);
        }
        event.dataTransfer.setData('application/x-edukursy-kurs', props.data.id);
    }

    return <div draggable="true" onDragStart={onDragStart}>{props.children}</div>;
};

const Droppable = (props) => {
    function onDragOver (event) {
        event.preventDefault();
    }   

    function onDrop (event) {
        let data = event.dataTransfer.getData('application/x-edukursy-kurs');
        props.onDrop(data, event);
    }

    return <div onDragOver={onDragOver} onDrop={onDrop}>{props.children}</div>;
};