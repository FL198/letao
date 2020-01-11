$('.add').click(function(){
  $('#myModal').modal('show')
})
$('.category_two').addClass('active')

$.ajax({
    url:'/category/queryTopCategoryPaging',
    data:{page:1,pageSize:4},
    success:function(info){
      var htmlStr=template('tmp-select',{list:info.rows})
      $('select').html(htmlStr)
    }
})
var currentPage=1,pageSize=5
function render(){
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        dataType:'json',
        data:{page:currentPage,pageSize},
        success:function(info){
            count=Math.ceil(info.total/info.size)
            var htmlStr=template('tmp-info',{list:info.rows,status:obj})
            $('tbody').html(htmlStr)
            setPage(currentPage,count,render)
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
    secondName:{
      validators: {
        notEmpty: {
          message: '请输入二级分类名称'
        }
      }
    }
  }
});

// var validator=$('form').data('bootstrapValidator')
// $("form").on('success.form.bv', function (e) {
//   e.preventDefault();
//   $('.pretend').click()
//       var categoryName=$('.categoryName').val()
//       $.ajax({
//           url:'/category/addTopCategory',
//           type:'post',
//           data:{categoryName},
//           success:function(info){
//               if(info.success){
//                 render()
//               }
//           }
//       })
//       validator.resetForm()
//       $('.reset').click()
// });