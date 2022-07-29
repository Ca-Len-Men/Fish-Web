class BoxPlayer{
    constructor(btn_show, box_show, show){
        this.btn_show = btn_show
        this.box_show = box_show
        this.show = show
    }

    action(){
        if(this.show){
            this.box_show.style.display = 'none'
            this.btn_show.style.transform = 'rotate(90deg)'
        }else{
            this.box_show.style.display = 'block'
            this.btn_show.style.transform = 'rotate(0)'
        }
        this.show = !this.show
    }
}

function init_function(){
    const len = 1
    const btn_show = '.button-show'
    const box_show = '.box-show'
    list_btn_show = document.querySelectorAll(btn_show)
    list_box_show = document.querySelectorAll(box_show)
    list_BoxPlayer = []
    
    for(var i = 0; i < list_box_show.length; ++i){
        box_player = new BoxPlayer(list_btn_show[i], list_box_show[i], false)
        list_BoxPlayer.push(box_player)
        box_player.btn_show.addEventListener('click', function(){
            box_player.action()
        })
    }
}

document.addEventListener('DOMContentLoaded', init_function);