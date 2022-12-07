// mod img slides

var slideIndex = 1;

if (document.querySelector("#mod-img-slide")) {
    showSlides(slideIndex);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.querySelectorAll("#mod-img-slide");
    var dots = document.querySelectorAll("#mod-img-slide-preview");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" mod-img-row-active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " mod-img-row-active";

    return slides[slideIndex-1].src;
}

// mod img modal

function getCurrentSlideSrc() {
    var active = document.querySelector(".mod-img-row-active");
    return active.src;
}

function plusSlidesModal(n) {
    showSlides(slideIndex += n);
    modalImg.src = getCurrentSlideSrc();
}

// Get the modal
if (document.getElementById("mod-modal")) {
    var modal = document.getElementById("mod-modal");
    var modalClose = document.getElementById("mod-img-modal-close");
    var modalImg = document.getElementById("modal-img");
    modal.style.display = "none";

    var img = document.querySelectorAll("#mod-img-slide");
    for(var a = 0; a < img.length; a++) {
        img[a].addEventListener("click", function(el) {
            modal.style.display = "block";
            modalImg.src = getCurrentSlideSrc();
        }, false)
    }

    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }

    modalClose.onclick = function() { 
        modal.style.display = "none";
    }

    // Close modal if you click the void
    document.addEventListener('click', e => {
        // console.log(e.target);
        if (e.target.matches('#mod-modal') || e.target.matches('.mod-img-modal-content-container')) {
            modal.style.display = "none";
        }
    });

    // Allow to view img modal with
    document.addEventListener('keyup', e => {
        // console.log(e.key);
        if (modal.style.display != 'none') {
            switch (e.key) {
                case 'ArrowRight':
                    plusSlidesModal(1);
                    break;

                case 'ArrowLeft':
                    plusSlidesModal(-1);
                    break;

                case 'Escape':
                    modal.style.display = "none";
                    break;

                default:
                    break;
            }
        }
    });
};

// Change upload img preview in account settings
var pfpUploadInput = document.getElementById("account-pfp-upload");
var pfpUploadPreview = document.getElementById("account-pfp-upload-preview");

pfpUploadInput.onchange = e => {
    const [file] = pfpUploadInput.files
    if (file) {
        pfpUploadPreview.src = URL.createObjectURL(file)
    }
}