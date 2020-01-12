$(function(){
    $('.menu-list .list').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('.category-head').click(function(){
        $('.category-list').slideToggle()
    })
})
$(function(){
    var menu=document.querySelector('.menu')
    var content=document.querySelector('.content')
    var header=document.querySelector('.header')
    var hide=false
    $('.header-menu').click(function(){
        if(hide===false){
            $('.menu').css('left',-180)
            $('.content').css('paddingLeft',0)
            $('.header').css('paddingLeft',0)
            menu.style.transition='all .8s'
            content.style.transition='all .8s'
            header.style.transition="all .8s"
            hide=true
            return
        }
        if(hide===true){
            $('.menu').css('left',0)
            $('.content').css('paddingLeft','180px')
            $('.header').css('paddingLeft','180px')
            content.style.transition='all .8s'
            menu.style.transition='all .8s'
            header.style.transition="all .8s"
            hide=false
            return
        }
    })
})
$('.user').click(function(){
    $(window).attr('location','user.html')
})
$('.category_one').click(function(){
    $(window).attr('location','category_one.html')
})
$('.category_two').click(function(){
    $(window).attr('location','category_two.html')
})
$('.goods').click(function(){
    $(window).attr('location','category.html')
})
$('.back').click(function(){
    $('#myModal2').modal('show')
})
if(window.location.href.indexOf('login')==-1){
    $.ajax({
        url:'/employee/checkRootLogin',
        success:function(info){
            if(info.error===400){
                $(window).attr('location','login.html')
            }
        }
    })
}
$('#go-back').click(function(){
    $.ajax({
        url:'/employee/employeeLogout',
        success:function(info){
            if(info.success){
                $(window).attr('location','login.html')
            }
        }
    })
})
$(document).ajaxStart(function(){
    $('.menu').css('top','3px')
    $('.header').css('top','3px')
    NProgress.start()
  })
  $(document).ajaxStop(function(){
    $('.menu').css('top','0px')
    $('.header').css('top','0px')
    NProgress.done()
})
