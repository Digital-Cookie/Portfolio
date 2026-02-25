document.getElementById('year').textContent = new Date().getFullYear();

const userLang = navigator.language || navigator.userLanguage;

if (userLang && userLang.startsWith("ko")) {
  document.getElementById("header-name").textContent = "도 휘";
}

let scrollPosition = 0;
let openedViaClick = false;

document.querySelectorAll('.project-card').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const id = this.getAttribute('href');
    const popup = document.querySelector(id);

    scrollPosition = window.scrollY;
    openedViaClick = true;

    popup.classList.add('active');

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    history.pushState({popup: id}, '', id);
  });
});

function closePopup() {
  document.querySelectorAll('.project-page').forEach(p => p.classList.remove('active'));

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  window.scrollTo(0, scrollPosition);
}

document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (openedViaClick) {
      history.back();
    } else {
      history.replaceState({}, '', window.location.pathname);
      closePopup();
    }
  });
});

window.addEventListener('popstate', function(e) {
  closePopup();
});

window.addEventListener('load', function() {
  if (location.hash) {
    const popup = document.querySelector(location.hash);
    if (popup) {
      scrollPosition = window.scrollY;
      popup.classList.add('active');

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';

      openedViaClick = false;
    }
  }
});

const videos = document.querySelectorAll(".project-video");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
  },
  {
    threshold: 0.1
  }
);
videos.forEach(video => observer.observe(video));
