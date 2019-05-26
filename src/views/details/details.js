window.onscroll = function () {
    let bar = document.querySelector(".bar");
    if (window.scrollY >35)
        bar.style.marginTop = "0"
    else {
        bar.style.marginTop = "35px"
    }
}