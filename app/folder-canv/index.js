window.onload =
    function(){
        console.log('loaded');
        let folderCanvas = document.getElementById("folderCanvas");
        let ctx = folderCanvas.getContext('2d');
        
        ctx.fillStyle = '#e14b17';
        ctx.strokeStyle="black";
        
        ctx.beginPath();
            ctx.moveTo(7,20);
            ctx.lineTo(98,20);
            ctx.lineTo(95,75);
            ctx.lineTo(10,75); 
        ctx.closePath()
        ctx.stroke();
        ctx.fill();

        var grd = ctx.createRadialGradient(15, 15, 5, 15, 15, 70);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "#e14b17");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(30, 30, 20, 20);
    }