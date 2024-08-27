function toggleNav(){
    var sidebar = document.getElementById("sidebar");
    var content = document.getElementById("content");
    var openBtn = document.getElementById(".openbtn");

    if(sidebar.style.width == "200px"){
        sidebar.style.width = "0";
        content.style.marginLeft = "0";  
        openBtn.style.display = 'block';    
    }else{
        sidebar.style.width = "200px";
        content.style.marginLeft = "200px";
        openBtn.style.display = 'none';     
    }
}