$('.header-back').click(function () {
    location.href='../html/search.html'
})

var page=1,pageSize=100,proName;

if(location.search){
  proName=decodeURI(location.search.replace('?proName=',''))
  render()
}

function render(){
  $.ajax({
    url:'/product/queryProduct',
    data:{
      page:page,
      pageSize:pageSize,
      proName:proName
    },
    success:function(info){
      if(info.data.length>0){
        var htmlStr=template('tmp-info',{list:info.data})
        $('.product ul').html(htmlStr)
        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
          $('.product ul li').click(function(){
            var id=$(this).attr('data-id')
            console.log(id)
            location.href='../html/detail.html?productId='+id+''
        })
      }else{
        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
      }
    }
  })
}

$('.search').click(function(e){
  e.preventDefault()
  proName=$('input').val()
  render()
})

mui.init({
  auto:false,
  pullRefresh : {
    container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      auto: false,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      callback :function(){
        render()
      }
    }
  }
});