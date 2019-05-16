let divList = document.querySelectorAll("main section > div");

divList.forEach(function (div) {
    div.addEventListener("click", function(){
        div.classList.toggle("show");
    });
});
