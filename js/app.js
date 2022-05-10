window.onload = () => {
  let slideIndex = 1;
  showSlides(slideIndex);
  document.getElementById('prev').onclick = function() {
    plusSlides(-1)
    var hidePrev = document.querySelector('#prev');
    if (slideIndex == 1) {
      hidePrev.style.display = 'none';
    }
    else {
      hidePrev.style.display = '';
      hideNext.style.display = '';
    }
  };
  document.getElementById('next').onclick = function() {
    plusSlides(1)
    var hideNext = document.querySelector('#next');
    if (slideIndex == 4) {
      hideNext.style.display = 'none';
    }
    else {
      hidePrev.style.display = '';
      hideNext.style.display = '';
    }
  };
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
      plusSlides(-1);
    }
    else if (e.keyCode == '39') {
      plusSlides(1);
    }
  }

  // Next/previous controls
  let plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
  }
};
