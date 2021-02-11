const header = document.querySelector('.main-header')

//header.classList.add('scrolled')

// Header Listener
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY

    if(scrollPos > 100) {
        header.classList.add('scrolled')
        $(".img_logo").attr("src","./img/logo_n1.png") // Image from the Bar
        
    } else {
        header.classList.remove('scrolled')
        $(".img_logo").attr("src","./img/logo_b1.png") // Image from the Bar
    }
})


$(window).scroll(function() {
    $(".mydiv").css({
      "margin-top": ($(window).scrollTop()) + 500,
    });
  });


// ANIMATIONS
window.addEventListener('scroll', ()=> {
    let screenPosition = window.innerHeight - 160;
    let screenPositionFarm = window.innerHeight - 300;


    // Team Card Animation
    let contentL = document.querySelector('.lisa')
    let contentR = document.querySelector('.vlad')
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


    // Farm Animation
    let capa1 = document.querySelector('.img_top_stats')
    let capa2 = document.querySelector('.img_middle')
    let capa3 = document.querySelector('.img_middle_1')
    let contentPositionCapa = capa1.getBoundingClientRect().top


    if(contentPositionCapa < screenPositionFarm){
        capa1.classList.remove('capa_cerrada_1')
        capa2.classList.remove('capa_cerrada_2')
        capa3.classList.remove('capa_cerrada_3') 

        capa1.classList.add('capa_abierta_1')
        capa2.classList.add('capa_abierta_2')
        capa3.classList.add('capa_abierta_3')        
        
        /*
        document.querySelectorAll('.data_info_s').forEach((b)=> {
            if( b.getAttribute('ord') == 1){
                setTimeout(()=> {b.classList.remove('oculto')}, 200)
                setTimeout(()=> {b.classList.add('visible')}, 200)
            }else {
                b.classList.remove('oculto')
                b.classList.add('visible')
            }
        })*/

    }else{
        capa1.classList.remove('capa_abierta_1')
        capa2.classList.remove('capa_abierta_2')
        capa3.classList.remove('capa_abierta_3') 

        capa1.classList.add('capa_cerrada_1')
        capa2.classList.add('capa_cerrada_2')
        capa3.classList.add('capa_cerrada_3') 
        
        /*
        document.querySelectorAll('.data_info_s').forEach((b)=> {
            b.classList.remove('visible')
            b.classList.add('oculto')
        })*/
    }
})