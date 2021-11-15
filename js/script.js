$(document).ready(function () {

    // 상단고정메뉴
    let scroll_y = $(window).scrollTop();
    let header = $('.header');
    let body = $('body');

    $(window).scroll(function(){
        scroll_y = $(window).scrollTop();
        if(scroll_y > 70){
            header.addClass('header-fix');
            body.addClass('body-fix');
        } else {
            header.removeClass('header-fix');
            body.removeClass('body-fix');
        }

    });

    // 위로가기 기능
    $('.gotop').click(function(){
        $('html, body').animate({
            scrollTop: 0
        });
    });


    let center_menu = $('.center-menu');
    let center_submenu = $('.center-submenu');

    center_menu.click(function(event){
        event.preventDefault();
        center_submenu.toggle();
        center_menu.toggleClass('center-menu-active');
    });


    let category_list_more = $('.category-list-more');
    let category_list_2 = $('.category-list-2');

    category_list_more.removeClass('category-list-more-active');

    category_list_more.click(function(event){
        event.preventDefault();
        category_list_2.toggle();
        $(this).toggleClass('category-list-more-active');

        see_more_list.hide();
        see_more_open.show();
        see_more_close.hide();
    });


    let see_more_bt = $('.see-more-bt');
    let see_more_open = $('.see-more-bt-open');
    let see_more_close = $('.see-more-bt-close');
    let see_more_list = $('.see-more-list');

    see_more_bt.click(function(event){
        event.preventDefault();
        see_more_open.toggle();
        see_more_close.toggle();
        see_more_list.toggle();

        category_list_2.hide();

        category_list_more.removeClass('category-list-more-active');
    });






    // visual slide
    let sw_visual = new Swiper('.sw-visual', {
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: ".sw-visual-next",
            prevEl: ".sw-visual-prev",
        },
        pagination: {
            el: ".sw-visual-pg",
            type: "fraction",
        },
    });

    // sw-visual 콘트롤
    // 버튼을 저장한다.
    let sw_visual_bt = $('.sw-visual-bt');
    sw_visual_bt.click(function () {
        $(this).toggleClass('sw-visual-bt-play');

        // 현재 아이콘 상태를 임시로 저장한다.
        let temp = $(this).hasClass('sw-visual-bt-play');

        // 아이콘이 > 이라면 temp == true
        // 멈추고
        // 그렇지 않다면( || ) 
        // 자동실행하라
        if (temp == true) {
            sw_visual.autoplay.stop();
        } else {
            sw_visual.autoplay.start();
        }
    });

    // 알뜰물품 슬라이드
    new Swiper('.sw-sales', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw-sales-next",
            prevEl: ".sw-sales-prev",
        },
        pagination: {
            el: ".sw-sales-pg",
            type: "fraction",
        },
    });

    // 추천 슬라이드 관련
    new Swiper('.sw-pick', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw-pick-next",
            prevEl: ".sw-pick-prev",
        },
        pagination: {
            el: ".sw-pick-pg",
            type: "fraction",
        },
    });

    // 인기물품 슬라이드
    new Swiper('.sw-famous', {
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 10,
        navigation: {
            nextEl: ".sw-famous-next", 
            prevEl: ".sw-famous-prev",
        }
    });

    // famous를 위한 기능
    // let famous_good_box = $('.famous .good-box');
    // console.log(famous_icon);
    // console.log(famous_good_box);

    // $.each(famous_good_box, function(){
    //     let temp = $(this).find('.good-box-special');
    //     if(temp.length > 0) {

    //     } else {
    //         $(this).find('.good-box-price').css('bottom','3rem');
    //         $(this).find('.good-box-cart').css('bottom','3rem');
    //     }
    // });

    // 목록을 보여주는 버튼들
    let famous_icon = $('.sw-famous > .swiper-slide > a');
    // 목록들
    let famous_good_list = $('.famous .good-list');
    famous_good_list.eq(0).show();

    $.each(famous_icon, function(index, item){
        $(this).click(function(event){
            event.preventDefault();
            famous_good_list.hide();
            famous_good_list.eq(index).show();
        });
    });

    // 브랜드 슬라이드 관련
    new Swiper('.sw-brand', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: ".sw-brand-next",
            prevEl: ".sw-brand-prev",
        },
        pagination: {
            el: ".sw-brand-pg",
            type: "fraction",
        },
    });

    // 장바구니 기능
    // 1 .recipe-con-item
    let recipe_con_item_bt = $('.recipe-con-item-bt');
    let recipe_con_count = $('.recipe-con-count .count-recipe');
    let recipe_con_count_bt = $('.recipe-con-count-bt');
    let recipe_con_buy_b = $('.recipe-con-buy > b');

    $.each(recipe_con_item_bt,function(index,item){
        $(this).click(function(){
            $(this).toggleClass('recipe-con-item-bt-active');
            카운트();
        });
    });
    function 카운트() {
        let total = 3;
        let minus = 0;

        // 전체금액 계산
        let total_money = 0;
        $.each(recipe_con_item_bt,function(index,item){
            let temp = $(this).hasClass('recipe-con-item-bt-active');
            if(temp == true) {
                minus = minus + 1;
            }
            // 전체 금액을 계산한다.
            let temp_money = $(this).attr('data-money');
            temp_money = parseInt(temp_money);
            if(temp == false) {
                total_money = total_money + temp_money;
            }
            

            
        });

        // 가격을 표시한다.
        total_money = total_money.toString().replace();
        recipe_con_buy_b.text(total_money);
        
        total = total - minus;
        recipe_con_count.text('전체 선택 ' + total + '개')

        if(total != 5) {
            recipe_con_count_bt.addClass('recipe-con-count-bt-active');
        }
    }
    카운트();

    recipe_con_count_bt.click(function(){
        $(this).click(function(){
            $(this).toggleClass('recipe-con-count-bt-active');
            let temp = $(this).hasClass('recipe-con-count-bt-active');
            if (temp == true) {
                해제();
            } else {
                모두();
            }
        });

        function 해제() {
            $.each(recipe_con_item_bt, function(index, item){        
                $(this).addClass('recipe-con-item-bt-active');
            });
            recipe_con_count.text('전체 선택 0개')
        }
    
        function 모두(){
            $.each(recipe_con_item_bt, function(index, item){        
                $(this).removeClass('recipe-con-item-bt-active');
            });
            recipe_con_count.text('전체 선택 5개')
        }
    });

    // allmap 기능 관련
    let sitemap = $('.sitemap');
    let sitemap_a = $('.sitemap > a');
    let allmap = $('.allmap');
    let allmap_close = $('.allmap-close');

    sitemap_a.click(function(event){
        event.preventDefault();
        allmap.stop().slideToggle();
        sitemap.toggleClass('sitemap-active');
    });

    allmap_close.click(function(){
        allmap.stop().slideUp();
        sitemap.removeClass('sitemap-active');
    });
});