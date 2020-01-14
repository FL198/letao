$('.back').click(function(){
   location.href='../html/search-list.html'
})
var productId
function render(productId){
   $.ajax({
      url:'/product/queryProductDetail',
      data:{id:productId},
      success:function(info){
         var size=0,num=1;
         var swiperStr=template('tmp-swiper',{list:info.pic,desc:info})
         $('.mui-scroll').html(swiperStr)
         var gallery = mui('.mui-slider');
         gallery.slider({
         interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
         });
         $('.size span').click(function(){
            $(this).addClass('active').siblings().removeClass('active')
         })
         mui('.mui-numbox').numbox().setValue(1)
         $('.size span').click(function(){
            size=$(this).attr('size')
         })
         $('.add').click(function(){
            num=mui('.mui-numbox').numbox().getValue()
            if(size==0){
               mui.toast('请选择尺码') 
            }else{
               $.ajax({
                  url:'/cart/addCart',
                  type:'post',
                  data:{productId:productId,num:num,size:size},
                  success:function(info){
                     if(info.success){
                        mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                           if(e.index==0){
                              location.href='../html/cart.html'
                           }
                        })
                     }
                  }
               })
            }
         })
      }
   })
}
if(location.search){
   productId=location.search.replace('?productId=','')
   render(productId)
 }else{
    location.href='../html/search-list.html'
 }