$('.back').click(function(){
  location.href='../html/category.html'
})
function render(){
  $.ajax({
    url:'/cart/queryCart',
    success:function(info){
      var htmlStr=template('tmp-info',{list:info})
      $('#goods').html(htmlStr)
      $('.oper-del').on('tap',function(){
        var id=$(this).attr('data-id')
        $.ajax({
          url:'/cart/deleteCart',
          data:{id},
          success:function(info){
            if(info.success){
              render()
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
            }
          }
        })
      })
      $('.oper-edit').on('tap',function(){
          var id=$(this).attr('data-id')
          var size=$(this).attr('data-size')
          var num=$(this).attr('data-num')
          var i=40 
          if(size<45)i=30
          var span=[]
          for(;i<=50;++i){
            if(i==size){
              span.push('<span class="active" id='+i+'>'+i+'</span>')
            }
            span.push('<span id='+i+'>'+i+'</span>')
          }
          span=span.join('')
          var htmlEdit='尺码：'+span+'</br>数量：<div class="mui-numbox" data-numbox-min="0"><button class="mui-btn mui-numbox-btn-minus" type="button">-</button><input class="mui-numbox-input" type="number" /><button class="mui-btn mui-numbox-btn-plus" type="button">+</button></div>'
          mui.confirm(htmlEdit,'编辑商品',function(e){
              if(e.index==1){
                num=mui('.mui-numbox').numbox().getValue()
                $.ajax({
                    url:'/cart/updateCart',
                    type:'post',
                    data:{id:id,size:size,num:num},
                    success:function(info){
                      if(info.success){
                        render()
                      }
                    }
                })
              }
          })
          mui('.mui-numbox').numbox().setValue(num)
          $('.mui-popup-text span').click(function(){
            $(this).addClass('active').siblings().removeClass('active')
            size=$(this).attr('id')
          })
      })
      mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
    }
  })
}
$.ajax({
  url:'/cart/queryCart',
  success:function(info){
    if(info.error===400){
      window.location.href="../html/login.html?url=../html/cart.html"
    }
  }
})

mui.init({
  pullRefresh : {
    container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      callback :function(){
          render()
      }
    }
  }
});
