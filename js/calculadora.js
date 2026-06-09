function initCalculadora() {
  const selectMateria = document.getElementById("calc-materia");
  const amountGroup = document.getElementById("calc-amount-group");
  const inputAmount = document.getElementById("calc-amount");
  const resTimeSpan = document.getElementById("calc-res-time");
  const notifTimeSpan = document.getElementById("calc-notif-time");

  if (!selectMateria) return;

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
  if (!container) return;
  
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
