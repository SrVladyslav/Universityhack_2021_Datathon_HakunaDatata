const header = document.querySelector('.main-header')

//header.classList.add('scrolled')

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