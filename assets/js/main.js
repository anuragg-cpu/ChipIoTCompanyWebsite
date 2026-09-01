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

  // Contact form: client-side validation, then hand off to the user's
  // email client via a pre-filled mailto: link (works with no backend).
  // Also attempts a Netlify Forms POST in the background when deployed
  // there, so submissions are captured even if the user closes the
  // mail client without sending.
  var CONTACT_EMAIL = "anuragg@chipiotembedded.com";
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var success = document.querySelector(".form-success");
      var data = new FormData(form);
      var name = data.get("name") || "";
      var email = data.get("email") || "";
      var company = data.get("company") || "";
      var projectType = data.get("project_type") || "";
      var message = data.get("message") || "";

      var subject = "New project inquiry from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Company: " + (company || "—"),
        "Project type: " + projectType,
        "",
        "Message:",
        message,
      ];
      var mailtoLink =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      fetch(form.getAttribute("action") || "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      }).catch(function () {
        /* no backend configured yet in local/dev — mailto below still works */
      });

      window.location.href = mailtoLink;
      form.reset();
      if (success) success.classList.add("show");
    });
  }
});
