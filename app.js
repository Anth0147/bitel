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

  // Filter means of proof for this materia
  const matchingMedios = CLAIMS_DATA.mediosProbatorios.filter(item => item.materiaId === id);

  // Group matchingMedios by unique concept, filtering only allowed services
  const ALLOWED_SERVICES = [
    "Servicio Móvil Postpago",
    "Servicio Móvil Prepago",
    "Internet de Acceso Fijo"
  ];

  const uniqueConceptsMap = {};
  matchingMedios.forEach(item => {
    // Determine which of the allowed services apply to this item
    let appliedServices = [];
    if (item.servicios.includes("Todos los servicios")) {
      appliedServices = [...ALLOWED_SERVICES];
    } else {
      appliedServices = item.servicios.filter(s => ALLOWED_SERVICES.includes(s));
    }

    if (appliedServices.length > 0) {
      if (!uniqueConceptsMap[item.concepto]) {
        uniqueConceptsMap[item.concepto] = [];
      }
      appliedServices.forEach(s => {
        // Avoid duplicate mappings for the same service in the same concept
        const existing = uniqueConceptsMap[item.concepto].find(x => x.servicio === s);
        if (!existing) {
          uniqueConceptsMap[item.concepto].push({
            servicio: s,
            medios: item.medios
          });
        }
      });
    }
  });


  // Basic plazo logic for flowchart
  let defaultDays = 20;
  let plazoExplanation = "";
  if (id === 1) {
    defaultDays = 15; // default <= 0.5 UIT
    plazoExplanation = "Facturación <= 0.5 UIT: <strong>15 días útiles</strong>. Facturación > 0.5 UIT: <strong>20 días útiles</strong>.";
  } else if (id === 2 || id === 4 || id === 6 || id === 10) {
    defaultDays = 3;
    plazoExplanation = "Calidad, falta de servicio, portabilidad y baja se resuelven en un plazo corto de <strong>3 días útiles</strong>.";
  } else if (id === 5 || id === 7) {
    defaultDays = 15;
    plazoExplanation = "Instalación, traslado y recargas se resuelven en un plazo medio de <strong>15 días útiles</strong>.";
  } else if (id === 11) {
    defaultDays = 3; // split
    plazoExplanation = "Falta de entrega de recibos y reporte de llamadas: <strong>3 días útiles</strong>. Negativa a contratar: <strong>20 días útiles</strong>.";
  } else {
    plazoExplanation = "Incumplimiento de condiciones, migración y contratación no solicitada se resuelven en un plazo ordinario de <strong>20 días útiles</strong>.";
  }

  let htmlContent = `
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

    <!-- INTEGRACIÓN DIDÁCTICA: PLAZOS Y FLUJOGRAMAS -->
    <div class="detail-section" style="border-top:1px solid var(--border-color); padding-top:20px;">
      <h3>⏱️ Plazo y Flujo de Resolución</h3>
      <p class="section-intro" style="margin-bottom: 12px;">${plazoExplanation}</p>
      
      ${id === 1 ? `
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="font-size:13px; font-weight:600;">Simular Monto de Reclamo:</label>
          <div style="display:flex; gap:12px; align-items:center;">
            <input type="number" id="materia-calc-amount" class="form-control" value="100" style="padding: 8px 12px; width:150px;">
            <span id="materia-calc-lbl" style="font-size:13px; font-weight:600; color:var(--bitel-teal);">Plazo: 15 días útiles</span>
          </div>
        </div>
      ` : ''}

      <div class="flowchart-container" style="padding: 10px 0; margin-top: 10px; background-color: var(--bg-primary); border-radius: var(--border-radius-sm); border:1px solid var(--border-color);">
        <div class="flow-node active" style="width: 140px; padding: 10px; background-color:var(--bg-secondary);">
          <div class="node-title" style="font-size:11px;">1. Presentación</div>
          <div class="node-desc" style="font-size:9px; color:var(--text-secondary);">Registro del reclamo</div>
        </div>
        <div class="flow-arrow" style="font-size:14px;">➔</div>
        <div class="flow-node active" style="width: 140px; padding: 10px; background-color:var(--bg-secondary);">
          <div class="node-title" style="font-size:11px;">2. Evaluación</div>
          <div class="node-desc" style="font-size:9px; color:var(--text-secondary);">Medios probatorios</div>
        </div>
        <div class="flow-arrow" style="font-size:14px;">➔</div>
        <div class="flow-node highlight" id="materia-node-resolve" style="width: 140px; padding: 10px;">
          <div class="node-title" style="font-size:11px;">3. Resolución</div>
          <div class="node-desc" id="materia-flow-res-days" style="font-size:9px; font-weight:700;">${defaultDays} días hábiles</div>
        </div>
        <div class="flow-arrow" style="font-size:14px;">➔</div>
        <div class="flow-node active" style="width: 140px; padding: 10px; background-color:var(--bg-secondary);">
          <div class="node-title" style="font-size:11px;">4. Notificación</div>
          <div class="node-desc" style="font-size:9px; color:var(--text-secondary);">5 días hábiles</div>
        </div>
      </div>
    </div>

    <!-- MEDIOS DE PRUEBA A COLOCAR -->
    <div class="detail-section" style="border-top:1px solid var(--border-color); padding-top:20px;">
      <h3>⚖️ Medios de Prueba a Colocar</h3>
      <p class="section-intro" style="margin-bottom:14px;">Seleccione el concepto y tipo de servicio haciendo clic en las opciones para ver la comparativa:</p>
      
      <!-- Paso 1: Concepto -->
      <div class="assistant-step" style="margin-bottom: 16px;">
        <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:8px;">Paso 1: Seleccione el Concepto Específico</h4>
        <div class="concept-buttons-wrapper" style="display:flex; flex-direction:column; gap:8px;">
          ${Object.keys(uniqueConceptsMap).map((concept, index) => `
            <button class="assistant-btn concept-btn ${index === 0 ? 'active' : ''}" data-concept="${concept.replace(/"/g, '&quot;')}">
              ${concept}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Paso 2: Servicio -->
      <div class="assistant-step" id="assistant-service-step" style="margin-bottom: 16px;">
        <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:8px;">Paso 2: Seleccione el Tipo de Servicio</h4>
        <div class="service-buttons-wrapper" id="assistant-services-container" style="display:flex; flex-wrap:wrap; gap:8px;">
          <!-- Cargado vía JS -->
        </div>
      </div>

      <!-- Paso 3: Medios Resultantes -->
      <div class="assistant-step" id="assistant-result-step">
        <h4 style="font-size:13px; font-weight:700; color:var(--bitel-teal); margin-bottom:8px;">Medios de Prueba a Colocar</h4>
        <div class="table-responsive">
          <table class="medios-comparativa-table">
            <thead>
              <tr>
                <th>OSIPTEL</th>
                <th>Bitel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="medios-badges" id="assistant-medios-container-osiptel" style="display:flex; flex-direction:column; gap:6px;">
                    <!-- Cargados vía JS -->
                  </div>
                </td>
                <td>
                  <div class="medios-badges" id="assistant-medios-container-bitel" style="display:flex; flex-direction:column; gap:6px;">
                    <!-- Cargados vía JS -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  detailContainer.innerHTML = htmlContent;

  // Bind interactive events for this materia detail
  bindMateriaDetailEvents(id, uniqueConceptsMap);
}

function bindMateriaDetailEvents(materiaId, uniqueConceptsMap) {
  // 1. Calculator events for Facturación (id === 1)
  const amountInput = document.getElementById("materia-calc-amount");
  const calcLabel = document.getElementById("materia-calc-lbl");
  const flowDaysDesc = document.getElementById("materia-flow-res-days");
  
  if (amountInput && calcLabel && flowDaysDesc) {
    const updateMateriaPlazo = () => {
      const val = parseFloat(amountInput.value) || 0;
      const uitLimit = CLAIMS_DATA.resolutions.uit2024 * 0.5; // S/ 2575.00
      if (val <= uitLimit) {
        calcLabel.textContent = "Plazo: 15 días útiles";
        flowDaysDesc.innerHTML = "15 días hábiles";
      } else {
        calcLabel.textContent = "Plazo: 20 días útiles";
        flowDaysDesc.innerHTML = "20 días hábiles";
      }
    };
    amountInput.addEventListener("input", updateMateriaPlazo);
  }

  // 2. Medios de Prueba navigation path
  const conceptButtons = document.querySelectorAll(".concept-btn");
  const serviceContainer = document.getElementById("assistant-services-container");
  const osiptelContainer = document.getElementById("assistant-medios-container-osiptel");
  const bitelContainer = document.getElementById("assistant-medios-container-bitel");

  let selectedConcept = "";

  function selectConcept(conceptName) {
    selectedConcept = conceptName;
    
    // Update active concept button
    conceptButtons.forEach(btn => {
      if (btn.getAttribute("data-concept") === conceptName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Populate service options for this concept
    const options = uniqueConceptsMap[conceptName] || [];
    serviceContainer.innerHTML = "";
    
    options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.className = "assistant-btn service-btn";
      btn.textContent = opt.servicio;
      btn.dataset.index = index;
      serviceContainer.appendChild(btn);

      btn.addEventListener("click", () => {
        // Highlight active service button
        document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Show medios comparativa
        renderMediosResult(opt.medios, opt.servicio);
      });
    });

    // Auto-click the first service button if available
    const firstServiceBtn = serviceContainer.querySelector(".service-btn");
    if (firstServiceBtn) {
      firstServiceBtn.click();
    } else {
      // Clear result
      if (osiptelContainer && bitelContainer) {
        const noDataHtml = `<div class="alert alert-info" style="margin: 0; padding: 8px;">No se registraron medios de prueba.</div>`;
        osiptelContainer.innerHTML = noDataHtml;
        bitelContainer.innerHTML = noDataHtml;
      }
    }
  }

  function renderMediosResult(medios, serviceName) {
    if (!osiptelContainer || !bitelContainer) return;
    
    osiptelContainer.innerHTML = "";
    bitelContainer.innerHTML = "";

    // OSIPTEL Column
    if (!medios || medios.length === 0) {
      osiptelContainer.innerHTML = `
        <div class="alert alert-info" style="margin: 0; padding: 8px;">No se requieren medios de prueba especiales.</div>
      `;
    } else {
      medios.forEach(medio => {
        const item = document.createElement("div");
        item.className = "medio-badge-item";
        item.innerHTML = `
          <span class="medio-check">✓</span>
          <span>${medio}</span>
        `;
        osiptelContainer.appendChild(item);
      });
    }

    // Bitel Column
    let bitelMedios = [];
    if (materiaId === 2 && (serviceName === "Servicio Móvil Postpago" || serviceName === "Servicio Móvil Prepago")) {
      bitelMedios = [
        "Calidad e idoneidad en la prestación del servicio",
        "Consulta del estado del servicio",
        "Informe de Atención de los Problemas de Calidad y Avería",
        "Histórico de cortes y reactivaciones",
        "Histórico de Reclamos",
        "Registro de Problemas de Calidad y Averías",
        "Detalle de Consumos"
      ];
    } else {
      bitelMedios = medios || [];
    }

    if (bitelMedios.length === 0) {
      bitelContainer.innerHTML = `
        <div class="alert alert-info" style="margin: 0; padding: 8px;">No se requieren medios de prueba especiales.</div>
      `;
    } else {
      bitelMedios.forEach(medio => {
        const item = document.createElement("div");
        item.className = "medio-badge-item";
        item.innerHTML = `
          <span class="medio-check">✓</span>
          <span>${medio}</span>
        `;
        bitelContainer.appendChild(item);
      });
    }
  }

  // Auto-select first concept on load
  const firstConceptBtn = document.querySelector(".concept-btn");
  if (firstConceptBtn) {
    selectConcept(firstConceptBtn.getAttribute("data-concept"));
  }

  // Setup click listeners for all concept buttons
  conceptButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectConcept(btn.getAttribute("data-concept"));
    });
  });
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


