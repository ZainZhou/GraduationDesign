/**
 * Created by Zain on 2017/4/24.
 */

$(function () {
    $(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
    $('#apply').on('click',function () {
        var _data = {};
        _data.username = $('#username').val();
        _data.password = $('#password').val();
        _data.method = 'login';
        $.post(post_url,_data,function (data) {
            if(data.status == 200){
                alert('登录成功！');
                location.href = '/game';
            }else {
                alert(data.info);
            }
        })
    });
    $('#register').on('click',function () {
        var _data = {};
        _data.method = 'reg';
        _data.username = $('#reg_user').val();
        _data.password = $('#reg_password').val();
        _data.age = $('#reg_age').val();
        _data.email = $('#reg_email').val();
        $.post(post_url,_data,function (data) {
            if(data.status == 200){
                alert('注册成功！');
            }else {
                alert(data.info);
            }
        })
    })
});