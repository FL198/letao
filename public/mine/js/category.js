$('.add').click(function () {
  $('#myModel1').modal('show')
})
$('.goods').addClass('active')

var currentPage = 1, pageSize = 5
function render() {
  $.ajax({
    url: '/product/queryProductDetailList',
    dataType: 'json',
    data: { page: currentPage, pageSize },
    success: function (info) {
      count = Math.ceil(info.total / info.size)
      var htmlStr = template('tmp-info', { list: info.rows })
      $('tbody').html(htmlStr)
      setPage(currentPage, count, render)
    }
  })
}
function setPage(pageCurrent, pageSum, callback) {
  $(".pagination").bootstrapPaginator({
    bootstrapMajorVersion: 3,
    currentPage: pageCurrent,
    totalPages: pageSum,
    onPageClicked: function (event, originalEvent, type, page) {
      currentPage = page
      callback && callback()
    }
  })
}
render()

$.ajax({
  url: '/category/querySecondCategoryPaging',
  dataType: 'json',
  data: { page: currentPage, pageSize },
  success: function (info) {
    categorySecondNum = info.total
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      data: { page: 1, categorySecondNum },
      success: function (info) {
        var htmlStr = template('tmp-category', { list: info.rows })
        $('.dropdown-menu').html(htmlStr)
        $('.select li a').click(function () {
          var text = $(this).text()
          $('.second-name').text(text)
          $('.brandId').val($(this).attr('data-id'))
          $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
        })
      }
    })
  }
})

$('form').bootstrapValidator({
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    brandId: {
      validators: {
        notEmpty: {
          message: '请选择二级分类'
        }
      }
    },
    proName: {
      validators: {
        notEmpty: {
          message: '请输入商品名称'
        }
      }
    },
    proDesc: {
      validators: {
        notEmpty: {
          message: '请输入商品描述'
        }
      }
    },
    num: {
      validators: {
        notEmpty: {
          message: '请输入商品库存'
        },
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: '商品库存格式, 必须是非零开头的数字'
        }
      }
    },
    size: {
      validators: {
        notEmpty: {
          message: '请输入商品尺码'
        },
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message: '尺码格式, 必须是 32-40'
        }
      }
    },
    oldPrice: {
      validators: {
        notEmpty: {
          message: '请输入商品原价'
        }
      }
    },
    price: {
      validators: {
        notEmpty: {
          message: '请输入商品价格'
        }
      }
    },
    picStatus:{
      validators:{
        notEmpty:{
          message:'请上传三张图片'
        }
      }
    }
  }
})

var picArr=[]
$('#fileupload').fileupload({
  dataType:'json',
  done:function(e,data){
    var picObj=data.result
    picArr.unshift(picObj)
    $('.img').prepend('<img src="'+picObj.picAddr+'" width="100">')
    if(picArr.length>3){
      picArr.pop()
      $('.img img:last-of-type').remove()
    }
    if(picArr.length==3){
      $('form').data('bootstrapValidator').updateStatus('picStatus','VALID')
    }
  }
})
$("form").on('success.form.bv', function (e) {
  e.preventDefault();
  var obj=$('form').serialize()
  obj+='&picAddr1='+picArr[0].picAddr+'&picName1='+picArr[0].picName+''
  obj+='&picAddr2='+picArr[1].picAddr+'&picName2='+picArr[1].picName+''
  obj+='&picAddr3='+picArr[2].picAddr+'&picName3='+picArr[2].picName+''
  $.ajax({
    type:'post',
    url:'/product/addProduct',
    data:obj,
    success:function(info){
      render()
      $('#myModel1').modal('hide')
      $('form').data('bootstrapValidator').resetForm()
      currentPage = 1;
      $('.second-name').text('请选择二级分类')
      picArr=[]
      $('.img img').remove()
    }
  })
});
$('.cancel').click(function(){
  $('.reset').click()
  picArr=[]
  $('.img img').remove()
  $('.second-name').text('请选择二级分类')
  $('form').data('bootstrapValidator').resetForm()
})