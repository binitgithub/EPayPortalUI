$(document).ready(function () {
    // toggle sidebar when button clicked
    $('#toggle-menu').click(function () {
        //$('.menu').toggle();
        $('.menu').toggleClass('open');
    });

    // auto-expand submenu if an item is active
    var active = $('.menu .active');

    if (active.length && active.parent('.collapse').length) {
        var parent = active.parent('.collapse');

        parent.prev('a').attr('aria-expanded', true);
        parent.addClass('show');
    }
});

$(document).mouseup(function(e) 
{
    var container = $(".menu");
    //if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && e.target.id != "toggle-menu") 
    {
       //container.hide();
       container.removeClass('open');
    }
});