
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

  // Bind Section 4: Ciclos & Prorrateo
  initBillingCycles();
  initProrrateoCalculator();
}
