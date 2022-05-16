$(function () {
    // 点击  去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击  去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    // 从Layui 中获取 form对象
    let form = layui.form;
    let layer = layui.layer

    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 获取到输入密码中的值    没太懂
            let pwd = $('.reg-box [name=password]').val();
            // 判读确认密码框中输入的是否一致
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    });


    //! 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1 阻止默认提交行为
        e.preventDefault();
        // 2 发起ajax请求 POST
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功')
                // 模拟点击去登录
                $('#link_login').click();
            }
        })
    })

    //! 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // 快速获取表单内容
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功');
                console.log(res.token);
                // 将登录成功后得到的 token 字符串 ,保存到localStorage 中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})