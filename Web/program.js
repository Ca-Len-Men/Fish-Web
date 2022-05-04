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



function setEditor(id, wid, hei){
    var editor = ace.edit(id);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
    editor.setReadOnly(true);
    var doc = document.getElementById(id);
    doc.style.fontSize='18px';
    doc.style.width = wid;
    doc.style.height = hei;
    doc.style.marginBottom = '10px';
}
