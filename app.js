(function () {
  "use strict";

  const STORAGE_KEY = "gsc-healthcare-voice-action-tracker-v2";
  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  const dimensions = [
    { name: "Empowered", score: 61, change: 1, color: "#7359e7", meaning: "Purpose, agency and decision clarity" },
    { name: "Safe", score: 58, change: 3, color: "#2f8374", meaning: "Trust, voice and psychological safety" },
    { name: "Respected", score: 76, change: 4, color: "#3475bc", meaning: "Fairness, dignity and consistency" },
    { name: "Supported", score: 57, change: 2, color: "#c3742f", meaning: "Resources, wellbeing and manager support" },
    { name: "Acknowledged", score: 51, change: -4, color: "#bf4b72", meaning: "Recognition, value and visible response" },
    { name: "Connected", score: 64, change: -2, color: "#5e883f", meaning: "Belonging, alignment and information flow" }
  ];

  const pillars = [
    { name: "Mission, strategy & patient impact", short: "Mission & patient impact", description: "Connect work, choices and investment to community need." },
    { name: "Leadership visibility & accountability", short: "Leadership accountability", description: "Make ownership, decisions and follow-through visible." },
    { name: "Communication & information flow", short: "Communication & information", description: "Create one reliable source of truth across sites and shifts." },
    { name: "People, staffing & capability", short: "People & capability", description: "Build the capacity and skills required for sustainable care." },
    { name: "Patient access & care coordination", short: "Access & care coordination", description: "Reduce friction across scheduling, referrals and handoffs." },
    { name: "Culture, safety & wellbeing", short: "Culture, safety & wellbeing", description: "Protect voice, compassion, boundaries and staff wellbeing." },
    { name: "Measurement, learning & sustainment", short: "Measurement & sustainment", description: "Track whether activity becomes a felt, durable change." }
  ];

  const owners = [
    "Dr. Lena Morris · President & CEO",
    "Aisha Grant · Chief People Officer",
    "Miguel Santos · Chief Operating Officer",
    "Dr. Priya Nair · Chief Medical Officer",
    "Renee Brooks · VP Patient Access",
    "Jordan Lee · Chief Quality & Compliance Officer",
    "Marcus Green · Chief Information Officer",
    "Unassigned"
  ];

  const sites = [
    "Organisation-wide", "Patient Access", "Harbor East", "Riverside", "Northside",
    "Behavioral Health", "Care Coordination", "Clinical Services", "Human Resources"
  ];

  const defaultActions = [
    {
      id: "ACT-101", title: "Standardise the patient access call-back and voicemail protocol", pillar: pillars[4].name,
      owner: owners[4], due: "2026-10-15", status: "At risk", progress: 45, dimensions: ["Supported", "Respected"],
      evidence: "Abandoned-call rate below 10% and 90% of messages returned within one business day.",
      nextUpdate: "Confirm staffing model and approve overflow queue coverage.", site: "Patient Access", type: "Programmatic response", publicUpdate: true
    },
    {
      id: "ACT-102", title: "Publish bilingual wayfinding and service-signage standards across all sites", pillar: pillars[4].name,
      owner: owners[2], due: "2026-09-30", status: "On track", progress: 70, dimensions: ["Safe", "Respected", "Connected"],
      evidence: "95% signage audit pass rate and fewer patient navigation complaints.",
      nextUpdate: "Complete Harbor East pilot and release print-ready templates.", site: "Organisation-wide", type: "Quick fix", publicUpdate: true
    },
    {
      id: "ACT-103", title: "Clarify the confidential escalation pathway for safety and employee concerns", pillar: pillars[5].name,
      owner: owners[1], due: "2026-09-26", status: "At risk", progress: 35, dimensions: ["Safe", "Supported"],
      evidence: "85% of staff can identify two safe reporting routes; concerns acknowledged within three working days.",
      nextUpdate: "EMT to approve independent escalation option and non-retaliation language.", site: "Human Resources", type: "Programmatic response", publicUpdate: true
    },
    {
      id: "ACT-104", title: "Complete monthly executive listening rounds at every clinical site", pillar: pillars[1].name,
      owner: owners[0], due: "2026-10-31", status: "On track", progress: 55, dimensions: ["Acknowledged", "Connected"],
      evidence: "Two rounds per site each month, with themes and responses published within ten days.",
      nextUpdate: "Assign October site schedule and publish the first response summary.", site: "Organisation-wide", type: "Culture-shaping habit", publicUpdate: true
    },
    {
      id: "ACT-105", title: "Introduce a closed-loop handoff checklist between primary care and Behavioral Health", pillar: pillars[4].name,
      owner: owners[3], due: "2026-10-20", status: "On track", progress: 60, dimensions: ["Supported", "Connected", "Safe"],
      evidence: "80% of referrals closed within the agreed timeframe and fewer repeat information requests.",
      nextUpdate: "Review pilot data from Riverside and confirm EHR workflow changes.", site: "Behavioral Health", type: "Programmatic response", publicUpdate: false
    },
    {
      id: "ACT-106", title: "Set minimum front-desk staffing and protected break-coverage standards", pillar: pillars[3].name,
      owner: owners[2], due: "2026-09-18", status: "At risk", progress: 20, dimensions: ["Supported", "Safe"],
      evidence: "Missed-break reports reduced by 50% and no site routinely operates below agreed coverage.",
      nextUpdate: "Resolve unfunded 2.5 FTE gap and agree temporary agency ceiling.", site: "Patient Access", type: "Programmatic response", publicUpdate: false
    },
    {
      id: "ACT-107", title: "Use a weekly manager huddle cascade and visible decision log", pillar: pillars[2].name,
      owner: owners[2], due: "2026-10-01", status: "On track", progress: 65, dimensions: ["Connected", "Empowered", "Acknowledged"],
      evidence: "90% of managers deliver the weekly update and staff can locate current decisions.",
      nextUpdate: "Test the one-page huddle guide at Harbor East and Northside.", site: "Organisation-wide", type: "Culture-shaping habit", publicUpdate: true
    },
    {
      id: "ACT-108", title: "Create a recognition rhythm for patient access, facilities and care-coordination work", pillar: pillars[5].name,
      owner: owners[1], due: "2026-10-31", status: "Not started", progress: 0, dimensions: ["Acknowledged", "Respected"],
      evidence: "Each site recognises cross-functional contributions monthly; Acknowledged pulse improves by five points.",
      nextUpdate: "Co-design recognition criteria with staff representatives.", site: "Organisation-wide", type: "Culture-shaping habit", publicUpdate: true
    },
    {
      id: "ACT-109", title: "Approve a RACI for incidents, patient complaints and urgent operational decisions", pillar: pillars[1].name,
      owner: owners[5], due: "2026-10-10", status: "On track", progress: 40, dimensions: ["Empowered", "Safe", "Respected"],
      evidence: "Decision owners and escalation times are clear in 90% of audited cases.",
      nextUpdate: "Resolve ownership overlap between Operations, Quality and site leadership.", site: "Organisation-wide", type: "Quick fix", publicUpdate: false
    },
    {
      id: "ACT-110", title: "Rebuild the staff intranet as the single source for current policies and quick links", pillar: pillars[2].name,
      owner: owners[6], due: "2026-11-15", status: "Not started", progress: 10, dimensions: ["Supported", "Empowered", "Connected"],
      evidence: "Top 25 resources are current, searchable and accessible in three clicks or fewer.",
      nextUpdate: "Name content owners and retire duplicate policy folders.", site: "Organisation-wide", type: "Programmatic response", publicUpdate: false
    },
    {
      id: "ACT-111", title: "Train patient-facing teams in compassionate boundaries and de-escalation", pillar: pillars[3].name,
      owner: owners[3], due: "2026-11-30", status: "On track", progress: 25, dimensions: ["Safe", "Respected", "Supported"],
      evidence: "90% completion and improved confidence in scenario-based practice checks.",
      nextUpdate: "Approve protected learning time and simulation facilitators.", site: "Clinical Services", type: "Programmatic response", publicUpdate: true
    },
    {
      id: "ACT-112", title: "Review scheduling equity, interpreter access and digital-access barriers by site", pillar: pillars[0].name,
      owner: owners[5], due: "2026-12-15", status: "Not started", progress: 0, dimensions: ["Respected", "Empowered"],
      evidence: "Access plan identifies disparities, owners and measurable corrective actions.",
      nextUpdate: "Agree demographic and site-level measures with privacy thresholds.", site: "Organisation-wide", type: "Programmatic response", publicUpdate: false
    },
    {
      id: "ACT-113", title: "Publish transparent internal mobility and role-leveling guidance", pillar: pillars[3].name,
      owner: owners[1], due: "2027-01-15", status: "Not started", progress: 5, dimensions: ["Respected", "Empowered", "Acknowledged"],
      evidence: "All roles have visible progression criteria and internal applicants receive consistent feedback.",
      nextUpdate: "Complete role-family inventory and identify priority pathways.", site: "Human Resources", type: "Programmatic response", publicUpdate: false
    },
    {
      id: "ACT-114", title: "Issue a monthly ‘You said · We heard · We are doing’ workforce update", pillar: pillars[1].name,
      owner: owners[0], due: "2026-09-25", status: "On track", progress: 80, dimensions: ["Acknowledged", "Connected"],
      evidence: "Monthly update published on time with owners, status, delays and completed outcomes.",
      nextUpdate: "Approve first update and confirm translation process.", site: "Organisation-wide", type: "Culture-shaping habit", publicUpdate: true
    },
    {
      id: "ACT-115", title: "Create a quarterly dashboard linking workforce experience to patient-access outcomes", pillar: pillars[6].name,
      owner: owners[5], due: "2026-11-20", status: "On track", progress: 30, dimensions: ["Acknowledged", "Supported", "Connected"],
      evidence: "Board dashboard reports workforce, access and quality measures without identifying individuals.",
      nextUpdate: "Confirm data definitions and reporting owners.", site: "Organisation-wide", type: "Programmatic response", publicUpdate: false
    }
  ];

  const defaultDecisions = [
    { id: "DEC-01", date: "2026-09-12", owner: owners[0], actionId: "ACT-104", decision: "Executive listening rounds will be a standing monthly leadership responsibility.", rationale: "Visibility and follow-through cannot be delegated entirely to site managers." },
    { id: "DEC-02", date: "2026-09-15", owner: owners[2], actionId: "ACT-102", decision: "Use one bilingual signage standard across all facilities.", rationale: "Local variation was creating patient confusion and avoidable rework." },
    { id: "DEC-03", date: "2026-09-18", owner: owners[5], actionId: "ACT-109", decision: "Quality will own the RACI design; Operations will own adoption.", rationale: "Separating standard-setting from implementation resolves the current ownership overlap." }
  ];

  const prioritySignals = [
    { quote: "The mission is why I stay, but it is hard to know which priorities matter most when everything is urgent.", meta: "148 comments · all sites", dimensions: ["Connected", "Empowered"], action: "3 linked actions", level: "Executive focus" },
    { quote: "I raise the same staffing and workflow concerns, but I rarely hear what happened next.", meta: "121 comments · 5 functions", dimensions: ["Acknowledged", "Supported"], action: "4 linked actions", level: "Two at risk" },
    { quote: "Patients feel the handoff gaps when scheduling, clinical teams and Behavioral Health do not have the same information.", meta: "94 comments · care pathway", dimensions: ["Connected", "Supported", "Safe"], action: "3 linked actions", level: "Executive focus" },
    { quote: "Site managers sometimes give different answers about the same policy.", meta: "82 comments · 4 sites", dimensions: ["Respected", "Safe", "Empowered"], action: "2 linked actions", level: "Monitor" }
  ];

  const themes = [
    { title: "Leadership visibility and follow-through", count: 142, severity: "High", quote: "Please tell us what was decided—even when the answer is no.", dimensions: ["Acknowledged", "Connected"] },
    { title: "Staffing, workload and protected breaks", count: 117, severity: "High", quote: "When coverage falls short, the same people absorb it and patients wait longer.", dimensions: ["Supported", "Safe"] },
    { title: "Patient access workflows and telephone queues", count: 104, severity: "High", quote: "The call volume is not the problem by itself; it is the number of different rules we follow.", dimensions: ["Supported", "Empowered"] },
    { title: "Cross-team handoffs and referral closure", count: 91, severity: "High", quote: "A warm handoff only works if both teams know who owns the next step.", dimensions: ["Connected", "Safe"] },
    { title: "Recognition and career development", count: 74, severity: "Medium", quote: "People notice clinical outcomes, but the invisible coordination work is rarely acknowledged.", dimensions: ["Acknowledged", "Respected"] },
    { title: "Policy consistency and information access", count: 68, severity: "Medium", quote: "I should not need to ask three people which version of a policy is current.", dimensions: ["Empowered", "Connected"] },
    { title: "Language access and wayfinding", count: 42, severity: "Medium", quote: "Patients should not have to depend on another patient to find the right service.", dimensions: ["Respected", "Safe"] }
  ];

  const heatmapRows = [
    { label: "Patient Access", values: [55, 52, 72, 48, 45, 57] },
    { label: "Behavioral Health", values: [64, 61, 78, 62, 54, 66] },
    { label: "Clinical Services", values: [63, 60, 79, 59, 53, 65] },
    { label: "Care Coordination", values: [67, 65, 76, 63, 58, 71] },
    { label: "Facilities", values: [null, null, null, null, null, null] }
  ];

  let state = loadState();
  let currentVoiceDraft = null;
  let recognition = null;
  let isRecording = false;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.actions) && Array.isArray(saved.decisions)) return saved;
    } catch (error) {
      console.warn("Demo state could not be loaded", error);
    }
    return { actions: structuredClone(defaultActions), decisions: structuredClone(defaultDecisions), communicationIds: defaultActions.filter(a => a.publicUpdate).map(a => a.id) };
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function slug(value) { return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function actionById(id) { return state.actions.find(action => action.id === id); }
  function dimensionByName(name) { return dimensions.find(dimension => dimension.name === name); }
  function formatDate(value) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`)); }
  function daysTo(value) { const target = new Date(`${value}T00:00:00`); return Math.ceil((target - TODAY) / 86400000); }
  function isOverdue(action) { return action.status !== "Complete" && daysTo(action.due) < 0; }
  function statusClass(status) { return slug(status); }
  function progressColor(status) { return status === "At risk" ? "#c27a16" : status === "Complete" ? "#3677d5" : status === "Not started" ? "#8a94a2" : "#2d8068"; }
  function showToast(title, message = "") {
    const region = document.getElementById("toastRegion");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<strong>${esc(title)}</strong>${message ? `<span>${esc(message)}</span>` : ""}`;
    region.appendChild(toast);
    setTimeout(() => toast.remove(), 4200);
  }

  function chipHtml(name) {
    const dimension = dimensionByName(name);
    const color = dimension ? dimension.color : "#617087";
    return `<span class="chip" style="color:${color};border-color:${color}40;background:${color}0e">${esc(name)}</span>`;
  }

  function statusHtml(status, overdue = false) {
    const label = overdue ? "Overdue" : status;
    const cls = overdue ? "at-risk" : statusClass(status);
    return `<span class="status ${cls}">${esc(label)}</span>`;
  }

  function renderAll() {
    renderMetrics(); renderPrioritySignals(); renderDimensionPulse(); renderPillars();
    renderActionTables(); renderSignalView(); renderLeadershipReview(); renderCommunication(); updateBadges();
  }

  function renderMetrics() {
    const atRisk = state.actions.filter(a => a.status === "At risk" || isOverdue(a)).length;
    const dueSoon = state.actions.filter(a => a.status !== "Complete" && daysTo(a.due) >= 0 && daysTo(a.due) <= 30).length;
    const serviceActions = state.actions.filter(a => a.pillar === pillars[4].name).length;
    const metrics = [
      { label: "Survey participation", value: "62%", note: "386 of 623 employees", tone: "blue", icon: "VOICE" },
      { label: "Readiness index", value: "6.2", note: "+0.2 since prior pulse", tone: "violet", icon: "PULSE" },
      { label: "Tracked actions", value: state.actions.length, note: "Across all seven pillars", tone: "green", icon: "ACT" },
      { label: "Due in 30 days", value: dueSoon, note: "Requires active delivery", tone: "amber", icon: "DUE" },
      { label: "Executive attention", value: atRisk, note: `${serviceActions} patient-service actions`, tone: "red", icon: "RISK" }
    ];
    document.getElementById("metricGrid").innerHTML = metrics.map(metric => `<article class="metric-card"><div class="metric-top"><div><div class="metric-label">${esc(metric.label)}</div><div class="metric-value">${esc(metric.value)}</div><div class="metric-note">${esc(metric.note)}</div></div><div class="metric-icon ${metric.tone}">${metric.icon}</div></div></article>`).join("");
  }

  function renderPrioritySignals() {
    document.getElementById("prioritySignals").innerHTML = prioritySignals.map((signal, index) => `<div class="signal-item"><div class="signal-number">${index + 1}</div><div><div class="signal-quote">“${esc(signal.quote)}”</div><div class="signal-meta"><span>${esc(signal.meta)}</span><span>•</span><div class="chips">${signal.dimensions.map(chipHtml).join("")}</div></div></div><div class="signal-action"><strong>${esc(signal.action)}</strong><span>${esc(signal.level)}</span></div></div>`).join("");
    const riskCount = state.actions.filter(a => a.status === "At risk" || isOverdue(a)).length;
    document.getElementById("riskBadge").textContent = `${riskCount} need attention`;
  }

  function renderDimensionPulse() {
    document.getElementById("dimensionPulse").innerHTML = dimensions.map(d => `<div class="pulse-row"><header><strong>${d.name}</strong><span>${d.score}<em class="trend ${d.change >= 0 ? "up" : "down"}">${d.change >= 0 ? "+" : ""}${d.change}</em></span></header><div class="bar-track"><div class="bar-fill" style="width:${d.score}%;background:${d.color}"></div></div></div>`).join("");
  }

  function pillarScore(actions) {
    if (!actions.length) return 0;
    const avg = actions.reduce((sum, action) => sum + action.progress, 0) / actions.length;
    const riskPenalty = actions.filter(a => a.status === "At risk" || isOverdue(a)).length * 5;
    return Math.max(0, Math.min(100, Math.round(avg - riskPenalty + 22)));
  }

  function renderPillars() {
    document.getElementById("pillarGrid").innerHTML = pillars.map(pillar => {
      const actions = state.actions.filter(action => action.pillar === pillar.name);
      const risks = actions.filter(action => action.status === "At risk" || isOverdue(action)).length;
      const score = pillarScore(actions);
      return `<article class="pillar-card" title="${esc(pillar.description)}"><div class="pillar-top"><div><div class="pillar-name">${esc(pillar.short)}</div><div class="pillar-meta">${actions.length} active ${actions.length === 1 ? "action" : "actions"}</div></div>${risks ? `<span class="risk-count" title="${risks} need attention">${risks}</span>` : ""}</div><div class="pillar-score"><strong>${score}%</strong><div class="bar-track"><div class="bar-fill" style="width:${score}%;background:linear-gradient(90deg,#7359e7,#3677d5)"></div></div></div></article>`;
    }).join("");
  }

  function actionRowHtml(action) {
    return `<tr><td><div class="action-title">${esc(action.title)}</div><div class="chips">${action.dimensions.map(chipHtml).join("")}</div></td><td>${esc(pillars.find(p => p.name === action.pillar)?.short || action.pillar)}</td><td>${esc(action.owner)}</td><td>${esc(formatDate(action.due))}</td><td>${statusHtml(action.status, isOverdue(action))}</td><td class="progress-cell"><div class="progress-line"><div class="bar-track"><div class="bar-fill" style="width:${action.progress}%;background:${progressColor(action.status)}"></div></div><span>${action.progress}%</span></div></td><td class="evidence-cell">${esc(action.evidence)}</td><td><button class="row-button" type="button" data-edit-action="${esc(action.id)}">Review</button></td></tr>`;
  }

  function getFilteredActions() {
    const search = document.getElementById("searchFilter").value.trim().toLowerCase();
    const pillar = document.getElementById("pillarFilter").value;
    const dimension = document.getElementById("dimensionFilter").value;
    const status = document.getElementById("statusFilter").value;
    const site = document.getElementById("siteFilter").value;
    return state.actions.filter(action => {
      const haystack = `${action.title} ${action.owner} ${action.evidence} ${action.nextUpdate}`.toLowerCase();
      return (!search || haystack.includes(search)) && (pillar === "all" || action.pillar === pillar) && (dimension === "all" || action.dimensions.includes(dimension)) && (status === "all" || action.status === status) && (site === "all" || action.site === site);
    });
  }

  function renderActionTables() {
    const sorted = [...state.actions].sort((a, b) => {
      const priorityA = (a.status === "At risk" || isOverdue(a)) ? 0 : a.status === "On track" ? 1 : 2;
      const priorityB = (b.status === "At risk" || isOverdue(b)) ? 0 : b.status === "On track" ? 1 : 2;
      return priorityA - priorityB || a.due.localeCompare(b.due);
    });
    document.getElementById("overviewActionRows").innerHTML = sorted.slice(0, 7).map(actionRowHtml).join("");
    const filtered = getFilteredActions();
    document.getElementById("actionRows").innerHTML = filtered.map(actionRowHtml).join("");
    document.getElementById("actionEmptyState").hidden = filtered.length !== 0;
    document.getElementById("filteredSummary").textContent = `Showing ${filtered.length} of ${state.actions.length} actions`;
  }

  function renderSignalView() {
    document.getElementById("dimensionCardGrid").innerHTML = dimensions.map(d => {
      const linked = state.actions.filter(action => action.dimensions.includes(d.name)).length;
      return `<article class="dimension-card"><div class="dimension-card-top"><div class="dimension-card-title"><span class="dimension-dot" style="background:${d.color}"></span>${d.name}</div><span class="trend ${d.change >= 0 ? "up" : "down"}">${d.change >= 0 ? "+" : ""}${d.change}</span></div><div class="dimension-card-score">${d.score}</div><p>${esc(d.meaning)}</p><div class="bar-track"><div class="bar-fill" style="width:${d.score}%;background:${d.color}"></div></div><footer><span>Linked leadership actions</span><strong>${linked}</strong></footer></article>`;
    }).join("");
    document.getElementById("themeExplorer").innerHTML = themes.map(theme => `<div class="theme-item"><div class="theme-top"><h3>${esc(theme.title)}</h3><span class="theme-count">${theme.count} comments</span></div><blockquote>“${esc(theme.quote)}”</blockquote><div class="theme-footer"><div class="chips">${theme.dimensions.map(chipHtml).join("")}</div><span class="theme-severity ${theme.severity.toLowerCase()}">${theme.severity} priority</span></div></div>`).join("");
    const header = `<div></div>${dimensions.map(d => `<div class="heatmap-header">${d.name}</div>`).join("")}`;
    const rows = heatmapRows.map(row => `<div class="heatmap-label">${esc(row.label)}</div>${row.values.map(value => {
      if (value === null) return `<div class="heat-cell heat-suppressed" title="Fewer than 10 responses">—</div>`;
      const cls = value >= 70 ? "heat-high" : value >= 60 ? "heat-mid" : "heat-low";
      return `<div class="heat-cell ${cls}">${value}</div>`;
    }).join("")}`).join("");
    document.getElementById("heatmap").innerHTML = header + rows;
  }

  function renderLeadershipReview() {
    const queue = state.actions.filter(action => action.status === "At risk" || isOverdue(action)).sort((a, b) => a.due.localeCompare(b.due));
    document.getElementById("decisionQueue").innerHTML = queue.length ? queue.map(action => `<div class="decision-item"><div><h3>${esc(action.title)}</h3><p>${esc(action.nextUpdate)}</p><div class="decision-meta"><span class="meta-pill">${esc(action.owner)}</span><span class="meta-pill">${esc(action.site)}</span><span class="meta-pill">Due ${esc(formatDate(action.due))}</span></div></div><div class="decision-side"><strong>${isOverdue(action) ? "Overdue" : "Decision required"}</strong><button class="row-button" type="button" data-record-decision="${esc(action.id)}">Record decision</button></div></div>`).join("") : `<div class="empty-state"><strong>No executive decisions are currently required.</strong></div>`;
    const ownerCounts = owners.filter(owner => owner !== "Unassigned").map(owner => ({ owner, count: state.actions.filter(action => action.owner === owner && action.status !== "Complete").length }));
    const max = Math.max(1, ...ownerCounts.map(item => item.count));
    document.getElementById("ownerLoad").innerHTML = ownerCounts.map(item => `<div class="owner-row"><header><strong>${esc(item.owner.split(" · ")[0])}</strong><span>${item.count} actions</span></header><div class="bar-track"><div class="bar-fill" style="width:${item.count / max * 100}%;background:linear-gradient(90deg,#7359e7,#3677d5)"></div></div></div>`).join("");
    document.getElementById("decisionLog").innerHTML = [...state.decisions].reverse().map(decision => {
      const action = actionById(decision.actionId);
      return `<article class="decision-card"><time>${esc(formatDate(decision.date))}</time><h3>${esc(decision.decision)}</h3><p>${esc(decision.rationale)}</p><footer>${esc(decision.owner)}${action ? ` · ${esc(action.id)}` : ""}</footer></article>`;
    }).join("") || `<div class="empty-state"><strong>No decisions recorded.</strong></div>`;
  }

  function renderCommunication() {
    document.getElementById("communicationActions").innerHTML = state.actions.map(action => `<label class="communication-row"><input type="checkbox" data-communication-id="${esc(action.id)}" ${state.communicationIds.includes(action.id) ? "checked" : ""}><div><h3>${esc(action.title)}</h3><p>${esc(action.evidence)}</p></div>${statusHtml(action.status, isOverdue(action))}</label>`).join("");
    const selected = state.communicationIds.map(actionById).filter(Boolean);
    document.getElementById("staffUpdatePreview").innerHTML = selected.length ? selected.map(action => `<div class="staff-update-item"><span>${esc(action.status === "Complete" ? "Completed" : "We are doing")}</span><strong>${esc(action.title)}</strong><p>${esc(action.status === "Complete" ? action.evidence : action.nextUpdate)}</p></div>`).join("") : `<div class="staff-update-item"><strong>Select at least one action</strong><p>The staff update will appear here.</p></div>`;
  }

  function updateBadges() {
    document.getElementById("actionCountBadge").textContent = state.actions.length;
    document.getElementById("reviewCountBadge").textContent = state.actions.filter(a => a.status === "At risk" || isOverdue(a)).length;
  }

  function populateControls() {
    const setOptions = (id, values, label = value => value) => {
      const select = document.getElementById(id);
      const existing = Array.from(select.options).map(option => option.value);
      values.forEach(value => { if (!existing.includes(value)) select.add(new Option(label(value), value)); });
    };
    setOptions("pillarFilter", pillars.map(p => p.name), name => pillars.find(p => p.name === name).short);
    setOptions("dimensionFilter", dimensions.map(d => d.name));
    setOptions("siteFilter", sites);
    setOptions("actionPillar", pillars.map(p => p.name), name => pillars.find(p => p.name === name).short);
    setOptions("actionOwner", owners);
    setOptions("actionSite", sites);
    setOptions("decisionOwner", owners.filter(owner => owner !== "Unassigned"));
    document.getElementById("dimensionCheckboxes").innerHTML = dimensions.map(d => `<label class="checkbox-option"><input type="checkbox" name="actionDimension" value="${esc(d.name)}">${esc(d.name)}</label>`).join("");
    populateDecisionActions();
  }

  function populateDecisionActions(selectedId = "") {
    const select = document.getElementById("decisionAction");
    select.innerHTML = state.actions.map(action => `<option value="${esc(action.id)}" ${action.id === selectedId ? "selected" : ""}>${esc(action.id)} · ${esc(action.title)}</option>`).join("");
  }

  function switchView(view) {
    document.querySelectorAll(".tab").forEach(tab => { const active = tab.dataset.view === view; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); });
    document.querySelectorAll("[data-view-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === view));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearFilters() {
    document.getElementById("searchFilter").value = "";
    ["pillarFilter", "dimensionFilter", "statusFilter", "siteFilter"].forEach(id => document.getElementById(id).value = "all");
    renderActionTables();
  }

  function openActionDialog(action = null) {
    const dialog = document.getElementById("actionDialog");
    document.getElementById("actionDialogTitle").textContent = action ? "Review action" : "Add an action";
    document.getElementById("actionId").value = action?.id || "";
    document.getElementById("actionTitle").value = action?.title || "";
    document.getElementById("actionPillar").value = action?.pillar || pillars[0].name;
    document.getElementById("actionOwner").value = action?.owner || "Unassigned";
    const future = new Date(TODAY); future.setDate(future.getDate() + 30);
    document.getElementById("actionDue").value = action?.due || future.toISOString().slice(0, 10);
    document.getElementById("actionStatus").value = action?.status || "Not started";
    document.getElementById("actionSite").value = action?.site || "Organisation-wide";
    document.getElementById("actionType").value = action?.type || "Programmatic response";
    document.querySelectorAll("input[name=actionDimension]").forEach(input => input.checked = action?.dimensions.includes(input.value) || false);
    document.getElementById("actionEvidence").value = action?.evidence || "";
    document.getElementById("actionNextUpdate").value = action?.nextUpdate || "";
    document.getElementById("actionProgress").value = action?.progress || 0;
    document.getElementById("progressOutput").value = `${action?.progress || 0}%`;
    dialog.showModal();
  }

  function saveActionFromForm(event) {
    event.preventDefault();
    if (event.submitter?.value === "cancel") { document.getElementById("actionDialog").close(); return; }
    const form = document.getElementById("actionForm");
    if (!form.reportValidity()) return;
    const selectedDimensions = Array.from(document.querySelectorAll("input[name=actionDimension]:checked")).map(input => input.value);
    if (!selectedDimensions.length) { showToast("Select at least one dimension", "Every action must remain connected to the employee experience."); return; }
    const id = document.getElementById("actionId").value;
    const existing = actionById(id);
    const action = {
      id: id || `ACT-${String(100 + state.actions.length + 1)}`,
      title: document.getElementById("actionTitle").value.trim(),
      pillar: document.getElementById("actionPillar").value,
      owner: document.getElementById("actionOwner").value,
      due: document.getElementById("actionDue").value,
      status: document.getElementById("actionStatus").value,
      site: document.getElementById("actionSite").value,
      type: document.getElementById("actionType").value,
      dimensions: selectedDimensions,
      evidence: document.getElementById("actionEvidence").value.trim(),
      nextUpdate: document.getElementById("actionNextUpdate").value.trim(),
      progress: Number(document.getElementById("actionProgress").value),
      publicUpdate: existing?.publicUpdate || false
    };
    if (existing) state.actions[state.actions.findIndex(item => item.id === id)] = action;
    else state.actions.unshift(action);
    persist(); populateDecisionActions(); renderAll(); document.getElementById("actionDialog").close();
    showToast(existing ? "Action updated" : "Action added", `${action.owner} owns the next update.`);
  }

  const voiceExample = "Patient access teams report that inconsistent break coverage and call-back rules are increasing stress and patient wait times. Miguel Santos will approve a minimum staffing and overflow protocol by October 18. Keep the action at risk until every site has two weeks of coverage data and the abandoned-call rate is below ten percent.";

  function openVoiceDialog() {
    document.getElementById("voiceDialog").showModal();
    document.getElementById("voiceCaptureStage").hidden = false;
    document.getElementById("voiceReviewStage").hidden = true;
    document.getElementById("reviewStep").classList.remove("active");
    document.getElementById("voiceTranscript").value = "";
    document.getElementById("analyseVoiceButton").disabled = true;
    document.getElementById("recordingLabel").textContent = "Click to start speaking";
    stopRecording();
  }

  function closeVoiceDialog() { stopRecording(); document.getElementById("voiceDialog").close(); }

  function toggleRecording() {
    if (isRecording) { stopRecording(); return; }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      document.getElementById("voiceTranscript").value = voiceExample;
      document.getElementById("analyseVoiceButton").disabled = false;
      showToast("Live speech is unavailable in this browser", "A healthcare example has been loaded for the demonstration.");
      return;
    }
    recognition = new Recognition(); recognition.continuous = true; recognition.interimResults = true; recognition.lang = "en-US";
    let finalTranscript = document.getElementById("voiceTranscript").value.trim();
    recognition.onresult = event => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript = `${finalTranscript} ${text}`.trim(); else interim += text;
      }
      document.getElementById("voiceTranscript").value = `${finalTranscript} ${interim}`.trim();
      document.getElementById("analyseVoiceButton").disabled = !document.getElementById("voiceTranscript").value.trim();
    };
    recognition.onerror = () => { stopRecording(); showToast("Microphone permission was unavailable", "Type the update or use the healthcare example instead."); };
    recognition.onend = () => { if (isRecording) stopRecording(); };
    recognition.start(); isRecording = true;
    document.getElementById("recordButton").classList.add("recording");
    document.getElementById("recordingLabel").textContent = "Listening… click to stop";
  }

  function stopRecording() {
    if (recognition && isRecording) { try { recognition.stop(); } catch (_) {} }
    recognition = null; isRecording = false;
    document.getElementById("recordButton")?.classList.remove("recording");
    if (document.getElementById("recordingLabel")) document.getElementById("recordingLabel").textContent = "Click to start speaking";
  }

  function analyseTranscript(text) {
    const lower = text.toLowerCase();
    let pillar = pillars[6].name, owner = "Unassigned", site = "Organisation-wide", dims = ["Acknowledged", "Connected"], evidence = "Milestone completed and outcome measure shows sustained improvement.";
    if (/patient access|call|voicemail|appointment|scheduling|wait time/.test(lower)) { pillar = pillars[4].name; owner = owners[4]; site = "Patient Access"; dims = ["Supported", "Respected"]; evidence = "Abandoned-call rate below 10% and 90% of messages returned within one business day."; }
    if (/staffing|coverage|workload|break/.test(lower)) { pillar = pillars[3].name; owner = owners[2]; dims = ["Supported", "Safe"]; evidence = "No site routinely operates below minimum coverage and missed-break reports fall by 50%."; }
    if (/leadership|listening|follow.?up|executive/.test(lower)) { pillar = pillars[1].name; owner = owners[0]; dims = ["Acknowledged", "Connected"]; }
    if (/handoff|referral|behavioral health|care coordination/.test(lower)) { pillar = pillars[4].name; owner = owners[3]; site = "Care Coordination"; dims = ["Connected", "Supported", "Safe"]; evidence = "80% of referrals close within the agreed timeframe."; }
    if (/intranet|policy|information|communication/.test(lower)) { pillar = pillars[2].name; owner = owners[6]; dims = ["Empowered", "Connected", "Supported"]; }
    if (/safety|concern|retaliation|wellbeing/.test(lower)) { pillar = pillars[5].name; owner = owners[1]; dims = ["Safe", "Supported"]; }
    owners.forEach(candidate => { const surname = candidate.split(" · ")[0].split(" ").pop().toLowerCase(); if (lower.includes(surname)) owner = candidate; });
    const date = new Date(TODAY); date.setDate(date.getDate() + 30);
    const title = text.split(/[.!?]/)[0].replace(/^(patient access teams report that|employee comments show that|staff report that)/i, "Address").trim();
    return {
      id: `ACT-${String(100 + state.actions.length + 1)}`, title: title.length > 12 ? title.charAt(0).toUpperCase() + title.slice(1) : "Review and resolve the workforce issue described in the update",
      pillar, owner, due: date.toISOString().slice(0, 10), status: /at risk|amber|delay|urgent/.test(lower) ? "At risk" : "On track",
      progress: 0, dimensions: dims, evidence, nextUpdate: "Owner to confirm resources, first milestone and communication-back date.", site,
      type: /monthly|weekly|routine|rounds/.test(lower) ? "Culture-shaping habit" : "Programmatic response", publicUpdate: false
    };
  }

  function showVoiceReview() {
    const text = document.getElementById("voiceTranscript").value.trim(); if (!text) return;
    stopRecording(); currentVoiceDraft = analyseTranscript(text);
    document.getElementById("voiceCaptureStage").hidden = true; document.getElementById("voiceReviewStage").hidden = false; document.getElementById("reviewStep").classList.add("active");
    document.getElementById("voiceDraftSummary").innerHTML = `<div class="draft-field full"><span>Action</span><strong>${esc(currentVoiceDraft.title)}</strong></div><div class="draft-field"><span>Pillar</span><strong>${esc(pillars.find(p => p.name === currentVoiceDraft.pillar)?.short)}</strong></div><div class="draft-field"><span>Owner</span><strong>${esc(currentVoiceDraft.owner)}</strong></div><div class="draft-field"><span>Due</span><strong>${esc(formatDate(currentVoiceDraft.due))}</strong></div><div class="draft-field"><span>Status</span><strong>${esc(currentVoiceDraft.status)}</strong></div><div class="draft-field full"><span>Dimensions affected</span><div class="chips">${currentVoiceDraft.dimensions.map(chipHtml).join("")}</div></div><div class="draft-field full"><span>Evidence of change</span><strong>${esc(currentVoiceDraft.evidence)}</strong></div>`;
  }

  function addVoiceAction() {
    if (!currentVoiceDraft) return;
    state.actions.unshift(currentVoiceDraft); persist(); populateDecisionActions(); renderAll(); closeVoiceDialog(); switchView("actions");
    showToast("Voice update added to the tracker", "Open the action to refine the owner, deadline or evidence.");
  }

  function openDecisionDialog(actionId = "") {
    populateDecisionActions(actionId); document.getElementById("decisionText").value = ""; document.getElementById("decisionRationale").value = ""; document.getElementById("decisionOwner").value = owners[0]; document.getElementById("decisionDialog").showModal();
  }

  function saveDecision(event) {
    event.preventDefault(); if (event.submitter?.value === "cancel") { document.getElementById("decisionDialog").close(); return; }
    const form = document.getElementById("decisionForm"); if (!form.reportValidity()) return;
    state.decisions.push({ id: `DEC-${String(state.decisions.length + 1).padStart(2, "0")}`, date: new Date().toISOString().slice(0, 10), owner: document.getElementById("decisionOwner").value, actionId: document.getElementById("decisionAction").value, decision: document.getElementById("decisionText").value.trim(), rationale: document.getElementById("decisionRationale").value.trim() });
    persist(); renderLeadershipReview(); document.getElementById("decisionDialog").close(); showToast("Decision recorded", "The leadership log has been updated.");
  }

  function exportCsv() {
    const rows = [["ID","Action","Pillar","Owner","Due","Status","Progress","Dimensions","Site / Function","Action Type","Evidence","Next Update"], ...state.actions.map(a => [a.id,a.title,a.pillar,a.owner,a.due,a.status,`${a.progress}%`,a.dimensions.join("; "),a.site,a.type,a.evidence,a.nextUpdate])];
    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "healthcare-voice-to-action-tracker.csv"; link.click(); URL.revokeObjectURL(url); showToast("Action portfolio exported", "The CSV is ready for analysis or reporting.");
  }

  function staffUpdateText() {
    const selected = state.communicationIds.map(actionById).filter(Boolean);
    return `HARBOR COMMUNITY HEALTH NETWORK\nWhat we heard and what happens next\n\n${selected.map(action => `${action.status === "Complete" ? "COMPLETED" : "WE ARE DOING"}: ${action.title}\n${action.status === "Complete" ? action.evidence : action.nextUpdate}`).join("\n\n")}\n\nWe will update this summary monthly, including when an action is delayed or changes direction.`;
  }

  async function copyStaffUpdate() {
    const text = staffUpdateText();
    try { await navigator.clipboard.writeText(text); }
    catch (_) { const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); }
    showToast("Staff update copied", "Paste it into email, the intranet or a leadership briefing.");
  }

  function bindEvents() {
    document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => switchView(tab.dataset.view)));
    ["searchFilter","pillarFilter","dimensionFilter","statusFilter","siteFilter"].forEach(id => document.getElementById(id).addEventListener(id === "searchFilter" ? "input" : "change", renderActionTables));
    ["clearFiltersButton","emptyClearFilters"].forEach(id => document.getElementById(id).addEventListener("click", clearFilters));
    ["newActionButton","newActionOverview"].forEach(id => document.getElementById(id).addEventListener("click", () => openActionDialog()));
    ["openVoiceButton","voiceFromActions"].forEach(id => document.getElementById(id).addEventListener("click", openVoiceDialog));
    document.getElementById("actionProgress").addEventListener("input", event => document.getElementById("progressOutput").value = `${event.target.value}%`);
    document.getElementById("actionForm").addEventListener("submit", saveActionFromForm);
    document.getElementById("recordDecisionButton").addEventListener("click", () => openDecisionDialog());
    document.getElementById("decisionForm").addEventListener("submit", saveDecision);
    document.getElementById("exportButton").addEventListener("click", exportCsv);
    document.getElementById("printButton").addEventListener("click", () => window.print());
    document.getElementById("copyUpdateButton").addEventListener("click", copyStaffUpdate);
    document.getElementById("resetButton").addEventListener("click", () => { if (confirm("Reset all prototype changes and restore the healthcare demonstration data?")) { localStorage.removeItem(STORAGE_KEY); state = loadState(); populateDecisionActions(); renderAll(); showToast("Demo reset", "The original healthcare data has been restored."); } });
    document.getElementById("closeVoiceDialog").addEventListener("click", closeVoiceDialog);
    document.getElementById("cancelVoiceButton").addEventListener("click", closeVoiceDialog);
    document.getElementById("recordButton").addEventListener("click", toggleRecording);
    document.getElementById("loadVoiceExample").addEventListener("click", () => { document.getElementById("voiceTranscript").value = voiceExample; document.getElementById("analyseVoiceButton").disabled = false; });
    document.getElementById("voiceTranscript").addEventListener("input", event => document.getElementById("analyseVoiceButton").disabled = !event.target.value.trim());
    document.getElementById("analyseVoiceButton").addEventListener("click", showVoiceReview);
    document.getElementById("backToTranscript").addEventListener("click", () => { document.getElementById("voiceReviewStage").hidden = true; document.getElementById("voiceCaptureStage").hidden = false; document.getElementById("reviewStep").classList.remove("active"); });
    document.getElementById("addVoiceActionButton").addEventListener("click", addVoiceAction);
    document.addEventListener("click", event => {
      const edit = event.target.closest("[data-edit-action]"); if (edit) openActionDialog(actionById(edit.dataset.editAction));
      const decision = event.target.closest("[data-record-decision]"); if (decision) openDecisionDialog(decision.dataset.recordDecision);
    });
    document.addEventListener("change", event => {
      if (event.target.matches("[data-communication-id]")) {
        const id = event.target.dataset.communicationId;
        if (event.target.checked && !state.communicationIds.includes(id)) state.communicationIds.push(id);
        if (!event.target.checked) state.communicationIds = state.communicationIds.filter(item => item !== id);
        persist(); renderCommunication();
      }
    });
    ["actionDialog","voiceDialog","decisionDialog"].forEach(id => document.getElementById(id).addEventListener("click", event => { if (event.target === event.currentTarget) { if (id === "voiceDialog") stopRecording(); event.currentTarget.close(); } }));
    document.addEventListener("keydown", event => { if (event.key === "Escape") stopRecording(); });
  }

  populateControls(); bindEvents(); renderAll();
})();
