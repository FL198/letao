$('.header-back').click(function () {
  window.history.back()
})
window.onload = function () {
  var oriKey = [];//原先的localStorage，全局
  
  function render(){
    if(oriKey.length<1||localStorage.getItem("keyValue")==null){
      $('.lt-content ul').html('<li>没有更多数据了</li>')
    }
    localStorage.setItem('keyValue',JSON.stringify(oriKey))
    var htmlStr=template('tmp-history',{list:oriKey})
    $('.lt-content ul').html(htmlStr)
      //删除某一列
    $('.sm-btn-del').click(function(e){
      e.stopPropagation()
      e.preventDefault()
      var del_id=$(this).attr('data-del')
      mui.confirm('你确定要删除该条记录吗？','温馨提示',function(e){
        if(e.index==1){
          oriKey.splice(del_id,1)
          render()
        }
      })
    })
    $('ul li').click(function(){
      var proName=$(this).attr('proName')
      location.href='../html/search-list.html?proName='+proName+''
    })
  }

  if (localStorage.getItem("keyValue")!=null) {
    oriKey = JSON.parse(localStorage.getItem('keyValue'))
    render()
  }
  if(oriKey.length==0||localStorage.getItem("keyValue")==null){
    $('.lt-content ul').html('<li>没有更多数据了</li>')
  }

  //点击提交
  $('.submit').click(function(e){
    e.preventDefault()
    var arr=[]
    oriKey.unshift($('input').val())
    render()
    location.href='../html/search-list.html?proName='+$('input').val()+''
  })

  //清空记录
  $('.del-all').click(function(){
    mui.confirm('你确定要清空历史记录吗？','温馨提示',function(e){
      if(e.index==1){
        oriKey = []
        localStorage.clear()
        render()
      }
    })
  })
}






