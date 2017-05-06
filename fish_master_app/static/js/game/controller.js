/**
 * Created by Zain on 2017/4/28.
 */
window.onload = function(){
            var oC = document.getElementById('canvas');
            var gd = oC.getContext('2d');
            var out = 10;
            var dir = [-out,oC.width+out];
            var beginGame = document.getElementById('begin_Btn');
            var beginPage = document.getElementById('begin_Page');
            var Bgplayer = document.getElementById('Bgplayer');
            var Ppplayer = document.getElementById('PPplayer');
            var Musics = [];
            var Music_input = document.getElementsByClassName('music_num');
            var is_logined = $('.is_logined');
            var screen_w = $(window).height()*4/3;
            var screen_y = $(window).height();
            var score = 0;
            var over_flag = true;
            if(is_logined.length){
                $('.logined_block').css('display','block');
            }else {
                $('.login_block').css('display','block');
                l = $('.lineP');
                x = l.css('height');
                l.css('line-height',x);
                $('#canvas').css({'height':$(window).height(),'width':$(window).height()*4/3});
            }

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
            for(var i = 0 ; i < Music_input.length ; i++){
                Musics.push(Music_input[i].value);
            }
            $('#reg_btn').on('click',function () {
               var _data = {};
               var username = $('#reg_username').val();
               var password = $('#reg_password').val();
               var nickname = $('#reg_nickname').val();
               var email = $('#reg_email').val();
               var age = $('#reg_age').val();
               if(username.length>6 && username.length<12 && password.length>8 && password.length<14 && nickname.length>0  && nickname.length<6 && email && age){
                    _data.username = username;
                    _data.password = password;
                    _data.nickname = nickname;
                    _data.email = email;
                    _data.age = age;
                    _data.method = 'reg';
                    $.post(post_url,_data,function (data) {
                        if(data.status == 200){
                            alert("注册成功！");
                            $('.login_block').css('display','block');
                            $('.reg_block').css('display','none');
                        }else {
                            alert(data.info);
                        }
                    })
               }else {
                   alert("请将注册信息填写完整！");
                   return false;
               }
            });
            $('#goreg_btn').on('click',function () {
                $('.login_block').css('display','none');
                $('.reg_block').css('display','block');
            });
            $('#login_btn').on('click',function () {
               var _data = {};
               _data.method = 'login';
               _data.username = $('#username').val();
               _data.password = $('#password').val();
               $.post(post_url,_data,function (data) {
                    if(data.status == 200){
                        $('.login_block').css('display','none');
                        $('.logined_block').css('display','block');
                    }else {
                        alert(data.info);
                    }
                })
            });
            $('#logout_btn').on('click',function () {
                var _data = {};
                _data.method = 'logout';
                $.post(post_url,_data,function (data) {
                    if(data.status == 200){
                        $('.logined_block').css('display','none');
                        $('.login_block').css('display','block');
                        l = $('.lineP');
                        x = l.css('height');
                        l.css('line-height',x);
                        $('#canvas').css({'height':$(window).height(),'width':$(window).height()*4/3});
                    }else {
                        alert(data.info);
                    }
                })
            });
            beginGame.onclick = function(){
                beginPage.style.display = "none";
                oC.style.display = 'inline';
                Bgplayer.play();
                loadImages(imgs,function(){
                    /*炮台*/
                    var c = new Cannon(1);
                    c.x = screen_w*0.53875;
                    c.y = screen_y*0.93;
                    /*换炮加钱*/
                    document.onkeydown = function(event){
                        var e = event || window.event || arguments.callee.caller.arguments[0];
                        if(e.keyCode == 39 && c.type < 7){
                            c.type+=1;
                        }else if(e.keyCode == 37 && c.type > 1){
                            c.type-=1;
                        }
                        if(c.type > 2 && c.type <= 5){
                            Ppplayer.src = Musics[0];
                        }else if(c.type >5){
                            Ppplayer.src = Musics[1];
                        }else {
                            Ppplayer.src = Musics[2];
                        }
                    };
                    /*存子弹*/
                    var aBullet=[];
                    /*存鱼*/
                    var aFish=[];
                    /*存金币*/
                    var aCoin=[];

                    setInterval(function(){
                        /*清除画布*/
                        gd.clearRect(0,0,oC.width,oC.height);
                        /*生成鱼*/
                        if(Math.random() < 0.02){
                            dir.sort(function(){
                                return Math.random()-0.5;
                            });
                            var f = new Fish(rnd(1,6));
                            f.y = rnd(100,oC.height-100);
                            if(dir[0] < 0){
                                f.x = dir[0];
                                f.rotate = rnd(-60,60);
                            }else{
                                f.x = dir[0];
                                f.rotate = rnd(135,250);
                            }
                            aFish.push(f);
                        }

                        /*鱼越界*/
                        for (var i = 0; i < aFish.length; i++) {
                            if(aFish[i].x<-out || aFish[i].x>oC.width+out || aFish[i].y<-out || aFish[i].y>oC.height+out){
                                aFish[i].close();
                                aFish.splice(i,1);
                                i--;
                            }
                        }
                        /*银币越界*/
                        for (var i = 0; i < aCoin.length; i++) {
                            if(aCoin[i].x <= 5){
                                aCoin[i].close();
                                aCoin.splice(i,1);
                                i--;
                            }
                        }
                        /*炮弹越界*/
                        for (var i = 0; i < aBullet.length; i++) {
                            if(aBullet[i].x<-out || aBullet[i].x>oC.width+out || aBullet[i].y<-out || aBullet[i].y>oC.height+out){
                                aBullet[i].close();
                                    aBullet.splice(i,1);
                                    i--;
                            }
                        }
                        /*画鱼*/
                        for (var i = 0; i < aFish.length; i++) {
                            aFish[i].draw(gd);
                        }

                        /*画子弹*/
                        for (var i = 0; i < aBullet.length; i++) {
                            aBullet[i].draw(gd);
                        }
                        /*画下部背景*/
                        gd.drawImage(json.bottom,0,0,765,70,0,screen_y-screen_w*0.091,screen_w*0.97,screen_w*0.091);
                        /*画炮台*/
                        c.draw(gd);
                        /*显示得分*/
                        var str = _score.toString();
                        var d = 6 - str.length;
                        var arr = str.split("");
                        for(var i = 0,len = d; i<len; i++){
                            arr.unshift(0);
                        }
                        for(var i = 0,len = 6; i<len; i++){
                            gd.drawImage(json.coinText,parseInt(arr[i])*36,0,36,49,screen_w*0.03+i*screen_w*0.029,screen_y-screen_w*0.0265,screen_w*0.0125,screen_y*0.022);
                        }
                        /*碰撞检测*/
                        for (var i = 0; i < aFish.length; i++) {
                            for (var j = 0; j < aBullet.length; j++) {
                                if(aFish[i].isIn(aBullet[j].x,aBullet[j].y)){
                                    if(aFish[i].isDead(aBullet[j].x,aBullet[j].y,aBullet[j].type)){
                                        var x = aFish[i].x;
                                        var y = aFish[i].y;
                                        /*鱼消失*/
                                        score += 150*aFish[i].type;
                                        aFish[i].close();
                                        aFish.splice(i,1);
                                        i--;
                                        var cion = new Coin(screen_y+60);
                                        cion.x=x;
                                        cion.y=y;
                                        aCoin.push(cion);
                                    }
                                    /*子弹消失*/
                                    aBullet[j].close();
                                    aBullet.splice(j,1);
                                    j--;
                                }
                            }
                        }

                        /*画金币*/
                        for (var i = 0; i < aCoin.length; i++) {
                            aCoin[i].draw(gd);
                        }
                        console.log(_score +','+ aBullet.length +','+ over_flag);
                        if(_score == 0 && aBullet.length == 0 && over_flag){
                            over_flag = false;
                            alert("游戏结束！得分："+score);
                            var _data = {};
                            _data.score = score;
                            $.post(score_url,_data,function (data) {
                                if(data.status == 200){
                                    location.reload();
                                }else {
                                    alert(data.info);
                                    location.reload()
                                }
                            })
                        }
                    },16);
                    oC.onclick = function(ev){
                        if(clickDisable || !over_flag){
                            return 0 ;
                        }
                        clickDisable = 1;
                        Ppplayer.currentTime = 0;
                        Ppplayer.play();
                        setTimeout(function(){
                            clickDisable = 0;
                        },300);
                        if(_score - c.type*100 >= 0){
                            _score -= c.type*100;
                        }else if(_score >= 100){
                            alert("金币不足！");
                            return false;
                        }
                        var oEvent = ev || event;
                        var a = c.x-(oEvent.clientX-oC.offsetLeft);
                        var b = c.y-(oEvent.clientY-oC.offsetTop);
                        var d = a2d(Math.atan2(b,a))-90;
                        c.rotate = d;
                        /*画子弹*/
                        var b = new Bullet(c.type);
                        b.x = c.x;
                        b.y = c.y;
                        b.rotate = c.rotate;
                        aBullet.push(b);
                    };
                });
            }
        };