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
    location.hash = id;
    closeAllProjects();
    openProject(id);
});
});

document.querySelectorAll("[data-close]").forEach(btn => {
btn.addEventListener("click", closeAllProjects);
});

if (location.hash) {
openProject(location.hash.replace("#", ""));
}

const video = document.getElementById("project-video");
const observer = new IntersectionObserver(
(entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        video.currentTime = 0; // restart from beginning
        video.play();
    } else {
        video.pause();
    }
    });
},
{
    threshold: 0.1 // % of video must be visible
}
);
observer.observe(video);