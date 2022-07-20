document.addEventListener("DOMContentLoaded", function(){
    var myOffcanvas = document.getElementById('offcanvasExample');
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    document.getElementById("OpenMenu").addEventListener('click',function (e){
      e.preventDefault();
      e.stopPropagation();
      bsOffcanvas.toggle();
    });
  });