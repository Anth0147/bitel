function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const pageTitle = document.getElementById("page-title");
  const pageSubtitle = document.getElementById("page-subtitle");

  const routeMeta = {
    "#conceptos": {
      title: "Conceptos Básicos de Reclamos",
      subtitle: "Marco normativo y requisitos de presentación según el TUO.",
      paneId: "sec-conceptos"
    },
    "#materias": {
      title: "Materias de Reclamo",
      subtitle: "Consulte las 11 materias reclamables, sus definiciones, submotivos y ejemplos prácticos.",
      paneId: "sec-materias"
    },
    "#flujos": {
      title: "Plazos, Flujograma y Resoluciones",
      subtitle: "Calcule plazos oficiales y visualice las etapas del proceso administrativo de reclamo.",
      paneId: "sec-flujos"
    },
    "#ciclos": {
      title: "Ciclos de Facturación y Prorrateo",
      subtitle: "Consulte los ciclos asignados y calcule el cobro prorrateado de renta mensual para periodos específicos.",
      paneId: "sec-ciclos"
    }
  };

  function handleRoute() {
    let hash = window.location.hash || "#conceptos";
    if (!routeMeta[hash]) hash = "#conceptos";

    // Update active nav-link
    navItems.forEach(item => {
      if (item.getAttribute("href") === hash) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update active tab-pane
    const targetPaneId = routeMeta[hash].paneId;
    tabPanes.forEach(pane => {
      if (pane.id === targetPaneId) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    // Update header texts
    pageTitle.textContent = routeMeta[hash].title;
    pageSubtitle.textContent = routeMeta[hash].subtitle;

    // Scroll main panel to top
    document.querySelector(".content-area").scrollTop = 0;
  }

  // Set click listeners on nav-links
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Allow browser hash routing to trigger hashchange event
    });
  });

  window.addEventListener("hashchange", handleRoute);
  
  // Initial route
  handleRoute();
}
