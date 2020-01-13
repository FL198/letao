$.ajax({
  url:'/cart/queryCart',
  success:function(info){
    if(info.error===400){
      window.location.href="../html/login.html"
    }
  }
})