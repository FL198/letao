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
  excluded:[],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    brandName:{
      validators: {
        notEmpty: {
          message: '请输入二级分类名称'
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:'请上传图片'
        }
      }
    }
  }
});
$('.cancel').click(function(){
    $('.img img').attr('src','./image/none.png')
    $('.reset').click()
    $('form').data('bootstrapValidator').resetForm()
})
$('#fileupload').fileupload({
  dataType:'json',
  done:function(e,data){
    $('.img img').attr('src',data.result.picAddr)
    $('.brandLogo').val(data.result.picAddr)
    $('form').data('bootstrapValidator').updateStatus('brandLogo',"VALID")
  }
})

$('select').on('change',function(){
    $('.categoryId').val($(this).val())
})
$("form").on('success.form.bv', function (e) {
  e.preventDefault();
  $.ajax({
      type:'post',
      dataType:'json',
      data:$('form').serialize(),
      url:'/category/addSecondCategory',
      success:function(info){
          if(info.success){
            $('#myModal').modal('hide')
            $('form').data("bootstrapValidator").resetForm( true );
            $('.img img').attr('src','./image/none.png')
            currentPage = 1;
            render();
          }
      }
  })
  $('form').data('bootstrapValidator').resetForm()
});
