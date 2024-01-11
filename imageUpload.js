let offsetX;
let offsetY;
let stickerCounter = 0;
let offLeft;
let offTop;

window.onload = function () {
    let container = document.getElementById('drop-area');
    let ctaDownload = document.getElementById('download-cta');
    let ctaShare = document.getElementById('facebookShare');
    offLeft = container.offsetLeft;
    offTop = container.offsetTop;
    let stickerAlbum = document.getElementById('sticker-album');
            for (var i = 1; i <= 40; i++) {
                const e = document.createElement('div');
                e.className = "sticker-box";
                e.innerHTML = '<img id="sticker' + i + '" src="images/stickers/sticker_' + i +'.png" draggable="true" ondragstart="drag(event)"/>';
                stickerAlbum.appendChild(e);
    }

    
    let imgInp = document.getElementById('imgInp');
    let trigger = document.getElementById('cta-trigger');

    trigger.onclick = function () {
        imgInp.click();
    }

    imgInp.onchange = evt => {
        const [file] = imgInp.files
        if (file) {
            emptyImage.src = URL.createObjectURL(file)
        }
    }

    ctaDownload.addEventListener("click", function () {
        convertDom('download');
    });

    ctaShare.addEventListener("click", function () {
        convertDom('share');
    });
}


function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function drag(ev) {
    const rect = ev.target.getBoundingClientRect();
    offsetX = ev.clientX - rect.x;
    offsetY = ev.clientY - rect.y;
    ev.dataTransfer.setData("text/html", ev.target.id);
}


function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text/html");
    let nodeCopy = document.getElementById(data).cloneNode(true);
    let container = document.getElementById('drop-area');
    let dropedImage = document.getElementById(data);
    let containerImage = document.getElementById('emptyImage');
    

    

    if (dropedImage.classList[0] === 'drag-sticker') {
        moveSticker(container, dropedImage, ev, containerImage);
    } else {
        if (ev.target === containerImage) {
            stickerCounter++;
            nodeCopy.id = "sticker-decoration-" + stickerCounter;
            nodeCopy.setAttribute("ondragstart", "changePosition(event)");
            nodeCopy.setAttribute("class", "drag-sticker");
            moveSticker(container, nodeCopy, ev, containerImage)
            
        }
    }
    
    

    

}

function changePosition(ev) {
    const rect = ev.target.getBoundingClientRect();
    offsetX = ev.clientX - rect.x;
    offsetY = ev.clientY - rect.y;
    ev.dataTransfer.setData("text/html", ev.target.id);
    
}

function moveSticker(container, sticker, ev, containerImage) {

    
    
    
    sticker.style.position = 'absolute';
    
    if (ev.target === containerImage) {
        sticker.style.left = ev.clientX - offLeft - offsetX + 'px';
        sticker.style.top = ev.clientY - offTop - offsetY + 'px';
        container.appendChild(sticker); 
    }
    
}

function convertDom(type) {
    
    let container = document.getElementById('drop-area');
    let hiddenCanvas = document.getElementById('hiddenCanvas');
    let canvas = document.getElementById("avatar-canvas"); 
    if (canvas === null) {
        html2canvas(container, { backgroundColor: null }
        ).then(canvas => {
            canvas.id = 'avatar-canvas';
            hiddenCanvas.appendChild(canvas);
        });
    } else {
        canvas.remove();
        html2canvas(container, { backgroundColor: null }
        ).then(canvas => {
            canvas.id = 'avatar-canvas';
            hiddenCanvas.appendChild(canvas);
        });
    }

    if (type === 'download') {
        setTimeout(downloadImage, 500);
    }

    if (type === 'share') {
        setTimeout(shareFaceImage, 500);
    }
    
    
    
}

function downloadImage() {
    let downloadLink = document.getElementById('download-image');
    let canvas = document.getElementById("avatar-canvas");
    let img = canvas.toDataURL("image/png");
    let ctaDownload = document.getElementById('download-cta');
    downloadLink.setAttribute('href', img);
    console.log(downloadLink);
    ctaDownload.addEventListener("click", function () {
        convertDom('download');
    }, { once: true });
    setTimeout(downloadLinkFunc, 100);
    
 
}


function shareFaceImage() {
    /*let downloadLink = document.getElementById('download-image');
    let canvas = document.getElementById("avatar-canvas");
    let img = canvas.toDataURL("image/png");
    
    downloadLink.setAttribute('href', img);
    setTimeout(facebookShare, 100);*/
    let canvas = document.getElementById("avatar-canvas");
    let url = "https://yuval.cgspark.co/imageUpload/";
    let img = canvas.toDataURL("image/png");
    canvas.toBlob(function (blob) {
        img = URL.createObjectURL(blob);
        console.log(blob);
        console.log(img); // this line should be here

        let totalurl = encodeURIComponent(url + '?img=' + img);
        document.querySelector('meta[property="og:image"]').setAttribute("content", img);
        console.log(totalurl);
        window.open('http://www.facebook.com/sharer.php?u=' + totalurl, '', 'width=500, height=500, scrollbars=yes, resizable=no');
    }, 'image/png');

    

}

function downloadLinkFunc() {
    let downloadLink = document.getElementById('download-image');
    downloadLink.click();
}

/*function facebookShare() {
    let shareLink = document.getElementById('facebook-share');
    shareLink.click();
}*/



