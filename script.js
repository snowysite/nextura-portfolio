const $ = (s) => document.querySelector(s);
const boot = $("#boot");
const bootStatus = $("#bootStatus");
const statusMessages = ["LOADING INTERFACE MODULES...", "CALIBRATING AVATAR CORE...", "SYSTEM READY."];
let statusIndex = 0;
const statusTimer = setInterval(() => { statusIndex++; if (statusIndex < statusMessages.length) bootStatus.textContent = statusMessages[statusIndex]; }, 440);
window.addEventListener("load", () => setTimeout(() => { clearInterval(statusTimer); boot.classList.add("done"); }, 1450));
$("#year").textContent = new Date().getFullYear();
function updateClock(){ $("#clock").textContent = new Date().toLocaleTimeString("en-GB",{hour12:false}); }
updateClock(); setInterval(updateClock,1000);

// Reveal content as it enters the viewport.
const revealTargets = document.querySelectorAll(".section-heading,.profile-grid,.project-card,.skill-row,.contact-inner");
revealTargets.forEach(el => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }),{threshold:.12});
  revealTargets.forEach(el => observer.observe(el));
} else revealTargets.forEach(el => el.classList.add("visible"));

// Small optional synth sound: no audio is played unless the visitor opts in.
let soundOn = false, audioCtx;
$("#soundToggle").addEventListener("click", () => {
  soundOn = !soundOn;
  $("#soundToggle").setAttribute("aria-pressed", String(soundOn));
  $("#soundText").textContent = soundOn ? "SOUND ON" : "SOUND OFF";
  if(soundOn){
    try { audioCtx ||= new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    playTone(440,.045);
  }
});
function playTone(freq,duration){
  if(!soundOn || !audioCtx) return;
  const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.type="sine"; osc.frequency.value=freq; gain.gain.setValueAtTime(.025,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+duration);
  osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime+duration);
}
document.querySelectorAll("a,button").forEach(el => el.addEventListener("mouseenter",()=>playTone(660,.025)));

// Contact shortcuts are deliberately editable placeholders, not fabricated personal links.
const toast = $("#toast");
let toastTimeout;
function showToast(message){ toast.textContent=message; toast.classList.add("show"); clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>toast.classList.remove("show"),2500); }
$("#copyEmail").addEventListener("click", async () => {
  const email="hello@nextura.dev";
  try { await navigator.clipboard.writeText(email); $("#copyNote").textContent="EMAIL COPIED TO CLIPBOARD"; showToast("EMAIL COPIED"); }
  catch(e){ $("#copyNote").textContent="EDIT EMAIL IN index.html BEFORE PUBLISHING"; showToast("Set your real email before launch"); }
});
document.querySelectorAll("[data-project]").forEach(link => link.addEventListener("click",()=> {
  const subject=encodeURIComponent("Project conversation: "+link.dataset.project);
  const mailLink=document.querySelector('.contact-actions .primary-btn');
  mailLink.href="mailto:hello@nextura.dev?subject="+subject;
}));

// Three.js scene, loaded from a CDN. A graceful CSS fallback remains if the CDN is unavailable.
const sceneHost=$("#scene");
const fallback=sceneHost.querySelector(".scene-fallback");
try {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, sceneHost.clientWidth/sceneHost.clientHeight, .1, 100);
  camera.position.set(0,0,7.5);
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,2));
  renderer.setSize(sceneHost.clientWidth,sceneHost.clientHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  sceneHost.appendChild(renderer.domElement);
  if(fallback) fallback.style.display="none";
  scene.add(new THREE.AmbientLight(0xffffff,1.35));
  const keyLight=new THREE.PointLight(0xff4b1f,42,15); keyLight.position.set(2,2,3); scene.add(keyLight);
  const rimLight=new THREE.PointLight(0x777dff,22,14); rimLight.position.set(-3,1,-2); scene.add(rimLight);
  const frontLight=new THREE.DirectionalLight(0xffffff,2.0); frontLight.position.set(0,3,5); scene.add(frontLight);
  const avatar=new THREE.Group(); scene.add(avatar);
  const darkMat=new THREE.MeshStandardMaterial({color:0x171719,metalness:.82,roughness:.26});
  const faceMat=new THREE.MeshStandardMaterial({color:0x252326,metalness:.7,roughness:.3});
  const accentMat=new THREE.MeshStandardMaterial({color:0xff4b1f,emissive:0x8f1c08,emissiveIntensity:1.1,metalness:.5,roughness:.25});
  const glowMat=new THREE.MeshBasicMaterial({color:0xff5a30});
  function mesh(geometry,material,pos,scale){const m=new THREE.Mesh(geometry,material);m.position.set(...pos);if(scale)m.scale.set(...scale);avatar.add(m);return m;}
  // Original geometric android bust assembled from primitive geometry.
  mesh(new THREE.IcosahedronGeometry(.88,1),darkMat,[0,.45,0],[.82,1.05,.72]);
  mesh(new THREE.SphereGeometry(.69,32,24),faceMat,[0,.48,.18],[.83,1.03,.76]);
  mesh(new THREE.CylinderGeometry(.26,.34,.3,8),darkMat,[0,-.54,0]);
  mesh(new THREE.CylinderGeometry(.55,.83,.65,8,1),darkMat,[0,-1.13,0],[1.35,1,.72]);
  mesh(new THREE.TorusGeometry(.77,.022,8,64),accentMat,[0,.4,.22],[1,.98,.9]).rotation.x=.1;
  // Angular visor and glowing eyes.
  mesh(new THREE.BoxGeometry(1.05,.16,.16),darkMat,[0,.65,.78]);
  mesh(new THREE.BoxGeometry(.34,.045,.055),glowMat,[-.28,.65,.88]);
  mesh(new THREE.BoxGeometry(.34,.045,.055),glowMat,[.28,.65,.88]);
  mesh(new THREE.ConeGeometry(.13,.3,4),accentMat,[0,.36,.89],[1,1,.5]);
  // Side plates, temples and collar details.
  [-1,1].forEach(side=>{
    mesh(new THREE.OctahedronGeometry(.22,0),accentMat,[side*.72,.4,.12],[.7,1.15,.8]);
    mesh(new THREE.BoxGeometry(.12,.55,.13),darkMat,[side*.47,-.95,.47]);
    mesh(new THREE.SphereGeometry(.055,12,8),glowMat,[side*.47,-.93,.56]);
  });
  const ringMat=new THREE.MeshBasicMaterial({color:0xff4b1f,transparent:true,opacity:.75});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.42,.008,6,100),ringMat);ring.rotation.x=1.18;ring.rotation.y=-.28;ring.position.y=-.15;avatar.add(ring);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.72,.006,6,100),new THREE.MeshBasicMaterial({color:0x777dff,transparent:true,opacity:.55}));ring2.rotation.x=1.42;ring2.rotation.y=.4;ring2.position.y=-.2;avatar.add(ring2);
  const particles=new THREE.Group();scene.add(particles);
  for(let i=0;i<90;i++){const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute([(Math.random()-.5)*5,(Math.random()-.5)*5,(Math.random()-.5)*2],3));const p=new THREE.Points(g,new THREE.PointsMaterial({color:i%4===0?0xff4b1f:0x777780,size:.018,transparent:true,opacity:.7}));particles.add(p);}
  let pointerX=0,pointerY=0,targetX=0,targetY=0;
  sceneHost.addEventListener("pointermove",e=>{const r=sceneHost.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;targetY=pointerX*.65;targetX=-pointerY*.25;});
  sceneHost.addEventListener("pointerleave",()=>{targetX=0;targetY=0;});
  const clock=new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t=clock.getElapsedTime();
    avatar.rotation.y += (targetY+Math.sin(t*.45)*.08-avatar.rotation.y)*.035;
    avatar.rotation.x += (targetX+Math.sin(t*.6)*.025-avatar.rotation.x)*.035;
    avatar.position.y=Math.sin(t*.8)*.06;
    ring.rotation.z=t*.13;ring2.rotation.z=-t*.1;
    particles.rotation.y=t*.025;
    renderer.render(scene,camera);
  }
  animate();
  const resizeObserver=new ResizeObserver(()=>{
    const w=sceneHost.clientWidth,h=sceneHost.clientHeight;
    if(w&&h){camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}
  });
  resizeObserver.observe(sceneHost);
} catch(error) {
  console.warn("Three.js could not load; displaying the built-in avatar fallback.",error);
  if(fallback) fallback.style.display="grid";
}
