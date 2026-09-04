// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form: client-side validation, then POST straight to
  // FormSubmit (https://formsubmit.co), which emails the submission to
  // anuragg@chipiotembedded.com. No backend of our own required — this
  // works as-is on GitHub Pages. Uses FormSubmit's AJAX endpoint so the
  // page doesn't navigate away; we show our own success/error state.
  //
  // One-time setup: FormSubmit requires the destination address to be
  // activated. The first submission triggers an activation email to
  // anuragg@chipiotembedded.com — click the link in it once, and every
  // submission after that is delivered normally.
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var success = document.querySelector(".form-success");
      var error = document.querySelector(".form-error");
      var submitBtn = form.querySelector('button[type="submit"]');
      var actionUrl = form.getAttribute("action");
      var ajaxUrl = actionUrl.replace(
        "https://formsubmit.co/",
        "https://formsubmit.co/ajax/"
      );

      if (error) error.classList.remove("show");
      if (submitBtn) submitBtn.disabled = true;

      fetch(ajaxUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          return res.json();
        })
        .then(function () {
          form.reset();
          if (success) success.classList.add("show");
        })
        .catch(function () {
          if (error) error.classList.add("show");
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
});
