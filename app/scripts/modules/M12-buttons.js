(function(){var btn=document.querySelector('.wrapper-select_default');
var select=document.querySelector('.wrapper-select_list');
var wrapper=document.querySelector('.wrapper-select');
wrapper.addEventListener('click',choose);
wrapper.addEventListener('click',show);

var choosen;
function choose(event){
 var target=event.target;
if(target.closest('.wrapper-select_item')){
  if(choosen)choosen.classList.remove('choosen');
    btn.innerHTML=target.innerText;
    target.classList.add('choosen');
    select.classList.remove('active');
    choosen=target;
}
};


function show(event){
  var target=event.target;
  if(target.closest('.wrapper-select_default')){
     select.classList.toggle('active');
     }
};
})();
