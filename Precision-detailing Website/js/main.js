/* ============================================================
   PRECISION DETAILING
   Small vanilla JS file. No libraries, no build step.

   What it does:
     1. Mobile menu open and close
     2. Header shadow once you scroll
     3. "Book This" buttons preselect the service in the form
     4. Fade-in on scroll
     5. Gallery lightbox
     6. Footer year
     7. Date field cannot be set in the past
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. MOBILE MENU
     ---------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  function closeNav() {
    if (!siteNav) return;
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the menu after tapping any link inside it
    siteNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }


  /* ----------------------------------------------------------
     2. HEADER SHADOW ON SCROLL
     ---------------------------------------------------------- */
  var header = document.getElementById("siteHeader");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  /* ----------------------------------------------------------
     3. SERVICE PRESELECT
     Any link with data-service sets the booking form dropdown to
     that value. Add data-service="Exact Option Text" to a new
     button and it works automatically, as long as the text
     matches an <option> in the form exactly.
     ---------------------------------------------------------- */
  var serviceSelect = document.getElementById("service");

  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!serviceSelect) return;

      var wanted = link.getAttribute("data-service");
      var options = serviceSelect.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].text.trim() === wanted.trim()) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    });
  });


  /* ----------------------------------------------------------
     4. FADE IN ON SCROLL
     Any element with class "reveal" fades up when it enters view.
     ---------------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    // Older browsers just show everything
    revealItems.forEach(function (item) { item.classList.add("visible"); });
  }


  /* ----------------------------------------------------------
     5. GALLERY LIGHTBOX
     Tapping a photo opens it full screen. Video tiles are links,
     so they are skipped and open Instagram or TikTok instead.
     ---------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function hideLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery-item").forEach(function (item) {
    if (item.classList.contains("gallery-video")) return; // links out instead

    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      if (img) openLightbox(img.src, img.alt);
    });
  });

  if (lightbox) {
    lightboxClose.addEventListener("click", hideLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) hideLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hideLightbox();
    });
  }


  /* ----------------------------------------------------------
     6. FOOTER YEAR
     ---------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ----------------------------------------------------------
     7. NO PAST DATES IN THE BOOKING FORM
     ---------------------------------------------------------- */
  var dateInput = document.getElementById("date");
  if (dateInput) {
    var today = new Date();
    var iso = today.getFullYear() + "-" +
              String(today.getMonth() + 1).padStart(2, "0") + "-" +
              String(today.getDate()).padStart(2, "0");
    dateInput.min = iso;
  }

})();
