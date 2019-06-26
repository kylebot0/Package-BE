let divList = document.querySelectorAll(".body-zoeken main section > div");
const searchContainer = document.querySelector(".search-container");
const loadingAnm = document.querySelector(".lds-ring");

divList.forEach(function (div) {
    div.addEventListener("click", function(){
        div.classList.toggle("show");
    });
});

window.onload = () => {
    console.log(loadingAnm)
    if(loadingAnm == null){
        return;
    } else {
        loadingAnm.classList.toggle('show')
        setTimeout(() => {
            loadingAnm.classList.add("hide");
        }, 2000);
        setTimeout(() => {
            loadingAnm.classList.remove("hide");
            loadingAnm.classList.remove("show");
        }, 3000);
        setTimeout(() => {
            searchContainer.classList.add('show');
        }, 4000);
        
    }
};
