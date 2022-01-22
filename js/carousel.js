const imagePx = 700, imageM = 5; 

function carousel() {
 
    var list = document.querySelector(".carousel-list")
    list.style.left = '0px';
    
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
 
    function animate(offset){
          
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        list.style.transition = '300ms ease';   
   
         
        if(newLeft <= -imagePx*imageM){
            list.style.left = 0 +'px';
        }
      
        if(newLeft > 0){
            list.style.left = -(imagePx*(imageM-1)) +'px';
        }
        
    }

    prev.onclick = function() {
        animate(imagePx);
    }

    next.onclick = function() {
        animate(-imagePx);
    }

 
    {
        var timer;

        function autoPlay() {
            timer = setInterval(function(){
                next.onclick()
            }, 2000);
        }
    
        function stopPlay() {
            clearInterval(timer);
        }
        autoPlay();
        
        var container = document.querySelector('.middle-show-carousel');
        
    
        container.onmouseover = stopPlay;
        container.onmouseout = autoPlay;
    }
    

  
    var buttons = document.querySelector('.carousel-buttons').getElementsByTagName('span');
    var index = 1;
    function showButton() {
        
        for(let i = 0; i<buttons.length; i++){
            if(buttons[i].className == 'on'){
                buttons[i].className = '';
            }
        }
        buttons[index-1].className = 'on';
    }

    prev.onclick = function() {
        index -= 1;
        if(index < 1){
            index = imageM;
        }
        showButton();
        animate(imagePx);
    }

    next.onclick = function() {
        index += 1;
        if(index > imageM){
            index = 1;
        }
        showButton();
        animate(-imagePx);
    }
    
 
    for(var i=0; i<buttons.length; i++){
        buttons[i].onclick = function(){
            var clickIndex = parseInt(this.getAttribute('index'));
            var offset = imagePx*(index - clickIndex);
            animate(offset);
            index = clickIndex;
            showButton();
        }
    }
}

carousel()