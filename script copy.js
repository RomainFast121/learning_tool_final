const initialResources = {
  social: 55,
  financial: 55,
  eco: 55,
};

let state = {
  resources: { ...initialResources },
  currentNodeId: null,
  completedNodes: new Set(['center']),
  availableNodes: new Set(['center', 'funding_quiz_intro']),
  feedbackByNode: {},
  branchChoice: null,
  playerName: '',
  playerTheme: 'midnight',
  lastCompletedNodeId: 'center',
  onboardingComplete: false,
};

const nodeElements = {};

const refs = {
  setupOverlay: document.getElementById('setupOverlay'),
  setupNameStep: document.getElementById('setupNameStep'),
  setupThemeStep: document.getElementById('setupThemeStep'),
  playerNameInput: document.getElementById('playerNameInput'),
  confirmNameBtn: document.getElementById('confirmNameBtn'),
  backToNameBtn: document.getElementById('backToNameBtn'),
  confirmThemeBtn: document.getElementById('confirmThemeBtn'),
  mainLayout: document.getElementById('mainLayout'),
  boardViewport: document.querySelector('.board-viewport'),
  board: document.getElementById('board'),
  boardLines: document.querySelector('.board-lines'),
  storyPanel: document.getElementById('storyPanel'),
  contentCard: document.getElementById('contentCard'),
  resourcesBox: document.querySelector('.resources-box'),
  socialBar: document.getElementById('socialBar'),
  financialBar: document.getElementById('financialBar'),
  ecoBar: document.getElementById('ecoBar'),
  socialValue: document.getElementById('socialValue'),
  financialValue: document.getElementById('financialValue'),
  ecoValue: document.getElementById('ecoValue'),
  resetBtn: document.getElementById('resetBtn'),
};

const nodes = {
  center: {
    id: 'center',
    type: 'story',
    title: 'Project Start',
    badge: 'Story step',
    text: 'You are a researcher joining a project on AI for sickness detection. You will move from node to node, discover situations that happen during R&D, and make choices that shape the project. To assist you, three resources track key dimensions you should balance: social fairness, financial viability, and eco-friendliness. If one gets too low, some future options may become harder to justify or unavailable. This tutorial only opens the funding path, and it introduces the three node types used in the game: story, information, and quiz nodes.',
    secondaryAction: {
      label: 'Open funding tutorial',
      action: () => openNode('funding_quiz_intro'),
    },
    introText: 'This is the tutorial hub. It briefly shows how the prototype works before the player enters the real game.',
  },
  funding_quiz_intro: {
    id: 'funding_quiz_intro',
    type: 'quiz',
    title: 'Funding – first choice',
    badge: 'Quiz node',
    text: 'A potential sponsor is ready to support the project. Before moving forward, you need to decide which funding attitude is the most responsible at this stage of the project.',
    introText: 'You are about to try a quiz node. Quiz nodes ask you to compare options and reflect on which decision is the most responsible.',
    choices: [
      {
        text: 'Accept any funding source immediately, as long as the budget is large enough.',
        correct: false,
        retry: true,
        feedbackTitle: 'This option is too simplistic.',
        feedbackStory: 'The project may gain money quickly, but the team would ignore possible conflicts of interest and long-term consequences.',
        feedbackText: 'At the start of an R&D process, funding should not be judged only by speed or amount. Ethical constraints and future impact still matter.',
      },
      {
        text: 'Delay all funding decisions until the AI model is already deployed.',
        correct: false,
        retry: true,
        feedbackTitle: 'This creates another problem.',
        feedbackStory: 'Without a funding strategy, the project cannot be framed properly and some later decisions may become incoherent or unrealistic.',
        feedbackText: 'Funding choices happen early and influence many later steps. Avoiding the decision is not a good answer here.',
      },
      {
        text: 'Choose the sponsor that asks for the fastest deployment, so the project can grow quickly.',
        correct: false,
        retry: true,
        feedbackTitle: 'This option gives too much power to short-term pressure.',
        feedbackStory: 'The team risks shaping the whole project around speed, even if important safeguards are not ready yet.',
        feedbackText: 'A good funding strategy should leave room for ethical review and responsible development, not only acceleration.',
      },
      {
        text: 'Select funding that supports development while still leaving space for review, adjustment, and responsible project choices.',
        correct: true,
        next: 'funding_story',
        feedbackTitle: 'You chose a more balanced funding logic.',
        feedbackStory: 'The team secures support without locking itself into a rushed path from the beginning.',
        feedbackText: 'This answer works better because it keeps the project viable while preserving room for responsible decision-making later on.',
        impact: { social: 1, financial: 1, eco: 1 },
      },
    ],
  },
  funding_story: {
    id: 'funding_story',
    type: 'story',
    title: 'Funding direction',
    badge: 'Story step',
    text: 'With initial funding secured, the sponsor now asks how the first phase should be presented. Some team members want to emphasize rapid visible progress. Others prefer a slower framing that highlights credibility, careful testing, and trust-building.',
    introText: 'This is a story node. Story nodes move the scenario forward and let the player shape the direction of the project.',
    choices: [
      {
        text: 'Present the project as a fast-moving innovation and focus on visible short-term results.',
        next: 'funding_branch_quiz',
        branch: 'path1',
        feedbackTitle: 'You chose a more ambitious public direction.',
        feedbackStory: 'The team now needs to justify this stronger promise and prepare a more demanding follow-up discussion.',
        feedbackText: 'This path is not automatically wrong, but it increases pressure on later decisions and may create stronger expectations.',
        impact: { social: -6, financial: 10, eco: -2 },
      },
      {
        text: 'Stress quick momentum so that future investors see strong commercial potential early on.',
        next: 'funding_branch_quiz',
        branch: 'path1',
        feedbackTitle: 'You chose a growth-oriented framing.',
        feedbackStory: 'This can attract attention, but it also makes later trade-offs around responsibility more sensitive.',
        feedbackText: 'Fast-growth narratives can be useful, but they often reduce the room for caution once the project moves forward.',
        impact: { social: -4, financial: 9, eco: -3 },
      },
      {
        text: 'Present the project as a careful research process that needs room for checks and adaptation.',
        next: 'funding_info',
        branch: 'path2',
        feedbackTitle: 'You chose a more cautious direction.',
        feedbackStory: 'The team enters the next phase with less pressure and more space to explain uncertainty openly.',
        feedbackText: 'This direction supports credibility and may reduce unrealistic expectations from stakeholders.',
        impact: { social: 8, financial: -5, eco: 1 },
      },
      {
        text: 'Highlight responsibility and transparency before promising strong external results.',
        next: 'funding_info',
        branch: 'path2',
        feedbackTitle: 'You chose a trust-oriented direction.',
        feedbackStory: 'The project moves forward with a more careful public message and avoids committing too early.',
        feedbackText: 'A transparent framing can support stronger long-term legitimacy, even if it looks less spectacular at first.',
        impact: { social: 7, financial: -4, eco: 2 },
      },
    ],
  },
  funding_branch_quiz: {
    id: 'funding_branch_quiz',
    type: 'quiz',
    title: 'Budget review',
    badge: 'Quiz node',
    text: 'Because the project was presented in a more ambitious way, the team now has to review its internal priorities. Which reaction is the most reasonable?',
    introText: 'This second quiz node builds on the earlier story choice and shows how one decision creates pressure later in the project.',
    choices: [
      {
        text: 'Cut all review steps so the team can match the ambitious message immediately.',
        correct: false,
        retry: true,
        feedbackTitle: 'This answer is too risky.',
        feedbackStory: 'Trying to match ambition only by removing safeguards would weaken the quality of the project.',
        feedbackText: 'Greater external pressure does not justify abandoning review or reflection.',
      },
      {
        text: 'Keep a clear review process even if it slows the image of rapid progress slightly.',
        correct: true,
        next: 'funding_info',
        feedbackTitle: 'You kept a more robust internal balance.',
        feedbackStory: 'The team adjusts expectations and protects the quality of the work before moving on.',
        feedbackText: 'This answer shows that ambition can remain compatible with responsible project management.',
        impact: { social: 1, financial: 2, eco: 0 },
      },
      {
        text: 'Ignore the tension and assume the team will solve it naturally later on.',
        correct: false,
        retry: true,
        feedbackTitle: 'This does not really solve the issue.',
        feedbackStory: 'The tension remains and would probably reappear later in a more difficult form.',
        feedbackText: 'When pressure is visible, the team should address it explicitly rather than postpone it without a plan.',
      },
      {
        text: 'Give all strategic choices to the sponsor to simplify the process.',
        correct: false,
        retry: true,
        feedbackTitle: 'This would reduce the team’s responsibility too much.',
        feedbackStory: 'The project would lose autonomy and later ethical decisions could become harder to defend.',
        feedbackText: 'Funding partners matter, but they should not replace internal responsibility.',
      },
    ],
  },
  funding_info: {
    id: 'funding_info',
    type: 'info',
    title: 'Funding note',
    badge: 'Information node',
    text: 'Funding does more than provide money. It also shapes incentives, priorities, and the level of pressure surrounding the project. In a learning tool on ethics and sustainability, this kind of node gives the player a short piece of knowledge without forcing another decision immediately.',
    introText: 'This is an information node. Information nodes pause the decision flow and highlight an idea the player should keep in mind.',
    extraHtml: '<h3>Why this matters</h3><p>A sponsor can influence timelines, the way success is defined, and the room left for transparency or review. This is why funding is treated as part of the ethical context, not only as a practical issue.</p>',
    secondaryAction: {
      label: 'Finish this node',
      action: () => completeInfoNodeAndAdvance(),
    },
  },
  funding_final_quiz: {
    id: 'funding_final_quiz',
    type: 'quiz',
    title: 'Final check',
    badge: 'Quiz node',
    text: 'To finish the tutorial, choose the statement that best summarizes what this funding sequence was meant to teach.',
    choices: [
      {
        text: 'Funding is mainly a financial issue and does not really affect ethical decisions later on.',
        correct: false,
        retry: true,
        feedbackTitle: 'This misses the main point.',
        feedbackStory: 'The tutorial showed that funding influences how the whole project is framed and managed.',
        feedbackText: 'In this game, early organizational choices already shape later ethical tensions.',
      },
      {
        text: 'The best strategy is always to promise fast results first and think about consequences later.',
        correct: false,
        retry: true,
        feedbackTitle: 'This goes against the logic of the tutorial.',
        feedbackStory: 'The project would become harder to steer responsibly if promises dominate reflection from the start.',
        feedbackText: 'The tutorial is meant to show trade-offs, not to reward speed alone.',
      },
      {
        text: 'Responsible funding choices can influence later pressure, governance, and room for ethical review.',
        correct: true,
        completePrototype: true,
        feedbackTitle: 'Correct tutorial takeaway.',
        feedbackStory: 'You completed the tutorial path and saw how story steps, information nodes, and quiz nodes can work together.',
        feedbackText: 'This is the key lesson of the prototype: early project framing already affects later ethical and sustainability decisions.',
        impact: { social: 1, financial: 1, eco: 1 },
      },
      {
        text: 'Only technical performance matters in the first stages of an AI health project.',
        correct: false,
        retry: true,
        feedbackTitle: 'This answer is too narrow.',
        feedbackStory: 'The prototype is built precisely to show that technical progress is only one part of the situation.',
        feedbackText: 'Ethics, sustainability, and governance are present from the beginning, not only at deployment.',
      },
    ],
  },
  team_creation: {
    id: 'team_creation',
    type: 'story',
    title: 'Team Creation',
    badge: 'Story step',
    text: 'Placeholder node for a future branch.',
    introText: 'This branch is not part of the scaled-down tutorial yet.',
  },
  data_management: {
    id: 'data_management',
    type: 'info',
    title: 'Data Management',
    badge: 'Information node',
    text: 'Placeholder node for a future branch.',
    introText: 'This branch is not part of the scaled-down tutorial yet.',
  },
  deployment: {
    id: 'deployment',
    type: 'quiz',
    title: 'Deployment',
    badge: 'Quiz node',
    text: 'Placeholder node for a future branch.',
    introText: 'This branch is not part of the scaled-down tutorial yet.',
  },
};

const onboardingPages = [
  {
    badge: 'Welcome',
    title: (name) => `Welcome ${name}, you just entered the game!`,
    text:
      'You are stepping into the role of a researcher leading an AI-for-sickness-detection project. As the story unfolds, you will face tensions around funding, communication, responsibility, timing, and project management. Your goal is not only to move the story forward, but also to learn how early decisions can create ethical and sustainability trade-offs later on.',
    extraHtml:
      '<p>This small version is a tutorial: it introduces the logic of the game, the kind of dilemmas you will face, and the learning goals behind the design.</p><p>We will shortly explain you how to navigate, please click on the next button at the bottom of the window.</p>',
    showResources: false,
  },
  {
    badge: 'Board Structure',
    title: () => 'How the board works',
    text:
      'The board represents the project timeline as a set of connected nodes. As you move from one node to another, the story progresses and new situations appear.',
    extraHtml:
      `<p>Different node shapes correspond to different types of interaction: story nodes move the narrative forward, information nodes pause the story to explain an important point, and quiz nodes test whether you identified the most responsible answer.</p>
      <div class="guide-shot">
        <div class="guide-shot-header">Board overview</div>
        <div class="guide-legend">
          <span><i class="dot blocked"></i>Blocked</span>
          <span><i class="dot available"></i>Available</span>
          <span><i class="dot completed"></i>Completed</span>
          <span><i class="shape-demo shape-story"></i>Story</span>
          <span><i class="shape-demo shape-info"></i>Info</span>
          <span><i class="shape-demo shape-quiz"></i>Quiz</span>
        </div>
        <div class="guide-board">
          <span class="guide-link one"></span>
          <span class="guide-link two"></span>
          <span class="guide-link three"></span>
          <div class="guide-node guide-node-center completed">Start</div>
          <div class="guide-node guide-node-story">Story</div>
          <div class="guide-node guide-node-info">Info</div>
          <div class="guide-node guide-node-quiz node-available">Quiz</div>
        </div>
      </div>
      <p>During the game, you will use the buttons at the bottom of a node window: <strong>Next</strong> to continue inside a node, <strong>Back</strong> to revisit the previous page, <strong>Back to full map</strong> to leave the node, and <strong>Restart prototype</strong> at the top if you want to begin again from scratch.</p>`,
    showResources: false,
  },
  {
    badge: 'Resources',
    title: () => 'How resources affect the story',
    text:
      'The three resources represent the main dimensions you should balance during the project: social fairness, financial viability, and eco-friendliness.',
    extraHtml:
      '<p>Story nodes usually have more impact because they reflect strategic project choices. Quiz nodes have lighter effects because they mostly check whether you recognized the best option.</p><p>After each choice, you receive feedback explaining what happened and why it matters. In a quiz node, if you choose a wrong answer, you will need to leave the node and click on it again to retry.</p>',
    showResources: true,
  },
  {
    badge: 'Navigation',
    title: () => 'Tracking your progression',
    text:
      'You can click back on a completed node at any point to review the feedback you received before.',
    extraHtml:
      `<p>The legend shows your progression across the board: which nodes are blocked, which ones are available, and which ones are already completed. You can also move across the map by sliding on your trackpad, just like you normally would on a large board.</p>
      <div class="guide-shot guide-shot-wide">
        <div class="guide-shot-header">What happens when you click again on a completed node</div>
        <div class="guide-review">
          <div class="guide-review-board">
            <div class="guide-node guide-node-center completed small">Start</div>
            <div class="guide-node guide-node-quiz completed active">Funding</div>
            <div class="guide-node guide-node-story node-available next">Next</div>
          </div>
          <div class="guide-review-panel">
            <div class="guide-review-card"></div>
            <div class="guide-review-card short"></div>
            <div class="guide-review-button">Back to full map</div>
          </div>
        </div>
      </div>
      <p>In that review view, you can still return to the map with the <strong>Back to full map</strong> button at the bottom right. Take your time, explore carefully, and see how your decisions shape the project.</p>`,
    showResources: true,
  },
  {
    badge: 'Start Demo',
    title: () => 'Your tutorial is ready',
    text:
      'You will now access a smaller version to try it out and see how to play.',
    extraHtml:
      '<p>Let&apos;s start your story and see how you manage your project!</p>',
    showResources: true,
  },
];

function bindNodeElements() {
  Object.keys(nodes).forEach((id) => {
    const element = document.querySelector(`[data-node="${id}"]`);
    if (element) nodeElements[id] = element;
  });
}

function updateResources() {
  refs.socialBar.style.width = `${state.resources.social}%`;
  refs.financialBar.style.width = `${state.resources.financial}%`;
  refs.ecoBar.style.width = `${state.resources.eco}%`;
  refs.socialValue.textContent = state.resources.social;
  refs.financialValue.textContent = state.resources.financial;
  refs.ecoValue.textContent = state.resources.eco;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderPlayerMarker() {
  document.querySelectorAll('.player-marker').forEach((el) => el.remove());
  if (!state.playerName) return;
  const target = nodeElements[state.lastCompletedNodeId];
  if (!target) return;
  const initials = state.playerName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'P';
  const marker = document.createElement('div');
  marker.className = 'player-marker';
  marker.innerHTML = `<span class="player-avatar">${escapeHtml(initials)}</span><span class="player-name">${escapeHtml(state.playerName)}</span>`;
  target.appendChild(marker);
}

function getNodeCenter(nodeId) {
  const el = nodeElements[nodeId];
  if (!el) return null;
  return {
    x: el.offsetLeft + el.offsetWidth / 2,
    y: el.offsetTop + el.offsetHeight / 2,
    w: el.offsetWidth,
    h: el.offsetHeight,
    circle: el.classList.contains('node-circle'),
  };
}

function getEdgePoint(source, target) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  if (source.circle) {
    const length = Math.hypot(dx, dy) || 1;
    const radius = Math.min(source.w, source.h) / 2;
    return {
      x: source.x + (dx / length) * radius,
      y: source.y + (dy / length) * radius,
    };
  }

  const halfW = source.w / 2;
  const halfH = source.h / 2;
  const scale = 1 / Math.max(Math.abs(dx) / halfW || 0, Math.abs(dy) / halfH || 0, 1);
  return {
    x: source.x + dx * scale,
    y: source.y + dy * scale,
  };
}

function offsetPointAwayFromTarget(point, target, padding = 14) {
  const dx = target.x - point.x;
  const dy = target.y - point.y;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: point.x - (dx / length) * padding,
    y: point.y - (dy / length) * padding,
  };
}

function ensureArrowhead(line, active) {
  let arrow = line._arrowhead;
  if (!arrow) {
    arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    line.parentNode.appendChild(arrow);
    line._arrowhead = arrow;
  }
  arrow.setAttribute('class', active ? 'arrowhead-active' : 'arrowhead-base');
  return arrow;
}

function updateBoardLines() {
  if (!refs.boardLines) return;
  refs.boardLines.querySelectorAll('line[data-from][data-to]').forEach((line) => {
    const source = getNodeCenter(line.dataset.from);
    const target = getNodeCenter(line.dataset.to);
    if (!source || !target) return;
    const startEdge = getEdgePoint(source, target);
    const endEdge = getEdgePoint(target, source);
    const dx = endEdge.x - startEdge.x;
    const dy = endEdge.y - startEdge.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const headLength = 18;
    const headWidth = 7;
    const tipX = endEdge.x + ux * headLength;
    const tipY = endEdge.y + uy * headLength;
    const baseX = endEdge.x;
    const baseY = endEdge.y;
    const perpX = -uy;
    const perpY = ux;
    line.setAttribute('x1', `${startEdge.x}`);
    line.setAttribute('y1', `${startEdge.y}`);
    line.setAttribute('x2', `${endEdge.x}`);
    line.setAttribute('y2', `${endEdge.y}`);

    const arrow = ensureArrowhead(line, line.classList.contains('funding-line'));
    arrow.setAttribute(
      'points',
      `${tipX},${tipY} ${baseX + perpX * headWidth},${baseY + perpY * headWidth} ${baseX - perpX * headWidth},${baseY - perpY * headWidth}`,
    );
  });
}

function applyTheme(theme) {
  state.playerTheme = theme;
  document.body.dataset.theme = theme;
}

function showThemeStep() {
  refs.setupNameStep.classList.add('hidden');
  refs.setupThemeStep.classList.remove('hidden');
}

function showNameStep() {
  refs.setupThemeStep.classList.add('hidden');
  refs.setupNameStep.classList.remove('hidden');
}

function completeSetup() {
  refs.setupOverlay.classList.add('hidden');
  renderPlayerMarker();
  updateBoardLines();
  renderOnboardingPage(0);
}

function renderOnboardingPage(index) {
  const page = onboardingPages[index];
  if (!page) {
    state.onboardingComplete = true;
    closePanel();
    return;
  }

  openModalPanel('center', { showResources: page.showResources });
  mountTemplate('introTemplate');
  document.getElementById('introBadge').textContent = page.badge;
  document.getElementById('introTitle').textContent = page.title(state.playerName || 'Player');
  document.getElementById('introText').textContent = page.text;
  const introHint = document.getElementById('introHint');
  introHint.classList.remove('hidden');
  introHint.innerHTML = page.extraHtml;

  const introActions = document.getElementById('introActions');
  if (index > 0) {
    introActions.appendChild(createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderOnboardingPage(index - 1),
    }));
  }
  introActions.appendChild(createButton({
    label: 'Skip and jump to the tutorial',
    className: 'ghost-btn',
    onClick: () => renderOnboardingPage(onboardingPages.length),
  }));
  introActions.appendChild(createButton({
    label: index === onboardingPages.length - 1 ? 'Start tutorial' : 'Next',
    className: 'primary-btn',
    onClick: () => renderOnboardingPage(index + 1),
  }));
}

function mountTemplate(templateId) {
  const template = document.getElementById(templateId);
  refs.contentCard.innerHTML = '';
  refs.contentCard.appendChild(template.content.cloneNode(true));
  refs.contentCard.classList.remove('card-animate');
  void refs.contentCard.offsetWidth;
  refs.contentCard.classList.add('card-animate');
}

function createButton({ label, className, onClick, disabled = false }) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = label;
  button.disabled = disabled;
  if (disabled) button.classList.add('is-disabled');
  button.addEventListener('click', onClick);
  return button;
}

function setResourcesVisibility(visible) {
  refs.storyPanel.classList.toggle('hide-resources', !visible);
}

function focusBoardOn(nodeId) {
  refs.board.className = 'board';
  refs.board.classList.add('focused', `focus-${nodeId}`);
}

function restoreFullBoard() {
  refs.board.className = 'board full-board';
}

function resetBoardViewport() {
  if (!refs.boardViewport) return;
  refs.boardViewport.scrollLeft = 150;
  refs.boardViewport.scrollTop = 40;
}

function openSplitPanel(nodeId) {
  state.currentNodeId = nodeId;
  refs.mainLayout.classList.remove('map-only');
  refs.mainLayout.classList.remove('modal-mode');
  refs.mainLayout.classList.add('with-panel');
  refs.storyPanel.classList.remove('hidden');
  setResourcesVisibility(true);
  if (refs.boardViewport) {
    refs.boardViewport.scrollLeft = 0;
    refs.boardViewport.scrollTop = 0;
  }
  focusBoardOn(nodeId);
}

function openModalPanel(nodeId, { showResources = true } = {}) {
  state.currentNodeId = nodeId;
  refs.mainLayout.classList.remove('with-panel');
  refs.mainLayout.classList.remove('map-only');
  refs.mainLayout.classList.add('modal-mode');
  refs.storyPanel.classList.remove('hidden');
  setResourcesVisibility(showResources);
  restoreFullBoard();
}

function closePanel() {
  state.currentNodeId = null;
  refs.mainLayout.classList.remove('with-panel');
  refs.mainLayout.classList.remove('modal-mode');
  refs.mainLayout.classList.add('map-only');
  refs.storyPanel.classList.add('hidden');
  setResourcesVisibility(true);
  restoreFullBoard();
  resetBoardViewport();
}

function markNodeAvailable(nodeId) {
  const el = nodeElements[nodeId];
  if (!el) return;
  state.availableNodes.add(nodeId);
  el.classList.remove('node-locked', 'completed');
  el.classList.add('node-available', 'node-clickable', 'pulse');
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  const typeLabel = nodes[nodeId].type === 'story' ? 'Story' : nodes[nodeId].type === 'info' ? 'Info' : 'Quiz';
  el.querySelector('.node-tag').textContent = `Available · ${typeLabel}`;
  renderPlayerMarker();
}

function markNodeCompleted(nodeId) {
  const el = nodeElements[nodeId];
  if (!el) return;
  state.availableNodes.delete(nodeId);
  state.completedNodes.add(nodeId);
  state.lastCompletedNodeId = nodeId;
  el.classList.remove('node-available', 'pulse', 'node-locked');
  el.classList.add('completed', 'node-clickable');
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  const typeLabel = nodes[nodeId].type === 'story' ? 'Story' : nodes[nodeId].type === 'info' ? 'Info' : 'Quiz';
  el.querySelector('.node-tag').textContent = `Completed · ${typeLabel}`;
  renderPlayerMarker();
}

function getTutorialHint(nodeId, node) {
  if (nodeId !== 'center') return '';
  return '<h3>How the tutorial works</h3><p>You will open one small branch of the map and experience the three node types used in the game. Story nodes move the scenario forward, information nodes give short learning points, and quiz nodes ask you to choose between possible actions. You can always return to the full map, and once you complete a node you can click it again to review its feedback.</p>';
}

function renderIntro(nodeId) {
  const node = nodes[nodeId];
  openModalPanel(nodeId, { showResources: false });
  mountTemplate('introTemplate');
  document.getElementById('introBadge').textContent = node.badge;
  document.getElementById('introTitle').textContent = node.title;
  document.getElementById('introText').textContent = node.introText || 'Open this node to continue the tutorial.';
  const introHint = document.getElementById('introHint');
  const hintHtml = getTutorialHint(nodeId, node);
  if (hintHtml) {
    introHint.innerHTML = hintHtml;
  } else {
    introHint.classList.add('hidden');
  }

  const introActions = document.getElementById('introActions');
  const startLabel = nodeId === 'center' ? 'Open tutorial' : 'Start node';
  introActions.appendChild(createButton({
    label: startLabel,
    className: 'primary-btn',
    onClick: () => renderActionStage(nodeId),
  }));
  introActions.appendChild(createButton({
    label: 'Back to full map',
    className: 'ghost-btn',
    onClick: closePanel,
  }));
}

function renderActionStage(nodeId, options = {}) {
  const node = nodes[nodeId];
  const { preselectedChoice = null, lockedSelection = false } = options;
  openModalPanel(nodeId, { showResources: true });
  mountTemplate('nodeTemplate');
  document.getElementById('nodeTypeBadge').textContent = node.badge;
  document.getElementById('nodeTitle').textContent = node.title;
  document.getElementById('nodeText').textContent = node.text;

  const extra = document.getElementById('nodeExtra');
  const choicesContainer = document.getElementById('choices');
  const secondaryAction = document.getElementById('secondaryAction');

  const actionHint = node.extraHtml;
  if (actionHint) {
    extra.classList.remove('hidden');
    extra.innerHTML = actionHint;
  } else {
    extra.classList.add('hidden');
  }

  if (node.choices) {
    let selectedChoice = preselectedChoice;
    const nextButton = createButton({
      label: 'Next',
      className: 'primary-btn',
      disabled: !selectedChoice,
      onClick: () => {
        if (!selectedChoice) return;
        handleChoice(nodeId, selectedChoice);
      },
    });

    node.choices.forEach((choice) => {
      const button = document.createElement('button');
      button.className = 'choice-btn';
      button.textContent = choice.text;
      if (preselectedChoice === choice) {
        button.classList.add('is-selected');
      }
      button.addEventListener('click', () => {
        if (lockedSelection) return;
        selectedChoice = choice;
        Array.from(choicesContainer.children).forEach((child) => child.classList.remove('is-selected'));
        button.classList.add('is-selected');
        nextButton.disabled = false;
        nextButton.classList.remove('is-disabled');
      });
      choicesContainer.appendChild(button);
    });

    secondaryAction.appendChild(nextButton);
    secondaryAction.appendChild(createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderIntro(nodeId),
    }));
    secondaryAction.appendChild(createButton({
      label: 'Back to full map',
      className: 'ghost-btn',
      onClick: closePanel,
    }));
    return;
  }

  if (node.secondaryAction) {
    secondaryAction.appendChild(createButton({
      label: node.secondaryAction.label,
      className: 'primary-btn',
      onClick: node.secondaryAction.action,
    }));
    secondaryAction.appendChild(createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderIntro(nodeId),
    }));
  }

  secondaryAction.appendChild(createButton({
    label: 'Back to full map',
    className: 'ghost-btn',
    onClick: closePanel,
  }));
}

function populateFeedback(feedback, options = {}) {
  mountTemplate('feedbackTemplate');
  document.getElementById('feedbackTitle').textContent = feedback.feedbackTitle;
  document.getElementById('feedbackStory').textContent = feedback.feedbackStory;
  document.getElementById('feedbackText').textContent = feedback.feedbackText;

  if (options.showImpact) {
    const impactBox = document.getElementById('impactBox');
    impactBox.classList.remove('hidden');
    const deltaList = document.getElementById('deltaList');
    Object.entries(options.showImpact).forEach(([key, value]) => {
      const labels = {
        social: 'Social fairness',
        financial: 'Financial viability',
        eco: 'Eco-friendliness',
      };
      const row = document.createElement('div');
      row.className = 'delta-item';
      const sign = value > 0 ? '+' : '';
      const cssClass = value > 0 ? 'delta-positive' : value < 0 ? 'delta-negative' : 'delta-neutral';
      row.innerHTML = `<span>${labels[key]}</span><strong class="${cssClass}">${sign}${value}</strong>`;
      deltaList.appendChild(row);
    });
  }
}

function renderFeedbackModal(nodeId, feedback, options = {}, actionButtons = []) {
  openModalPanel(nodeId, { showResources: true });
  populateFeedback(feedback, options);
  const feedbackActions = document.getElementById('feedbackActions');
  actionButtons.forEach((button) => feedbackActions.appendChild(button));
  if (!actionButtons.length) {
    feedbackActions.appendChild(createButton({
      label: 'Back to full map',
      className: 'ghost-btn',
      onClick: closePanel,
    }));
  }
}

function renderStoredReview(nodeId, feedback, options = {}) {
  openSplitPanel(nodeId);
  populateFeedback(feedback, options);
  const feedbackActions = document.getElementById('feedbackActions');
  feedbackActions.appendChild(createButton({
    label: 'Back to full map',
    className: 'ghost-btn',
    onClick: closePanel,
  }));
}

function storeFeedback(nodeId, feedback, options = {}) {
  state.feedbackByNode[nodeId] = { feedback, options };
}

function clampResource(value) {
  return Math.max(0, Math.min(100, value));
}

function applyImpact(impact = {}) {
  state.resources.social = clampResource(state.resources.social + (impact.social || 0));
  state.resources.financial = clampResource(state.resources.financial + (impact.financial || 0));
  state.resources.eco = clampResource(state.resources.eco + (impact.eco || 0));
  updateResources();
}

function handleRetry(nodeId, choice) {
  const feedback = {
    feedbackTitle: choice.feedbackTitle,
    feedbackStory: choice.feedbackStory,
    feedbackText: `${choice.feedbackText} Try again to continue the tutorial.`,
  };
  storeFeedback(nodeId, feedback);
  renderFeedbackModal(nodeId, feedback, {}, [
    createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderActionStage(nodeId, { preselectedChoice: choice, lockedSelection: true }),
    }),
    createButton({
      label: 'Back to full map',
      className: 'ghost-btn',
      onClick: closePanel,
    }),
  ]);
}

function handleChoice(nodeId, choice) {
  if (choice.retry) {
    handleRetry(nodeId, choice);
    return;
  }

  const feedback = {
    feedbackTitle: choice.feedbackTitle,
    feedbackStory: choice.feedbackStory,
    feedbackText: choice.feedbackText,
  };

  if (choice.branch) {
    state.branchChoice = choice.branch;
  }

  const impact = choice.impact || null;
  if (impact) {
    applyImpact(impact);
  }

  markNodeCompleted(nodeId);
  const options = impact ? { showImpact: impact } : {};
  storeFeedback(nodeId, feedback, options);

  if (choice.next) {
    markNodeAvailable(choice.next);
  }

  renderFeedbackModal(nodeId, feedback, options, [
    createButton({
      label: 'Back to full map',
      className: 'primary-btn',
      onClick: closePanel,
    }),
    createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderActionStage(nodeId, { preselectedChoice: choice, lockedSelection: true }),
    }),
  ]);

  if (choice.completePrototype) {
    return;
  }
}

function completeInfoNodeAndAdvance() {
  const nodeId = 'funding_info';
  const feedback = {
    feedbackTitle: 'You reviewed an information node.',
    feedbackStory: 'This node did not ask you to choose between options. Instead, it added context before the last step of the tutorial.',
    feedbackText: 'Information nodes can be used to strengthen understanding without interrupting the flow with a new dilemma every time.',
  };
  markNodeCompleted(nodeId);
  storeFeedback(nodeId, feedback);
  markNodeAvailable('funding_final_quiz');
  renderFeedbackModal(nodeId, feedback, {}, [
    createButton({
      label: 'Back to full map',
      className: 'primary-btn',
      onClick: closePanel,
    }),
    createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderActionStage(nodeId),
    }),
  ]);
}

function openNode(nodeId) {
  const node = nodes[nodeId];
  if (!node) return;
  if (!state.onboardingComplete) return;

  if (state.completedNodes.has(nodeId) && state.feedbackByNode[nodeId]) {
    const stored = state.feedbackByNode[nodeId];
    renderStoredReview(nodeId, stored.feedback, stored.options);
    return;
  }

  if (state.availableNodes.has(nodeId) || nodeId === 'center') {
    renderIntro(nodeId);
  }
}

function attachNodeInteraction(nodeEl) {
  if (!nodeEl) return;
  const nodeId = nodeEl.dataset.node;
  nodeEl.addEventListener('click', () => {
    if (nodeEl.classList.contains('node-locked')) return;
    openNode(nodeId);
  });
  nodeEl.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (nodeEl.classList.contains('node-locked')) return;
    event.preventDefault();
    openNode(nodeId);
  });
}

function resetNodesVisuals() {
  Object.keys(nodeElements).forEach((id) => {
    const el = nodeElements[id];
    const isCenter = id === 'center';
    el.classList.remove('node-available', 'completed', 'pulse', 'node-clickable', 'node-locked');
    if (isCenter) {
      el.classList.add('completed', 'node-clickable');
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.querySelector('.node-tag').textContent = 'Story step';
      return;
    }
    el.classList.add('node-locked');
    el.removeAttribute('tabindex');
    el.removeAttribute('role');
    const typeLabel = nodes[id].type === 'story' ? 'Story' : nodes[id].type === 'info' ? 'Info' : 'Quiz';
    el.querySelector('.node-tag').textContent = `Blocked · ${typeLabel}`;
  });

  markNodeAvailable('funding_quiz_intro');
  nodeElements.funding_quiz_intro.querySelector('.node-tag').textContent = 'Available · Quiz';
  nodeElements.team_creation.querySelector('.node-tag').textContent = 'Blocked';
  nodeElements.data_management.querySelector('.node-tag').textContent = 'Blocked';
  nodeElements.deployment.querySelector('.node-tag').textContent = 'Blocked';
}

function resetPrototype() {
  state = {
    resources: { ...initialResources },
    currentNodeId: null,
    completedNodes: new Set(['center']),
    availableNodes: new Set(['center', 'funding_quiz_intro']),
    feedbackByNode: {},
    branchChoice: null,
    playerName: '',
    playerTheme: 'midnight',
    lastCompletedNodeId: 'center',
    onboardingComplete: false,
  };
  refs.playerNameInput.value = '';
  document.querySelector('input[name="themeChoice"][value="midnight"]').checked = true;
  resetNodesVisuals();
  updateResources();
  applyTheme(state.playerTheme);
  renderPlayerMarker();
  showNameStep();
  refs.setupOverlay.classList.remove('hidden');
  closePanel();
}

bindNodeElements();
Object.values(nodeElements).forEach(attachNodeInteraction);
refs.resetBtn.addEventListener('click', resetPrototype);
refs.confirmNameBtn.addEventListener('click', () => {
  const name = refs.playerNameInput.value.trim();
  if (!name) {
    refs.playerNameInput.focus();
    return;
  }
  state.playerName = name;
  showThemeStep();
});
refs.backToNameBtn.addEventListener('click', showNameStep);
refs.confirmThemeBtn.addEventListener('click', () => {
  const selectedTheme = document.querySelector('input[name="themeChoice"]:checked');
  applyTheme(selectedTheme ? selectedTheme.value : 'midnight');
  completeSetup();
});
updateResources();
resetNodesVisuals();
applyTheme(state.playerTheme);
showNameStep();
closePanel();
updateBoardLines();
window.addEventListener('resize', updateBoardLines);
