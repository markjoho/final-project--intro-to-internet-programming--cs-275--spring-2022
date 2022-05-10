window.onload = () => {
  let slideIndex = 1;
  showSlides(slideIndex);
  document.getElementById('prev').style.display = 'none';
  document.getElementById('prev').onclick = function() {
    plusSlides(-1)
    document.getElementById('next').style.display = '';
    if (slideIndex == 1) {
      document.getElementById('prev').style.display = 'none';
    }
  };
  document.getElementById('next').onclick = function() {
    plusSlides(1)
    document.getElementById('prev').style.display = '';
    if (slideIndex == 4) {
      document.getElementById('next').style.display = 'none';
    }
  };
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
      if (slideIndex != 1) {
        plusSlides(-1);
      }
      else if (slideIndex == 1) {
      }
      document.getElementById('next').style.display = '';
      if (slideIndex == 1) {
        document.getElementById('prev').style.display = 'none';
      }
    }
    else if (e.keyCode == '39') {
      if (slideIndex != 4) {
        plusSlides(1);
      }
      else if (slideIndex == 4) {
      }
      document.getElementById('prev').style.display = '';
      if (slideIndex == 4) {
        document.getElementById('next').style.display = 'none';
      }
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
