$('.add').click(function(){
  $('#myModal1').modal('show')
})

$('.category_one').addClass('active')
var currentPage=1,pageSize=5
function render(){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        dataType:'json',
        data:{page:currentPage,pageSize},
        success:function(info){
            count=Math.ceil(info.total/info.size)
            var htmlStr=template('tmp-info',{list:info.rows})
            $('tbody').html(htmlStr)
            setPage(currentPage,count,render)
            $('table button').click(function(){
                var id=$(this).attr('id')
                var isDelete=$(this).attr('isDelete')
                if(isDelete==0)isDelete=1
                else 
                    isDelete=0
                $.ajax({
                    type:'post',
                    url:'/user/updateUser',
                    data:{id,isDelete},
                    dataType:'json',
                    success:function(info){
                        if(info.success){
                            render()
                        }
                    }
                })
            })
        }
    })
}
function setPage(pageCurrent,pageSum,callback){
    $(".pagination").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage: pageCurrent,
        totalPages: pageSum,
        onPageClicked:function(event,originalEvent,type,page) {
            currentPage=page
            callback && callback()
        }
    })
}
render()
$('form').bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryName:{
          validators: {
            notEmpty: {
              message: '请输入一级分类名称'
            }
          }
        }
      }
});
var validator=$('form').data('bootstrapValidator')
$("form").on('success.form.bv', function (e) {
  e.preventDefault();
  $('.pretend').click()
      var categoryName=$('.categoryName').val()
      $.ajax({
          url:'/category/addTopCategory',
          type:'post',
          data:{categoryName},
          success:function(info){
              if(info.success){
                render()
              }
          }
      })
      validator.resetForm()
      $('.reset').click()
});
