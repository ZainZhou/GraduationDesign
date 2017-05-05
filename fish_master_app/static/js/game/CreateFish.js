var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 18,collX:18},
	{w: 78, h: 64, collR: 15,collX:31},
	{w: 72, h: 56, collR: 14,collX:29},
	{w: 77, h: 59, collR: 12,collX:30},
	{w: 107, h: 122, collR: 10,collX:34}
];
function Fish(type){
	this.type = type;
	this.x = 0;
	this.y = 0;
	this.animation();
	this.cur = 0;
	this.rotate = 0;
	this.speed = 4/type;
	this.timer1 = null;
	this.timer2 = null;
	this.collR=FISH_SIZE[this.type].collR;
	this.collX=FISH_SIZE[this.type].collX;
}

Fish.prototype.animation = function(){
	var _this = this;
	this.timer1 = setInterval(function(){
		_this.cur++;
		if(_this.cur==4)_this.cur=0;
	},150);
	this.timer2 = setInterval(function(){
		_this.x += Math.cos(d2a(_this.rotate))*_this.speed;
		_this.y += Math.sin(d2a(_this.rotate))*_this.speed;
	},30)
};
Fish.prototype.draw = function(gd){
	var w=FISH_SIZE[this.type].w;
	var h=FISH_SIZE[this.type].h;
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	gd.drawImage(json['fish'+this.type],0,this.cur*h,w,h,-w/2,-h/2,w,h);
	gd.restore();
};
Fish.prototype.close = function(){
	clearInterval(this.timer1);
	clearInterval(this.timer2);
};
Fish.prototype.isIn = function(x,y){
	var a = x-this.x;
	var b = y-this.y;
	var c = Math.sqrt(a*a+b*b);
	if(c < this.collX){
		return true;
	}else {
		return false;
	}
};
Fish.prototype.isDead = function(x,y,type){
	var a = x-this.x;
	var b = y-this.y;
	var c = Math.sqrt(a*a+b*b);
	if(type < 3){
		if(c < this.collR*type*1.15){
			return true;
		}else {
			return false;
		}
	}else if(type >= 3 && type < 5){
		if(c < this.collR*type*0.75){
			return true;
		}else {
			return false;
		}
	} else {
		if(c < this.collR*type*0.7){
			return true;
		}else {
			return false;
		}
	}
};