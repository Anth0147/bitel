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
