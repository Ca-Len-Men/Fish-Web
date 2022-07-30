class BoxPlayer{
    constructor(btn, box, show){
        this.btn = btn
        this.box = box
        this.show = show
    }

    action(){
        this.show = !this.show
        if(this.show){
            this.box.classList.remove('hidden')
            this.box.classList.remove('box-animation-hidden')
            this.box.classList.add('box-animation-show')
            this.btn.style.transform = 'rotate(90deg)'
        }else{
            this.box.classList.add('hidden')
            this.box.classList.remove('box-animation-show')
            this.box.classList.add('box-animation-hidden')
            this.btn.style.transform = 'rotate(0)'
        }
    }
}


var check = true

const list_btn_show = document.querySelectorAll('.button-show')
const list_box_show = document.querySelectorAll('.box-show')
var listBoxPlayer = []

var page_index = 0
const list_page = document.querySelectorAll('.page')
const list_card = document.querySelectorAll('.mainpage > .card')
const list_back_page = document.querySelectorAll('.back-page')

function init_function(){
    for(let i = 0; i < list_btn_show.length; ++i){
        listBoxPlayer.push(new BoxPlayer(list_btn_show[i], list_box_show[i], false))
        list_btn_show[i].addEventListener('click', function() {
            listBoxPlayer[i].action()
            check = false
        })
    }

    for(let i = 0; i < list_card.length; ++i)
        list_card[i].addEventListener('click', function(){
            if(check){
                list_page[page_index].classList.add('hidden')
                page_index = i + 1
                list_page[page_index].classList.remove('hidden')
            }else
                check = true
        })

    for(let i = 0; i < list_back_page.length; ++i)
        list_back_page[i].addEventListener('click', function(){
            check = true
            list_page[page_index].classList.add('hidden')
            page_index = 0
            list_page[0].classList.remove('hidden')
        })
}

document.addEventListener('DOMContentLoaded', init_function);