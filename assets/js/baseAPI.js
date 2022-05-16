// 每次调用ajax  都会先调用这个函数
// 在这个函数中 我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})