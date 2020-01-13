function renderPhoto(id){
  $.ajax({
    url:'/category/querySecondCategory',
    data:{id},
    success:function(info){
        var htmlStr=template('tmp-photo',{list:info.rows})
        $('.photo ul').html(htmlStr)
    }
  })
}
//一开始
renderPhoto(1)


$.ajax({
  url:'/category/queryTopCategory',
  success:function(info){
    var htmlStr=template('tmp-menu',{list:info.rows})
    $('.menu ul').html(htmlStr)
    $('.menu li:first-of-type').addClass('active')
    $('.menu li').on('click',function(){
      $(this).addClass('active').siblings().removeClass('active')
      var id=$(this).attr('id')
      renderPhoto(id)
    })
  }
})
