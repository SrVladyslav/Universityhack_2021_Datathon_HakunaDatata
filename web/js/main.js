const header = document.querySelector('.main-header')

/////////////////////////////////////////////////////////
// Init
/////////////////////////////////////////////////////////
let line1 = document.querySelector('#line1')
let line2 = document.querySelector('#line2')
let line3 = document.querySelector('#line3')
let circle1 = document.querySelector('#circle1')
let circle2 = document.querySelector('#circle2')
let circle3 = document.querySelector('#circle3')
let circle4 = document.querySelector('#circle4')
let text1 = document.querySelector('#text1')
let text2 = document.querySelector('#text2')
let text3 = document.querySelector('#text3')
let text4 = document.querySelector('#text4')

let contentL = document.querySelector('.lisa')
let contentR = document.querySelector('.vlad')

let eda = document.querySelector('#section2')
let conclusion = document.querySelector('#section4')
let body = document.querySelector('body')

let dash_btn_1 = document.querySelector('#dash_btn_1')
let dash_btn_2 = document.querySelector('#dash_btn_2')
let dash_btn_3 = document.querySelector('#dash_btn_3')
let dash_btn_4 = document.querySelector('#dash_btn_4')
let dash_btn_5 = document.querySelector('#dash_btn_5')
let dash_buttons = [dash_btn_1, dash_btn_2, dash_btn_3, dash_btn_4, dash_btn_5]
// Cartillas del primer dataset
let dash_card_1 = document.querySelector('#dash_card_1')
let dash_card_2 = document.querySelector('#dash_card_2')
let dash_card_3 = document.querySelector('#dash_card_3')
let dash_card_4 = document.querySelector('#dash_card_4')
let dash_card_5 = document.querySelector('#dash_card_5')
let dset1_cards = [dash_card_1, dash_card_2, dash_card_3, dash_card_4, dash_card_5]
// Cartillas del segundo dataset
let dash_card_6 = document.querySelector('#dash_card_6')
let dash_card_7 = document.querySelector('#dash_card_7')
let dash_card_8 = document.querySelector('#dash_card_8')
let dash_card_9 = document.querySelector('#dash_card_9')
let dash_card_10 = document.querySelector('#dash_card_10')
let dset2_cards = [dash_card_6, dash_card_7, dash_card_8, dash_card_9, dash_card_10]

let dashboard_ds = [dset1_cards,dset2_cards]
reload()


//header.classList.add('scrolled')
$(window).scroll(function() {
    $(".mydiv").css({
      "margin-top": ($(window).scrollTop()) + 500,
    });
  });


/////////////////////////////////////////////////////////
// ANIMATIONS
/////////////////////////////////////////////////////////
window.addEventListener('scroll', ()=> {
    reload()
})

function reload() {
    let screenPosition = window.innerHeight;
    
    /////////////////////////////////////////////////////////
    // Header Listener
    /////////////////////////////////////////////////////////
    const scrollPos = window.scrollY
    if(scrollPos > 100) {
        header.classList.add('scrolled')
        $(".img_logo").attr("src","./img/logo_n1.png") // Image from the Bar
        
    } else {
        header.classList.remove('scrolled')
        $(".img_logo").attr("src","./img/logo_b1.png") // Image from the Bar
        
        // Reset de las bolitas
        line1.classList.remove('active_line1')
        circle1.classList.remove('active_circle1')
        line2.classList.remove('active_line2')
        circle2.classList.remove('active_circle2')
        line3.classList.remove('active_line3')
        circle3.classList.remove('active_circle3')
        circle4.classList.remove('active_circle4')
        text1.classList.remove('active_text1')
        text2.classList.remove('active_text2')
        text3.classList.remove('active_text3')
        text4.classList.remove('active_text4')
    }
    
    /////////////////////////////////////////////////////////
    // Line animation fromcircles
    /////////////////////////////////////////////////////////
    let linesPosition = line1.getBoundingClientRect().top

    if(linesPosition < screenPosition-(screenPosition/3)){
        circle1.classList.add('active_circle1')
        line1.classList.add('active_line1')
        circle2.classList.add('active_circle2')
        line2.classList.add('active_line2')
        circle3.classList.add('active_circle3')
        line3.classList.add('active_line3')
        circle4.classList.add('active_circle4')
        text1.classList.add('active_text1')
        text2.classList.add('active_text2')
        text3.classList.add('active_text3')
        text4.classList.add('active_text4')
    }else {
        /*line1.classList.remove('active_line1')
        circle1.classList.remove('active_circle1')
        line2.classList.remove('active_line2')
        circle2.classList.remove('active_circle2')
        line3.classList.remove('active_line3')
        circle3.classList.remove('active_circle3')
        circle4.classList.remove('active_circle4')
        text1.classList.remove('active_text1')
        text2.classList.remove('active_text2')
        text3.classList.remove('active_text3')
        text4.classList.remove('active_text4')*/
    }

    /////////////////////////////////////////////////////////
    // Team Card Animation
    /////////////////////////////////////////////////////////
    let contentPosition = contentL.getBoundingClientRect().top
    if(contentPosition < screenPosition){
        contentL.classList.add('active')
        setTimeout(()=> {
            contentR.classList.add('active')
        }, 50)
    }else{
        contentL.classList.remove('active')
        setTimeout(()=> {
            contentR.classList.remove('active')
        }, 50)
    }

    /////////////////////////////////////////////////////////
    // Eda FOG Activation
    /////////////////////////////////////////////////////////
    let contentPositionEDA = eda.getBoundingClientRect().top
    let contentPositionConclusion = conclusion.getBoundingClientRect().top
   
    if(contentPositionEDA < screenPosition-300 && screenPosition-300 <contentPositionConclusion){
        body.classList.add('active_EDA')
    }else{
        body.classList.remove('active_EDA')
    }
}

/////////////////////////////////////////////////////////
// Dashboard Buttons
/////////////////////////////////////////////////////////
function change_dashboard(dashboard) {
    // Reinicio todos los botones
    dash_btn_1.classList.remove('dash_btn_active')
    dash_btn_2.classList.remove('dash_btn_active')
    dash_btn_3.classList.remove('dash_btn_active')
    dash_btn_4.classList.remove('dash_btn_active')
    dash_btn_5.classList.remove('dash_btn_active')
    // activo el boton que toca
    dash_buttons[dashboard].classList.add('dash_btn_active')

    // efecto del cambio
    for(let i=0; i < dashboard_ds.length; i++) {
        dashboard_ds[i].forEach((dataset) => {
            dataset.classList.remove('dash_show')
            console.log('removiendo')
        })  
    }
    // Activo solo el dataset pulsado
    console.log(dashboard)
    dashboard_ds[dashboard].forEach((dataset1) => {
        dataset1.classList.add('dash_show')
        console.log('SHOW'+dataset1)
    })
    
    // Borrar todo y volver a mostrar la nueva parte

}