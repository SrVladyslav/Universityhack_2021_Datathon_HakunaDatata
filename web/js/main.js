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
    let screenPosition = window.innerHeight -150;



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
})