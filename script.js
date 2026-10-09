(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const boot = $('#boot');
  const bootNote = $('#bootNote');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => { if (bootNote) bootNote.textContent = 'WELCOME, PLAYER ONE.'; }, 600);
  window.addEventListener('load', () => setTimeout(() => boot?.classList.add('done'), prefersReduced ? 100 : 1150));
  $('#year').textContent = new Date().getFullYear();

  const menuToggle = $('#menuToggle'), navLinks = $('#navLinks');
  menuToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const aura = $('#cursorAura');
  if (aura && !prefersReduced && matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => { aura.style.left = e.clientX + 'px'; aura.style.top = e.clientY + 'px'; });
  }

  const toast = $('#toast'); let toastTimer;
  function notify(msg) { if (!toast) return; toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2500); }
  $('#copyEmail')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('sitesnow77@gmail.com'); $('#copyNote').textContent = 'EMAIL COPIED / READY TO SEND'; notify('EMAIL COPIED TO CLIPBOARD'); }
    catch { $('#copyNote').textContent = 'EMAIL: sitesnow77@gmail.com'; notify('EMAIL: sitesnow77@gmail.com'); }
  });
  document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', () => {
    const subject = encodeURIComponent('Project conversation: ' + link.dataset.project);
    const body = encodeURIComponent('Hi Blacksnow,\n\nI would like to talk about ' + link.dataset.project + '.\n\n');
    link.href = 'mailto:sitesnow77@gmail.com?subject=' + subject + '&body=' + body;
  }));

  // Reveal sections progressively, with all content still visible if JS/observer is unavailable.
  const revealTargets = document.querySelectorAll('.section-head,.profile-card,.detail-row,.project-card,.arsenal-item,.contact-grid');
  if ('IntersectionObserver' in window && !prefersReduced) {
    revealTargets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  }

  // Original low-poly anime-inspired 3D avatar built entirely from Three.js geometry.
  // A CSS-built visual remains in place when WebGL/CDN support is unavailable.
  const sceneHost = $('#scene');
  function buildFallback() {
    if (!sceneHost) return;
    sceneHost.innerHTML = '<div class="fallback-avatar"><div class="fallback-halo"></div><div class="fallback-hair"></div><div class="fallback-face"><i></i><i></i></div><div class="fallback-coat"></div><div class="fallback-caption">BLACKSNOW / AVATAR FILE 001</div></div>';
  }
  function initAvatar() {
    if (!sceneHost || !window.THREE) { buildFallback(); return; }
    try {
      const THREE = window.THREE;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(33, sceneHost.clientWidth / Math.max(sceneHost.clientHeight, 1), .1, 100);
      camera.position.set(0, 0.15, 7.8);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(sceneHost.clientWidth, sceneHost.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      sceneHost.innerHTML = ''; sceneHost.appendChild(renderer.domElement);
      const group = new THREE.Group(); scene.add(group);
      scene.add(new THREE.HemisphereLight(0xa7e9ff, 0x17142e, 2.0));
      const key = new THREE.DirectionalLight(0x9feaff, 3.2); key.position.set(-3, 4, 5); scene.add(key);
      const rim = new THREE.PointLight(0xff593d, 18, 12); rim.position.set(2.8, 1.4, -1.5); scene.add(rim);
      const blue = new THREE.PointLight(0x31bfff, 14, 10); blue.position.set(-2.5, 0, 1); scene.add(blue);
      const mat = (color, roughness=.62, metalness=.05) => new THREE.MeshStandardMaterial({color, roughness, metalness, flatShading:true});
      const dark = mat(0x121a2c,.75), coat = mat(0x202a43,.82), skin = mat(0xe6bca9,.72), hair = mat(0x111827,.45), orange = mat(0xff593d,.45,.2), cyan = mat(0x80e9ff,.28,.35), white = mat(0xf2f2f5,.45);
      function mesh(geo, material, x,y,z, sx=1,sy=1,sz=1, parent=group) { const m = new THREE.Mesh(geo, material); m.position.set(x,y,z); m.scale.set(sx,sy,sz); parent.add(m); return m; }
      // torso, angular jacket and collar
      mesh(new THREE.CylinderGeometry(.48,.72,1.45,5,1), coat, 0,-1.1,0,.96,1, .72);
      mesh(new THREE.ConeGeometry(.28,.75,4), dark,-.23,-.48,.27,.8,1,.45);
      mesh(new THREE.ConeGeometry(.28,.75,4), dark,.23,-.48,.27,.8,1,.45);
      mesh(new THREE.BoxGeometry(.08,.9,.06), orange,0,-1.12,.49);
      mesh(new THREE.BoxGeometry(.5,.12,.08), cyan,0,-1.47,.52,.5,1,1);
      // neck and head
      mesh(new THREE.CylinderGeometry(.17,.2,.35,6), skin,0,-.12,.02);
      mesh(new THREE.SphereGeometry(.58,8,7), skin,0,.62,.02, .82,1.05,.77);
      // hair cap, side locks and dramatic anime fringe
      mesh(new THREE.SphereGeometry(.61,8,6,0,Math.PI*2,0,Math.PI*.58), hair,0,.83,-.01,1.02,1.05,.92);
      mesh(new THREE.ConeGeometry(.25,.85,4), hair,-.43,.67,.25,.9,1.1,.65).rotation.z=-.18;
      mesh(new THREE.ConeGeometry(.22,.82,4), hair,.34,.66,.25,1,1,.65).rotation.z=.25;
      mesh(new THREE.ConeGeometry(.23,.58,4), hair,-.14,.82,.53,1.1,1,.48).rotation.z=-.18;
      mesh(new THREE.ConeGeometry(.2,.55,4), hair,.12,.87,.53,1.1,1,.48).rotation.z=.16;
      mesh(new THREE.ConeGeometry(.18,.42,4), hair,.32,.9,.47,1,1,.5).rotation.z=.34;
      // eyes and eyebrows
      mesh(new THREE.BoxGeometry(.22,.055,.045), dark,-.22,.61,.61,.9,1,1).rotation.z=-.08;
      mesh(new THREE.BoxGeometry(.22,.055,.045), dark,.22,.61,.61,.9,1,1).rotation.z=.08;
      mesh(new THREE.BoxGeometry(.15,.075,.045), cyan,-.22,.54,.64,.8,1,1);
      mesh(new THREE.BoxGeometry(.15,.075,.045), cyan,.22,.54,.64,.8,1,1);
      mesh(new THREE.BoxGeometry(.06,.07,.04), dark,0,.39,.64);
      // shoulders, sleeves, forearms
      const armL = new THREE.Group(); armL.position.set(-.52,-.65,0); group.add(armL);
      mesh(new THREE.ConeGeometry(.24,.95,5), dark,0,-.18,0,1,1,.9,armL).rotation.z=-.32;
      mesh(new THREE.CylinderGeometry(.12,.16,.58,5), skin,-.17,-.68,.08,.9,1,.9,armL).rotation.z=-.2;
      const armR = new THREE.Group(); armR.position.set(.52,-.65,0); group.add(armR);
      mesh(new THREE.ConeGeometry(.24,.95,5), dark,0,-.18,0,1,1,.9,armR).rotation.z=.32;
      mesh(new THREE.CylinderGeometry(.12,.16,.58,5), skin,.17,-.68,.08,.9,1,.9,armR).rotation.z=.2;
      // neck scarf and insignia
      mesh(new THREE.ConeGeometry(.16,.48,4), orange,.12,-.3,.42,.7,1,.4).rotation.z=-.25;
      mesh(new THREE.TorusGeometry(.76,.012,4,48), cyan,0,.62,-.12,1,1,.82).rotation.x=Math.PI/2.8;
      // floating shard accents
      const shards = [];
      for (let i=0;i<7;i++) {
        const shard = mesh(new THREE.OctahedronGeometry(.08 + (i%3)*.025,0), i%2 ? cyan : orange, (Math.random()-.5)*2.6, (Math.random()-.5)*3.5, -.25 + Math.random()*.4);
        shards.push({mesh:shard,phase:i*1.3,baseY:shard.position.y});
      }
      // orbit rings
      const ringMat = new THREE.MeshBasicMaterial({color:0x80e9ff,transparent:true,opacity:.34,side:THREE.DoubleSide});
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.55,.008,4,100),ringMat); ring1.rotation.set(.9,.15,-.25); ring1.position.y=-.1; group.add(ring1);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.85,.006,4,100),new THREE.MeshBasicMaterial({color:0xff593d,transparent:true,opacity:.42})); ring2.rotation.set(1.1,.7,.4); group.add(ring2);
      let mx=0,my=0,targetX=0,targetY=0; const pointerFine=matchMedia('(pointer:fine)').matches;
      if (pointerFine) sceneHost.addEventListener('pointermove', e=>{const r=sceneHost.getBoundingClientRect();targetY=((e.clientX-r.left)/r.width-.5)*.55;targetX=((e.clientY-r.top)/r.height-.5)*-.28;});
      sceneHost.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
      let raf=0; const clock=new THREE.Clock();
      function resize(){const w=sceneHost.clientWidth,h=sceneHost.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));}
      const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null; resizeObserver?.observe(sceneHost); window.addEventListener('resize',resize);
      function animate(){raf=requestAnimationFrame(animate);const t=clock.getElapsedTime();mx+=(targetX-mx)*.035;my+=(targetY-my)*.035;group.rotation.x=mx+Math.sin(t*.6)*.025;group.rotation.y=my+Math.sin(t*.42)*.08;group.position.y=Math.sin(t*1.15)*.065;ring1.rotation.z=t*.12;ring2.rotation.z=-t*.09;armL.rotation.z=Math.sin(t*.8)*.035;armR.rotation.z=-Math.sin(t*.8)*.035;shards.forEach(s=>{s.mesh.position.y=s.baseY+Math.sin(t*1.1+s.phase)*.09;s.mesh.rotation.x=t*.4+s.phase;s.mesh.rotation.y=t*.55;});renderer.render(scene,camera);}
      animate();
      document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);}else{cancelAnimationFrame(raf);animate();}});
    } catch(err) { console.warn('3D avatar unavailable; showing fallback.', err); buildFallback(); }
  }
  if ('requestAnimationFrame' in window) initAvatar(); else buildFallback();
})();
