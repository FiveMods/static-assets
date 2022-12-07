$('.account-mod-menu-element').on("click", function (evt) {
    if ($(this).hasClass('active')) return;
$('.account-mod-menu-element').on("click", function(evt) {
    if($(this).hasClass('active')) return;

    var activePage = $('.account-mod-menu-element.active')
    var btn = $(this)

    btn.addClass("active")
    activePage.removeClass("active")


    $('.upload-card[data-id="js-' + activePage.prop("id") + '"').fadeOut()
    setTimeout(() => {
        $('.upload-card[data-id="js-' + btn.prop("id") + '"').fadeIn()
    }, 400);
})