(function () {
  "use strict";

  var active = null;
  var mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  function isStarscapeDark() {
    return document.documentElement.getAttribute("data-theme") === "starscape-dark";
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function pickStarColor() {
    var colors = [
      [229, 237, 255],
      [168, 192, 255],
      [192, 132, 252],
      [56, 209, 235],
      [255, 222, 186]
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function mount() {
    if (active || !isStarscapeDark()) return;

    var grain = document.createElement("div");
    grain.className = "starscape-grain";
    grain.setAttribute("aria-hidden", "true");

    var milky = document.createElement("div");
    milky.className = "starscape-milky-way";
    grain.appendChild(milky);

    var canvas = document.createElement("canvas");
    canvas.className = "starscape-canvas";
    grain.appendChild(canvas);

    for (var i = 0; i < 7; i += 1) {
      var star = document.createElement("span");
      star.className = "starscape-signature-star";
      star.style.left = random(8, 92).toFixed(2) + "vw";
      star.style.top = random(7, 82).toFixed(2) + "vh";
      star.style.animationDelay = random(-8, 0).toFixed(2) + "s";
      star.style.setProperty("--starscape-star-size", random(2.5, 4.8).toFixed(2) + "px");
      grain.appendChild(star);
    }

    document.body.insertBefore(grain, document.body.firstChild);

    var ctx = canvas.getContext("2d");
    var raf = 0;
    var meteorTimer = 0;
    var width = 0;
    var height = 0;
    var stars = [];
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildStars() {
      var density = Math.max(0.6, (width * height) / (1440 * 900));
      var count = Math.round(300 * density);
      stars = [];
      for (var i = 0; i < count; i += 1) {
        var layer = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: layer > 0.88 ? random(1.8, 3.6) : random(0.8, 1.7),
          depth: layer > 0.7 ? 0.58 : layer > 0.35 ? 0.3 : 0.12,
          rgb: pickStarColor(),
          period: random(2.2, 7.6),
          phase: random(0, Math.PI * 2),
          alpha: random(0.38, 0.78)
        });
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function frame(time) {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      for (var i = 0; i < stars.length; i += 1) {
        var star = stars[i];
        var pulse = 0.5 + 0.5 * Math.sin((time / 1000) * ((Math.PI * 2) / star.period) + star.phase);
        var alpha = star.alpha * (0.7 + pulse * 0.3);
        var px = star.x - mouse.x * star.depth * 70;
        var py = star.y - mouse.y * star.depth * 70;
        var rgb = star.rgb;

        if (star.size > 2) {
          var radius = star.size * 2.3;
          var grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
          grad.addColorStop(0, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")");
          grad.addColorStop(0.36, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha * 0.28 + ")");
          grad.addColorStop(1, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
        ctx.fillRect(px - star.size / 2, py - star.size / 2, star.size, star.size);
      }

      ctx.globalCompositeOperation = "source-over";
      raf = window.requestAnimationFrame(frame);
    }

    function onMouseMove(event) {
      mouse.tx = (event.clientX / Math.max(1, width) - 0.5) * 2;
      mouse.ty = (event.clientY / Math.max(1, height) - 0.5) * 2;
    }

    function spawnMeteor() {
      if (!active || mediaReduced.matches || !isStarscapeDark()) return;
      var meteor = document.createElement("span");
      meteor.className = "starscape-meteor";
      meteor.style.left = random(8, 82).toFixed(2) + "vw";
      meteor.style.top = random(4, 42).toFixed(2) + "vh";
      grain.appendChild(meteor);
      window.setTimeout(function () {
        meteor.remove();
      }, 1700);
      meteorTimer = window.setTimeout(spawnMeteor, random(14000, 42000));
    }

    function destroy() {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(meteorTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      grain.remove();
      active = null;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    if (!mediaReduced.matches) {
      raf = window.requestAnimationFrame(frame);
      meteorTimer = window.setTimeout(spawnMeteor, random(4000, 12000));
    } else {
      frame(0);
      window.cancelAnimationFrame(raf);
    }

    active = { destroy: destroy };
  }

  function sync() {
    if (isStarscapeDark()) {
      mount();
    } else if (active) {
      active.destroy();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sync, { once: true });
  } else {
    sync();
  }

  new MutationObserver(sync).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  if (mediaReduced.addEventListener) {
    mediaReduced.addEventListener("change", function () {
      if (active) active.destroy();
      sync();
    });
  }
})();

