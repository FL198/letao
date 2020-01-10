$(function(){
    $('.menu-list .list').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
        if($(this).index()==1){
            $('.category-list').css('backgroundColor','#222D32')
        }
    })
    $('.category-head').click(function(){
        $('.category-list').slideToggle()
    })
})
$(function(){
    var menu=document.querySelector('.menu')
    var hide=false
    $('.header-menu').click(function(){
        if(hide===false){
            $('.menu').css('left',-180)
            menu.style.transition='all .8s'
            hide=true
            return
        }
        if(hide===true){
            $('.menu').css('left',0)
            menu.style.transition='all .8s'
            hide=false
            return
        }
    })
})


