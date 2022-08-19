$(document).ready(function() {
    setTimeout(()=>{$("#loading").addClass("hide");}, 1000);
    $(".name").removeClass("hide");
    $(".toggler").click(()=> {
        $("#nav").toggleClass("visible");
    })
})