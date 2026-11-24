/* 3D background: circuit board (PCB) jispar scroll karne se camera udta hai,
   aur beech mein ek IC chip ghoomti hai. Colours upar CONFIG mein hain. */
(function () {
  var CONFIG = {
    board: 0x0b3028,      // board ka hara colour
    background: 0x07231d, // page background / fog
    trace: 0xe3b95a,      // gold traces aur pulses
    chipBody: 0x10161a,   // chip ka body
    chipLabel: '#e3b95a', // chip par likha text
    chipText: 'JM',
    chipSub: '8051 · ESP8266 · RPi5'
  };

  if (!window.THREE) { document.body.classList.add('no-webgl'); return; }
  var canvas = document.getElementById('bg');
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); }
  catch (e) { document.body.classList.add('no-webgl'); return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(CONFIG.background);
  scene.fog = new THREE.Fog(CONFIG.background, 14, 58);
  var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  var sun = new THREE.DirectionalLight(0xfff1cf, 0.9);
  sun.position.set(4, 10, 6);
  scene.add(sun);

  /* seeded random, taaki har baar same board bane */
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  /* board */
  var board = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 240),
    new THREE.MeshStandardMaterial({ color: CONFIG.board, roughness: 0.85, metalness: 0.1 })
  );
  board.rotation.x = -Math.PI / 2;
  board.position.set(0, 0, -80);
  scene.add(board);

  /* traces */
  var Z_MIN = -150, Z_MAX = 20;
  var lines = [], polys = [];
  for (var i = 0; i < 190; i++) {
    var x = Math.round((rnd() * 70 - 35)), z = Math.round(Z_MIN + rnd() * (Z_MAX - Z_MIN));
    var pts = [new THREE.Vector3(x, 0.03, z)];
    var horizontal = rnd() > 0.5, segs = 3 + Math.floor(rnd() * 3);
    for (var s = 0; s < segs; s++) {
      var len = 2 + Math.floor(rnd() * 7), dir = rnd() > 0.5 ? 1 : -1;
      var last = pts[pts.length - 1].clone();
      if (horizontal) last.x += len * dir; else last.z += len * dir;
      pts.push(last);
      if (rnd() > 0.6) { // 45 degree bend
        var d = last.clone(); d.x += 1.5 * dir; d.z += 1.5; pts.push(d);
      }
      horizontal = !horizontal;
    }
    polys.push(pts);
    for (var k = 0; k < pts.length - 1; k++) lines.push(pts[k], pts[k + 1]);
  }
  var lineGeo = new THREE.BufferGeometry().setFromPoints(lines);
  scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: CONFIG.trace, transparent: true, opacity: 0.42 })));

  /* pads at trace ends */
  var padGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.05, 14);
  var padMat = new THREE.MeshStandardMaterial({ color: CONFIG.trace, metalness: 0.7, roughness: 0.35 });
  var pads = new THREE.InstancedMesh(padGeo, padMat, polys.length * 2);
  var m4 = new THREE.Matrix4();
  polys.forEach(function (p, idx) {
    m4.setPosition(p[0].x, 0.04, p[0].z); pads.setMatrixAt(idx * 2, m4);
    var e = p[p.length - 1]; m4.setPosition(e.x, 0.04, e.z); pads.setMatrixAt(idx * 2 + 1, m4);
  });
  scene.add(pads);

  /* pulses (signals) jo traces par daudte hain */
  function lengthsOf(p) {
    var acc = [0];
    for (var i = 1; i < p.length; i++) acc.push(acc[i - 1] + p[i].distanceTo(p[i - 1]));
    return acc;
  }
  var pulseGeo = new THREE.SphereGeometry(0.11, 10, 10);
  var pulseMat = new THREE.MeshBasicMaterial({ color: 0xfff0b8 });
  var pulses = [];
  for (var q = 0; q < 70; q++) {
    var poly = polys[Math.floor(rnd() * polys.length)];
    var mesh = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(mesh);
    var cum = lengthsOf(poly);
    pulses.push({ mesh: mesh, poly: poly, cum: cum, total: cum[cum.length - 1], t: rnd(), speed: 0.05 + rnd() * 0.07 });
  }
  function placePulse(p) {
    var d = p.t * p.total, i = 1;
    while (i < p.cum.length - 1 && p.cum[i] < d) i++;
    var a = p.poly[i - 1], b = p.poly[i];
    var f = (d - p.cum[i - 1]) / Math.max(0.0001, p.cum[i] - p.cum[i - 1]);
    p.mesh.position.lerpVectors(a, b, Math.min(1, Math.max(0, f)));
    p.mesh.position.y = 0.12;
  }
  pulses.forEach(placePulse);

  /* IC chips */
  var darkMat = new THREE.MeshStandardMaterial({ color: CONFIG.chipBody, roughness: 0.5, metalness: 0.3 });
  var pinMat = new THREE.MeshStandardMaterial({ color: 0xc9cdd1, metalness: 0.9, roughness: 0.3 });
  function labelTexture(main, sub) {
    var c = document.createElement('canvas'); c.width = 512; c.height = 512;
    var g = c.getContext('2d');
    g.fillStyle = '#10161a'; g.fillRect(0, 0, 512, 512);
    g.strokeStyle = 'rgba(227,185,90,.35)'; g.lineWidth = 4; g.strokeRect(14, 14, 484, 484);
    g.fillStyle = CONFIG.chipLabel; g.textAlign = 'center';
    g.font = '700 190px Chakra Petch, Arial, sans-serif'; g.fillText(main, 256, 292);
    if (sub) { g.font = '500 28px IBM Plex Mono, monospace'; g.fillText(sub, 256, 360); }
    g.beginPath(); g.arc(52, 52, 12, 0, Math.PI * 2); g.fillStyle = 'rgba(227,185,90,.8)'; g.fill();
    var t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  }
  function makeChip(w, d, h, pinsPerSide, tex) {
    var g = new THREE.Group();
    var body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), darkMat);
    g.add(body);
    if (tex) {
      var top = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.96, d * 0.96), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }));
      top.rotation.x = -Math.PI / 2; top.position.y = h / 2 + 0.003; g.add(top);
    }
    var pw = w / (pinsPerSide * 2 - 1), pg = new THREE.BoxGeometry(pw * 0.9, h * 0.25, h * 1.1);
    var pgS = new THREE.BoxGeometry(h * 1.1, h * 0.25, pw * 0.9);
    for (var i = 0; i < pinsPerSide; i++) {
      var off = -w / 2 + pw / 2 + i * pw * 2;
      var offz = -d / 2 + pw / 2 + i * (d / (pinsPerSide * 2 - 1)) * 2;
      [[off, -d / 2 - h * 0.45], [off, d / 2 + h * 0.45]].forEach(function (p) {
        var pin = new THREE.Mesh(pg, pinMat); pin.position.set(p[0], -h * 0.25, p[1]); g.add(pin);
      });
      [[-w / 2 - h * 0.45, offz], [w / 2 + h * 0.45, offz]].forEach(function (p) {
        var pin = new THREE.Mesh(pgS, pinMat); pin.position.set(p[0], -h * 0.25, p[1]); g.add(pin);
      });
    }
    return g;
  }

  for (var c = 0; c < 18; c++) {
    var sx = (rnd() > 0.5 ? 1 : -1) * (6 + rnd() * 22);
    var sz = Z_MIN + 10 + rnd() * (Z_MAX - Z_MIN - 20);
    var w = 1.6 + rnd() * 2.2;
    var chip = makeChip(w, w * (0.8 + rnd() * 0.4), 0.28, 5);
    chip.position.set(sx, 0.16, sz);
    chip.rotation.y = Math.floor(rnd() * 4) * Math.PI / 2;
    scene.add(chip);
  }

  /* hero chip: camera ke saath chalti hai */
  var hero = makeChip(3.2, 3.2, 0.5, 7, labelTexture(CONFIG.chipText, CONFIG.chipSub));
  scene.add(hero);
  var glow = new THREE.PointLight(CONFIG.trace, 1.2, 12);
  scene.add(glow);

  /* sizing */
  var aspect = 1;
  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* scroll + mouse */
  var target = 0, current = 0, mx = 0, my = 0;
  function readScroll() {
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    target = Math.min(1, Math.max(0, window.scrollY / max));
  }
  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('mousemove', function (e) {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  });
  readScroll();
  current = target;

  var clock = new THREE.Clock();
  function frame() {
    var dt = Math.min(0.05, clock.getDelta()), time = clock.elapsedTime;
    current += (target - current) * (reduce ? 1 : Math.min(1, dt * 5));

    var camZ = 9 - current * 100;
    camera.position.set(mx * 1.2, 5.6 - current * 1.2 - my * 0.6, camZ);
    camera.lookAt(0, 0, camZ - 9);

    var wide = aspect > 1.15;
    hero.position.set(wide ? 3.4 : 0, (wide ? 2.5 : 2.2) + (reduce ? 0 : Math.sin(time * 1.2) * 0.12), camZ - 8);
    hero.scale.setScalar(wide ? 1 : 0.7);
    hero.rotation.y = current * Math.PI * 10 + 0.5;
    hero.rotation.x = my * 0.35;
    hero.rotation.z = mx * -0.15;
    glow.position.set(hero.position.x, 3, hero.position.z);

    if (!reduce) pulses.forEach(function (p) {
      p.t += p.speed * dt * 0.6; if (p.t > 1) p.t = 0;
      placePulse(p);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
})();
