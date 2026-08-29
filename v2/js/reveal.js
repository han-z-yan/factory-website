(function(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, {threshold: 0.15});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
})();
