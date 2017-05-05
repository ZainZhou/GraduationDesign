function Coin(screen_y){
	this.x=0;
	this.y=0;
	this.cur=0;
	this.animation(screen_y);
	this.timer1 = null;
	this.timer2 = null;
}

Coin.prototype.draw=function(gd){
	gd.save();
	gd.translate(this.x,this.y);
	gd.drawImage(json['coinAni1'],0,this.cur*60,60,60,30,30,60,60);

	gd.restore();
};
Coin.prototype.close=function () {
	clearInterval(this.timer1);
	clearInterval(this.timer2);
};
Coin.prototype.animation=function(screen_y){
	var _this = this;
	//硬币旋转动画
	this.timer1 = setInterval(function(){
		_this.cur++;
		if(_this.cur == 10) _this.cur=0;
	},30);
	//硬币运动轨迹
	this.timer2 = setInterval(function(){
		_this.x += (0-_this.x)/5;
		_this.y += (screen_y-_this.y)/5;
	},30);
};