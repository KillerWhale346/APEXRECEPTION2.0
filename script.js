// script.js – Apex Reception

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Tiny "stat tick" animation for metrics
document.addEventListener("DOMContentLoaded", () => {
  const metricEls = document.querySelectorAll("[data-target-number]");
  metricEls.forEach((el) => {
    const target = parseFloat(el.getAttribute("data-target-number"));
    if (Number.isNaN(target)) return;

    let current = 0;
    const duration = 900;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const value = target * progress;
      el.textContent = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
      }).format(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = el.getAttribute("data-final-format") || el.textContent;
    };

    requestAnimationFrame(step);
  });
});


// Pricing slider logic
document.addEventListener("DOMContentLoaded", () => {
  const range = document.getElementById("minutesRange");
  const minutesValue = document.getElementById("minutesValue");
  const planLabelEl = document.getElementById("planLabel");
  const planTitleEl = document.getElementById("planTitle");
  const planPriceEl = document.getElementById("planPrice");
  const planSubEl = document.getElementById("planSub");
  const planFeaturesEl = document.getElementById("planFeatures");
  const planCtaEl = document.getElementById("planCta");
  const planTagEl = document.getElementById("planTag");

  if (!range || !minutesValue || !planLabelEl || !planTitleEl || !planPriceEl || !planSubEl || !planFeaturesEl || !planCtaEl || !planTagEl) {
    return;
  }

  const pricingBrackets = [
    {
      min: 0,
      max: 500,
      label: "Starter",
      title: "Solo office",
      price: "$299",
      per: "/month",
      sub: "Perfect for solo operators or single-location offices getting started with AI reception.",
      tag: "Best for small teams",
      cta: "Start with Starter",
      features: [
        "Up to ~1,000 AI-handled minutes / month.",
        "Single business number and greeting.",
        "Appointment booking for one calendar.",
        "Email summaries after each call."
      ]
    },
    {
      min: 500,
      max: 1500,
      label: "Pro",
      title: "Growing team",
      price: "$499",
      per: "/month",
      sub: "Ideal for growing teams who want AI to handle the bulk of inbound calls.",
      tag: "Most popular for service businesses",
      cta: "Talk about Pro",
      features: [
        "Up to ~2,000 AI-handled minutes / month.",
        "Multiple numbers and time-based routing.",
        "Bookings for multiple team calendars.",
        "Basic CRM / integration handoff."
      ]
    },
    {
      min: 1500,
      max: 3000,
      label: "Growth",
      title: "Multi-location",
      price: "$699",
      per: "/month",
      sub: "Designed for busy operations taking calls all day across locations or departments.",
      tag: "High volume",
      cta: "Talk about Growth",
      features: [
        "Up to ~3,000 AI-handled minutes / month.",
        "Custom scripts per department and line.",
        "Deeper CRM / Zapier / webhook integrations.",
        "Priority onboarding & support."
      ]
    },
    {
      min: 3000,
      max: 10000,
      label: "Scale",
      title: "Heavy volume",
      price: "$999",
      per: "/month",
      sub: "For operations running a constant stream of calls that need a reliable AI front desk.",
      tag: "For serious scale",
      cta: "Discuss Scale plan",
      features: [
        "Up to ~10,000 AI-handled minutes / month.",
        "Advanced routing and after-hours logic.",
        "Call recordings & analytics exports.",
        "Workflow design help from our team."
      ]
    },
    {
      min: 10000,
      max: Infinity,
      label: "Enterprise",
      title: "Custom volume",
      price: "Let’s talk",
      per: "",
      sub: "Custom pricing for multi-location, multi-brand or reseller scenarios.",
      tag: "Custom",
      cta: "Contact sales",
      features: [
        "Custom minute bundles and overflow rules.",
        "Dedicated account & success manager.",
        "Compliance, SSO and audit-ready logging.",
        "White-label & reseller options."
      ]
    }
  ];

  const formatMinutes = (value) => {
    if (value >= 10000) return "10,000+";
    return new Intl.NumberFormat("en-US").format(value);
  };

  const findBracket = (value) => {
    return pricingBrackets.find((b) => value >= b.min && value < b.max) || pricingBrackets[pricingBrackets.length - 1];
  };

  const renderBracket = (value) => {
    const bracket = findBracket(value);
    minutesValue.textContent = formatMinutes(value) + " mins / month";
    planLabelEl.textContent = bracket.label;
    planTitleEl.textContent = bracket.title;
    planPriceEl.innerHTML = bracket.price + (bracket.per ? `<span>${bracket.per}</span>` : "");
    planSubEl.textContent = bracket.sub;
    planTagEl.textContent = bracket.tag;
    planCtaEl.textContent = bracket.cta;

    // Update CTA link destination
    if (bracket.label === "Enterprise") {
      planCtaEl.setAttribute("href", "../contact/");
    } else {
      planCtaEl.setAttribute("href", "../book/");
    }

    // Features list
    planFeaturesEl.innerHTML = "";
    bracket.features.forEach((text) => {
      const li = document.createElement("li");
      const check = document.createElement("span");
      check.className = "check";
      check.textContent = "✔";
      const span = document.createElement("span");
      span.textContent = text;
      li.appendChild(check);
      li.appendChild(span);
      planFeaturesEl.appendChild(li);
    });
  };

  range.addEventListener("input", (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    renderBracket(value);
  });

  // Initialize with default
  const initial = parseInt(range.value, 10) || 1500;
  renderBracket(initial);
});
