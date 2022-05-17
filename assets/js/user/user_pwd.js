$(function () {
    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('#oldPwd').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('#newPwd').val()) {
                return '两次输入的新密码不同'
            }
        }
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: { oldPwd: $('#oldPwd').val(), newPwd: $('#newPwd').val() },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更改密码失败！');
                }
                layer.msg('更改密码成功！');
                // 重置表单
                $('.layui-form')[0].reset();
                console.log(res);
            }
        })
    })
})