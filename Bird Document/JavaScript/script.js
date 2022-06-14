function decreaseScaleX(id, time){
    var doc = document.getElementById(id);
    doc.style.transform = 'scaleX(50%)';
    doc.style.transition = time;
    doc.style.transformOrigin = 'left';
}

function increaseScaleX(id, time){
    var doc = document.getElementById(id);
    doc.style.transform = 'scaleX(100%)';
    doc.style.transition = time;
}