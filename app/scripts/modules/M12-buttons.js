(function () {
    var wrappers = document.querySelectorAll('.wrapper-select');
    var choosen;
    wrappers.forEach(function (wrapper) {
        wrapper.addEventListener('click', show);
    });
    function show(event) {
        console.log('hello');
        var select=this.querySelector('.wrapper-select_list');
        if(choosen && choosen!=select)choosen.classList.remove('active');
        select.classList.toggle('active');
        choosen=select;
    };
})();
