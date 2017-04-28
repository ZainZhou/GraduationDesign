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
            for(var i = 0 ; i < Music_input.length ; i++){
                Musics.push(Music_input[i].value);
            }
            beginGame.onclick = function(){
                beginPage.style.display = "none";
                oC.style.display = 'inline';
                Bgplayer.play();
                loadImages(imgs,function(){
                    /*炮台*/
                    var c = new Cannon(1);
                    c.x = 431;
                    c.y = 570;
                    /*换炮加钱*/
                    document.onkeydown = function(event){
                        var e = event || window.event || arguments.callee.caller.arguments[0];
                        if(e.keyCode == 39 && c.type < 7){
                            c.type+=1;
                        }else if(e.keyCode == 37 && c.type > 1){
                            c.type-=1;
                        }else if(e.keyCode == 38 && score < 999900){
                            score+=100;
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
                                f.y = rnd(100,oC.height-100);
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
                        };

                        /*画鱼*/
                        for (var i = 0; i < aFish.length; i++) {
                            aFish[i].draw(gd);
                        };

                        /*画子弹*/
                        for (var i = 0; i < aBullet.length; i++) {
                            aBullet[i].draw(gd);
                        };
                        /*画下部背景*/
                        gd.drawImage(json.bottom,0,0,765,70,5,532,765,70);
                        /*画炮台*/
                        c.draw(gd);
                        /*显示得分*/
                        var str = score.toString();
                        var d = 6 - str.length;
                        var arr = str.split("");
                        for(var i = 0,len = d; i<len; i++){
                            arr.unshift(0);
                        }
                        for(var i = 0,len = 6; i<len; i++){
                            gd.drawImage(json.coinText,parseInt(arr[i])*36,0,36,49,28+i*23,582,10,13.24);
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
                                        if(score > 999999){
                                            alert("恭喜您成为捕鱼宗师,游戏结束!");
                                            window.location.reload();
                                        }
                                        aFish[i].close();
                                        aFish.splice(i,1);
                                        i--;
                                        var cion = new Coin();
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
                    },16);

                    oC.onclick = function(ev){
                        if(clickDisable){
                            return 0 ;
                        }
                        clickDisable = 1;
                        Ppplayer.currentTime = 0;
                        Ppplayer.play();
                        setTimeout(function(){
                            clickDisable = 0;
                        },300);
                        if(score - c.type*100 > 0){
                            score -= c.type*100;
                        }else {
                            alert("没钱了!快充值!");
                            return;
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
        }