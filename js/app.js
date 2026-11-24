/* Content ko page par lagata hai (data.js se). Normally isse edit karne ki zaroorat nahi. */
(function () {
  var D = window.PORTFOLIO;
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  document.title = D.name;
  $('name').textContent = D.name;
  $('eyebrow').textContent = D.eyebrow;
  $('tagline').textContent = D.tagline;
  $('photo').src = D.photo;

  D.facts.forEach(function (f) {
    $('facts').appendChild(el('dt', null, f[0]));
    $('facts').appendChild(el('dd', null, f[1]));
  });

  D.about.forEach(function (t) { $('about-body').appendChild(el('p', null, t)); });

  D.skills.forEach(function (s) {
    var card = el('div', 'skill-card panel tilt');
    card.appendChild(el('h3', null, s.group));
    var ul = el('ul', 'chips');
    s.items.forEach(function (i) { ul.appendChild(el('li', null, i)); });
    card.appendChild(ul);
    $('skills-body').appendChild(card);
  });

  D.experience.forEach(function (j) {
    var li = el('li', 'job panel tilt');
    li.appendChild(el('div', 'when', j.when));
    var right = el('div');
    right.appendChild(el('h3', null, j.title));
    right.appendChild(el('p', 'org', j.org));
    var ul = el('ul');
    j.points.forEach(function (p) { ul.appendChild(el('li', null, p)); });
    right.appendChild(ul);
    li.appendChild(right);
    $('exp-body').appendChild(li);
  });

  D.projects.forEach(function (p) {
    var li = el('li', 'project panel tilt');
    li.appendChild(el('h3', null, p.title));
    li.appendChild(el('p', null, p.text));
    li.appendChild(el('div', 'tags', p.tags.join(' · ')));
    $('proj-body').appendChild(li);
  });

  function list(title, rows) {
    var wrap = el('div');
    wrap.appendChild(el('h3', null, title));
    var ul = el('ul', 'rows');
    rows.forEach(function (r) {
      var li = el('li');
      li.appendChild(el('span', null, r[0]));
      li.appendChild(el('span', 'meta', r[1]));
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    return wrap;
  }
  var edu = $('edu-body');
  edu.appendChild(list('Degrees', D.degrees));
  edu.appendChild(list('Courses', D.courses));
  var out = el('div');
  out.appendChild(el('h3', null, 'Outside work'));
  out.appendChild(el('p', null, D.outsideWork));
  edu.appendChild(out);

  function contactRow(label, value, href) {
    var li = el('li');
    li.appendChild(el('span', 'k', label));
    var v = el('span', 'v');
    if (href) { var a = el('a', null, value); a.href = href; a.target = '_blank'; a.rel = 'noopener'; v.appendChild(a); }
    else v.textContent = value;
    li.appendChild(v);
    var b = el('button', 'copy', 'Copy');
    b.type = 'button';
    b.addEventListener('click', function () {
      var done = 'Copied';
      var fallback = function () {
        try {
          var r = document.createRange(); r.selectNodeContents(v);
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
          done = 'Selected';
        } catch (e) { done = 'Copy manually'; }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).catch(fallback).then(function () { b.textContent = done; });
      } else { fallback(); b.textContent = done; }
      setTimeout(function () { b.textContent = 'Copy'; }, 1800);
    });
    li.appendChild(b);
    $('contact-body').appendChild(li);
  }
  var c = D.contact;
  contactRow('Email', c.email);
  contactRow('Phone', c.phone);
  if (c.linkedin) contactRow('LinkedIn', c.linkedin, c.linkedin);
  if (c.github) contactRow('GitHub', c.github, c.github);

  /* 3D tilt on cards and photo */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add('live');
        card.style.transform = 'perspective(900px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateZ(6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('live');
        card.style.transform = '';
      });
    });
  }
})();
