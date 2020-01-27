$(document).ready(function(){
    var pAccord = document.getElementById('premiumAccordion');
    if (pAccord != null ? true : false) {
        var titleAccord = pAccord.querySelectorAll('.premium-form__accordion-item-title');
        for (var i = 0; i < titleAccord.length; i++) {
            titleAccord[i].addEventListener('click', function () {
                if (this.parentNode.classList.contains('premium-form__accordion-item_active')){
                    this.parentNode.classList.remove('premium-form__accordion-item_active');
                } else {
                    var titleAccordActive = pAccord.querySelectorAll('.premium-form__accordion-item_active');
                    for (var k = 0; k < titleAccordActive.length; k++) {
                        titleAccordActive[k].classList.remove('premium-form__accordion-item_active');
                    }
                    this.parentNode.classList.add('premium-form__accordion-item_active');
                }
            });
        }
    }

    var tab = $('.premium-form__tabs');
    var tabItem = tab.find('.premium-form__tabs-item');
    var tabPane = $('.premium-form__tab-pane');
    var tabCurrent;

    tab.on('click', '.premium-form__tabs-item', function () {
        tabItem.removeClass('premium-form__tabs-item_active');
        tabPane.removeClass('premium-form__tab-pane_active');
        $(this).addClass('premium-form__tabs-item_active');
        tabCurrent = $(this).data('value');
        tabPane.filter(function () {
            return $(this).data('content') == tabCurrent;
        }).addClass('premium-form__tab-pane_active');
    })
});