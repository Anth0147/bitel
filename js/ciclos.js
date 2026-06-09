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

  if (!dayInput) return;

  // 1. Render all cycles in the modal table and the page table
  const pageTableBody = document.getElementById("page-cycles-table-body");
  if (pageTableBody) pageTableBody.innerHTML = "";
  tableBody.innerHTML = "";
  
  CLAIMS_DATA.billingCycles.forEach(row => {
    // Modal Table Row
    const trModal = document.createElement("tr");
    trModal.id = `modal-row-ciclo-${row.ciclo}`;
    trModal.innerHTML = `
      <td><strong>${row.firma}</strong></td>
      <td style="color:var(--state-error); font-weight:700;">${row.ciclo}</td>
      <td>Día ${row.inicio}</td>
      <td>Día ${row.emision}</td>
      <td>Día ${row.cierre}</td>
    `;
    tableBody.appendChild(trModal);

    // Page Table Row
    if (pageTableBody) {
      const trPage = document.createElement("tr");
      trPage.id = `page-row-ciclo-${row.ciclo}`;
      trPage.innerHTML = `
        <td><strong>${row.firma}</strong></td>
        <td style="color:var(--state-error); font-weight:700;">${row.ciclo}</td>
        <td>Día ${row.inicio}</td>
        <td>Día ${row.emision}</td>
        <td>Día ${row.cierre}</td>
      `;
      pageTableBody.appendChild(trPage);
    }
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

      // Highlight matching row in both tables
      clearHighlightedRows();
      
      const matchRowModal = document.getElementById(`modal-row-ciclo-${match.ciclo}`);
      if (matchRowModal) {
        matchRowModal.classList.add("highlighted-row");
      }
      
      const matchRowPage = document.getElementById(`page-row-ciclo-${match.ciclo}`);
      if (matchRowPage) {
        matchRowPage.classList.add("highlighted-row");
        setTimeout(() => {
          matchRowPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
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

function initProrrateoCalculator() {
  const prorrateoCicloSelect = document.getElementById("prorrateo-ciclo");
  const proValCiclo = document.getElementById("pro-val-ciclo");
  const proValInicio = document.getElementById("pro-val-inicio");
  const proValEmision = document.getElementById("pro-val-emision");
  const proValCierre = document.getElementById("pro-val-cierre");
  const prorrateoCicloDetail = document.getElementById("prorrateo-ciclo-detail");

  if (!prorrateoCicloSelect) return;

  // 1. Populate dropdown
  prorrateoCicloSelect.innerHTML = `<option value="">-- Seleccione Ciclo --</option>` +
    CLAIMS_DATA.billingCycles.map(c => `<option value="${c.ciclo}">Ciclo ${c.ciclo} (Firma: ${c.firma})</option>`).join('');

  // 2. Display cycle details on change
  prorrateoCicloSelect.addEventListener("change", () => {
    const cicloVal = prorrateoCicloSelect.value;
    if (!cicloVal) {
      prorrateoCicloDetail.classList.add("hidden");
      return;
    }
    const match = CLAIMS_DATA.billingCycles.find(c => c.ciclo === cicloVal);
    if (match) {
      proValCiclo.textContent = `Ciclo ${match.ciclo}`;
      proValInicio.textContent = `Día ${match.inicio}`;
      proValEmision.textContent = `Día ${match.emision}`;
      proValCierre.textContent = `Día ${match.cierre}`;
      prorrateoCicloDetail.classList.remove("hidden");
    }
  });

  // 3. Calculator action
  const btnCalcularProrrateo = document.getElementById("btn-calcular-prorrateo");
  if (btnCalcularProrrateo) {
    btnCalcularProrrateo.addEventListener("click", () => {
      const montoInput = document.getElementById("prorrateo-monto");
      const inicioInput = document.getElementById("prorrateo-inicio");
      const finInput = document.getElementById("prorrateo-fin");
      
      const montoVal = parseFloat(montoInput.value);
      const startVal = inicioInput.value;
      const endVal = finInput.value;
      const cicloVal = prorrateoCicloSelect.value;

      if (!cicloVal) {
        alert("Por favor seleccione un ciclo de facturación.");
        return;
      }

      if (isNaN(montoVal) || !startVal || !endVal) {
        alert("Por favor complete todos los campos (monto, fecha inicio y fecha fin).");
        return;
      }

      const start = new Date(startVal + "T00:00:00");
      const end = new Date(endVal + "T00:00:00");

      if (end < start) {
        alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
        return;
      }

      const match = CLAIMS_DATA.billingCycles.find(c => c.ciclo === cicloVal);
      if (!match) {
        alert("Ciclo no válido.");
        return;
      }
      const cycleDay = parseInt(match.inicio);

      // Helper function to get billing period for a given date D and cycle C
      function getBillingPeriod(date, cDay) {
        let y = date.getFullYear();
        let m = date.getMonth(); // 0-11
        
        if (date.getDate() < cDay) {
          m = m - 1;
          if (m < 0) {
            m = 11;
            y = y - 1;
          }
        }
        
        const startDate = new Date(y, m, cDay);
        
        let nextM = m + 1;
        let nextY = y;
        if (nextM > 11) {
          nextM = 0;
          nextY = nextY + 1;
        }
        const endDate = new Date(nextY, nextM, cDay - 1);
        
        return { startDate, endDate };
      }

      function formatDate(d) {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yy = d.getFullYear();
        return `${dd}/${mm}/${yy}`;
      }

      // Group active days by billing period
      const periodsData = {};
      let current = new Date(start);
      const endTimestamp = end.getTime();

      while (current.getTime() <= endTimestamp) {
        const { startDate, endDate } = getBillingPeriod(current, cycleDay);
        const key = startDate.toISOString().substring(0, 10);
        
        if (!periodsData[key]) {
          const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          periodsData[key] = {
            startDate,
            endDate,
            totalDays,
            activeDays: 0
          };
        }
        periodsData[key].activeDays++;
        
        current.setDate(current.getDate() + 1);
      }

      let totalProrrateo = 0;
      let breakdownHtml = "";
      let explanationLines = [];
      explanationLines.push("<strong>Explicación del Prorrateo (calculado en base a periodos de ciclo):</strong>");

      const MONTH_NAMES = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      const sortedKeys = Object.keys(periodsData).sort();
      sortedKeys.forEach(key => {
        const p = periodsData[key];
        const dailyRate = montoVal / p.totalDays;
        const monthlyProrrateo = dailyRate * p.activeDays;
        
        totalProrrateo += monthlyProrrateo;
        
        const monthName = MONTH_NAMES[p.startDate.getMonth()];
        const year = p.startDate.getFullYear();
        const periodLabel = `Periodo del ${formatDate(p.startDate)} al ${formatDate(p.endDate)}<br><small style="color:var(--text-muted);">(Ciclo de ${monthName} ${year})</small>`;

        breakdownHtml += `
          <tr>
            <td><strong>${periodLabel}</strong></td>
            <td>${p.activeDays} ${p.activeDays === 1 ? 'día' : 'días'}</td>
            <td>${p.totalDays} días</td>
            <td>S/ ${dailyRate.toFixed(4)}</td>
            <td style="font-weight: 700; color: var(--bitel-teal);">S/ ${monthlyProrrateo.toFixed(2)}</td>
          </tr>
        `;

        explanationLines.push(
          `- Para el periodo de <strong>${monthName} ${year}</strong> (del <strong>${formatDate(p.startDate)} al ${formatDate(p.endDate)}</strong> que tiene <strong>${p.totalDays} días</strong> de duración del ciclo), la tarifa diaria es: S/ ${montoVal.toFixed(2)} / ${p.totalDays} = S/ ${dailyRate.toFixed(4)}. Al haber <strong>${p.activeDays} ${p.activeDays === 1 ? 'día activo' : 'días activos'}</strong> dentro de este periodo, el monto prorrateado es S/ ${dailyRate.toFixed(4)} * ${p.activeDays} = <strong>S/ ${monthlyProrrateo.toFixed(2)}</strong>.`
        );
      });

      explanationLines.push(
        `<strong>Total Sumado:</strong> El monto prorrateado total es <strong>S/ ${totalProrrateo.toFixed(2)}</strong>.`
      );

      if (match) {
        explanationLines.push(
          `<strong>Datos del Ciclo Asociado:</strong> Para el <strong>Ciclo ${match.ciclo}</strong> (Firma de contrato el día ${match.firma}), la entrega de beneficios es el día <strong>${match.inicio}</strong> de cada mes, la emisión del recibo es el día <strong>${match.emision}</strong> y la fecha de pago máxima es el día <strong>${match.cierre}</strong> de cada mes.`
        );
      }

      document.getElementById("prorrateo-total-monto").textContent = `S/ ${totalProrrateo.toFixed(2)}`;
      document.getElementById("prorrateo-breakdown-body").innerHTML = breakdownHtml;
      document.getElementById("prorrateo-explicacion").innerHTML = explanationLines.map(line => `<p style="margin-bottom: 8px;">${line}</p>`).join('');
      
      document.getElementById("prorrateo-result-panel").classList.remove("hidden");
    });
  }
}
