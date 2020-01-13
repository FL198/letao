$('.sure').click(function(){
    if($('.username').val()===''){
      mui.toast('请输入用户名')
      return false
    }else if($('.password').val()===''){
      mui.toast('请输入密码')
      return false
    }else{
      $.ajax({
        type:'post',
        url:'/user/login',
        data:$('form').serialize(),
        success:function(info){
          if(info.error===403){
            mui.toast('用户名或密码错误')
          }
          if(info.success){
            console.log(window.location.history)
          }
        }
      })
    }
})