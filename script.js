// Insert current year
document.getElementById('year').textContent = new Date().getFullYear();

/*/ Auto-play videos on hover for better UX (muted required for autoplay in many browsers)
document.querySelectorAll('.project-card').forEach(card=>{
    const vid = card.querySelector('video');
    card.addEventListener('mouseenter', ()=>{ if(vid) vid.play() });
    card.addEventListener('mouseleave', ()=>{ if(vid) {vid.pause(); vid.currentTime = 0} });
});*/

function openProject(id) {
  const page = document.getElementById(id);
  if (!page) return;
  page.style.display = "flex";
  page.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeAllProjects() {
  document.querySelectorAll(".project-page").forEach(p => {
    p.style.display = "none";
    p.setAttribute("aria-hidden", "true");
  });
  document.body.style.overflow = "";
  history.pushState("", document.title, window.location.pathname);
}

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", e => {
    e.preventDefault();
    const id = "project-" + card.dataset.id;
    closeAllProjects();
    location.hash = id;
    openProject(id);
  });
});

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", closeAllProjects);
});

const hash = location.hash.replace("#", "");
if (hash.startsWith("project-")) {
  closeAllProjects();
  openProject(hash);
}
else {
  closeAllProjects();
  document.getElementById(hash).scrollIntoView({ behavior: "smooth" });
}

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
