
alert("Page is not completed yet. Lol")

$(document).ready(function() {
    setTimeout(()=>{$("#loading").addClass("hide");}, 4000)
    $(".name").removeClass("hide")
})