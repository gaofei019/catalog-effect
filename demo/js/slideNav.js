$(function(){

//var allEle = $(':header[class*="headline"]');
   // var headLen = allEle.length;
   $(window).scrollTop(0);
    var ddArr = [];
    //根据页面内容生成slide导航；
    /*allEle.each(function (i) {
        var sideIndex,
            sideName,
            ddId,
            highlight = '',
            ddClass,
            sideAnchor;
        sideName = $(this).find('.headline-content').text();
        if ($(this).hasClass('headline-1')) {
            sideAnchor = sideIndex = $(this).find('.anchor-1').eq(0).attr('name');
            ddClass = 'sideCatalog-item1';
        } else {
            sideAnchor = $(this).find('.anchor-2').eq(0).attr('name');
            sideIndex = sideAnchor.replace('-', '.');
            ddClass = 'sideCatalog-item2';
        }
        ddId = 'sideToolbar-item-0-' + sideAnchor;
        if (i == 0) {
            highlight = 'highlight';
        }
        var ddHtml = '<dd id="' + ddId + '" class="' + ddClass + ' ' + highlight + '">'
                + '<span class="sideCatalog-index1">' + sideIndex + '</span>'
                + '<a class="nslog:1026" onclick="return false;" title="part' + sideAnchor + '" href="#' + sideAnchor + '">' + sideName + '</a>'
                + '<span class="sideCatalog-dot"></span>'
                + '</dd>';
        ddArr.push(ddHtml);
    });
    $('#sideCatalog-catalog dl').html(ddArr.join(''));*/

    //设置导航的位置
    //var slideTop = $(window).height() - $('.slide').height();
    var slideTop = $('#artiCon').height(),
        $updown = $('#sideCatalog-updown'),
        $sideCatalogCatalog = $('#sideCatalog-catalog'),
        $sideCatalogCatalogDl = $('#sideCatalog-catalog dl'),
        slideInnerHeight = $sideCatalogCatalogDl.height(),
        slideOutHeight = $sideCatalogCatalog.height(),
        enableTop = slideInnerHeight - slideOutHeight,
    //console.log(enableTop);
        step = 50,
        $slideNav = $('#slideNav'),
        $copyRightBox = $('#copyRightBox'),
        $authorRizeBox = $('#authorRizeBox'),
        $textConRight = $('#textConRight'),
        $sideToolbar = $('#sideToolbar'),
        $textBox = $('#textBox'),
        $textBoxImg = $textBox.find('img'),
        imgLen = $textBoxImg.length,
        sideToolbarHeight,
        slideScroll,
        authorTop,
        //slideNavTop = $textConRight.offset().top + $textConRight.outerHeight();
        slideNavTop = $textConRight.outerHeight()+10;
        //console.log(slideNavTop);
    $slideNav.addClass('show');
    $sideToolbar.css('top',slideNavTop);
    
    function updownShow(){//目录按钮显示方法
        slideInnerHeight = $sideCatalogCatalogDl.height();
        slideOutHeight = $sideCatalogCatalog.height();
        enableTop = slideInnerHeight - slideOutHeight;
        if(enableTop < 0){
            $updown.css('visibility', 'hidden');
        }else{
            $updown.css('visibility', 'visible');
        }
    };
    //点击向上的按钮
    $('#sideCatalog-down').off('click').on('click', function () {
        if ($(this).hasClass('sideCatalog-down-enable')) {
            if ((enableTop - Math.abs(parseInt($('#sideCatalog-catalog dl').css('top')))) > step) {
                $('#sideCatalog-catalog dl').stop().animate({ 'top': '-=' + step }, 'fast');
                $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
            } else {
                $('#sideCatalog-catalog dl').stop().animate({ 'top': -enableTop }, 'fast');
                $(this).removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
                $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
            }
        } else {
            return false;
        }
    });
    //点击向下的按钮
    $('#sideCatalog-up').off('click').on('click', function () {
        if ($(this).hasClass('sideCatalog-up-enable')) {
            if (Math.abs(parseInt($('#sideCatalog-catalog dl').css('top'))) > step) {
                $('#sideCatalog-catalog dl').stop().animate({ 'top': '+=' + step }, 'fast');
                $('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
            } else {
                $('#sideCatalog-catalog dl').stop().animate({ 'top': '0' }, 'fast');
                $(this).removeClass('sideCatalog-up-enable').addClass('sideCatalog-up-disable');
                $('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
            }
        } else {
            return false;
        }
    });

    //点击导航中的各个目录
    $('#sideCatalog-catalog dl').off('click','dd').on('click', 'dd', function () {
        var index = $('#sideCatalog-catalog dl dd').index($(this));
        scrollSlide($(this), index);
        //var ddIndex = $(this).find('a').stop().attr('href').lastIndexOf('#');
        //var ddId = $(this).find('a').stop().attr('href').substring(ddIndex + 1);
        var ddId = $(this).find('a').stop().attr('href');
        //console.log(ddId);
        //var windowTop = $('a[name="' + ddId + '"]').offset().top;
        //console.log(ddId);
        var windowTop = $(ddId).offset().top - 54;//
        //var windowTop = $(ddId).offset().top;
        $('body,html').animate({ scrollTop: windowTop }, 'fast');
    });
    function countCatalogRange(){//计算目录需要滚动的距离
        $slideNav.show();//显示目录
        updownShow();
        authorTop = $authorRizeBox.offset().top;
        sideToolbarHeight = $sideToolbar.height();
        slideScroll = authorTop-2*sideToolbarHeight -2*85;
        //console.log(authorTop);
    };
    if(imgLen > 0){//如果有图片，等着图片加载完再计算
        $textBoxImg.load(function(){
            countCatalogRange();
        });
    }else{//没有图片直接计算
        countCatalogRange();
    }
    
    
    //var slideBottom = $copyRightBox.offset().top +$copyRightBox.height() - $authorRizeBox.offset().top - 85 -85;
    //console.log($copyRightBox.offset().top);

    //var slideScroll = authorTop - $sideToolbar.height()- 85 -54 -85 - 54;
    //var slideScroll = $authorRizeBox.offset().top - $sideToolbar.height();
    //console.log(authorTop);
    //console.log(slideScroll);

    var hlen = $('#sideCatalog-catalog dl dd').length,
        j = 0,
        $h,
        hTop,
        hHeight,
        scrolly;
    $('#sideCatalog-catalog dl dd').eq(0).addClass('highlight');
    //滚动页面，即滚动条滚动
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        /*if (scrollTop > slideTop && scrollTop < authorTop) {
            $slideNav.show().addClass('show');
        } else {
            $slideNav.hide().removeClass('show');
        }*/
        /*if(scrollTop >= slideScroll){
            $sideToolbar.css('top',slideScroll);
        }else{
            if(scrollTop<slideNavTop){
                $sideToolbar.css('top',slideNavTop);
            }else{
                $sideToolbar.css('top',scrollTop);
            }
        }*/
        //console.log(scrollTop);
        if(scrollTop >= slideScroll){
            $sideToolbar.css('top',slideScroll);
        }else{
            if(scrollTop<slideNavTop){
                $sideToolbar.css('top',slideNavTop);
            }else{
                $sideToolbar.css('top',scrollTop);
            }
        }
        for (var i = hlen - 1; i >= 0; i--) {
            j= i+1;
            $h = $('#c'+j);
            if($h.offset()){
                hTop = $h.offset().top - 54;
                //console.log(hTop);
                //hTop = $h.offset().top;
                hHeight = $h.height();
                if (scrollTop >= hTop - hHeight) {
                    var index = i;
                    $('#sideCatalog-catalog dl dd').eq(index).addClass('highlight').siblings('dd').removeClass('highlight');
                    scrollSlide($('#sideCatalog-catalog dl dd').eq(index), index);
                    return false;
                } else {
                    $('#sideCatalog-catalog dl dd').eq(0).addClass('highlight').siblings('dd').removeClass('highlight');
                }
            }else{
                $slideNav.hide();
            }
        }
    });

    //导航的滚动，以及向上，向下按钮的显示隐藏
    function scrollSlide(that, index) {
        if (index < 5) {
            $('#sideCatalog-catalog dl').stop().animate({ 'top': '0' }, 'fast');
            $('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
            $('#sideCatalog-up').removeClass('sideCatalog-up-enable').addClass('sideCatalog-up-disable');
        }/* else if (index > 11) {
            $('#sideCatalog-catalog dl').stop().animate({ 'top': -enableTop }, 'fast');
            $('#sideCatalog-down').removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
            $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
        } */else {
            var dlTop = parseInt($('#sideCatalog-catalog dl').css('top')) + slideOutHeight / 2 - (that.offset().top - $('#sideCatalog-catalog').offset().top);
            $('#sideCatalog-catalog dl').stop().animate({ 'top': dlTop }, 'fast');
            $('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
            $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
        }
    };

});
