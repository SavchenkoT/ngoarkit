$(function () {
    $(".dropdown").hover(
        function () {
            $('.dropdown-select', this).stop(true, true).fadeIn("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");
        },
        function () {
            $('.dropdown-select', this).stop(true, true).fadeOut("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");
        });
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // delay: {
    //   "show": 100,
    //   "hide": 100
    // }
})

/*
var btn = document.querySelector(".navbar-toggle");
btn.addEventListener("click", function () {
    console.log("f");
    if (btn.classList.contains("collapsed")) {
        body.style.overflow = "scroll";
    }
    else {
        body.style.overflow = "hidden";
    }

})*/
