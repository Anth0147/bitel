// Lógica de interactividad del Portal de Reclamos - Bitel / OSIPTEL
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {


  // Bind SPA Navigation
  initNavigation();

  // Bind Section 1: Conceptos Básicos
  renderBasicConcepts();

  // Bind Section 2: Materias de Reclamo (Search & List)
  renderMaterias();

  // Bind Section 3: Plazos, Calculadora e Hitos
  initCalculadora();
  renderResolutionTypes();

  // Bind Section 4: Matriz de Medios Probatorios
  initMediosProbatorios();

  // Bind Billing Cycles
  initBillingCycles();


}



/* ==========================================================================
   SPA ROUTER (NAVIGATION)
   ========================================================================== */
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
    "#medios": {
      title: "Matriz de Medios Probatorios",
      subtitle: "Consulte los medios probatorios oficiales exigidos por TRASU según el concepto y servicio.",
      paneId: "sec-medios"
    },

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
    item.addEventListener("click", (e) => {
      // Allow browser hash routing to trigger hashchange event
    });
  });

  window.addEventListener("hashchange", handleRoute);
  
  // Initial route
  handleRoute();
}

/* ==========================================================================
   SECTION 1: CONCEPTOS BÁSICOS
   ========================================================================== */
function renderBasicConcepts() {
  const data = CLAIMS_DATA.basicConcepts;

  // Set definition
  document.getElementById("concept-def").textContent = data.definition;

  // Set properties list
  const propsList = document.getElementById("concept-props");
  propsList.innerHTML = "";
  data.properties.forEach(prop => {
    const li = document.createElement("li");
    li.textContent = prop;
    propsList.appendChild(li);
  });

  // Set requirements grid
  const reqsGrid = document.getElementById("requirements-list");
  reqsGrid.innerHTML = "";
  data.requirements.general.forEach(req => {
    const reqCard = document.createElement("div");
    reqCard.className = "req-item";
    if (req.critical) reqCard.classList.add("critical");

    const numSpan = document.createElement("span");
    numSpan.className = "req-num";
    numSpan.textContent = req.num;

    const textSpan = document.createElement("span");
    textSpan.className = "req-text";
    textSpan.innerHTML = req.text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    reqCard.appendChild(numSpan);
    reqCard.appendChild(textSpan);
    reqsGrid.appendChild(reqCard);
  });

  // Render Channels Tabs
  const tabsContainer = document.getElementById("channels-tabs");
  const descContainer = document.getElementById("channels-desc");
  tabsContainer.innerHTML = "";
  descContainer.innerHTML = "";

  data.presentationForms.forEach((form, index) => {
    const btn = document.createElement("button");
    btn.className = "channel-tab-btn";
    if (index === 0) btn.classList.add("active");
    btn.textContent = form.name;
    btn.dataset.channelId = form.id;
    tabsContainer.appendChild(btn);

    // Create description panel
    const panel = document.createElement("div");
    panel.className = "channel-pane";
    panel.id = `pane-${form.id}`;
    if (index !== 0) panel.classList.add("hidden");

    const h3 = document.createElement("h3");
    h3.textContent = form.name;
    panel.appendChild(h3);

    const ul = document.createElement("ul");
    ul.className = "styled-list";
    form.details.forEach(detail => {
      const li = document.createElement("li");
      li.innerHTML = detail.replace(/IMPORTANTE:/g, "<strong>IMPORTANTE:</strong>");
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    descContainer.appendChild(panel);

    btn.addEventListener("click", () => {
      // Toggle button active state
      document.querySelectorAll(".channel-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Toggle panel visibility
      document.querySelectorAll(".channel-pane").forEach(p => p.classList.add("hidden"));
      panel.classList.remove("hidden");
    });
  });

  // Render Prohibitions List
  const prohibList = document.getElementById("prohibitions-list");
  prohibList.innerHTML = "";
  data.prohibitions.forEach(prohib => {
    const li = document.createElement("li");
    li.textContent = prohib;
    prohibList.appendChild(li);
  });
}

/* ==========================================================================
   SECTION 2: MATERIAS DE RECLAMO (Buscador y Navegador Lateral)
   ========================================================================== */
let activeMateriaId = 1;

function renderMaterias() {
  const navContainer = document.getElementById("materias-list-nav");
  const detailContainer = document.getElementById("materia-detail-card");
  const searchInput = document.getElementById("materia-search");

  // Show first materia by default
  showMateriaDetail(activeMateriaId);

  // Render list function
  function renderMateriaList(searchTerm = "") {
    navContainer.innerHTML = "";
    const term = searchTerm.toLowerCase().trim();

    const filtered = CLAIMS_DATA.materias.filter(m => {
      if (!term) return true;
      
      const nameMatch = m.nombre.toLowerCase().includes(term);
      const defMatch = m.definicion.toLowerCase().includes(term);
      const submotivesMatch = m.submotivos.some(sub => sub.toLowerCase().includes(term));
      const examplesMatch = m.ejemplos.some(ex => ex.toLowerCase().includes(term));
      
      return nameMatch || defMatch || submotivesMatch || examplesMatch;
    });

    if (filtered.length === 0) {
      navContainer.innerHTML = `<div class="alert alert-info">No se encontraron materias que coincidan con la búsqueda.</div>`;
      return;
    }

    filtered.forEach(m => {
      const btn = document.createElement("button");
      btn.className = "materia-nav-btn";
      if (m.id === activeMateriaId) btn.classList.add("active");

      const nameSpan = document.createElement("span");
      nameSpan.className = "materia-nav-name";
      nameSpan.textContent = m.nombre;

      const numSpan = document.createElement("span");
      numSpan.className = "materia-nav-num";
      numSpan.textContent = `M${m.id}`;

      btn.appendChild(nameSpan);
      btn.appendChild(numSpan);
      navContainer.appendChild(btn);

      btn.addEventListener("click", () => {
        activeMateriaId = m.id;
        document.querySelectorAll(".materia-nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        showMateriaDetail(m.id);
      });
    });
  }

  // Search event
  searchInput.addEventListener("input", (e) => {
    renderMateriaList(e.target.value);
  });

  // Initial render
  renderMateriaList();
}

function showMateriaDetail(id) {
  const detailContainer = document.getElementById("materia-detail-card");
  const m = CLAIMS_DATA.materias.find(item => item.id === id);
  if (!m) return;

  detailContainer.innerHTML = `
    <div class="detail-header">
      <span class="badge">Materia N° ${m.id}</span>
      <h2>${m.nombre}</h2>
    </div>
    
    <div class="detail-section">
      <h3>Definición de Materia</h3>
      <p class="highlight-text">${m.definicion}</p>
    </div>

    <div class="detail-section">
      <h3>Sub-motivos de Reclamo</h3>
      <ul class="styled-list">
        ${m.submotivos.map(sub => `<li>${sub}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h3>Ejemplos Prácticos</h3>
      <ul class="check-list-red">
        ${m.ejemplos.map(ex => `<li>${ex}</li>`).join('')}
      </ul>
    </div>
  `;
}

/* ==========================================================================
   SECTION 3: PLAZOS, CALCULADORA E HITOS
   ========================================================================== */
function initCalculadora() {
  const selectMateria = document.getElementById("calc-materia");
  const amountGroup = document.getElementById("calc-amount-group");
  const inputAmount = document.getElementById("calc-amount");
  const resTimeSpan = document.getElementById("calc-res-time");
  const notifTimeSpan = document.getElementById("calc-notif-time");

  // Populate Dropdown with claim items
  selectMateria.innerHTML = `
    <option value="">-- Seleccionar Materia --</option>
    ${CLAIMS_DATA.materias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('')}
    <option value="11_recibo">Otras Materias: Falta de entrega de recibo</option>
    <option value="11_detalle">Otras Materias: Negativa a facturación detallada/llamadas</option>
    <option value="11_contrato">Otras Materias: Negativa a contratar el servicio</option>
  `;

  function updatePlazo() {
    const val = selectMateria.value;
    
    // Reset highlights on flowchart nodes
    document.querySelectorAll(".flow-node").forEach(n => {
      n.classList.remove("active", "highlight");
    });
    document.getElementById("node-present").classList.add("active");

    if (!val) {
      amountGroup.classList.add("hidden");
      resTimeSpan.textContent = "-";
      notifTimeSpan.textContent = "-";
      document.getElementById("flow-resolve-desc").textContent = "Plazo máximo de resolución";
      return;
    }

    // Toggle amount input for Billing (Materia ID 1)
    let isBilling = (val === "1");
    if (isBilling) {
      amountGroup.classList.remove("hidden");
    } else {
      amountGroup.classList.add("hidden");
      inputAmount.value = "";
    }

    let resDays = 0;
    let notifDays = 5;

    // Plazo algorithm matching Art. 58
    if (isBilling) {
      const amount = parseFloat(inputAmount.value) || 0;
      const uitLimit = CLAIMS_DATA.resolutions.uit2024 * 0.5; // S/ 2575.00
      
      if (amount <= uitLimit) {
        resDays = 15; // 15 days for Billing <= 0.5 UIT
      } else {
        resDays = 20; // 20 days for Billing > 0.5 UIT
      }
    } else if (val === "2" || val === "4" || val === "6" || val === "10" || val === "11_recibo" || val === "11_detalle") {
      resDays = 3;  // Quality, lack of service, no execution of cancelation, port, no bills, no details
    } else if (val === "7" || val === "5") {
      resDays = 15; // Top-ups, install/activate/transfer
    } else {
      resDays = 20; // Default or remaining (Incumplimiento, Contratación no solic, migración, negativa a contratar)
    }

    resTimeSpan.textContent = `${resDays} d.`;
    notifTimeSpan.textContent = `${notifDays} d.`;

    // Highlight Flowchart
    const nodeEval = document.getElementById("node-eval");
    const nodeResolve = document.getElementById("node-resolve");
    const nodeNotify = document.getElementById("node-notify");
    
    nodeEval.classList.add("active");
    nodeResolve.classList.add("highlight");
    nodeNotify.classList.add("active");

    document.getElementById("flow-resolve-desc").innerHTML = `Resolver dentro de <strong>${resDays} días útiles</strong>`;
  }

  selectMateria.addEventListener("change", updatePlazo);
  inputAmount.addEventListener("input", updatePlazo);
}

function renderResolutionTypes() {
  const container = document.getElementById("resolution-types-grid");
  container.innerHTML = "";

  const badgeClasses = {
    "FUNDADO": "badge-fundado",
    "INFUNDADO": "badge-infundado",
    "PARCIALMENTE FUNDADO": "badge-parcial",
    "INADMISIBLE": "badge-inadmisible",
    "IMPROCEDENTE": "badge-improcedente"
  };

  CLAIMS_DATA.resolutions.types.forEach(res => {
    const card = document.createElement("div");
    card.className = "res-type-card";

    const badge = document.createElement("span");
    badge.className = `res-type-badge ${badgeClasses[res.name] || 'badge-improcedente'}`;
    badge.textContent = res.name;

    const h3 = document.createElement("h3");
    h3.textContent = res.name;

    const p = document.createElement("p");
    p.textContent = res.desc;

    card.appendChild(badge);
    card.appendChild(p);
    container.appendChild(card);
  });
}

/* ==========================================================================
   SECTION 4: MATRIZ DE MEDIOS PROBATORIOS
   ========================================================================== */
function initMediosProbatorios() {
  const selectConcept = document.getElementById("matrix-concept");
  const selectService = document.getElementById("matrix-service");
  const resultsArea = document.getElementById("matrix-results");

  // Get list of unique concepts
  const uniqueConcepts = [];
  CLAIMS_DATA.mediosProbatorios.forEach(item => {
    if (!uniqueConcepts.includes(item.concepto)) {
      uniqueConcepts.push(item.concepto);
    }
  });

  // Populate concepts dropdown
  selectConcept.innerHTML = `<option value="">-- Seleccione Concepto Reclamado --</option>`;
  uniqueConcepts.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    selectConcept.appendChild(opt);
  });

  // Populate services dropdown when concept changes
  selectConcept.addEventListener("change", () => {
    const concept = selectConcept.value;
    selectService.innerHTML = `<option value="">-- Seleccione un Servicio --</option>`;
    
    if (!concept) {
      resetMatrixResults();
      return;
    }

    // Find services mapped to this concept
    const matchingRows = CLAIMS_DATA.mediosProbatorios.filter(item => item.concepto === concept);
    
    // Extract unique services from matching rows
    const uniqueServices = [];
    matchingRows.forEach(row => {
      row.servicios.forEach(s => {
        if (!uniqueServices.includes(s)) {
          uniqueServices.push(s);
        }
      });
    });

    uniqueServices.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      selectService.appendChild(opt);
    });

    resetMatrixResults();
  });

  // Render results when service is selected
  selectService.addEventListener("change", () => {
    const concept = selectConcept.value;
    const service = selectService.value;

    if (!concept || !service) {
      resetMatrixResults();
      return;
    }

    // Find the matching entry in means of proof database
    // We check if the entry has the same concept, and the services list includes selected service
    const match = CLAIMS_DATA.mediosProbatorios.find(item => 
      item.concepto === concept && item.servicios.includes(service)
    );

    // If not found, try to find a row matching "Todos los servicios"
    const fallbackMatch = match ? match : CLAIMS_DATA.mediosProbatorios.find(item => 
      item.concepto === concept && item.servicios.includes("Todos los servicios")
    );

    const activeMatch = match || fallbackMatch;

    if (!activeMatch) {
      resultsArea.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">⚠️</span>
          <p>No se encontraron medios de prueba específicos registrados para esta combinación.</p>
        </div>
      `;
      return;
    }

    const mainMateria = CLAIMS_DATA.materias.find(m => m.id === activeMatch.materiaId);
    const materiaName = mainMateria ? mainMateria.nombre : "Norma OSIPTEL";

    resultsArea.innerHTML = `
      <div class="probatory-results">
        <div class="prob-header">
          <span class="detail-header badge" style="background-color:var(--bitel-teal-glow);color:var(--bitel-teal)">${materiaName}</span>
          <h3>Concepto: ${activeMatch.concepto}</h3>
          <p class="prob-sub">Servicio: <strong>${service}</strong> (Ref. Regulación TRASU)</p>
        </div>
        
        <div class="medios-list-wrapper">
          <h4>⚖️ Medios de Prueba Requeridos (Actuación de Oficio)</h4>
          <div class="medios-badges">
            ${activeMatch.medios.map(m => `
              <div class="medio-badge-item">
                <span class="medio-check">✓</span>
                <span>${m}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });

  function resetMatrixResults() {
    resultsArea.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📂</span>
        <p>Seleccione un concepto y tipo de servicio para ver los medios de prueba oficiales.</p>
      </div>
    `;
  }
}

/* ==========================================================================
   BILLING CYCLES & POPUP MATRIX
   ========================================================================== */
function initBillingCycles() {
  const dayInput = document.getElementById("cycle-input-day");
  const resultPanel = document.getElementById("cycles-result-panel");
  const btnShowAll = document.getElementById("btn-show-all-cycles");
  const btnClose = document.getElementById("btn-close-modal");
  const modal = document.getElementById("cycles-modal");
  const tableBody = document.getElementById("cycles-table-body");

  // Elements to display results
  const valCiclo = document.getElementById("cycle-val-ciclo");
  const valInicio = document.getElementById("cycle-val-inicio");
  const valEmision = document.getElementById("cycle-val-emision");
  const valCierre = document.getElementById("cycle-val-cierre");

  // 1. Render all cycles in the modal table
  tableBody.innerHTML = "";
  CLAIMS_DATA.billingCycles.forEach(row => {
    const tr = document.createElement("tr");
    tr.id = `modal-row-ciclo-${row.ciclo}`;
    tr.innerHTML = `
      <td><strong>${row.firma}</strong></td>
      <td style="color:var(--state-error); font-weight:700;">${row.ciclo}</td>
      <td>Día ${row.inicio}</td>
      <td>Día ${row.emision}</td>
      <td>Día ${row.cierre}</td>
    `;
    tableBody.appendChild(tr);
  });

  // 2. Event listener for search input
  dayInput.addEventListener("input", () => {
    const val = dayInput.value.trim();
    if (!val) {
      resultPanel.classList.add("hidden");
      clearHighlightedRows();
      return;
    }

    const day = parseInt(val);
    if (isNaN(day) || day < 1 || day > 31) {
      resultPanel.classList.add("hidden");
      clearHighlightedRows();
      return;
    }

    // Find matching cycle
    const match = CLAIMS_DATA.billingCycles.find(row => row.days.includes(day));
    if (match) {
      valCiclo.textContent = match.ciclo;
      valInicio.textContent = `Día ${match.inicio}`;
      valEmision.textContent = `Día ${match.emision}`;
      valCierre.textContent = `Día ${match.cierre}`;
      resultPanel.classList.remove("hidden");

      // Highlight matching row in modal table
      clearHighlightedRows();
      const matchRow = document.getElementById(`modal-row-ciclo-${match.ciclo}`);
      if (matchRow) {
        matchRow.classList.add("highlighted-row");
      }
    } else {
      resultPanel.classList.add("hidden");
      clearHighlightedRows();
    }
  });

  function clearHighlightedRows() {
    document.querySelectorAll(".cycles-table tr").forEach(tr => {
      tr.classList.remove("highlighted-row");
    });
  }

  // 3. Modal show/hide triggers
  btnShowAll.addEventListener("click", () => {
    modal.classList.remove("hidden");
    
    // If a row is highlighted, scroll to it inside the modal body
    const highlighted = document.querySelector(".cycles-table tr.highlighted-row");
    if (highlighted) {
      setTimeout(() => {
        highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  });

  btnClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close when clicking outside of modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}


