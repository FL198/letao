$('.user').addClass('active')
var currentPage=1,pageSize=5
function render(){
    $.ajax({
        url:'/user/queryUser',
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
