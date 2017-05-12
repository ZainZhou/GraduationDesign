/**
 * Created by Zain on 2017/5/4.
 */
$(function () {
    var oC = $('#canvas');
    $('#begin_Page').css({'height':$(window).height(),'width':$(window).height()*4/3});
    oC.attr('height',$(window).height());
    oC.attr('width',$(window).height()*4/3);
    $('.changePd').css('height',$(window).height()*0.3);
    $('.rank_list').css('height',$(window).height()*0.8);
});