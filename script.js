const LOWER_LIMIT = 30;
const UPPER_LIMIT = 70;

const initialResources = {
  social: 50,
  financial: 50,
  performance: 50,
};

const resourceMeta = {
  social: {
    label: 'Social fairness',
    short: 'Social',
    lowTitle: 'Social balance is under strain',
    lowLead:
      'Trust, legitimacy, and stakeholder confidence have been weakened enough that some routes now become unrealistic.',
    lowLesson:
      'When social fairness drops too low, options that depend on trust, participation, or institutional legitimacy become harder to support.',
    highTitle: 'Social balance is becoming over-concentrated',
    highLead:
      'The project is protecting legitimacy strongly, but it may now be underinvesting in feasibility or actual project strength.',
    highLesson:
      'Maximizing one dimension can distort the project just as much as neglecting it. Balance matters more than purity.',
    caution:
      'Social fairness is receiving the weakest average support so far. Be careful not to let trust, inclusion, and public legitimacy fall behind.',
    push:
      'Social fairness is receiving the strongest average push so far. Keep that strength, but make sure feasibility and project performance do not disappear from view.',
  },
  financial: {
    label: 'Financial viability',
    short: 'Financial',
    lowTitle: 'Financial viability is under strain',
    lowLead:
      'Budget slack and staffing flexibility are now thin enough that some demanding paths can no longer be kept open.',
    lowLesson:
      'When financial viability drops too low, options that require reserve budget, extra staffing, or long review cycles become difficult to defend.',
    highTitle: 'Financial viability is becoming over-concentrated',
    highLead:
      'The project is heavily favoring feasibility and momentum, which can start squeezing out legitimacy or project performance.',
    highLesson:
      'Treating financial viability as the dominant lens can narrow the project into a speed-and-output logic that weakens the rest of the system.',
    caution:
      'Financial viability is receiving the weakest average support so far. Be careful not to neglect staffing realism, reserve capacity, and long-term feasibility.',
    push:
      'Financial viability is receiving the strongest average push so far. Keep the project viable, but do not let cost logic dominate every other concern.',
  },
  performance: {
    label: 'Project performance',
    short: 'Performance',
    lowTitle: 'Project performance is under strain',
    lowLead:
      'The project has accumulated enough weak evidence, rushed implementation, or fragile design choices that some stronger paths no longer feel credible.',
    lowLesson:
      'When project performance drops too low, options that require strong evidence, reliability, or clinical usefulness become harder to defend.',
    highTitle: 'Project performance is becoming over-concentrated',
    highLead:
      'The project is strongly protecting performance and technical strength, but it may now be under-serving legitimacy or operational feasibility.',
    highLesson:
      'Project performance matters, but over-maximizing it can also create blind spots if the project stops responding to practical or social constraints.',
    caution:
      'Project performance is receiving the weakest average support so far. Be careful not to let evidence quality, reliability, and practical usefulness drift into the background.',
    push:
      'Project performance is receiving the strongest average push so far. Keep it visible, but not at the expense of legitimacy or operational feasibility.',
  },
};

const chapterClusters = [
  {
    id: 'funding',
    title: 'Funding',
    kicker: 'Act I',
    blurb: 'Sponsor pressure, public promises, and contract terms.',
    row: 'top',
    column: 'left',
  },
  {
    id: 'data',
    title: 'Data Management',
    kicker: 'Act II',
    blurb: 'Dataset quality, documentation, bias, and compute cost.',
    row: 'top',
    column: 'right',
  },
  {
    id: 'team',
    title: 'Team Recruitment',
    kicker: 'Act III',
    blurb: 'Capacity, expertise, representation, and workload.',
    row: 'bottom',
    column: 'left',
  },
  {
    id: 'launch',
    title: 'Launch',
    kicker: 'Act IV',
    blurb: 'Readiness, trust, monitoring, and public scrutiny.',
    row: 'bottom',
    column: 'right',
  },
];

const CLUSTER_LAYOUT = {
  horizontalPadding: 48,
  topPadding: 150,
  bottomPadding: 96,
  minimumGutter: 40,
  outerPaddingRight: 80,
  outerPaddingBottom: 80,
  outerPaddingLeft: 60,
  outerPaddingTop: 60,
};

const onboardingPages = [
  {
    badge: 'Welcome',
    title: (name) => `Welcome ${name}, the project is starting.`,
    text:
      'You are stepping into the role of a researcher helping lead an AI-for-sickness-detection project. The pressure is real: hospitals want results, clinicians want credibility, and every shortcut creates a different kind of risk.',
    extraHtml:
      '<p>The purpose of this game is to help learners develop a more balanced way of analysing project decisions. Rather than focusing only on the most immediate or intuitive option, players are encouraged to consider how choices can affect social fairness, financial viability, and project performance over time.</p><p>This is a compact but complete game. It is not a tutorial branch anymore: it is a realistic project journey through funding, staffing, data governance, and launch.</p>',
    showResources: false,
  },
  {
    badge: 'Board',
    title: () => 'How the board works',
    text:
      'The board is organized into four chapter clusters. Some nodes are shared milestones, while others belong to alternative routes that only open if earlier decisions make them plausible.',
    extraHtml:
      '<p>Story nodes set up scenes and consequences, information nodes pause to explain why a tension matters, and quiz nodes test interpretation. Major decisions can permanently close a sibling route on the board.</p>',
    showResources: false,
  },
  {
    badge: 'Balance',
    title: () => 'How resources shape the game',
    text:
      'The project tracks social fairness, financial viability, and project performance. Story and decision nodes change these balances; quizzes usually do not.',
    extraHtml:
      `<p>If a resource falls to <strong>${LOWER_LIMIT}</strong> or below, some options become unrealistic and are blocked. If a resource climbs to <strong>${UPPER_LIMIT}</strong> or above, the game warns that you may be over-optimizing one dimension and creating a different blind spot.</p>`,
    showResources: true,
  },
  {
    badge: 'Start',
    title: () => 'The first node is an assessment',
    text:
      'The center node now contains three short mirrored scenarios. Each one asks you to estimate impacts, rank what matters most, and then choose a response before the first playable workstreams open.',
    extraHtml:
      '<p>The same three scenarios return near the end so you can compare how your reasoning changed after the game. After the opening assessment, you will move between funding, team, and data chapters. The launch chapter opens once enough groundwork has been completed.</p>',
    showResources: true,
  },
];

const evaluationScenarios = [
  {
    id: 'timeline',
    title: 'Scenario 1: Public commitment under pressure',
    context:
      'A hospital executive wants the team to announce a winter deployment target before governance checkpoints, monitoring responsibilities, and rollback conditions are fully defined. The project has momentum, but that momentum is resting on assumptions the team cannot yet fully defend.',
    impactPrompt:
      'The team publicly commits to the timeline before those safeguards are settled. Rate how strongly that decision is likely to affect each resource.',
    impactNote:
      'Use 1 for limited impact and 10 for very strong impact. You are estimating how implicated each dimension is, not whether the effect is positive or negative.',
    impactBenchmark: { social: 9, financial: 6, performance: 8 },
    rankingPrompt:
      'Before accepting that commitment, rank these themes from most important to least important to consider.',
    rankingNote:
      'Click the five terms in your preferred order. Click a selected term again if you want to remove it and reorder.',
    rankingTerms: [
      { id: 'governance', label: 'Governance' },
      { id: 'trust', label: 'Trust' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'credibility', label: 'Credibility' },
      { id: 'budget', label: 'Budget' },
    ],
    benchmarkRanking: ['governance', 'trust', 'timeline', 'credibility', 'budget'],
    choicePrompt: 'Which response feels the most defensible in this situation?',
    choiceNote:
      'None of these options is perfect. Choose the one that best balances pressure, feasibility, and long-term responsibility.',
    options: [
      {
        id: 'lock-date-now',
        short: 'Lock the date now',
        score: 35,
        text: 'Accept the public date immediately so the project looks credible, then build the safeguards in parallel as fast as possible.',
      },
      {
        id: 'conditional-date',
        short: 'Tie the date to checkpoints',
        score: 100,
        text: 'Offer only a conditional public timeline tied to review checkpoints, monitoring ownership, and explicit rollback conditions.',
      },
      {
        id: 'delay-without-frame',
        short: 'Delay without structure',
        score: 55,
        text: 'Refuse to discuss timing for now, but without defining what would later make a commitment responsible.',
      },
      {
        id: 'delegate-communications',
        short: 'Leave it to communications',
        score: 25,
        text: 'Let communications staff shape the public commitment while the project team concentrates on delivery.',
      },
    ],
    reflection:
      'Stronger reasoning here usually gives more weight to governance conditions and to the way public promises harden future options long before technical work is settled.',
  },
  {
    id: 'team',
    title: 'Scenario 2: Team composition and early hires',
    context:
      'The project can afford only one immediate hire. A strong ML engineer would accelerate technical progress, but workflow expertise, stakeholder representation, and governance input would remain outside the core team for now. The team knows this first hire will shape whose concerns are heard early and whose concerns arrive late.',
    impactPrompt:
      'The team uses its only immediate hire on a pure ML engineer while clinical workflow and governance knowledge stay outside the core group. Rate how strongly that decision is likely to affect each resource.',
    impactNote:
      'Think about the size of the impact, not whether you personally like the decision. A choice can strongly affect several dimensions at once.',
    impactBenchmark: { social: 8, financial: 5, performance: 7 },
    rankingPrompt:
      'Before making that hire, rank these themes from most important to least important to consider.',
    rankingNote:
      'The terms are all relevant. The challenge is deciding which ones become most expensive to ignore too early.',
    rankingTerms: [
      { id: 'expertise', label: 'Expertise' },
      { id: 'representation', label: 'Representation' },
      { id: 'legitimacy', label: 'Legitimacy' },
      { id: 'coordination', label: 'Coordination' },
      { id: 'workload', label: 'Workload' },
    ],
    benchmarkRanking: ['expertise', 'representation', 'legitimacy', 'coordination', 'workload'],
    choicePrompt: 'Which hiring posture feels the most defensible first?',
    choiceNote:
      'Aim for the option that seems most robust over time, not simply the one that creates the fastest early output.',
    options: [
      {
        id: 'pure-ml',
        short: 'Pure technical speed',
        score: 35,
        text: 'Take the ML engineer first because technical progress creates the most options later and the other concerns can be consulted when needed.',
      },
      {
        id: 'bridge-role',
        short: 'Bridge technical and institutional needs',
        score: 95,
        text: 'Use the first hire on a profile that can bridge technical work with workflow or governance realities, even if the role looks less efficient on paper.',
      },
      {
        id: 'tech-plus-review',
        short: 'Technical hire with formal review loops',
        score: 75,
        text: 'Take the technical hire, but immediately create structured clinician and governance review loops with real influence on key decisions.',
      },
      {
        id: 'short-term-patchwork',
        short: 'Temporary patchwork',
        score: 55,
        text: 'Distribute the missing perspectives informally across existing staff until the project becomes large enough to justify a broader team.',
      },
    ],
    reflection:
      'Stronger reasoning here usually treats team composition as a design decision about whose knowledge shapes the project early, not only as a staffing efficiency problem.',
  },
  {
    id: 'data',
    title: 'Scenario 3: Uneven data and early evidence',
    context:
      'The archive is large enough to start experimentation quickly, but consent wording and documentation quality vary across sites. Some people argue that speed will reveal the important issues anyway. Others warn that the team is about to treat uncertain evidence as stable much earlier than it can justify.',
    impactPrompt:
      'The team starts using the archive immediately even though consent wording and documentation remain uneven across sites. Rate how strongly that decision is likely to affect each resource.',
    impactNote:
      'A decision can have strong impact even if its consequences appear only later. Rate how much each dimension is involved.',
    impactBenchmark: { social: 8, financial: 4, performance: 9 },
    rankingPrompt:
      'Before treating that archive as stable evidence, rank these themes from most important to least important to consider.',
    rankingNote:
      'Try to rank what deserves the most attention in this exact situation, not what sounds generally important in any AI project.',
    rankingTerms: [
      { id: 'traceability', label: 'Traceability' },
      { id: 'evidence', label: 'Evidence' },
      { id: 'fairness', label: 'Fairness' },
      { id: 'coverage', label: 'Coverage' },
      { id: 'speed', label: 'Speed' },
    ],
    benchmarkRanking: ['traceability', 'evidence', 'fairness', 'coverage', 'speed'],
    choicePrompt: 'Which initial data posture feels the most defensible?',
    choiceNote:
      'A good answer here usually protects future explainability, not only short-term experimentation comfort.',
    options: [
      {
        id: 'ingest-now',
        short: 'Ingest now, document later',
        score: 30,
        text: 'Start ingesting and experimenting immediately so the team learns by doing, then document the important uncertainties once they become visible.',
      },
      {
        id: 'staged-use',
        short: 'Staged use with uncertainty log',
        score: 100,
        text: 'Allow staged use, but first record the archive scope, known uncertainties, reuse basis, and documentation gaps before treating it as stable evidence.',
      },
      {
        id: 'exclude-ambiguous-sites',
        short: 'Exclude ambiguous sites first',
        score: 72,
        text: 'Exclude the ambiguous sites first so the team can move faster on cleaner ground, then reconsider coverage later if needed.',
      },
      {
        id: 'seek-more-volume',
        short: 'Seek more volume to offset risk',
        score: 20,
        text: 'Push for more volume early because larger scale will reduce the practical importance of the archive\'s unevenness.',
      },
    ],
    reflection:
      'Stronger reasoning here usually gives more weight to traceability and evidence quality before scale, because explanation becomes much harder once the team starts building on uncertain foundations.',
  },
];

const evaluationTaskOrder = ['impact', 'ranking', 'choice'];
const evaluationResourceKeys = ['social', 'financial', 'performance'];
const EVALUATION_SCORE_WEIGHTS = {
  impact: 0.4,
  ranking: 0.3,
  choice: 0.3,
};

let state = {
  resources: { ...initialResources },
  currentNodeId: null,
  completedNodes: new Set(),
  availableNodes: new Set(['center']),
  closedNodes: new Set(),
  closedReasons: {},
  feedbackByNode: {},
  playerName: '',
  playerTheme: 'midnight',
  lastCompletedNodeId: 'center',
  onboardingComplete: false,
  impactHistory: [],
  preEvaluationAnswers: {},
  postEvaluationAnswers: {},
  comparisonSummary: null,
  startAssessmentScore: null,
  endAssessmentScore: null,
  progressDelta: null,
  branchFlags: new Set(),
  chapterMilestones: new Set(),
  shownThresholds: new Set(),
  thresholdHistory: [],
};

const refs = {
  setupOverlay: document.getElementById('setupOverlay'),
  setupNameStep: document.getElementById('setupNameStep'),
  setupThemeStep: document.getElementById('setupThemeStep'),
  playerNameInput: document.getElementById('playerNameInput'),
  confirmNameBtn: document.getElementById('confirmNameBtn'),
  backToNameBtn: document.getElementById('backToNameBtn'),
  confirmThemeBtn: document.getElementById('confirmThemeBtn'),
  mainLayout: document.getElementById('mainLayout'),
  board: document.getElementById('board'),
  boardViewport: document.querySelector('.board-viewport'),
  boardLines: document.getElementById('boardLines'),
  boardClusters: document.getElementById('boardClusters'),
  boardNodes: document.getElementById('boardNodes'),
  storyPanel: document.getElementById('storyPanel'),
  contentCard: document.getElementById('contentCard'),
  socialBar: document.getElementById('socialBar'),
  financialBar: document.getElementById('financialBar'),
  performanceBar: document.getElementById('performanceBar'),
  socialValue: document.getElementById('socialValue'),
  financialValue: document.getElementById('financialValue'),
  performanceValue: document.getElementById('performanceValue'),
  recapBtn: document.getElementById('recapBtn'),
  resetBtn: document.getElementById('resetBtn'),
  windowOverlay: document.getElementById('windowOverlay'),
  windowOverlayCard: document.getElementById('windowOverlayCard'),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function resolveValue(value, node) {
  return typeof value === 'function' ? value(state, node) : value;
}

function getBadgeLabel(node) {
  return node.badge || (
    node.type === 'info'
      ? 'Information node'
      : node.type === 'quiz'
        ? 'Quiz node'
        : node.type === 'decision'
          ? 'Decision node'
          : 'Story node'
  );
}

function makeStoryNode(config) {
  return {
    type: 'story',
    showResources: true,
    ...config,
  };
}

function makeDecisionNode(config) {
  return {
    type: 'decision',
    showResources: true,
    ...config,
  };
}

function makeQuizNode(config) {
  return {
    type: 'quiz',
    showResources: true,
    ...config,
  };
}

function makeInfoNode(config) {
  return {
    type: 'info',
    showResources: true,
    ...config,
  };
}

const nodes = {
  center: makeStoryNode({
    id: 'center',
    chapter: 'start',
    title: 'Project Briefing',
    badge: 'Start node',
    x: 1000,
    y: 820,
    w: 220,
    h: 220,
    introText:
      'This opening node frames the project and records three mirrored assessment scenarios before the first workstreams unlock.',
    text:
      'The city hospital network wants an AI tool that can help flag respiratory complications before the winter rush. The project has visible momentum, but its legitimacy is still fragile. Before the first workstreams open, work through three short scenario blocks about pressure, staffing, and data uncertainty. Each block asks you to estimate impacts, rank what matters most, and then choose a response.',
    extraHtml:
      '<h3>Opening assessment</h3><p>These three scenarios do not change any resource and do not unlock special advantages. They simply record your starting reasoning so the same scenarios can return near the end for comparison.</p>',
    evaluationOnly: 'pre',
  }),

  funding_01: makeStoryNode({
    id: 'funding_01',
    chapter: 'funding',
    title: 'Sponsor Rumor',
    x: 150,
    y: 150,
    introText: 'A rumor starts circulating that a diagnostics company wants to support the project.',
    text:
      'Before any formal contact has happened, people inside the hospital are already speculating. Some hear opportunity. Others hear dependency. The principal investigator asks you to help frame how the team should enter the first conversation.',
    continueTo: 'funding_01b',
    continueLabel: 'Continue to the internal scan',
  }),
  funding_01b: makeStoryNode({
    id: 'funding_01b',
    chapter: 'funding',
    title: 'Internal Scan',
    x: 60,
    y: 280,
    introText: 'Before the meeting, the team quietly maps what this money could change.',
    text:
      'A finance officer, a clinician, and the principal investigator each describe the sponsor differently: operating cushion, political risk, and possible loss of independence. The scene is useful because it reveals something students often miss at first. Funding pressure does not arrive only when the contract does. It starts earlier, when different parts of the institution begin imagining the project through different kinds of hope.',
    continueTo: 'funding_02',
    continueLabel: 'Continue to the funding meeting',
  }),
  funding_02: makeDecisionNode({
    id: 'funding_02',
    chapter: 'funding',
    title: 'How To Enter The Meeting',
    badge: 'Major decision',
    x: 390,
    y: 130,
    introText: 'The first internal funding discussion is about posture, not yet about contract terms.',
    text:
      'Two instincts emerge in the room. One group wants to treat the meeting as a showcase moment and convert energy into public momentum. Another wants to keep the conversation quiet, disciplined, and review-oriented until the project has stronger internal footing.',
    extraHtml:
      '<h3>What is really being decided?</h3><p>This is a large directional decision. It does not only affect tone. It shapes which later paths remain realistic, which routes close, and how much public pressure the team will have to absorb.</p>',
    choices: [
      {
        text: 'Enter as if this is a showcase opportunity and try to turn the sponsor meeting into visible momentum early.',
        feedbackTitle: 'You chose a high-visibility entry.',
        feedbackStory: 'The project gains speed and attention, but expectations begin to form before the team has fully stabilized its internal review process.',
        feedbackText: 'This route may improve financing quickly, but it makes later caution harder to communicate and can weaken the project if promises outrun reality.',
        impact: { social: -10, financial: 13, performance: -4 },
        next: 'funding_03_hype',
        unlocks: ['funding_08b'],
        locks: ['funding_03_guarded', 'funding_04_guarded', 'funding_05_guarded', 'funding_06_guarded'],
        lockReason:
          'This more public-facing posture closed the quieter diligence route. The team is now operating inside a higher-visibility funding path.',
        branchFlagsSet: ['funding_hype'],
      },
      {
        text: 'Enter carefully, keep the meeting closed-door, and focus first on governance, milestones, and conditions of independence.',
        feedbackTitle: 'You chose a guarded opening.',
        feedbackStory: 'The room loses some early momentum, but it keeps more space for due diligence and internal alignment.',
        feedbackText: 'This route protects legitimacy and review, even if it softens the first funding wave.',
        impact: { social: 6, financial: -5, performance: 3 },
        next: 'funding_03_guarded',
        unlocks: ['funding_08b'],
        locks: ['funding_03_hype', 'funding_04_hype', 'funding_05_hype', 'funding_06_hype'],
        lockReason:
          'This review-first posture closed the showcase route. The team is now moving through a more controlled funding path.',
        branchFlagsSet: ['funding_guarded'],
      },
    ],
  }),
  funding_03_hype: makeDecisionNode({
    id: 'funding_03_hype',
    chapter: 'funding',
    title: 'Sponsor Pitch',
    x: 650,
    y: 90,
    introText: 'The meeting is moved to a polished presentation room with communications staff present.',
    text:
      'The sponsor talks in the language of scale, visibility, and rapid proof of value. Several people in the room look energized. A clinician beside you stays unusually quiet, taking notes every time the timeline gets shorter. When the meeting breaks, the room carries a slightly unsettling mix of enthusiasm and vagueness: everyone can describe the opportunity, but not yet the conditions under which it should remain acceptable.',
    continueTo: 'funding_04_hype',
    continueLabel: 'Continue',
  }),
  funding_04_hype: makeQuizNode({
    id: 'funding_04_hype',
    chapter: 'funding',
    title: 'First Safeguard',
    x: 900,
    y: 130,
    introText: 'The room is excited, but one basic question still matters.',
    text:
      'Under this more public funding posture, which safeguard is still the most important to protect before the project makes strong external promises?',
    choices: [
      {
        text: 'A visible timeline that reassures journalists and executives right away.',
        retry: true,
        feedbackTitle: 'That responds to optics, not the underlying risk.',
        feedbackStory: 'The project would look organized, but it would still be vulnerable if its governance conditions remain vague.',
        feedbackText: 'In a high-visibility route, the first safeguard is not messaging polish. It is preserving the ability to review and slow down if needed.',
      },
      {
        text: 'Clear review checkpoints and room to revise milestones if evidence or governance concerns change.',
        feedbackTitle: 'You identified the strongest safeguard.',
        feedbackStory: 'The team does not undo the public posture, but it protects a mechanism that can still absorb uncertainty later on.',
        feedbackText: 'This is the most defensible answer because it keeps public momentum from turning into irreversible pressure.',
        next: 'funding_05_hype',
      },
      {
        text: 'A larger compute commitment so the project can keep demonstrating visible progress.',
        retry: true,
        feedbackTitle: 'That would reinforce the same pressure.',
        feedbackStory: 'More compute could make the route look active, but it would not solve the governance risk created by early visibility.',
        feedbackText: 'When a project is already under public pressure, doubling down on speed rarely creates the missing accountability structure.',
      },
    ],
  }),
  funding_05_hype: makeDecisionNode({
    id: 'funding_05_hype',
    chapter: 'funding',
    title: 'Message Discipline',
    badge: 'Decision node',
    x: 650,
    y: 300,
    introText: 'A draft press line begins circulating before the meeting notes are even finished.',
    text:
      'Communications staff propose language about “rapid clinical readiness.” The sponsor likes it. The hospital board office wants something steadier. You are asked to decide how hard the team should lean into the momentum it just created. The disagreement is not loud, but it is important: the sentence chosen here will influence whether later caution sounds like responsible review or like an embarrassing retreat.',
    choices: [
      {
        text: 'Keep the bold language and let the room feel the urgency of a fast-moving project.',
        feedbackTitle: 'You reinforced the public momentum.',
        feedbackStory: 'The route becomes easier to finance and harder to slow down. From now on, caution will sound more expensive in the room.',
        feedbackText: 'This creates a stronger top-line story, but it also narrows the space for later correction.',
        impact: { social: -8, financial: 7, performance: -3 },
        next: 'funding_06_hype',
        branchFlagsSet: ['funding_message_bold'],
      },
      {
        text: 'Keep the project visible, but remove anything that implies a fixed clinical-readiness promise.',
        feedbackTitle: 'You kept some momentum without overcommitting.',
        feedbackStory: 'The sponsor loses a little rhetorical energy, but the team preserves room to admit uncertainty later on.',
        feedbackText: 'This keeps the high-visibility route from collapsing entirely into hype.',
        impact: { social: 2, financial: 1, performance: 1 },
        next: 'funding_06_hype',
        branchFlagsSet: ['funding_message_tempered'],
      },
    ],
  }),
  funding_06_hype: makeStoryNode({
    id: 'funding_06_hype',
    chapter: 'funding',
    title: 'Momentum Briefing',
    x: 940,
    y: 310,
    introText: 'Before contract drafting begins, the hospital wants a clean internal line on what this sponsor momentum actually means.',
    text:
      'A deputy director asks whether teams should begin acting as if a bigger winter push is now likely. Even people who are skeptical can feel the institution leaning toward the new confidence the sponsor meeting created. Without anyone explicitly saying so, the hospital is beginning to coordinate around a future that still depends on assumptions the project has not fully tested.',
    continueTo: 'funding_06',
    continueLabel: 'Continue to expectation pressure',
  }),
  funding_03_guarded: makeDecisionNode({
    id: 'funding_03_guarded',
    chapter: 'funding',
    title: 'Closed-Door Diligence',
    x: 460,
    y: 420,
    introText: 'The meeting is deliberately small, and the sponsor notices the difference immediately.',
    text:
      'Instead of a public showcase, the conversation turns into a practical exchange about review gates, publication freedom, and how much influence the sponsor expects over timeline decisions. The room feels cooler, but more honest. Instead of leaving with excitement, the team leaves with something less glamorous and more useful: a sharper sense of where later pressure would come from if the relationship deepened.',
    continueTo: 'funding_04_guarded',
    continueLabel: 'Continue',
  }),
  funding_04_guarded: makeQuizNode({
    id: 'funding_04_guarded',
    chapter: 'funding',
    title: 'Due Diligence Priority',
    x: 620,
    y: 540,
    introText: 'The sponsor looks serious, but not hostile. The next move matters.',
    text:
      'In this quieter funding route, which question is the most important to clarify before the project starts treating the offer as stable?',
    choices: [
      {
        text: 'Whether the sponsor can help arrange a stronger public communications campaign.',
        retry: true,
        feedbackTitle: 'That is not the most important priority yet.',
        feedbackStory: 'Public communication may matter later, but it does not answer whether the project will remain governable under the offer.',
        feedbackText: 'The key issue at this stage is protecting the project’s independence and review structure, not amplifying its visibility.',
      },
      {
        text: 'Whether the contract keeps audit checkpoints, publication room, and flexibility over rollout milestones.',
        feedbackTitle: 'You focused on the right due diligence question.',
        feedbackStory: 'The room stays careful, but it now has a concrete way to define what responsible support would actually mean.',
        feedbackText: 'This is the strongest answer because it checks whether the project can stay accountable after taking the money.',
        next: 'funding_05_guarded',
      },
      {
        text: 'Whether the team can negotiate the largest possible compute package first and sort the rest later.',
        retry: true,
        feedbackTitle: 'That would front-load the wrong issue.',
        feedbackStory: 'More infrastructure could look attractive, but it would not tell the team whether the relationship itself is safe and governable.',
        feedbackText: 'Infrastructure matters, but governance comes first because it determines how every later disagreement will be handled.',
      },
    ],
  }),
  funding_05_guarded: makeDecisionNode({
    id: 'funding_05_guarded',
    chapter: 'funding',
    title: 'Internal Briefing',
    badge: 'Decision node',
    x: 380,
    y: 660,
    introText: 'The hospital staff now want to know how to describe the sponsor conversation internally.',
    text:
      'If you sound too cautious, some teams will fear the project is stalling. If you sound too positive, people will start acting as if support is already secure. The next internal message will shape how the organization interprets the negotiation. These early internal summaries matter because they often become the story people remember later, even when the actual agreement was much more conditional.',
    choices: [
      {
        text: 'Describe the sponsor as promising, but make it clear that the project is still protecting review milestones and independence.',
        feedbackTitle: 'You kept expectations measured and intelligible.',
        feedbackStory: 'The project does not surge, but staff are less likely to mistake a possible partnership for a finished deal.',
        feedbackText: 'This preserves organizational trust without pretending that uncertainty has already been solved.',
        impact: { social: 5, financial: 0, performance: 1 },
        next: 'funding_06_guarded',
        branchFlagsSet: ['funding_message_guarded'],
      },
      {
        text: 'Signal strong optimism so teams start behaving as if a larger funding phase is already coming.',
        feedbackTitle: 'You imported momentum into the hospital before the deal existed.',
        feedbackStory: 'This may help internal energy, but it also risks making later caution look like retreat.',
        feedbackText: 'Even a guarded funding route can recreate hype if the institution begins acting on promises too early.',
        impact: { social: -6, financial: 5, performance: -2 },
        next: 'funding_06_guarded',
        branchFlagsSet: ['funding_message_optimistic'],
      },
    ],
  }),
  funding_06_guarded: makeStoryNode({
    id: 'funding_06_guarded',
    chapter: 'funding',
    title: 'Procurement Questions',
    x: 640,
    y: 960,
    introText: 'The quieter route buys the team time, but that time fills quickly with institutional questions.',
    text:
      'Procurement and governance staff now want concrete language about sponsor boundaries, review milestones, and what the hospital is promising internally. The route is calmer, but not easier. Careful governance creates work of its own, and the team is now learning that discipline must be maintained long before it becomes visible to anyone outside the project.',
    continueTo: 'funding_06',
    continueLabel: 'Continue to expectation pressure',
  }),
  funding_06: makeStoryNode({
    id: 'funding_06',
    chapter: 'funding',
    title: 'Expectation Pressure',
    x: 260,
    y: 360,
    introText: (currentState) =>
      currentState.branchFlags.has('funding_hype')
        ? 'Because the route is already visible, donor expectations start arriving early.'
        : 'Even without a public spectacle, donor expectations begin to shape the conversation.',
    text: (currentState) =>
      currentState.branchFlags.has('funding_hype')
        ? 'A city official now wants reassurance that the project will produce a visible result before winter. Several people quietly admit that the team may already be speaking as if the timeline were firmer than it really is.'
        : 'A city official now wants reassurance that the project will eventually be visible enough to justify early patience. The team feels the subtle pressure to prove that caution still has momentum.',
    continueTo: 'funding_06b',
    continueLabel: 'Continue to the narrative meeting',
  }),
  funding_06b: makeStoryNode({
    id: 'funding_06b',
    chapter: 'funding',
    title: 'Public Narrative Meeting',
    x: 350,
    y: 540,
    introText: 'The sponsor conversation now turns into an internal language problem.',
    text:
      'A communications lead asks for a sentence that can travel safely between the hospital board, the sponsor, and clinical teams without becoming misleading in at least one of those rooms. It sounds like a small writing task, but it is really a governance test. In many projects, the first damaging oversimplification appears not in the contract, but in the sentence people repeat when they no longer have time to explain the full situation.',
    continueTo: 'funding_07',
    continueLabel: 'Move to contract terms',
  }),
  funding_07: makeDecisionNode({
    id: 'funding_07',
    chapter: 'funding',
    title: 'Contract Red Lines',
    badge: 'Decision node',
    x: 120,
    y: 530,
    introText: 'The draft agreement arrives with one decisive question left unresolved.',
    text:
      'The sponsor is willing to support the project, but not without shaping some part of its future behavior. The team must now choose which red lines it is willing to defend and which risks it is willing to absorb.',
    choices: [
      {
        text: 'Accept a stronger sponsor footprint in exchange for a larger operational cushion and faster resourcing.',
        feedbackTitle: 'You protected feasibility by conceding influence.',
        feedbackStory: 'The project becomes easier to finance, but harder to defend if the sponsor later pushes for speed or visibility over review.',
        feedbackText: 'This route increases flexibility in the short term while making governance more fragile later on.',
        impact: { social: -7, financial: 9, performance: -5 },
        next: 'funding_07b',
        branchFlagsSet: ['funding_contract_loose'],
      },
      {
        text: 'Insist on audit checkpoints, publication room, and explicit limits on sponsor control over rollout timing.',
        feedbackTitle: 'You defended a stricter contract.',
        feedbackStory: 'The final package is leaner, but the project keeps more space to remain accountable when pressures sharpen later.',
        feedbackText: 'This is less comfortable financially, but it protects the team from becoming politically dependent on one actor.',
        impact: { social: 8, financial: -5, performance: 4 },
        next: 'funding_07b',
        branchFlagsSet: ['funding_contract_strict'],
      },
      {
        text: 'Take a smaller pilot-focused agreement that can be exited if governance tensions grow too strong.',
        feedbackTitle: 'You chose a narrower commitment.',
        feedbackStory: 'The project gains less support, but it keeps a realistic escape path if the relationship becomes constraining.',
        feedbackText: 'This option trades scale for resilience and makes it easier to protect future correction.',
        impact: { social: 4, financial: -3, performance: 2 },
        next: 'funding_07b',
        branchFlagsSet: ['funding_contract_pilot'],
      },
    ],
  }),
  funding_07b: makeInfoNode({
    id: 'funding_07b',
    chapter: 'funding',
    title: 'Influence Checklist',
    x: 120,
    y: 720,
    introText: 'This information node turns the contract into a reusable student method.',
    text:
      'When reviewing a funding offer, ask four concrete questions: who can shape milestones, who can shape public messaging, who can shape publication or disclosure, and who can make delay feel politically unacceptable. Students often focus on budget size and miss these influence channels even though they usually decide how much independence remains once pressure rises.',
    extraHtml:
      '<h3>Reusable method</h3><p>Before signing, make a one-page “pressure map” with the actors who gain from speed, the actors who absorb reputational damage if things go wrong, and the specific moments when the team could still slow down. If that map is vague, the agreement is probably more constraining than it looks.</p>',
    continueTo: 'funding_08',
    continueLabel: 'Continue to the funding lesson',
  }),
  funding_08: makeInfoNode({
    id: 'funding_08',
    chapter: 'funding',
    title: 'What Funding Really Changes',
    x: 300,
    y: 840,
    introText: 'This information node names the structural lesson behind the chapter.',
    text:
      'Funding is never just background infrastructure. It affects how quickly promises form, who can apply pressure, and how much room the project keeps for delay, review, and revision. In real projects, the funding structure often decides whether a team can still slow down once external momentum has already started to build.',
    extraHtml:
      '<h3>Useful method</h3><p>Draft a one-page funding memo before accepting support: who gains from speed, who carries risk if the project goes wrong, which commitments are non-negotiable, and what would justify revisiting the agreement later.</p><h3>Concrete questions</h3><p>Clarify influence over publication, communication, milestones, and rollout timing. If these remain vague, pressure often reappears later when the team is least able to resist it.</p>',
    continueTo: 'funding_09',
    continueLabel: 'Continue to board review',
  }),
  funding_08b: makeInfoNode({
    id: 'funding_08b',
    chapter: 'funding',
    title: 'Stakeholder Map',
    x: 820,
    y: 980,
    introText: 'This optional node gives a simple method a student could reuse later in a real project.',
    text:
      'Make a quick stakeholder map before taking support: who wants acceleration, who bears reputational risk, who carries hidden implementation work, and who can still say no later. This turns a vague partner discussion into a concrete governance picture.',
    extraHtml:
      '<h3>Practical checklist</h3><p>Write down incentives, likely pressure points, and one red line the team would defend even under time pressure. If nobody can name that red line, the project is usually more dependent than it thinks.</p>',
  }),
  funding_09: makeQuizNode({
    id: 'funding_09',
    chapter: 'funding',
    title: 'Board Review',
    x: 540,
    y: 840,
    introText: 'The hospital board asks one last question before signing off on the chapter.',
    text:
      'Which statement best captures the most responsible way to explain the funding arrangement to the board?',
    choices: [
      {
        text: 'The sponsor mostly solves the project’s political risk, so the main task now is keeping the momentum high.',
        retry: true,
        feedbackTitle: 'That misreads what sponsorship can do.',
        feedbackStory: 'Funding may help stabilize the project, but it never removes the need for internal accountability and defensible review.',
        feedbackText: 'Money can relieve pressure in one dimension while increasing pressure in another.',
      },
      {
        text: 'The arrangement should be judged by whether it keeps support, review space, and institutional accountability in workable balance.',
        feedbackTitle: 'You identified the chapter’s core lesson.',
        feedbackStory: 'The board now sees funding as part of the project’s ethical architecture rather than as a neutral background condition.',
        feedbackText: 'This answer fits the chapter because it treats support, governance, and pressure as linked rather than separate issues.',
        next: 'funding_09b',
      },
      {
        text: 'If the budget is credible enough, later governance problems can be improvised when they appear.',
        retry: true,
        feedbackTitle: 'That postpones the real work.',
        feedbackStory: 'Improvised governance usually means the strongest actor sets the terms when pressure is already high.',
        feedbackText: 'Responsible project framing brings major tensions into view early instead of hoping they can be solved later under urgency.',
      },
    ],
  }),
  funding_09b: makeStoryNode({
    id: 'funding_09b',
    chapter: 'funding',
    title: 'Funding Handover',
    x: 760,
    y: 840,
    introText: 'The chapter closes not when the deal is signed, but when the team translates it into everyday work.',
    text:
      'A short handover note circulates to staff who were not in the negotiations. It has to explain what the sponsor relationship does and does not mean for deadlines, visibility, and who can push for acceleration later. This is more important than it sounds. In real projects, misunderstandings about funding often survive because the people living with the consequences never heard the cautious version, only the enthusiastic one.',
    continueTo: 'funding_10',
    continueLabel: 'Continue to the milestone',
  }),
  funding_10: makeStoryNode({
    id: 'funding_10',
    chapter: 'funding',
    title: 'Funding Milestone',
    x: 790,
    y: 690,
    introText: 'The funding chapter closes with a more stable, but not necessarily comfortable, arrangement.',
    text: (currentState) =>
      currentState.branchFlags.has('funding_contract_strict')
        ? 'The sponsor relationship remains usable, but clearly bounded. People in the hospital trust the project a little more because they can see where the lines were actually drawn.'
        : currentState.branchFlags.has('funding_contract_loose')
          ? 'The project now has visible momentum and stronger operational room, but everyone also knows that later tension with the sponsor may be harder to absorb.'
          : 'The project leaves the chapter with a narrower agreement that preserves room to adjust later. It does not feel triumphant, but it does feel governable.',
    continueTo: null,
    continueLabel: 'Return to the board',
    completeChapter: 'funding',
  }),

  team_01: makeStoryNode({
    id: 'team_01',
    chapter: 'team',
    title: 'Capacity Warning',
    x: 150,
    y: 1160,
    introText: 'The project progression starts to slow down, it can no longer run on goodwill.',
    text:
      "At first, everything seems on track. But after a few days, small issues appear.\n\nMessages sit unanswered. Tasks are discussed but not clearly assigned. Some parts move fast, others are blocked.\n\nDuring a meeting, the principal investigator says:\n\"We’re starting to lose track of who is doing what.\"\n\nNo one disagrees.",
    continueTo: 'team_01b',
    continueLabel: 'Continue to look closer',
  }),
  team_01b: makeStoryNode({
    id: 'team_01b',
    chapter: 'team',
    title: 'Looking closer',
    x: 130,
    y: 1310,
    introText: 'The issue is not motivation, it\'s organization.',
    text:
      "You look more closely at how the team works.\n\nEveryone is putting in effort. But roles are unclear, priorities shift, and decisions are informal.\n\nSome people are overloaded. Others are waiting.\n\nThe problem isn’t motivation. It’s structure.",
    continueTo: "team_02",
    continueLabel: 'Continue to hiring priorities',
  }),
  team_02: makeDecisionNode({
    id: 'team_02',
    chapter: 'team',
    title: 'What to fix first',
    badge: 'Decision node',
    x: 390,
    y: 1140,
    introText: 'Where do you focus first?',
    text:
      'One option is to clarify roles and responsibilities before adding more pressure. This could make the team more stable and improve coordination.\n\n' +
      'Another option is to push for faster delivery, hoping that visible progress will keep funders and partners confident.\n\n' +
      'A third option is to wait and observe, avoiding a heavy structural change too early.',
    choices: [
      {
        text: 'Clarify roles and responsibilities before pushing the team further.',
        feedbackTitle: 'You chose to stabilize the team first.',
        feedbackStory:
          'The team slows down briefly to define who is responsible for what. Some confusion is reduced, and overloaded members become easier to identify.',
        feedbackText:
          'This improves project performance by reducing bottlenecks. It also supports social fairness because workload becomes more visible and easier to distribute.',
        impact: { social: 6, financial: 0, performance: 10 },
        next: 'team_04',
      },
      {
        text: 'Push for faster delivery so the project shows visible progress quickly.',
        feedbackTitle: 'You chose speed first.',
        feedbackStory:
          'The team focuses on short-term output. Progress becomes more visible, but unclear responsibilities remain underneath the surface.',
        feedbackText:
          'This can support financial viability in the short term because funders and partners see movement. However, it risks increasing pressure on already overloaded people.',
        impact: { social: -5, financial: 6, performance: 4 },
        next: 'team_04',
      },
      {
        text: 'Wait and observe before changing the way the team works.',
        feedbackTitle: 'You chose to delay the structural decision.',
        feedbackStory:
          'For now, the team keeps working in the same way. No one is disrupted, but the same delays and unclear responsibilities continue.',
        feedbackText:
          'This avoids immediate conflict, but it weakens project performance because the organizational problems are left unresolved.',
        impact: { social: 0, financial: 0, performance: -8 },
        next: 'team_04',
      },
    ],
  }),
  team_03: makeInfoNode({
    id: 'team_03',
    chapter: 'team',
    title: 'Structure vs Effort',
    x: 650,
    y: 1100,
    introText: 'In growing teams, performance issues are often caused by lack of structure, not lack of effort.',
    text:
      "Without clear roles:\n\nWork is delayed or duplicated\nBottlenecks appear\nDecisions slow down\n\nImproving organization often has a bigger impact than working more.",
    continueTo: 'team_04',
    continueLabel: 'Continue'
  }),
  team_04: makeStoryNode({
    id: 'team_04',
    chapter: 'team',
    title: 'Hiring discussion',
    x: 870,
    y: 1210,
    introText: 'The team considers expanding.',
    text:
      "The discussion shifts toward hiring.\n\nSome want developers to move faster.\n\nOthers insist on including people focused on ethics and fairness.\n\nHiring now means choosing what the project prioritizes.",
    continueTo: 'team_05',
    continueLabel: 'Continue'
  }),
  team_05: makeDecisionNode({
    id: 'team_05',
    chapter: 'team',
    title: 'Hiring strategy',
    badge: 'Decision node',
    x: 650,
    y: 1310,
    introText: 'Who should the team bring in first?',
  text:
    'The team agrees that hiring is needed, but not everyone agrees on what kind of hiring should come first.\n\n' +
    'The project is still under pressure to improve the AI tool quickly. Technical experts could help build, test, and optimize the system faster.\n\n' +
    'At the same time, the tool is connected to health decisions. If fairness, clinical use, and governance are treated as secondary concerns, the project may become harder to justify later.\n\n' +
    'This is not only a staffing choice. It is a decision about what kind of project the team wants to become.',
  choices: [
      {
        text: 'Prioritize technical experts so the team can improve the model and deliver faster.',
        feedbackTitle: 'You chose a speed-focused team.',
        feedbackStory:
          'The new hires strengthen the technical core. Development becomes faster, and progress is easier to show in meetings.',
        feedbackText:
          'This improves project performance in the short term, but it leaves fairness and governance questions less represented inside the team. Costs also increase because specialized technical hires are expensive.',
        impact: { social: -7, financial: -5, performance: 10 },
        next: 'team_06_speed',
        unlocks: ['team_06_speed', 'team_07_speed'],
        locks: ['team_06_balanced', 'team_07_balanced'],
        lockReason:
          'By prioritizing technical hiring, the team follows a speed-focused path. The broader balanced-team path is now closed.',
        branchFlagsSet: ['team_speed'],
      },
      {
        text: 'Build a balanced team with both technical and fairness-focused expertise.',
        feedbackTitle: 'You chose a broader team.',
        feedbackStory:
          'The team now includes people who can work on the model, but also people who question how it will affect patients, clinicians, and trust in the system.',
        feedbackText:
          'This improves social fairness and makes the project more robust. However, it costs more and makes coordination slower because more perspectives need to be included.',
        impact: { social: 10, financial: -7, performance: 5 },
        next: 'team_06_balanced',
        unlocks: ['team_06_balanced', 'team_07_balanced'],
        locks: ['team_06_speed', 'team_07_speed'],
        lockReason:
          'By choosing a balanced hiring strategy, the team follows a broader governance-aware path. The narrow speed-focused path is now closed.',
        branchFlagsSet: ['team_balanced'],
      },
    ],
  }),
  team_06_speed: makeStoryNode({
    id: 'team_06_speed',
    chapter: 'team',
    title: 'Fast execution',
    x: 910,
    y: 1410,
    introText: 'Development accelerates.',
    text:
      'With more technical hires, progress becomes visible quickly.\n\nFeatures are delivered faster. Deadlines are met.\n\nBut some questions start to be postponed — especially around fairness and long-term impact.\n\n“These can be handled later.”\n\nFor now, speed is winning.',
    continueTo: 'team_07_speed',
    continueLabel: 'Continue to speed check',
  }),
  team_07_speed: makeQuizNode({
    id: 'team_07_speed',
    chapter: 'team',
    title: 'Speed Check',
    x: 400,
    y: 1300,
    introText: 'The team is moving faster, but some concerns are being postponed.',
    text:
      'In a speed-focused hiring route, what is the main risk the team needs to manage?',
    choices: [
      {
        text: 'There is no real risk if the technical progress is fast enough.',
        retry: true,
        feedbackTitle: 'Speed can hide problems instead of solving them.',
        feedbackStory:
          'Fast progress may make the project look healthy, while fairness and coordination issues continue to grow underneath.',
        feedbackText:
          'Technical progress is important, but it does not automatically make the project socially fair or sustainable.',
      },
      {
        text: 'Fairness and governance questions may be delayed until they are harder to fix.',
        feedbackTitle: 'You identified the strongest risk here.',
        feedbackStory:
          'The team keeps delivering, but postponed concerns can later become more expensive and more difficult to correct.',
        feedbackText:
          'This is the best answer because early technical choices can shape who benefits from the tool and who may be excluded.',
        next: 'team_08',
      },
      {
        text: 'Hiring technical experts removes the need for coordination.',
        retry: true,
        feedbackTitle: 'More expertise still needs coordination.',
        feedbackStory:
          'Even a technically strong team can slow down if responsibilities, priorities, and review points are unclear.',
        feedbackText:
          'A larger team usually needs more structure, not less.',
      },
    ],
  }),
  team_06_balanced: makeStoryNode({
    id: 'team_06_balanced',
    chapter: 'team',
    title: 'Slower but broader discussions',
    x: 610,
    y: 1500,
    introText: 'Progress becomes more cautious.',
    text:
      'With a more diverse team, discussions become deeper.\n\nQuestions about fairness and impact are raised early.\n\nBut decisions take longer. Some technical members feel slowed down.\n\nProgress is steady — but less visible.',
    continueTo: 'team_07_balanced',
    continueLabel: 'Continue to trade-off awareness'
  }),
  team_07_balanced: makeQuizNode({
    id: 'team_07_balanced',
    chapter: 'team',
    title: 'Trade-off Awareness',
    x: 390,
    y: 1610,
    introText: 'The team now includes more perspectives, but coordination is harder.',
    text:
      'How do you make that diversity actually useful instead of just slowing things down?',
    choices: [
      {
        text: 'Include fairness-focused roles, but keep them separate from technical decisions.',
        retry: true,
        feedbackTitle: 'That creates weak inclusion.',
        feedbackStory:
          'If fairness-focused people are present but disconnected from real decisions, their role becomes symbolic.',
        feedbackText:
          'A balanced team only helps if different forms of expertise influence the project at the right moments.',
      },
      {
        text: 'Connect different roles to clear decision points, responsibilities, and review moments.',
        feedbackTitle: 'You identified the strongest principle here.',
        feedbackStory:
          'The team is broader, but the added perspectives now shape the process instead of only adding discussion.',
        feedbackText:
          'This is the best answer because social fairness, financial viability, and project performance all depend on how responsibilities are organized.',
        next: 'team_08',
      },
      {
        text: 'Let every decision be discussed by everyone until there is full agreement.',
        retry: true,
        feedbackTitle: 'Full agreement can become a bottleneck.',
        feedbackStory:
          'Including more voices does not mean every person must decide everything. That can slow the project without adding useful accountability.',
        feedbackText:
          'The goal is structured participation, not endless consensus.',
      },
    ],
  }),
  team_08: makeStoryNode({
    id: 'team_08',
    chapter: 'team',
    title: 'Workload Reality',
    x: 280,
    y: 1470,
    introText: 'No matter which hiring route the team took, capacity strain now becomes visible.',
    text: (currentState) =>
      currentState.branchFlags.has('team_balanced')
        ? 'The balanced team catches more fairness and governance issues early, but coordination now takes more time. Several members are stretched between technical work, review meetings, and clinical expectations.'
        : 'The speed-focused team delivers faster, but the same people are now carrying technical, operational, and fairness-related questions at once. Some concerns are handled only when they become urgent.',
    continueTo: 'team_09',
    continueLabel: 'Continue to the burnout signal',
  }),

  team_09: makeStoryNode({
    id: 'team_09',
    chapter: 'team',
    title: 'Burnout Signal',
    x: 580,
    y: 1630,
    introText: 'The strain becomes real when people stop talking about workload in abstract terms.',
    text:
      'A junior researcher quietly says they no longer know which concerns are “important enough” to raise, because everything already feels urgent.\n\n' +
      'That moment changes the discussion. Burnout is not only a wellbeing issue here. It also affects the project itself: exhausted teams are worse at noticing small problems before they become expensive failures.',
    continueTo: 'team_10',
    continueLabel: 'Continue to reorganization',
  }),

  team_10: makeDecisionNode({
    id: 'team_10',
    chapter: 'team',
    title: 'Reorganize the Team',
    badge: 'Decision node',
    x: 120,
    y: 1610,
    introText: 'The question is no longer only who is in the team, but how the team is run.',
    text:
      'The project manager warns that the current structure will not hold if the workload keeps increasing.\n\n' +
      'The team now has to decide how decisions should be organized.\n\n' +
      'One option is to keep decision-making centralized in a small core. This is simpler and cheaper, but it may leave some voices outside important decisions.\n\n' +
      'Another option is to share responsibility more widely through rotating steering meetings. This gives more people influence, but it also takes more time and coordination.\n\n' +
      'A third option is to create paired leads, so technical and fairness-related questions are handled together instead of separately.',
    choices: [
      {
        text: 'Keep decision-making centralized in a small core and consult others only at defined checkpoints.',
        feedbackTitle: 'You protected a tighter structure.',
        feedbackStory:
          'Coordination becomes simpler. Decisions are faster, and the project is easier to manage day to day.',
        feedbackText:
          'This supports financial viability because it limits coordination costs. However, it can reduce social fairness because some concerns may only enter after key decisions are already made.',
        impact: { social: -6, financial: 6, performance: -1 },
        next: 'team_11',
        branchFlagsSet: ['team_centralized'],
      },
      {
        text: 'Create a rotating steering rhythm that shares decision-making across the team.',
        feedbackTitle: 'You distributed responsibility more widely.',
        feedbackStory:
          'More people can now see where the difficult trade-offs are happening. However, meetings become heavier and decisions take longer.',
        feedbackText:
          'This supports social fairness because more perspectives can shape the project. But it weakens financial viability because coordination requires more time and resources.',
        impact: { social: 6, financial: -6, performance: 1 },
        next: 'team_11',
        branchFlagsSet: ['team_rotating'],
      },
      {
        text: 'Create paired leads so technical and fairness-related questions are handled together.',
        feedbackTitle: 'You chose a balancing structure.',
        feedbackStory:
          'Each major workstream now has both a technical lead and a fairness or implementation-facing lead. The structure is more complex, but problems are less likely to stay isolated.',
        feedbackText:
          'This improves project performance by connecting technical progress with real-world constraints. It also supports social fairness, while keeping coordination costs lower than a fully distributed structure.',
        impact: { social: 4, financial: -3, performance: 2 },
        next: 'team_11',
        branchFlagsSet: ['team_paired_leads'],
      },
    ],
  }),

  team_11: makeInfoNode({
    id: 'team_11',
    chapter: 'team',
    title: 'Representation in Practice',
    x: 40,
    y: 1770,
    introText: 'This information node explains how inclusion becomes useful in practice.',
    text:
      'A team becomes more responsible when important concerns have a clear path into real decisions.\n\n' +
      'That path can be a role, a review meeting, or a paired-lead structure.\n\n' +
      'What matters is not simply having different people in the room. What matters is whether their concerns can influence the project before plans become too expensive or too advanced to change.',
    extraHtml:
      '<h3>Reusable method</h3><p>Take one planned decision and ask: who can still meaningfully change it before it is announced, budgeted, or treated as final? If the answer is “almost nobody,” the team structure is weaker than it looks.</p>',
    continueTo: 'team_12',
    continueLabel: 'Continue to the team lesson',
  }),

  team_12: makeInfoNode({
    id: 'team_12',
    chapter: 'team',
    title: 'What Team Design Really Does',
    x: 280,
    y: 1850,
    introText: 'This information node names the deeper lesson behind the chapter.',
    text:
      'A team is not only a list of skills. It is a structure that decides which problems become visible early and which ones are discovered too late.\n\n' +
      'Many “communication problems” are actually team design problems. The right concern may exist, but no one has a clear role or safe moment to raise it.\n\n' +
      'In this project, team design affects all three variables: social fairness, financial viability, and project performance.',
    extraHtml:
      '<h3>Useful method</h3><p>Before a project accelerates, write down who is responsible for technical quality, workflow fit, fairness, governance, and stakeholder impact. If one person is carrying several of these silently, the project is more fragile than it looks.</p><h3>What to watch for</h3><p>A warning sign is when important concerns only appear after a plan is already framed as too expensive to revisit.</p>',
    continueTo: 'team_13',
    continueLabel: 'Continue to the final team check',
  }),

  team_12b: makeInfoNode({
    id: 'team_12b',
    chapter: 'team',
    title: 'Missing Voices Check',
    x: 820,
    y: 1920,
    introText: 'This optional node offers a quick reflection tool for team composition.',
    text:
      'Ask four questions: who understands the technical system, who understands the clinical workflow, who understands governance, and who can speak for the people affected by mistakes?\n\n' +
      'If one of these perspectives only appears informally, the team may be depending on luck.',
    extraHtml:
      '<h3>Practical use</h3><p>This check is especially useful before hiring, before pilot design, and whenever a team says it will “add broader perspectives later.” Later often means after the expensive choices are already made.</p>',
  }),

  team_13: makeQuizNode({
    id: 'team_13',
    chapter: 'team',
    title: 'Final Team Check',
    x: 540,
    y: 1850,
    introText: 'The chapter ends with one practical test of judgment.',
    text:
      'Which sign best suggests that a team structure may be becoming unhealthy, even if the project still appears productive?',
    choices: [
      {
        text: 'The team is moving quickly and disagreements are becoming rarer over time.',
        retry: true,
        feedbackTitle: 'That can be misleading.',
        feedbackStory:
          'Fewer visible disagreements may mean that people no longer feel able to interrupt the process.',
        feedbackText:
          'Healthy teams do not eliminate friction. They surface the right friction early enough to shape decisions.',
      },
      {
        text: 'Important concerns only appear after major decisions are already framed as too expensive to revisit.',
        feedbackTitle: 'You identified the clearest warning sign.',
        feedbackStory:
          'This usually means the team is discovering its real constraints too late.',
        feedbackText:
          'This is the strongest answer because responsible team design is about making sure important concerns can enter before decisions harden.',
        next: 'team_14',
      },
      {
        text: 'Meetings are longer than they were during the project’s earliest phase.',
        retry: true,
        feedbackTitle: 'Longer meetings are not automatically the problem.',
        feedbackStory:
          'Longer meetings may simply reflect that the project has become more complex.',
        feedbackText:
          'The real question is whether the added discussion helps the project make better decisions.',
      },
    ],
  }),

  team_14: makeStoryNode({
    id: 'team_14',
    chapter: 'team',
    title: 'Escalation Path',
    x: 1060,
    y: 1770,
    introText: 'The chapter closes by asking how concerns would actually travel upward once the pilot gets busy.',
    text:
      'The team finally writes down a practical escalation path: who hears concerns first, who can pause work, and what counts as a reason to reopen a decision.\n\n' +
      'It looks like a small administrative document. But under pressure, it can decide whether the team stays reflective or simply learns to work around problems until they feel normal.',
    continueTo: 'team_15',
    continueLabel: 'Continue to the milestone',
  }),

  team_15: makeStoryNode({
    id: 'team_15',
    chapter: 'team',
    title: 'Team Milestone',
    x: 860,
    y: 1690,
    introText: 'The team chapter closes with a structure that is workable, but not tension-free.',
    text: (currentState) =>
      currentState.branchFlags.has('team_speed')
        ? 'The project leaves the chapter with a faster and more compact structure. Performance has improved in the short term, but some fairness and governance work has clearly been deferred rather than solved.'
        : 'The project leaves the chapter with a broader and more demanding structure. It carries more friction and higher costs, but it also catches more of the project’s real constraints before they become emergencies.',
    continueTo: null,
    continueLabel: 'Return to the board',
    completeChapter: 'team',
  }),

  data_01: makeStoryNode({
    id: 'data_01',
    chapter: 'data',
    title: 'First Dataset Offer',
    x: 1290,
    y: 150,
    introText: 'Three hospitals are willing to share historical data, but the records are unevenly documented.',
    text:
      'Everyone sees the same temptation: if the team moves fast, it can start experimenting almost immediately. But the archive is inconsistent, consent wording varies across sites, and no one is confident that the metadata tells a clean story.',
    continueTo: 'data_01b',
    continueLabel: 'Continue to the intake sheet',
  }),
  data_01b: makeStoryNode({
    id: 'data_01b',
    chapter: 'data',
    title: 'Archive Intake Sheet',
    x: 1250,
    y: 320,
    introText: 'Before the archive is touched, someone asks the team to summarize what it actually knows about the records.',
    text:
      'The first intake sheet looks incomplete almost immediately: provenance differs by site, labels were produced in different ways, and nobody can yet say with confidence which assumptions are stable and which are merely convenient. That incompleteness is useful. It reminds the team that “having data” is not the same thing as understanding what kind of evidence relationship it is entering.',
    continueTo: 'data_02',
    continueLabel: 'Continue to the intake decision',
  }),
  data_02: makeDecisionNode({
    id: 'data_02',
    chapter: 'data',
    title: 'How To Take In The Data',
    badge: 'Major decision',
    x: 1510,
    y: 130,
    introText: 'The first data decision is about discipline, not yet about model quality.',
    text:
      'One group argues that the project should ingest quickly and fix documentation later so the technical work can begin. Another argues for staged access, bias notes, and consent review before the team starts acting as if the archive is cleaner than it is.',
    choices: [
      {
        text: 'Ingest quickly, begin experimentation, and fix the documentation once the team knows which records actually matter.',
        feedbackTitle: 'You chose a faster intake route.',
        feedbackStory: 'The project gains immediate technical momentum, but it also builds on an archive whose weaknesses may become visible later and at higher cost.',
        feedbackText: 'This route favors progress-first logic and risks learning the data’s institutional limits only after they are already operationally embedded.',
        impact: { social: -9, financial: 7, performance: -5 },
        next: 'data_03_fast',
        unlocks: ['data_08b'],
        locks: ['data_03_careful', 'data_04_careful', 'data_05_careful', 'data_06_careful'],
        lockReason:
          'This fast-ingestion posture closed the staged-audit route. The chapter now follows a quicker but riskier data path.',
        branchFlagsSet: ['data_fast'],
      },
      {
        text: 'Start with staged access, document bias gaps, and treat consent ambiguity as part of the work rather than cleanup.',
        feedbackTitle: 'You chose a more disciplined intake route.',
        feedbackStory: 'The project slows down, but it gains a clearer picture of what kind of data relationship it is actually entering.',
        feedbackText: 'This route protects traceability and legitimacy even though it delays early model experimentation.',
        impact: { social: 7, financial: -6, performance: 4 },
        next: 'data_03_careful',
        unlocks: ['data_08b'],
        locks: ['data_03_fast', 'data_04_fast', 'data_05_fast', 'data_06_fast'],
        lockReason:
          'This staged-audit posture closed the quick-ingestion route. The chapter now follows a more deliberate data path.',
        branchFlagsSet: ['data_careful'],
      },
    ],
  }),
  data_03_fast: makeDecisionNode({
    id: 'data_03_fast',
    chapter: 'data',
    title: 'Ingestion Sprint',
    x: 1740,
    y: 90,
    introText: 'The archive enters the project faster than anyone is entirely comfortable admitting.',
    text:
      'The technical team is relieved to finally move, but small inconsistencies start surfacing immediately: missing fields, uneven labels, and site-specific notes that no one fully understands yet. What felt like momentum a few hours earlier now begins to look more like borrowing certainty from an archive the team has only partly met.',
    continueTo: 'data_04_fast',
    continueLabel: 'Continue',
  }),
  data_04_fast: makeQuizNode({
    id: 'data_04_fast',
    chapter: 'data',
    title: 'First Traceability Step',
    x: 1960,
    y: 150,
    introText: 'The route is fast, but it still needs one disciplined response.',
    text:
      'If the archive is already being ingested quickly, what is the most responsible first traceability step?',
    choices: [
      {
        text: 'Ignore the inconsistencies until the team knows whether the model can perform at all.',
        retry: true,
        feedbackTitle: 'That would delay the problem rather than control it.',
        feedbackStory: 'The model might move forward, but the team would lose the ability to say later which weaknesses were known and when.',
        feedbackText: 'Fast routes become much riskier when the project cannot track what it already knew about the archive’s limitations.',
      },
      {
        text: 'Create a living record of known gaps, site-specific uncertainties, and assumptions as the archive is used.',
        feedbackTitle: 'You chose the strongest stabilizing step.',
        feedbackStory: 'The route remains quick, but it no longer acts as if uncertainty can be safely forgotten while experimentation begins.',
        feedbackText: 'This is the best answer because it adds minimal friction while preserving some accountability over the archive’s weaknesses.',
        next: 'data_05_fast',
      },
      {
        text: 'Push for larger data volume so the inconsistencies matter less statistically.',
        retry: true,
        feedbackTitle: 'That treats quantity as if it solved governance.',
        feedbackStory: 'More records could make the route look stronger, but the project would still not understand what kinds of data problems it was scaling up.',
        feedbackText: 'Data scale does not erase ambiguity. It can just make the ambiguity harder to see.',
      },
    ],
  }),
  data_05_fast: makeDecisionNode({
    id: 'data_05_fast',
    chapter: 'data',
    title: 'Bias Gap Response',
    badge: 'Decision node',
    x: 1730,
    y: 310,
    introText: 'A fairness gap becomes visible sooner than the team expected.',
    text:
      'An early analysis suggests that the archive underrepresents some patient groups. The team now has to decide whether to keep pushing, pause for repair, or look for a faster compensating move that may ask a lot from the project’s remaining trust.',
    choices: [
      {
        text: 'Keep the route moving and document the representation limits for later correction.',
        feedbackTitle: 'You protected momentum, but left a serious gap exposed.',
        feedbackStory: 'The project can keep moving technically, yet it now carries a fairness limitation that will be expensive to explain later.',
        feedbackText: 'This is a recognizable real-world move, but it shifts a difficult problem forward rather than resolving it.',
        impact: { social: -8, financial: 4, performance: -3 },
        next: 'data_06_fast',
        branchFlagsSet: ['data_gap_deferred'],
      },
      {
        text: 'Pause and repair the representation gap before acting as if the archive is ready for stronger claims.',
        feedbackTitle: 'You slowed the route to protect legitimacy.',
        feedbackStory: 'The data path becomes less efficient, but the project avoids building too much confidence on top of a known blind spot.',
        feedbackText: 'This choice protects social and evidentiary quality at a real operational cost.',
        impact: { social: 7, financial: -5, performance: 4 },
        next: 'data_06_fast',
        branchFlagsSet: ['data_gap_repaired'],
      },
      {
        text: 'Launch a fast community data collection push to fill the gap quickly.',
        requires: ['social'],
        blockedReason:
          'This route depends on public trust and stakeholder willingness that the project no longer has strongly enough to request on short notice.',
        feedbackTitle: 'You tried to compensate quickly by asking for more trust.',
        feedbackStory: 'The move could help the archive, but it also asks communities to extend confidence to a project that may not yet have earned it.',
        feedbackText: 'Rapid expansion can look responsible, but it depends on whether the project still has the legitimacy to ask for more from people.',
        impact: { social: 3, financial: -3, performance: 1 },
        next: 'data_06_fast',
        branchFlagsSet: ['data_gap_expand'],
      },
    ],
  }),
  data_06_fast: makeStoryNode({
    id: 'data_06_fast',
    chapter: 'data',
    title: 'Shortcut Pressure',
    x: 1980,
    y: 440,
    introText: 'The quick route keeps moving, but the archive now starts to push back in practical ways.',
    text:
      'Two engineers argue that the team is drifting into a patchwork of local fixes that works for experimentation but will be hard to justify once people ask how the archive was handled from site to site. Shortcut logic often feels efficient while it is happening, but it can create a trail of weak explanations that becomes obvious later all at once.',
    continueTo: 'data_06',
    continueLabel: 'Continue to compute and storage',
  }),
  data_03_careful: makeDecisionNode({
    id: 'data_03_careful',
    chapter: 'data',
    title: 'Archive Inspection',
    x: 1450,
    y: 320,
    introText: 'The careful route begins by looking at the archive as institutional material, not only technical input.',
    text:
      'The team reads documentation, site notes, and consent language before treating the records as stable training material. It is slower, but the archive stops feeling like a silent object and starts feeling like a relationship with history behind it. That shift matters because it becomes harder to speak about the data as if it were neutral once the team has actually seen the unevenness of its provenance.',
    continueTo: 'data_04_careful',
    continueLabel: 'Continue',
  }),
  data_04_careful: makeQuizNode({
    id: 'data_04_careful',
    chapter: 'data',
    title: 'Consent Ambiguity',
    x: 1650,
    y: 470,
    introText: 'The route is slower, but it still needs a judgment call.',
    text:
      'If consent language varies across sites and some reuse assumptions are unclear, what is the most responsible interpretation?',
    choices: [
      {
        text: 'Treat all ambiguity as effectively resolved unless someone formally challenges it.',
        retry: true,
        feedbackTitle: 'That would mistake silence for clarity.',
        feedbackStory: 'The project might move faster, but it would do so by converting uncertainty into unwarranted confidence.',
        feedbackText: 'Ambiguity should be recorded and managed, not silently flattened into permission.',
      },
      {
        text: 'Document the ambiguity, scope data use accordingly, and avoid acting as if all sites carry the same level of reuse certainty.',
        feedbackTitle: 'You chose the strongest interpretation.',
        feedbackStory: 'The route remains careful, but it avoids turning unclear consent language into a false sense of legitimacy.',
        feedbackText: 'This answer best fits the chapter because it preserves traceability while still letting work continue responsibly.',
        next: 'data_05_careful',
      },
      {
        text: 'Drop the most ambiguous sites entirely before checking whether their removal creates fairness problems.',
        retry: true,
        feedbackTitle: 'That solves one issue by risking another.',
        feedbackStory: 'Removing uncertain records may feel safer, but it can also distort the archive in ways the project then fails to notice.',
        feedbackText: 'Responsible data judgment has to track several constraints at once, not only the most administratively visible one.',
      },
    ],
  }),
  data_05_careful: makeDecisionNode({
    id: 'data_05_careful',
    chapter: 'data',
    title: 'How Much Documentation Is Enough?',
    badge: 'Decision node',
    x: 1430,
    y: 640,
    introText: 'The careful route now has to decide how far its discipline will really go.',
    text:
      'The documentation burden is beginning to irritate some of the technical team. One proposal keeps the audit light and pragmatic. Another argues that the project should invest more heavily now so later claims rest on something sturdier than memory and good intentions.',
    choices: [
      {
        text: 'Keep documentation light and targeted so the team does not disappear into paperwork.',
        feedbackTitle: 'You kept the careful route leaner.',
        feedbackStory: 'The archive remains more accountable than in the fast path, but some future questions will still depend on how much the team can reconstruct later.',
        feedbackText: 'This protects feasibility, though it limits how strong the project’s later traceability claims can be.',
        impact: { social: 2, financial: 1, performance: 1 },
        next: 'data_06_careful',
        branchFlagsSet: ['data_docs_light'],
      },
      {
        text: 'Invest in stronger documentation and audit notes now, even if it delays visible model progress.',
        feedbackTitle: 'You made the careful route more robust.',
        feedbackStory: 'The team slows down, but it gains a record strong enough to explain how the archive was interpreted and constrained over time.',
        feedbackText: 'This route is less comfortable in the short term and much stronger if the project later needs to justify itself publicly.',
        impact: { social: 4, financial: -3, performance: 2 },
        next: 'data_06_careful',
        branchFlagsSet: ['data_docs_strong'],
      },
    ],
  }),
  data_06_careful: makeStoryNode({
    id: 'data_06_careful',
    chapter: 'data',
    title: 'Audit Patience',
    x: 1660,
    y: 780,
    introText: 'The careful route is more defensible, but some of the team is beginning to test its patience.',
    text:
      'People can now explain the archive more honestly, yet several members worry that the project is accumulating disciplined notes faster than visible model progress. The route is sturdier, but harder to sell internally. This is a recognizable research tension: good documentation often looks slow right up until the moment weak documentation becomes a serious liability.',
    continueTo: 'data_06',
    continueLabel: 'Continue to compute and storage',
  }),
  data_06: makeStoryNode({
    id: 'data_06',
    chapter: 'data',
    title: 'Compute And Storage',
    x: 1310,
    y: 460,
    introText: 'The archive is now real enough to produce a practical shock.',
    text:
      'The first compute and validation estimate lands on the table. What looked like a manageable technical step now has a practical performance and financial profile that the team can no longer treat as background noise.',
    continueTo: 'data_06b',
    continueLabel: 'Continue to the fairness review note',
  }),
  data_06b: makeStoryNode({
    id: 'data_06b',
    chapter: 'data',
    title: 'Fairness Review Note',
    x: 1180,
    y: 700,
    introText: 'The team pauses long enough to write down what it would otherwise keep in people’s heads.',
    text:
      'A short internal note captures the representation gaps, provenance uncertainties, and infrastructure costs that are now shaping the data conversation. It is not glamorous work, but it changes the chapter’s tone. Once these issues are written down in one place, it becomes harder for anyone to pretend they were minor side problems all along.',
    continueTo: 'data_07',
    continueLabel: 'Continue to the response',
  }),
  data_07: makeDecisionNode({
    id: 'data_07',
    chapter: 'data',
    title: 'Responding To The Data Strain',
    badge: 'Decision node',
    x: 1180,
    y: 590,
    introText: 'The project now has to choose what kind of data discipline it wants under real resource pressure.',
    text:
      'One response is to push for more data quickly and hope scale improves the picture. Another is to work harder on the archive already in hand. A third is to redesign the technical path so it costs less to learn from the data without pretending that more is always better.',
    choices: [
      {
        text: 'Expand data collection quickly so the model can learn from a broader pool as soon as possible.',
        requires: ['social'],
        blockedReason:
          'This route depends on enough social legitimacy to ask for more data cooperation. Right now that trust base is too thin to make the move realistic.',
        feedbackTitle: 'You chose the expansion route.',
        feedbackStory: 'The project may improve its archive, but it also increases what it is asking from institutions and patients at a moment when trust may still be uneven.',
        feedbackText: 'Data expansion is not only technical. It depends on whether the project has earned enough legitimacy to ask for more.',
        impact: { social: -2, financial: -4, performance: 2 },
        next: 'data_07b',
        branchFlagsSet: ['data_expand'],
      },
      {
        text: 'Invest in cleaning, documenting, and understanding the existing archive more deeply before broadening it.',
        feedbackTitle: 'You chose depth over expansion.',
        feedbackStory: 'The route may look slower, but the project becomes better able to explain what its evidence actually means and where it remains weak.',
        feedbackText: 'This protects social and epistemic quality at a visible cost in time and budget.',
        impact: { social: 6, financial: -5, performance: 4 },
        next: 'data_07b',
        branchFlagsSet: ['data_deepen'],
      },
      {
        text: 'Redesign the technical path to use less compute, even if that means giving up some early experimental ambition.',
        feedbackTitle: 'You reduced the footprint of the route.',
        feedbackStory: 'The archive path becomes more disciplined and technically defensible, though some ambitions now have to be postponed or made narrower.',
        feedbackText: 'This protects project performance by refusing to treat weak validation or fragile evidence as acceptable shortcuts.',
        impact: { social: 0, financial: -2, performance: 8 },
        next: 'data_07b',
        branchFlagsSet: ['data_low_compute'],
      },
    ],
  }),
  data_07b: makeInfoNode({
    id: 'data_07b',
    chapter: 'data',
    title: 'Documentation Habit',
    x: 1180,
    y: 820,
    introText: 'This information node turns documentation into a practical research habit.',
    text:
      'A useful data log is not a bureaucratic afterthought. It is a decision aid. It helps teams explain why a dataset looked acceptable at a given moment, what was already known to be weak, and which assumptions would justify slowing down later. Students often think documentation matters only for audit. In practice, it also matters for memory, turnover, and the ability to reopen decisions honestly.',
    extraHtml:
      '<h3>Reusable method</h3><p>After any important data choice, write two sentences: what the team believes it knows, and what would make that belief weaker than it currently appears. That habit alone can make later correction much easier.</p>',
    continueTo: 'data_08',
    continueLabel: 'Continue to the data lesson',
  }),
  data_08: makeInfoNode({
    id: 'data_08',
    chapter: 'data',
    title: 'Traceability Is A Governance Tool',
    x: 1420,
    y: 860,
    introText: 'This information node names the chapter’s structural lesson.',
    text:
      'Data governance is not only about legality or performance. It is also about whether the project can later say what it used, what it knew, what it ignored, and why those decisions were made under pressure. Traceability is what lets a team correct itself without pretending that earlier uncertainty never existed.',
    extraHtml:
      '<h3>Useful method</h3><p>Keep a lightweight data log: provenance, consent basis, known gaps, exclusions, label definitions, and what would invalidate current use assumptions.</p><h3>What to avoid</h3><p>Do not rely on memory to reconstruct why a dataset seemed acceptable at the time. If the explanation cannot survive turnover or public scrutiny, the governance is too thin.</p>',
    continueTo: 'data_09',
    continueLabel: 'Continue to the final data check',
  }),
  data_08b: makeInfoNode({
    id: 'data_08b',
    chapter: 'data',
    title: 'Minimum Data Log',
    x: 1940,
    y: 930,
    introText: 'This optional node gives a practical documentation structure students could reuse later.',
    text:
      'A minimal data log should answer six questions: where the data came from, what consent or reuse basis applies, what gaps are known, how labels were defined, what was excluded, and what would make the current use case no longer defensible.',
    extraHtml:
      '<h3>Why this helps</h3><p>This kind of log supports handover, review, and correction. It also forces the team to admit uncertainty explicitly instead of hiding it inside fast-moving technical progress.</p>',
  }),
  data_09: makeQuizNode({
    id: 'data_09',
    chapter: 'data',
    title: 'Final Data Check',
    x: 1720,
    y: 980,
    introText: 'The chapter ends with one judgment test about readiness.',
    text:
      'Which condition best signals that the project is moving toward a defensible data posture rather than just a technically active one?',
    choices: [
      {
        text: 'The team can finally train repeatedly without stopping for metadata or consent questions.',
        retry: true,
        feedbackTitle: 'That mainly signals friction reduction.',
        feedbackStory: 'Lower friction may feel productive, but it does not tell the project whether its archive has become more accountable or simply easier to ignore.',
        feedbackText: 'Readiness is not just about smoother training loops. It is about whether the project can justify the conditions under which training is happening.',
      },
      {
        text: 'The team can explain the archive’s limits, known gaps, and reuse conditions without pretending they have disappeared.',
        feedbackTitle: 'You identified the chapter’s core test.',
        feedbackStory: 'The project may still have uncertainty, but it now has a more truthful relationship to what its data can and cannot support.',
        feedbackText: 'This is the strongest answer because defensibility depends on clarity about limits, not only on technical activity.',
        next: 'data_09b',
      },
      {
        text: 'The project has accumulated enough data volume that bias concerns become less important to raise publicly.',
        retry: true,
        feedbackTitle: 'That mistakes scale for resolution.',
        feedbackStory: 'Volume can hide problems, but it does not guarantee that the project has understood or responsibly handled them.',
        feedbackText: 'Fairness and accountability do not vanish when the archive gets larger. They often become harder to inspect.',
      },
    ],
  }),
  data_09b: makeStoryNode({
    id: 'data_09b',
    chapter: 'data',
    title: 'Data Transfer Note',
    x: 1920,
    y: 1130,
    introText: 'The chapter closes with a handover from data work to deployment work.',
    text:
      'A short transfer note is prepared for the team planning launch. It explains what the archive can support, where it remains weak, and which operational claims would now exceed what the data can honestly carry. That note matters because many projects do not fail at the data stage itself. They fail later, when launch decisions quietly assume more certainty than the data chapter ever really earned.',
    continueTo: 'data_10',
    continueLabel: 'Continue to the milestone',
  }),
  data_10: makeStoryNode({
    id: 'data_10',
    chapter: 'data',
    title: 'Data Milestone',
    x: 1910,
    y: 690,
    introText: 'The data chapter closes with a clearer, though still imperfect, evidentiary foundation.',
    text: (currentState) =>
      currentState.branchFlags.has('data_fast')
        ? 'The project leaves the chapter with technical momentum, but also with a sharper awareness that archive weaknesses were not truly solved, only managed.'
        : 'The project leaves the chapter with a slower but sturdier data posture. It still carries uncertainty, yet it now understands its archive more honestly and defensibly.',
    continueTo: null,
    continueLabel: 'Return to the board',
    completeChapter: 'data',
  }),

  launch_01: makeStoryNode({
    id: 'launch_01',
    chapter: 'launch',
    title: 'Winter Pressure',
    x: 1290,
    y: 1160,
    introText: 'The launch chapter opens once the earlier foundations have become concrete enough to carry real consequences.',
    text:
      'Emergency admissions begin to rise. People inside the hospital stop talking about the project as a concept and start asking when it will actually appear in practice. Every earlier compromise now returns in the form of timing, trust, and operational risk.',
    continueTo: 'launch_01b',
    continueLabel: 'Continue to the launch room',
  }),
  launch_01b: makeStoryNode({
    id: 'launch_01b',
    chapter: 'launch',
    title: 'Launch Room',
    x: 1200,
    y: 1320,
    introText: 'The hospital finally gathers the people who would have to live with the first week of deployment.',
    text:
      'The room is more grounded than earlier meetings: ward staff, project leads, and operational managers are all trying to imagine the same future week from different angles. It becomes clear very quickly that “launch” is not one event. It is a chain of small handovers, ambiguities, and expectations that will either stay governable or become friction points as soon as the winter rush turns abstract confidence into practical strain.',
    continueTo: 'launch_02',
    continueLabel: 'Continue to readiness posture',
  }),
  launch_02: makeDecisionNode({
    id: 'launch_02',
    chapter: 'launch',
    title: 'Launch Posture',
    badge: 'Major decision',
    x: 1510,
    y: 1140,
    introText: 'The first launch decision is about scope, visibility, and what kind of risk the hospital is willing to carry.',
    text:
      'One route pushes toward a broader, more visible multi-site pilot that shows confidence and momentum. Another route argues for a narrower first deployment that learns quietly, protects room for rollback, and resists the urge to turn a first launch into a public proof of inevitability.',
    choices: [
      {
        text: 'Prepare for a visible multi-site pilot that demonstrates strong confidence in the project.',
        feedbackTitle: 'You chose a broader and more exposed launch route.',
        feedbackStory: 'The project may now look more convincing from the outside, but it also becomes less able to treat uncertainty as normal.',
        feedbackText: 'This route can amplify momentum, yet it makes every unresolved weakness more public and less forgiving.',
        impact: { social: -8, financial: 6, performance: -4 },
        next: 'launch_03_ambitious',
        unlocks: ['launch_08b'],
        locks: ['launch_03_measured', 'launch_04_measured', 'launch_05_measured', 'launch_06_measured'],
        lockReason:
          'This broader launch posture closed the quieter pilot route. The chapter now follows a more exposed deployment path.',
        branchFlagsSet: ['launch_ambitious'],
      },
      {
        text: 'Prepare for a narrower ward-level pilot that keeps room for correction and local trust-building.',
        feedbackTitle: 'You chose a more measured launch route.',
        feedbackStory: 'The project may look less triumphant, but it stays closer to the kind of deployment that can still learn without overclaiming.',
        feedbackText: 'This route protects correction capacity and reduces the political cost of admitting uncertainty.',
        impact: { social: 7, financial: -3, performance: 3 },
        next: 'launch_03_measured',
        unlocks: ['launch_08b'],
        locks: ['launch_03_ambitious', 'launch_04_ambitious', 'launch_05_ambitious', 'launch_06_ambitious'],
        lockReason:
          'This narrower launch posture closed the broader showcase route. The chapter now follows a more measured deployment path.',
        branchFlagsSet: ['launch_measured'],
      },
    ],
  }),
  launch_03_ambitious: makeDecisionNode({
    id: 'launch_03_ambitious',
    chapter: 'launch',
    title: 'Coordination Call',
    x: 1740,
    y: 1100,
    introText: 'The broader route creates immediate coordination strain.',
    text:
      'Three hospital sites now want to know what will change for them, who owns the monitoring burden, and how quickly the system can be adjusted if reality turns out messier than the optimism in the room. The broader route now starts producing the kind of practical questions that enthusiasm alone cannot absorb.',
    continueTo: 'launch_04_ambitious',
    continueLabel: 'Continue',
  }),
  launch_04_ambitious: makeQuizNode({
    id: 'launch_04_ambitious',
    chapter: 'launch',
    title: 'Launch Condition',
    x: 1920,
    y: 1180,
    introText: 'The team needs a clear condition for proceeding responsibly.',
    text:
      'Under a broader launch route, which condition matters most before the hospital should treat the pilot as genuinely ready?',
    choices: [
      {
        text: 'A compelling external narrative that reassures executives the launch will look decisive.',
        retry: true,
        feedbackTitle: 'That protects optics, not readiness.',
        feedbackStory: 'The project might feel easier to defend publicly, but it would still be weak if rollback and monitoring conditions remain vague.',
        feedbackText: 'Readiness under a broad rollout depends less on rhetoric than on whether the project can absorb error without institutional panic.',
      },
      {
        text: 'Clear monitoring ownership, rollback triggers, and a realistic understanding of where uncertainty still remains.',
        feedbackTitle: 'You identified the most important condition.',
        feedbackStory: 'The route may still be ambitious, but it now has a more defensible structure for containing the consequences of error.',
        feedbackText: 'This is the strongest answer because broad pilots need stronger correction systems, not just stronger confidence.',
        next: 'launch_05_ambitious',
      },
      {
        text: 'Enough technical excitement that the team feels motivated to handle operational problems later if they appear.',
        retry: true,
        feedbackTitle: 'Motivation is not the same as launch discipline.',
        feedbackStory: 'Excitement can help teams push through discomfort, but it cannot substitute for a monitoring and rollback structure once patients and staff are affected.',
        feedbackText: 'A responsible launch is defined by how it handles uncertainty, not only by how strongly people believe in it.',
      },
    ],
  }),
  launch_05_ambitious: makeDecisionNode({
    id: 'launch_05_ambitious',
    chapter: 'launch',
    title: 'How Visible Should Launch Be?',
    badge: 'Decision node',
    x: 1730,
    y: 1310,
    introText: 'A broader route now has to decide how much publicity it will carry with it.',
    text:
      'The sponsor wants a visible announcement. Some hospital staff want a quieter clinical-first rollout until the system behaves well under stress. The decision will shape how forgiving the environment becomes once the first problems appear.',
    choices: [
      {
        text: 'Pair the pilot with a visible sponsor-backed announcement to secure future momentum early.',
        requires: ['social'],
        blockedReason:
          'This option depends on a level of public trust and institutional confidence that the project no longer has strongly enough to support such a visible launch.',
        feedbackTitle: 'You turned the ambitious route into a public event.',
        feedbackStory: 'The project gains attention and possible leverage, but it also becomes much harder to treat early corrections as normal learning.',
        feedbackText: 'Publicity can help momentum, yet it also raises the political cost of uncertainty exactly when the project most needs room to acknowledge it.',
        impact: { social: -10, financial: 6, performance: -3 },
        next: 'launch_06_ambitious',
        branchFlagsSet: ['launch_public'],
      },
      {
        text: 'Keep the rollout operationally broad but communication-light until the team sees the first live signals.',
        feedbackTitle: 'You protected the route from some of its own visibility.',
        feedbackStory: 'The pilot remains large, but it gains a little more space to absorb its first surprises without immediate public staging.',
        feedbackText: 'This does not remove the risks of breadth, but it does reduce the cost of learning in public.',
        impact: { social: 2, financial: 1, performance: 1 },
        next: 'launch_06_ambitious',
        branchFlagsSet: ['launch_broad_quiet'],
      },
    ],
  }),
  launch_06_ambitious: makeStoryNode({
    id: 'launch_06_ambitious',
    chapter: 'launch',
    title: 'Site Readiness Gap',
    x: 1910,
    y: 1390,
    introText: 'The broader route exposes a problem that only appears once several sites compare notes side by side.',
    text:
      'One site is confident, another is under-trained, and a third is quietly depending on one local champion to absorb most of the operational uncertainty. The launch is no longer one thing; it is several uneven realities at once. Multi-site ambition looks clean from far away and much less uniform the closer people get to actual implementation work.',
    continueTo: 'launch_06',
    continueLabel: 'Continue to clinician trust',
  }),
  launch_03_measured: makeDecisionNode({
    id: 'launch_03_measured',
    chapter: 'launch',
    title: 'Ward Walkthrough',
    x: 1480,
    y: 1340,
    introText: 'The narrower route feels more modest, but much more concrete.',
    text:
      'A nurse manager walks through the pilot ward and points out several practical problems that no one had fully seen from the boardroom: alarm fatigue, handover timing, and how easily “decision support” can still feel like pressure in a busy clinical setting. The quieter route suddenly feels less like caution in the abstract and more like respect for details that will decide whether staff can actually live with the tool.',
    continueTo: 'launch_04_measured',
    continueLabel: 'Continue',
  }),
  launch_04_measured: makeQuizNode({
    id: 'launch_04_measured',
    chapter: 'launch',
    title: 'Launch Condition',
    x: 1680,
    y: 1460,
    introText: 'The quieter route still needs a real test of readiness.',
    text:
      'Under a narrower pilot route, which condition matters most before the ward should treat the system as responsibly deployable?',
    choices: [
      {
        text: 'A well-designed message that reassures staff the pilot is low risk.',
        retry: true,
        feedbackTitle: 'Messaging alone is not enough.',
        feedbackStory: 'The system may sound reassuring, but the ward still needs concrete monitoring, handoff clarity, and a credible plan for correction.',
        feedbackText: 'Even a measured rollout must be operationally ready, not simply rhetorically calm.',
      },
      {
        text: 'Clear ownership for monitoring, practical workflow fit, and a visible path for pausing or stepping back if needed.',
        feedbackTitle: 'You identified the strongest launch condition.',
        feedbackStory: 'The route remains modest, but it now has a real structure for learning without pretending that uncertainty is a failure.',
        feedbackText: 'This is the best answer because a measured pilot is only meaningful if it truly keeps room for correction.',
        next: 'launch_05_measured',
      },
      {
        text: 'Enough technical confidence that the team will probably not need to use its rollback plan anyway.',
        retry: true,
        feedbackTitle: 'That confuses confidence with preparedness.',
        feedbackStory: 'A responsible rollback structure exists precisely because the team cannot assume confidence is enough once the system is live.',
        feedbackText: 'Readiness is measured by how a project can handle being wrong, not by how strongly it hopes not to be.',
      },
    ],
  }),
  launch_05_measured: makeDecisionNode({
    id: 'launch_05_measured',
    chapter: 'launch',
    title: 'How Quiet Should The Pilot Be?',
    badge: 'Decision node',
    x: 1450,
    y: 1620,
    introText: 'A quieter route still has to decide how much of itself to reveal.',
    text:
      'Some people want the pilot framed as a learning exercise with careful expectations. Others worry that too much modesty will make the project look fragile and politically easier to defund if early results are mixed.',
    choices: [
      {
        text: 'Frame the pilot explicitly as a learning phase with transparent limits and visible checkpoints.',
        feedbackTitle: 'You made the route openly provisional.',
        feedbackStory: 'The project may look less triumphant, but it gains a stronger public language for correction, adjustment, and trust-building.',
        feedbackText: 'This protects legitimacy by refusing to confuse modesty with weakness.',
        impact: { social: 8, financial: -3, performance: 3 },
        next: 'launch_06_measured',
        branchFlagsSet: ['launch_learning_frame'],
      },
      {
        text: 'Keep the pilot narrow operationally, but communicate it as a quiet sign that full rollout is mostly a matter of time.',
        feedbackTitle: 'You softened the caution without fully abandoning it.',
        feedbackStory: 'The route may keep institutional support stronger, but it also begins recreating some of the expectation pressure it was meant to avoid.',
        feedbackText: 'This is more ambitious rhetorically than it first appears, even if the rollout itself remains narrow.',
        impact: { social: -4, financial: 4, performance: -2 },
        next: 'launch_06_measured',
        branchFlagsSet: ['launch_quiet_confidence'],
      },
    ],
  }),
  launch_06_measured: makeStoryNode({
    id: 'launch_06_measured',
    chapter: 'launch',
    title: 'Local Confidence Check',
    x: 1560,
    y: 2010,
    introText: 'The quieter route still needs more than caution. It needs people on the ward to believe the caution is real.',
    text:
      'A ward lead says the pilot sounds careful on paper, but asks whether staff will actually feel permitted to pause or question the tool once the winter rush makes hesitation expensive. The question matters because many pilots are technically reversible and socially difficult to challenge once they are attached to hope or urgency.',
    continueTo: 'launch_06',
    continueLabel: 'Continue to clinician trust',
  }),
  launch_06: makeStoryNode({
    id: 'launch_06',
    chapter: 'launch',
    title: 'Clinician Trust',
    x: 1320,
    y: 1490,
    introText: 'No launch route avoids the same basic institutional test.',
    text:
      'A consultant physician asks a simple question in a tense tone: “When this system is wrong, who will be expected to carry that wrongness first?” The room falls quiet because everyone knows the answer cannot be technical alone.',
    continueTo: 'launch_06b',
    continueLabel: 'Continue to the ward simulation',
  }),
  launch_06b: makeStoryNode({
    id: 'launch_06b',
    chapter: 'launch',
    title: 'Ward Simulation',
    x: 1140,
    y: 1790,
    introText: 'The team runs a brief simulation of what the first week could actually feel like.',
    text:
      'The exercise is not technically sophisticated, but it is revealing. It shows who gets called first when the tool behaves oddly, where uncertainty is likely to be explained badly, and how quickly a “pilot” can start feeling mandatory once pressure is high. Students often imagine that launch problems begin with system errors alone. Here the room sees that many of them begin with roles, expectations, and communication paths that were never made explicit enough.',
    continueTo: 'launch_07',
    continueLabel: 'Continue to monitoring design',
  }),
  launch_07: makeDecisionNode({
    id: 'launch_07',
    chapter: 'launch',
    title: 'Monitoring And Rollback',
    badge: 'Decision node',
    x: 1270,
    y: 1650,
    introText: 'The final live decision is about how the project will behave once reality starts pressing back.',
    text:
      'One design uses strict monitoring ownership and clear rollback triggers. Another prioritizes rapid iteration and softer guardrails to preserve momentum. A third turns launch into a dashboard-heavy performance environment that risks treating visibility as reassurance.',
    choices: [
      {
        text: 'Use strict monitoring ownership, explicit rollback triggers, and limited automation while trust is still forming.',
        feedbackTitle: 'You designed the launch around correction capacity.',
        feedbackStory: 'The system may feel more cautious, but clinicians can now see how the project intends to behave when uncertainty becomes real rather than theoretical.',
        feedbackText: 'This protects legitimacy and learning, even though it may look less bold in the short term.',
        impact: { social: 8, financial: -4, performance: 4 },
        next: 'launch_07b',
        branchFlagsSet: ['launch_strict_monitoring'],
      },
      {
        text: 'Use softer guardrails and rapid iteration so the team can respond quickly without slowing the rollout too much.',
        feedbackTitle: 'You protected momentum over firmness.',
        feedbackStory: 'The project stays agile, but some staff now feel that the system’s correction logic may depend too much on trust in the core team’s judgment.',
        feedbackText: 'This can work operationally, yet it makes legitimacy and clarity harder to secure under stress.',
        impact: { social: -6, financial: 4, performance: -3 },
        next: 'launch_07b',
        branchFlagsSet: ['launch_soft_monitoring'],
      },
      {
        text: 'Center the launch around live performance dashboards and sponsor-facing visibility to prove the system is under control.',
        overRequires: ['financial'],
        blockedReason:
          'This option would double down on financial and performance logic at a moment when that dimension is already too dominant to keep the project balanced.',
        feedbackTitle: 'You made the launch highly performative.',
        feedbackStory: 'The dashboards may reassure some executives, but they also risk turning correction into something politically harder to admit in real time.',
        feedbackText: 'Performance visibility is not the same thing as accountability. In some cases, it can make accountability harder to practice honestly.',
        impact: { social: -8, financial: 6, performance: -4 },
        next: 'launch_07b',
        branchFlagsSet: ['launch_dashboard'],
      },
    ],
  }),
  launch_07b: makeInfoNode({
    id: 'launch_07b',
    chapter: 'launch',
    title: 'Incident Framing',
    x: 1220,
    y: 2060,
    introText: 'This information node focuses on a launch habit students can reuse later.',
    text:
      'Before deployment, decide how the team will talk about incidents, near-misses, and staff discomfort. If the only available language is success language, people will hide uncertainty for longer than they should. Incident framing is therefore part of governance, not just communication polish.',
    extraHtml:
      '<h3>Reusable method</h3><p>Write down one trigger for pause, one trigger for closer monitoring, and one trigger that should be logged even if it does not yet justify intervention. These categories help keep weak signals visible instead of collapsing them into “everything is fine until it is not.”</p>',
    continueTo: 'launch_08',
    continueLabel: 'Continue to the launch lesson',
  }),
  launch_08: makeInfoNode({
    id: 'launch_08',
    chapter: 'launch',
    title: 'Deployment Is A Legitimacy Event',
    x: 1430,
    y: 1880,
    introText: 'This information node names the final structural lesson.',
    text:
      'Deployment is not merely the moment a system begins running. It is also the moment an institution reveals what it believes counts as acceptable uncertainty, who it expects to absorb risk, and how honestly it can describe the limits of its own confidence. A launch says as much about governance as it does about technology.',
    extraHtml:
      '<h3>Useful method</h3><p>Before launch, define success criteria, monitoring ownership, rollback triggers, who can pause the system, and how incidents will be recorded and discussed.</p><h3>What students should remember</h3><p>A pilot is more responsible when people closest to the work know how to question it safely, not only when leadership knows how to present it confidently.</p>',
    continueTo: 'launch_09',
    continueLabel: 'Continue to the final question',
  }),
  launch_08b: makeInfoNode({
    id: 'launch_08b',
    chapter: 'launch',
    title: 'Pilot Readiness Checklist',
    x: 1940,
    y: 1950,
    introText: 'This optional node offers a reusable launch checklist.',
    text:
      'A basic readiness check should cover five things: who monitors, who can pause, what counts as a reportable incident, what evidence would justify broadening the pilot, and how staff concerns will be fed back into decisions.',
    extraHtml:
      '<h3>Why this helps</h3><p>It keeps launch from becoming only a confidence ritual. The point is not to remove uncertainty, but to decide in advance how the project will behave when uncertainty becomes real.</p>',
  }),
  launch_09: makeQuizNode({
    id: 'launch_09',
    chapter: 'launch',
    title: 'Final Launch Check',
    x: 1720,
    y: 1880,
    introText: 'The final quiz checks whether the whole game’s logic has stayed intact.',
    text:
      'Which statement best captures what a responsible launch posture requires after all four chapters of the game?',
    choices: [
      {
        text: 'A launch is mainly successful if the project can show confidence strongly enough to avoid political hesitation.',
        retry: true,
        feedbackTitle: 'That reduces launch to optics.',
        feedbackStory: 'Confidence may matter politically, but it cannot substitute for governable uncertainty, correction capacity, and a believable account of constraints.',
        feedbackText: 'A responsible launch is not one that merely looks certain. It is one that can remain defensible when certainty turns out to be incomplete.',
      },
      {
        text: 'A launch should match the project’s actual balance of evidence, trust, feasibility, and correction capacity rather than only its ambition.',
        feedbackTitle: 'You identified the game’s central launch lesson.',
        feedbackStory: 'The project is now being judged in the right frame: not by whether it seems bold, but by whether it is genuinely governable under real conditions.',
        feedbackText: 'This is the strongest answer because the whole game has been about keeping ambition aligned with institutional reality.',
        next: 'launch_09b',
      },
      {
        text: 'Once a project reaches deployment, most earlier funding, team, and data tensions matter much less than technical performance.',
        retry: true,
        feedbackTitle: 'That misreads how projects actually work.',
        feedbackStory: 'Deployment is where earlier structural tensions become visible, not where they disappear into performance alone.',
        feedbackText: 'Launch exposes the accumulated logic of the project. It does not erase it.',
      },
    ],
  }),
  launch_09b: makeStoryNode({
    id: 'launch_09b',
    chapter: 'launch',
    title: 'First Week Outlook',
    x: 1910,
    y: 2060,
    introText: 'The chapter pauses one step before the ending to imagine the project’s first week in practice.',
    text:
      'The team writes a short note describing what it expects to learn in the first week, what would count as a reassuring signal, and what would count as a sign that the pilot has been framed too optimistically. That note matters because responsible launch is not only about starting. It is also about deciding what kind of evidence will justify staying the course once the system is real enough to disappoint people.',
    continueTo: 'launch_10',
    continueLabel: 'Continue to the ending',
  }),
  launch_10: makeStoryNode({
    id: 'launch_10',
    chapter: 'launch',
    title: (currentState) => getEnding(currentState).title,
    badge: 'Ending',
    x: 1910,
    y: 1760,
    introText: 'The game ends with the kind of launch the project has made possible for itself.',
    text: (currentState) => getEnding(currentState).text,
    extraHtml: (currentState) => `<h3>Outcome</h3><p>${escapeHtml(getEnding(currentState).lesson)}</p>`,
    continueTo: null,
    continueLabel: 'Finish and return to board',
    completeChapter: 'launch',
  }),
};

function getEnding(currentState) {
  const minResource = Math.min(
    currentState.resources.social,
    currentState.resources.financial,
    currentState.resources.performance,
  );
  const lowCount = Object.values(currentState.resources).filter((value) => value <= LOWER_LIMIT).length;
  const highVisibility =
    currentState.branchFlags.has('funding_hype') ||
    currentState.branchFlags.has('launch_ambitious') ||
    currentState.branchFlags.has('launch_public');

  if (lowCount >= 2 || minResource <= 24) {
    return {
      key: 'stalled',
      title: 'Stalled / Contested Rollout',
      text:
        'The launch remains technically possible, but the institution no longer feels aligned enough to carry it cleanly. Some people still want to push, others want to pause, and the result is a rollout that becomes politically contested before it becomes truly stable.',
      lesson:
        'This ending reflects what happens when imbalance accumulates faster than the project can absorb it. The system may still exist, but the institution no longer trusts the path to it.',
    };
  }

  if (highVisibility || currentState.resources.financial >= currentState.resources.social + 10) {
    return {
      key: 'fragile',
      title: 'Fragile High-Visibility Rollout',
      text:
        'The system launches with visible momentum and enough institutional backing to look convincing from the outside. Yet underneath the confidence, several balances remain tense, and the project now has less room to admit uncertainty without political cost.',
      lesson:
        'This ending shows how a project can reach deployment while still carrying structural fragility. Visibility and readiness are not the same thing.',
    };
  }

  return {
    key: 'measured',
    title: 'Measured Rollout',
    text:
      'The system enters practice in a narrower, more deliberate way. It does not look spectacular, but the institution has kept enough balance to learn, correct, and explain itself without collapsing into panic every time uncertainty reappears.',
    lesson:
      'This ending reflects a project that stayed governable. It never removed tension completely, but it kept the balances strong enough for correction to remain realistic.',
  };
}

function getNodeSize(node) {
  if (node.id === 'center') {
    return { w: node.w || 220, h: node.h || 220 };
  }
  return { w: node.w || 176, h: node.h || 104 };
}

function getChapterMeta(chapterId) {
  return chapterClusters.find((cluster) => cluster.id === chapterId) || null;
}

function getBaseNodeFrame(node) {
  const { w, h } = getNodeSize(node);
  return {
    x: node.x,
    y: node.y,
    w,
    h,
    right: node.x + w,
    bottom: node.y + h,
  };
}

function getChapterNodeBounds(chapterId) {
  const chapterNodes = Object.values(nodes).filter((node) => node.chapter === chapterId);
  const frames = chapterNodes.map((node) => ({ node, frame: getBaseNodeFrame(node) }));
  return {
    chapterId,
    frames,
    minX: Math.min(...frames.map(({ frame }) => frame.x)),
    minY: Math.min(...frames.map(({ frame }) => frame.y)),
    maxX: Math.max(...frames.map(({ frame }) => frame.right)),
    maxY: Math.max(...frames.map(({ frame }) => frame.bottom)),
  };
}

function getLayoutOffsets() {
  const chapterBounds = Object.fromEntries(
    chapterClusters.map((cluster) => [cluster.id, getChapterNodeBounds(cluster.id)]),
  );

  const leftColumnMax = Math.max(
    ...chapterClusters
      .filter((cluster) => cluster.column === 'left')
      .map((cluster) => chapterBounds[cluster.id].maxX),
  );
  const rightColumnMin = Math.min(
    ...chapterClusters
      .filter((cluster) => cluster.column === 'right')
      .map((cluster) => chapterBounds[cluster.id].minX),
  );
  const currentColumnGap = rightColumnMin - leftColumnMax;
  const desiredColumnGap =
    CLUSTER_LAYOUT.horizontalPadding * 2 + CLUSTER_LAYOUT.minimumGutter;
  const rightColumnShift = Math.max(0, desiredColumnGap - currentColumnGap);

  const topRowMax = Math.max(
    ...chapterClusters
      .filter((cluster) => cluster.row === 'top')
      .map((cluster) => chapterBounds[cluster.id].maxY),
  );
  const bottomRowMin = Math.min(
    ...chapterClusters
      .filter((cluster) => cluster.row === 'bottom')
      .map((cluster) => chapterBounds[cluster.id].minY),
  );
  const currentRowGap = bottomRowMin - topRowMax;
  const desiredRowGap =
    CLUSTER_LAYOUT.topPadding + CLUSTER_LAYOUT.bottomPadding + CLUSTER_LAYOUT.minimumGutter;
  const bottomRowShift = Math.max(0, desiredRowGap - currentRowGap);

  return {
    chapterBounds,
    rightColumnShift,
    bottomRowShift,
  };
}

function getResolvedChapterNodeBounds(chapterId, offsets = getLayoutOffsets()) {
  const chapterMeta = getChapterMeta(chapterId);
  const bounds = offsets.chapterBounds[chapterId];
  const shiftX = chapterMeta?.column === 'right' ? offsets.rightColumnShift : 0;
  const shiftY = chapterMeta?.row === 'bottom' ? offsets.bottomRowShift : 0;

  return {
    minX: bounds.minX + shiftX,
    minY: bounds.minY + shiftY,
    maxX: bounds.maxX + shiftX,
    maxY: bounds.maxY + shiftY,
  };
}

function getCenterNodeFrame(offsets = getLayoutOffsets()) {
  const centerNode = nodes.center;
  const { w, h } = getNodeSize(centerNode);

  const leftMax = Math.max(
    ...chapterClusters
      .filter((cluster) => cluster.column === 'left')
      .map((cluster) => getResolvedChapterNodeBounds(cluster.id, offsets).maxX),
  );
  const rightMin = Math.min(
    ...chapterClusters
      .filter((cluster) => cluster.column === 'right')
      .map((cluster) => getResolvedChapterNodeBounds(cluster.id, offsets).minX),
  );
  const topMax = Math.max(
    ...chapterClusters
      .filter((cluster) => cluster.row === 'top')
      .map((cluster) => getResolvedChapterNodeBounds(cluster.id, offsets).maxY),
  );
  const bottomMin = Math.min(
    ...chapterClusters
      .filter((cluster) => cluster.row === 'bottom')
      .map((cluster) => getResolvedChapterNodeBounds(cluster.id, offsets).minY),
  );

  const centerX = (leftMax + rightMin) / 2;
  const centerY = (topMax + bottomMin) / 2;

  return {
    x: Math.round(centerX - w / 2),
    y: Math.round(centerY - h / 2),
    w,
    h,
    right: Math.round(centerX + w / 2),
    bottom: Math.round(centerY + h / 2),
  };
}

function getResolvedNodeFrame(node, offsets = getLayoutOffsets()) {
  if (node.id === 'center') {
    return getCenterNodeFrame(offsets);
  }

  const chapterMeta = getChapterMeta(node.chapter);
  const base = getBaseNodeFrame(node);
  const shiftX = chapterMeta?.column === 'right' ? offsets.rightColumnShift : 0;
  const shiftY = chapterMeta?.row === 'bottom' ? offsets.bottomRowShift : 0;

  return {
    x: base.x + shiftX,
    y: base.y + shiftY,
    w: base.w,
    h: base.h,
    right: base.right + shiftX,
    bottom: base.bottom + shiftY,
  };
}

function getComputedChapterClusters(offsets = getLayoutOffsets()) {
  return chapterClusters.map((cluster) => {
    const frames = Object.values(nodes)
      .filter((node) => node.chapter === cluster.id)
      .map((node) => getResolvedNodeFrame(node, offsets));

    const minX = Math.min(...frames.map((frame) => frame.x));
    const minY = Math.min(...frames.map((frame) => frame.y));
    const maxX = Math.max(...frames.map((frame) => frame.right));
    const maxY = Math.max(...frames.map((frame) => frame.bottom));
    const x = Math.max(CLUSTER_LAYOUT.outerPaddingLeft, minX - CLUSTER_LAYOUT.horizontalPadding);
    const y = Math.max(CLUSTER_LAYOUT.outerPaddingTop, minY - CLUSTER_LAYOUT.topPadding);

    return {
      ...cluster,
      x,
      y,
      w: (maxX + CLUSTER_LAYOUT.horizontalPadding) - x,
      h: (maxY + CLUSTER_LAYOUT.bottomPadding) - y,
      minX,
      minY,
      maxX,
      maxY,
    };
  });
}

function getBoardBounds(offsets = getLayoutOffsets(), clusters = getComputedChapterClusters(offsets)) {
  const nodeFrames = Object.values(nodes).map((node) => getResolvedNodeFrame(node, offsets));
  const maxX = Math.max(
    ...nodeFrames.map((frame) => frame.right),
    ...clusters.map((cluster) => cluster.x + cluster.w),
  );
  const maxY = Math.max(
    ...nodeFrames.map((frame) => frame.bottom),
    ...clusters.map((cluster) => cluster.y + cluster.h),
  );

  return {
    width: Math.ceil(maxX + CLUSTER_LAYOUT.outerPaddingRight),
    height: Math.ceil(maxY + CLUSTER_LAYOUT.outerPaddingBottom),
  };
}

function getNodeCenterPoint(node, offsets = getLayoutOffsets()) {
  const frame = getResolvedNodeFrame(node, offsets);
  return { x: frame.x + frame.w / 2, y: frame.y + frame.h / 2 };
}

function getOutgoingLinks(node) {
  const links = new Set();
  if (node.continueTo) links.add(node.continueTo);
  if (Array.isArray(node.unlocks)) {
    node.unlocks.forEach((id) => links.add(id));
  }
  if (node.choices) {
    node.choices.forEach((choice) => {
      if (choice.next) links.add(choice.next);
      if (Array.isArray(choice.unlocks)) choice.unlocks.forEach((id) => links.add(id));
      if (Array.isArray(choice.locks)) choice.locks.forEach((id) => links.add(id));
    });
  }
  return [...links];
}

function getEvaluationAnswers(mode) {
  return mode === 'post' ? state.postEvaluationAnswers : state.preEvaluationAnswers;
}

function getEvaluationScenario(scenarioId) {
  return evaluationScenarios.find((entry) => entry.id === scenarioId) || null;
}

function getEvaluationChoice(scenarioId, optionId) {
  const scenario = getEvaluationScenario(scenarioId);
  if (!scenario) return null;
  return scenario.options.find((option) => option.id === optionId) || null;
}

function getRankingTermLabel(scenario, termId) {
  return scenario.rankingTerms.find((term) => term.id === termId)?.label || termId;
}

function ensureEvaluationAnswer(mode, scenarioId) {
  const answers = getEvaluationAnswers(mode);
  if (!answers[scenarioId]) {
    answers[scenarioId] = {
      impactRatings: {},
      themeRanking: [],
      selectedOption: null,
    };
  }
  return answers[scenarioId];
}

function isImpactTaskComplete(answer) {
  return evaluationResourceKeys.every((key) => Number.isInteger(answer?.impactRatings?.[key]));
}

function isRankingTaskComplete(answer) {
  return Array.isArray(answer?.themeRanking) && answer.themeRanking.length === 5;
}

function isChoiceTaskComplete(answer) {
  return Boolean(answer?.selectedOption);
}

function isEvaluationComplete(mode) {
  return evaluationScenarios.every((scenario) => {
    const answer = getEvaluationAnswers(mode)[scenario.id];
    return isImpactTaskComplete(answer) && isRankingTaskComplete(answer) && isChoiceTaskComplete(answer);
  });
}

function getFirstUnansweredEvaluationStage(mode) {
  for (let index = 0; index < evaluationScenarios.length; index += 1) {
    const scenario = evaluationScenarios[index];
    const answer = getEvaluationAnswers(mode)[scenario.id];
    if (!isImpactTaskComplete(answer)) return { scenarioIndex: index, task: 'impact' };
    if (!isRankingTaskComplete(answer)) return { scenarioIndex: index, task: 'ranking' };
    if (!isChoiceTaskComplete(answer)) return { scenarioIndex: index, task: 'choice' };
  }
  return null;
}

function getPreviousEvaluationStage(scenarioIndex, task) {
  const taskIndex = evaluationTaskOrder.indexOf(task);
  if (taskIndex > 0) {
    return { scenarioIndex, task: evaluationTaskOrder[taskIndex - 1] };
  }
  if (scenarioIndex > 0) {
    return { scenarioIndex: scenarioIndex - 1, task: 'choice' };
  }
  return null;
}

function getNextEvaluationStage(scenarioIndex, task) {
  const taskIndex = evaluationTaskOrder.indexOf(task);
  if (taskIndex < evaluationTaskOrder.length - 1) {
    return { scenarioIndex, task: evaluationTaskOrder[taskIndex + 1] };
  }
  if (scenarioIndex < evaluationScenarios.length - 1) {
    return { scenarioIndex: scenarioIndex + 1, task: 'impact' };
  }
  return null;
}

function scoreImpactTask(answer, scenario) {
  const ratings = answer?.impactRatings || {};
  const total = evaluationResourceKeys.reduce((sum, key) => {
    const rating = ratings[key];
    if (!Number.isInteger(rating)) return sum;
    const closeness = Math.max(0, 10 - Math.abs(rating - scenario.impactBenchmark[key])) / 10;
    return sum + closeness;
  }, 0);
  return roundAverage((total / evaluationResourceKeys.length) * 100);
}

function scoreRankingTask(answer, scenario) {
  const ranking = answer?.themeRanking || [];
  const selectedPositions = Object.fromEntries(ranking.map((termId, index) => [termId, index]));
  const benchmarkPositions = Object.fromEntries(
    scenario.benchmarkRanking.map((termId, index) => [termId, index]),
  );
  const maxDistance = scenario.rankingTerms.length - 1;
  const total = scenario.rankingTerms.reduce((sum, term) => {
    const diff = Math.abs((selectedPositions[term.id] ?? maxDistance) - benchmarkPositions[term.id]);
    return sum + Math.max(0, maxDistance - diff) / maxDistance;
  }, 0);
  return roundAverage((total / scenario.rankingTerms.length) * 100);
}

function scoreChoiceTask(answer, scenario) {
  return getEvaluationChoice(scenario.id, answer?.selectedOption)?.score || 0;
}

function buildScenarioScore(mode, scenario) {
  const answer = getEvaluationAnswers(mode)[scenario.id];
  const impactScore = scoreImpactTask(answer, scenario);
  const rankingScore = scoreRankingTask(answer, scenario);
  const choiceScore = scoreChoiceTask(answer, scenario);
  const totalScore = roundAverage(
    (impactScore * EVALUATION_SCORE_WEIGHTS.impact)
      + (rankingScore * EVALUATION_SCORE_WEIGHTS.ranking)
      + (choiceScore * EVALUATION_SCORE_WEIGHTS.choice),
  );

  return {
    scenario,
    answer,
    impactScore,
    rankingScore,
    choiceScore,
    totalScore,
  };
}

function computeOverallEvaluationScore(mode) {
  if (!isEvaluationComplete(mode)) return null;
  const total = evaluationScenarios.reduce((sum, scenario) => sum + buildScenarioScore(mode, scenario).totalScore, 0);
  return roundAverage(total / evaluationScenarios.length);
}

function getImpactBiasByResource(mode) {
  const deltas = { social: 0, financial: 0, performance: 0 };
  evaluationScenarios.forEach((scenario) => {
    const ratings = getEvaluationAnswers(mode)[scenario.id]?.impactRatings || {};
    evaluationResourceKeys.forEach((key) => {
      deltas[key] += (ratings[key] || 0) - scenario.impactBenchmark[key];
    });
  });

  return Object.fromEntries(
    evaluationResourceKeys.map((key) => [key, roundAverage(deltas[key] / evaluationScenarios.length)]),
  );
}

function getImpactAccuracyByResource(mode) {
  const totals = { social: 0, financial: 0, performance: 0 };
  evaluationScenarios.forEach((scenario) => {
    const ratings = getEvaluationAnswers(mode)[scenario.id]?.impactRatings || {};
    evaluationResourceKeys.forEach((key) => {
      const rating = ratings[key] || 0;
      totals[key] += Math.max(0, 10 - Math.abs(rating - scenario.impactBenchmark[key])) / 10;
    });
  });

  return Object.fromEntries(
    evaluationResourceKeys.map((key) => [key, roundAverage((totals[key] / evaluationScenarios.length) * 100)]),
  );
}

function formatImpactRatings(answer) {
  if (!answer) return 'No ratings recorded.';
  return evaluationResourceKeys
    .map((key) => `${resourceMeta[key].short} ${answer.impactRatings?.[key] ?? '–'}/10`)
    .join(' / ');
}

function formatRanking(answer, scenario) {
  if (!answer?.themeRanking?.length) return 'No ranking recorded.';
  return answer.themeRanking.map((termId) => getRankingTermLabel(scenario, termId)).join(' > ');
}

function describeTaskDelta(delta, positiveText, stableText, negativeText) {
  if (delta >= 8) return positiveText;
  if (delta <= -8) return negativeText;
  return stableText;
}

function buildComparisonSummary() {
  const preScores = evaluationScenarios.map((scenario) => buildScenarioScore('pre', scenario));
  const postScores = evaluationScenarios.map((scenario) => buildScenarioScore('post', scenario));
  const startScore = roundAverage(preScores.reduce((sum, entry) => sum + entry.totalScore, 0) / evaluationScenarios.length);
  const endScore = roundAverage(postScores.reduce((sum, entry) => sum + entry.totalScore, 0) / evaluationScenarios.length);
  const progressDelta = roundAverage(endScore - startScore);
  const taskDeltas = {
    impact: roundAverage(postScores.reduce((sum, entry, index) => sum + (entry.impactScore - preScores[index].impactScore), 0) / evaluationScenarios.length),
    ranking: roundAverage(postScores.reduce((sum, entry, index) => sum + (entry.rankingScore - preScores[index].rankingScore), 0) / evaluationScenarios.length),
    choice: roundAverage(postScores.reduce((sum, entry, index) => sum + (entry.choiceScore - preScores[index].choiceScore), 0) / evaluationScenarios.length),
  };

  let headline = 'Your end assessment stayed close to your starting reasoning, with only a modest shift in overall score.';
  if (progressDelta >= 12) {
    headline = 'Your end assessment shows a meaningfully broader and more balanced reasoning pattern than your starting position.';
  } else if (progressDelta >= 5) {
    headline = 'Your end assessment shows a clear progression toward more balanced decision analysis.';
  } else if (progressDelta <= -5) {
    headline = 'Your end assessment became narrower than your starting position, leaning more on immediate or single-constraint reasoning.';
  }

  const strongestTask = Object.entries(taskDeltas).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
  let detail = 'Your assessment remained fairly stable overall. That can still be useful if you can now explain your trade-offs more explicitly.';
  if (strongestTask[0] === 'impact' && strongestTask[1] > 0) {
    detail = 'Your strongest progression is in estimating how widely a decision can ripple across the three resources, not only in its immediate headline effect.';
  } else if (strongestTask[0] === 'ranking' && strongestTask[1] > 0) {
    detail = 'Your strongest progression is in identifying what deserves attention first inside a complex situation, which suggests a broader sense of priority-setting.';
  } else if (strongestTask[0] === 'choice' && strongestTask[1] > 0) {
    detail = 'Your strongest progression is in the final posture you choose after reflecting, which suggests you are moving toward more balanced responses under uncertainty.';
  } else if (strongestTask[1] < 0) {
    detail = 'One part of the assessment became less aligned with the benchmark at the end, which is still useful because it points to the kind of trade-off that remains difficult for you.';
  }

  const postBias = getImpactBiasByResource('post');
  const postAccuracy = getImpactAccuracyByResource('post');
  const weakestKey = Object.entries(postAccuracy).sort((a, b) => a[1] - b[1])[0][0];
  let blindSpot = `${resourceMeta[weakestKey].label} remains the least precise part of your impact estimation so far.`;
  if (postBias[weakestKey] <= -1) {
    blindSpot = `You still tend to underestimate how much ${resourceMeta[weakestKey].label.toLowerCase()} can be affected in these decisions.`;
  } else if (postBias[weakestKey] >= 1) {
    blindSpot = `You still tend to overestimate ${resourceMeta[weakestKey].label.toLowerCase()} compared with the benchmark used in this assessment.`;
  }

  const scenarioSummaries = evaluationScenarios.map((scenario, index) => {
    const pre = preScores[index];
    const post = postScores[index];
    const startChoice = getEvaluationChoice(scenario.id, pre.answer?.selectedOption);
    const endChoice = getEvaluationChoice(scenario.id, post.answer?.selectedOption);

    return {
      id: scenario.id,
      title: scenario.title,
      startScore: pre.totalScore,
      endScore: post.totalScore,
      delta: roundAverage(post.totalScore - pre.totalScore),
      impactShift: describeTaskDelta(
        post.impactScore - pre.impactScore,
        'Your impact estimation moved closer to the benchmark and captured more of the longer-term ripple effects.',
        'Your impact estimation stayed relatively stable between the start and the end.',
        'Your impact estimation became less aligned with the benchmark in this scenario.',
      ),
      rankingShift: describeTaskDelta(
        post.rankingScore - pre.rankingScore,
        'Your priority ranking became more aligned with the key tensions in this situation.',
        'Your priority ranking stayed fairly similar from start to end.',
        'Your priority ranking became less aligned with the benchmark in this situation.',
      ),
      choiceShift: describeTaskDelta(
        post.choiceScore - pre.choiceScore,
        'Your final posture moved toward a more balanced response after reflection.',
        'Your final posture stayed close to your starting instinct in this scenario.',
        'Your final posture moved toward a narrower response in this scenario.',
      ),
      startImpact: formatImpactRatings(pre.answer),
      endImpact: formatImpactRatings(post.answer),
      startRanking: formatRanking(pre.answer, scenario),
      endRanking: formatRanking(post.answer, scenario),
      startChoice: startChoice ? startChoice.short : 'No answer recorded.',
      endChoice: endChoice ? endChoice.short : 'No answer recorded.',
      reflection: scenario.reflection,
    };
  });

  return {
    headline,
    detail,
    blindSpot,
    startScore,
    endScore,
    progressDelta,
    scenarioSummaries,
  };
}

function roundAverage(value) {
  return Math.round(value * 10) / 10;
}

function formatSignedValue(value) {
  const rounded = Math.abs(value) < 0.05 ? 0 : roundAverage(value);
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}`;
}

function getDeltaClass(value) {
  if (value > 0) return 'delta-positive';
  if (value < 0) return 'delta-negative';
  return 'delta-neutral';
}

function showNameStep() {
  refs.setupThemeStep.classList.add('hidden');
  refs.setupNameStep.classList.remove('hidden');
}

function showThemeStep() {
  refs.setupNameStep.classList.add('hidden');
  refs.setupThemeStep.classList.remove('hidden');
}

function applyTheme(theme) {
  state.playerTheme = theme;
  document.body.dataset.theme = theme;
}

function updateResources() {
  refs.socialBar.style.width = `${state.resources.social}%`;
  refs.financialBar.style.width = `${state.resources.financial}%`;
  refs.performanceBar.style.width = `${state.resources.performance}%`;
  refs.socialValue.textContent = state.resources.social;
  refs.financialValue.textContent = state.resources.financial;
  refs.performanceValue.textContent = state.resources.performance;
}

function closeWindowOverlay() {
  refs.windowOverlay.classList.add('hidden');
  refs.windowOverlay.setAttribute('aria-hidden', 'true');
  refs.windowOverlayCard.innerHTML = '';
}

function showWindowOverlay(html, bindActions = null) {
  refs.windowOverlayCard.innerHTML = html;
  refs.windowOverlay.classList.remove('hidden');
  refs.windowOverlay.setAttribute('aria-hidden', 'false');
  if (bindActions) bindActions(refs.windowOverlayCard);
}

function buildOverlayCard({ badge, title, intro, sections = [], buttons = [] }) {
  const sectionHtml = sections
    .map(
      (section) =>
        `<div class="overlay-section"><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.text)}</p></div>`,
    )
    .join('');
  const buttonsHtml = buttons
    .map(
      (button) =>
        `<button type="button" class="${button.className}" data-overlay-action="${escapeHtml(button.id)}">${escapeHtml(button.label)}</button>`,
    )
    .join('');

  return `
    <div class="overlay-card">
      <div class="step-badge">${escapeHtml(badge)}</div>
      <h2>${escapeHtml(title)}</h2>
      <p class="overlay-intro">${escapeHtml(intro)}</p>
      <div class="overlay-sections">${sectionHtml}</div>
      <div class="button-row">${buttonsHtml}</div>
    </div>
  `;
}

function openRouteClosedOverlay(nodeId) {
  const node = nodes[nodeId];
  const reason = state.closedReasons[nodeId] || 'This route was closed by an earlier decision and cannot reopen in the current run.';
  showWindowOverlay(
    buildOverlayCard({
      badge: 'Closed route',
      title: resolveValue(node.title, node),
      intro: reason,
      sections: [
        {
          title: 'What this means',
          text:
            'This branch remains visible so the player can see that the board changed because of an earlier choice. A different run could unlock this path instead.',
        },
      ],
      buttons: [
        { id: 'close', label: 'Close', className: 'ghost-btn' },
      ],
    }),
    (card) => {
      card.querySelector('[data-overlay-action="close"]').addEventListener('click', closeWindowOverlay);
    },
  );
}

function openThresholdOverlay(entries, reasonOverride = '') {
  const intro = reasonOverride || entries[0].lead;
  showWindowOverlay(
    buildOverlayCard({
      badge: 'Learning prompt',
      title: entries.length === 1 ? entries[0].title : 'The project has become unbalanced',
      intro,
      sections: entries.map((entry) => ({
        title: entry.label,
        text: entry.lesson,
      })),
      buttons: [
        { id: 'close', label: 'Close', className: 'ghost-btn' },
      ],
    }),
    (card) => {
      card.querySelector('[data-overlay-action="close"]').addEventListener('click', closeWindowOverlay);
    },
  );
}

function openRecapOverlay() {
  const totals = { social: 0, financial: 0, performance: 0 };
  state.impactHistory.forEach((impact) => {
    totals.social += impact.social || 0;
    totals.financial += impact.financial || 0;
    totals.performance += impact.performance || 0;
  });
  const count = state.impactHistory.length;
  const averages = {
    social: count ? roundAverage(totals.social / count) : 0,
    financial: count ? roundAverage(totals.financial / count) : 0,
    performance: count ? roundAverage(totals.performance / count) : 0,
  };
  const sorted = Object.entries(averages).sort((a, b) => a[1] - b[1]);
  const lowestKey = sorted[0][0];
  const highestKey = sorted[sorted.length - 1][0];
  const recentThresholds = state.thresholdHistory.slice(-3);

  const html = `
    <div class="overlay-card overlay-card-wide">
      <div class="step-badge">Progress recap</div>
      <h2>How your decisions are shaping the game</h2>
      <p class="overlay-intro">This summary tracks both your current totals and the average direction of your resource-changing decisions.</p>

      <div class="recap-grid">
        ${Object.keys(resourceMeta)
          .map((key) => `
            <div class="recap-tile">
              <div class="recap-tile-head">
                <span>${escapeHtml(resourceMeta[key].label)}</span>
                <strong>${state.resources[key]}</strong>
              </div>
              <p>Average change: <strong class="${getDeltaClass(averages[key])}">${formatSignedValue(averages[key])}</strong></p>
            </div>
          `)
          .join('')}
      </div>

      <div class="overlay-section-stack">
        <div class="overlay-section">
          <h3>Most neglected on average</h3>
          <p>${escapeHtml(resourceMeta[lowestKey].caution)}</p>
        </div>
        <div class="overlay-section">
          <h3>Most pushed on average</h3>
          <p>${escapeHtml(resourceMeta[highestKey].push)}</p>
        </div>
        <div class="overlay-section">
          <h3>Recent threshold signals</h3>
          <p>${escapeHtml(
            recentThresholds.length
              ? recentThresholds
                  .map((entry) => `${resourceMeta[entry.resource].short} ${entry.level === 'low' ? 'fell under' : 'rose above'} ${entry.level === 'low' ? LOWER_LIMIT : UPPER_LIMIT}`)
                  .join(' / ')
              : 'No threshold warning has been triggered yet in this run.',
          )}</p>
        </div>
      </div>

      <div class="button-row">
        <button type="button" class="ghost-btn" data-overlay-action="close">Close</button>
      </div>
    </div>
  `;

  showWindowOverlay(html, (card) => {
    card.querySelector('[data-overlay-action="close"]').addEventListener('click', closeWindowOverlay);
  });
}

function renderEvaluationReview(mode) {
  const answers = getEvaluationAnswers(mode);
  const label = mode === 'post' ? 'End assessment summary' : 'Opening assessment summary';
  const title = mode === 'post' ? 'How you answered at the end' : 'How you answered at the start';
  const intro =
    mode === 'post'
      ? 'These end-of-game responses are stored for comparison with your opening assessment.'
      : 'These opening responses record your starting position before the project began to generate consequences.';

  openModalPanel(false);
  mountTemplate('nodeTemplate');
  document.getElementById('nodeTypeBadge').textContent = label;
  document.getElementById('nodeTitle').textContent = title;
  document.getElementById('nodeText').textContent = intro;
  const extra = document.getElementById('nodeExtra');
  extra.classList.remove('hidden');
  extra.innerHTML = evaluationScenarios
    .map((scenario, index) => {
      const answer = answers[scenario.id];
      const choice = getEvaluationChoice(scenario.id, answer?.selectedOption);
      return `
        <div class="overlay-section">
          <h3>Scenario ${index + 1}: ${escapeHtml(scenario.title)}</h3>
          <p><strong>Impact estimation:</strong> ${escapeHtml(formatImpactRatings(answer))}</p>
          <p><strong>Priority ranking:</strong> ${escapeHtml(formatRanking(answer, scenario))}</p>
          <p><strong>Final choice:</strong> ${escapeHtml(choice ? choice.text : 'No answer recorded.')}</p>
        </div>
      `;
    })
    .join('');

  const actions = document.getElementById('secondaryAction');
  if (mode === 'post' && state.comparisonSummary) {
    actions.appendChild(
      createButton({
        label: 'Open comparison',
        className: 'primary-btn',
        onClick: () => {
          closePanel();
          openComparisonOverlay();
        },
      }),
    );
  }
  actions.appendChild(
    createButton({
      label: 'Back to board',
      className: 'ghost-btn',
      onClick: closePanel,
    }),
  );
}

function finishPreEvaluation() {
  state.startAssessmentScore = computeOverallEvaluationScore('pre');
  markNodeCompleted('center');
  state.feedbackByNode.center = {
    feedback: {
      feedbackTitle: 'Opening assessment recorded',
      feedbackStory:
        'Your three opening scenario blocks were stored as a starting point before the project began to shape your reasoning through consequences.',
      feedbackText: 'You can reopen the center node later to review these answers. The quantitative comparison is revealed at the end of the game.',
    },
  };
  unlockNodes(['funding_01', 'team_01', 'data_01']);
  refreshGlobalUnlocks();
  renderBoard();
  closePanel();
}

function openComparisonOverlay() {
  const summary = state.comparisonSummary || buildComparisonSummary();
  const rowsHtml = summary.scenarioSummaries
    .map(
      (entry, index) => `
        <div class="comparison-card">
          <div class="comparison-card-head">
            <span>Scenario ${index + 1}</span>
            <strong>${escapeHtml(entry.title)}</strong>
          </div>
          <p class="comparison-scoreline"><strong>Start ${entry.startScore}/100</strong> · <strong>End ${entry.endScore}/100</strong> · <strong class="${getDeltaClass(entry.delta)}">${formatSignedValue(entry.delta)}</strong></p>
          <p><strong>Impact estimation:</strong> ${escapeHtml(entry.impactShift)}</p>
          <p><strong>Start:</strong> ${escapeHtml(entry.startImpact)}</p>
          <p><strong>End:</strong> ${escapeHtml(entry.endImpact)}</p>
          <p><strong>Priority ranking:</strong> ${escapeHtml(entry.rankingShift)}</p>
          <p><strong>Start:</strong> ${escapeHtml(entry.startRanking)}</p>
          <p><strong>End:</strong> ${escapeHtml(entry.endRanking)}</p>
          <p><strong>Final choice:</strong> ${escapeHtml(entry.choiceShift)}</p>
          <p><strong>Start:</strong> ${escapeHtml(entry.startChoice)}</p>
          <p><strong>End:</strong> ${escapeHtml(entry.endChoice)}</p>
          <p class="comparison-reflection">${escapeHtml(entry.reflection)}</p>
        </div>
      `,
    )
    .join('');

  const html = `
    <div class="overlay-card overlay-card-wide">
      <div class="step-badge">Before / after comparison</div>
      <h2>How your reasoning moved through the game</h2>
      <p class="overlay-intro">${escapeHtml(summary.headline)}</p>
      <div class="score-strip">
        <div class="score-tile">
          <span>Start score</span>
          <strong>${summary.startScore}/100</strong>
        </div>
        <div class="score-tile">
          <span>End score</span>
          <strong>${summary.endScore}/100</strong>
        </div>
        <div class="score-tile">
          <span>Progress</span>
          <strong class="${getDeltaClass(summary.progressDelta)}">${formatSignedValue(summary.progressDelta)}</strong>
        </div>
      </div>
      <div class="overlay-section-stack">
        <div class="overlay-section">
          <h3>Overall synthesis</h3>
          <p>${escapeHtml(summary.detail)}</p>
        </div>
        <div class="overlay-section">
          <h3>Remaining blind spot</h3>
          <p>${escapeHtml(summary.blindSpot)}</p>
        </div>
      </div>
      <div class="comparison-grid">
        ${rowsHtml}
      </div>
      <div class="button-row">
        <button type="button" class="ghost-btn" data-overlay-action="close">Close</button>
      </div>
    </div>
  `;

  showWindowOverlay(html, (card) => {
    card.querySelector('[data-overlay-action="close"]').addEventListener('click', closeWindowOverlay);
  });
}

function finishPostEvaluation() {
  state.endAssessmentScore = computeOverallEvaluationScore('post');
  state.progressDelta = roundAverage((state.endAssessmentScore || 0) - (state.startAssessmentScore || 0));
  state.comparisonSummary = buildComparisonSummary();
  renderBoard();
  closePanel();
  openComparisonOverlay();
}

function renderEvaluationStage(mode, scenarioIndex = null, task = null) {
  const targetStage =
    scenarioIndex === null || task === null
      ? getFirstUnansweredEvaluationStage(mode)
      : { scenarioIndex, task };

  if (!targetStage) {
    if (mode === 'post') {
      finishPostEvaluation();
    } else {
      finishPreEvaluation();
    }
    return;
  }

  const scenario = evaluationScenarios[targetStage.scenarioIndex];
  const answer = ensureEvaluationAnswer(mode, scenario.id);
  const previousStage = getPreviousEvaluationStage(targetStage.scenarioIndex, targetStage.task);
  const nextStage = getNextEvaluationStage(targetStage.scenarioIndex, targetStage.task);
  const stageMeta = {
    impact: {
      step: 'Task 1 of 3',
      title: 'Impact estimation',
      prompt: scenario.impactPrompt,
      note: scenario.impactNote,
    },
    ranking: {
      step: 'Task 2 of 3',
      title: 'Priority ranking',
      prompt: scenario.rankingPrompt,
      note: scenario.rankingNote,
    },
    choice: {
      step: 'Task 3 of 3',
      title: 'Final decision choice',
      prompt: scenario.choicePrompt,
      note: scenario.choiceNote,
    },
  }[targetStage.task];

  state.currentNodeId = mode === 'pre' ? 'center' : 'post_evaluation';
  openModalPanel(false);
  mountTemplate('nodeTemplate');
  document.getElementById('nodeTypeBadge').textContent = `${mode === 'pre' ? 'Opening assessment' : 'End assessment'} · Scenario ${targetStage.scenarioIndex + 1} of ${evaluationScenarios.length}`;
  document.getElementById('nodeTitle').textContent = scenario.title;
  document.getElementById('nodeText').textContent = scenario.context;

  const extra = document.getElementById('nodeExtra');
  extra.classList.remove('hidden');
  extra.innerHTML = `
    <div class="assessment-meta">
      <div class="assessment-step">${escapeHtml(stageMeta.step)} · ${escapeHtml(stageMeta.title)}</div>
      <h3>${escapeHtml(stageMeta.title)}</h3>
      <p>${escapeHtml(stageMeta.prompt)}</p>
      <p>${escapeHtml(stageMeta.note)}</p>
    </div>
  `;

  const choicesContainer = document.getElementById('choices');
  const actions = document.getElementById('secondaryAction');

  if (targetStage.task === 'impact') {
    const wrapper = document.createElement('div');
    wrapper.className = 'assessment-stack';
    evaluationResourceKeys.forEach((key) => {
      const selected = answer.impactRatings?.[key];
      const card = document.createElement('div');
      card.className = 'assessment-card';
      const head = document.createElement('div');
      head.className = 'assessment-card-head';
      head.innerHTML = `<strong>${escapeHtml(resourceMeta[key].label)}</strong><span>${selected ? `${selected}/10` : 'Not rated yet'}</span>`;
      card.appendChild(head);
      const scale = document.createElement('div');
      scale.className = 'rating-scale';
      for (let value = 1; value <= 10; value += 1) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `rating-btn${selected === value ? ' is-selected' : ''}`;
        button.textContent = String(value);
        button.addEventListener('click', () => {
          answer.impactRatings[key] = value;
          renderEvaluationStage(mode, targetStage.scenarioIndex, targetStage.task);
        });
        scale.appendChild(button);
      }
      card.appendChild(scale);
      wrapper.appendChild(card);
    });
    choicesContainer.appendChild(wrapper);
  } else if (targetStage.task === 'ranking') {
    const wrapper = document.createElement('div');
    wrapper.className = 'assessment-stack';
    const preview = document.createElement('div');
    preview.className = 'ranking-preview';
    for (let index = 0; index < scenario.rankingTerms.length; index += 1) {
      const termId = answer.themeRanking[index];
      const slot = document.createElement('div');
      slot.className = 'rank-slot';
      slot.innerHTML = `<span class="rank-slot-index">${index + 1}</span><span class="rank-slot-label">${escapeHtml(termId ? getRankingTermLabel(scenario, termId) : 'Select a term')}</span>`;
      preview.appendChild(slot);
    }
    wrapper.appendChild(preview);

    const pool = document.createElement('div');
    pool.className = 'ranking-pool';
    scenario.rankingTerms.forEach((term) => {
      const isSelected = answer.themeRanking.includes(term.id);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `term-btn${isSelected ? ' is-selected' : ''}`;
      button.textContent = term.label;
      button.addEventListener('click', () => {
        if (isSelected) {
          answer.themeRanking = answer.themeRanking.filter((entry) => entry !== term.id);
        } else if (answer.themeRanking.length < scenario.rankingTerms.length) {
          answer.themeRanking = [...answer.themeRanking, term.id];
        }
        renderEvaluationStage(mode, targetStage.scenarioIndex, targetStage.task);
      });
      pool.appendChild(button);
    });
    wrapper.appendChild(pool);
    choicesContainer.appendChild(wrapper);
  } else {
    scenario.options.forEach((option) => {
      const button = document.createElement('button');
      button.className = `choice-btn${answer.selectedOption === option.id ? ' is-selected' : ''}`;
      button.innerHTML = `<span class="choice-label">${escapeHtml(option.text)}</span>`;
      button.addEventListener('click', () => {
        answer.selectedOption = option.id;
        renderEvaluationStage(mode, targetStage.scenarioIndex, targetStage.task);
      });
      choicesContainer.appendChild(button);
    });
  }

  const isCurrentTaskComplete =
    targetStage.task === 'impact'
      ? isImpactTaskComplete(answer)
      : targetStage.task === 'ranking'
        ? isRankingTaskComplete(answer)
        : isChoiceTaskComplete(answer);

  actions.appendChild(
    createButton({
      label: nextStage ? 'Confirm and continue' : 'Finish assessment',
      className: 'primary-btn',
      disabled: !isCurrentTaskComplete,
      onClick: () => {
        if (!isCurrentTaskComplete) return;
        if (nextStage) {
          renderEvaluationStage(mode, nextStage.scenarioIndex, nextStage.task);
          return;
        }
        if (mode === 'post') {
          finishPostEvaluation();
        } else {
          finishPreEvaluation();
        }
      },
    }),
  );

  if (targetStage.task === 'ranking') {
    actions.appendChild(
      createButton({
        label: 'Reset ranking',
        className: 'ghost-btn',
        onClick: () => {
          answer.themeRanking = [];
          renderEvaluationStage(mode, targetStage.scenarioIndex, targetStage.task);
        },
      }),
    );
  }

  if (previousStage) {
    actions.appendChild(
      createButton({
        label: 'Back',
        className: 'ghost-btn',
        onClick: () => renderEvaluationStage(mode, previousStage.scenarioIndex, previousStage.task),
      }),
    );
  }

  actions.appendChild(
    createButton({
      label: 'Back to board',
      className: 'ghost-btn',
      onClick: closePanel,
    }),
  );
}

function openModalPanel(showResources = true) {
  state.currentNodeId = state.currentNodeId || null;
  refs.mainLayout.classList.remove('map-only');
  refs.mainLayout.classList.add('modal-mode');
  refs.storyPanel.classList.remove('hidden');
  refs.storyPanel.classList.toggle('hide-resources', !showResources);
}

function closePanel() {
  state.currentNodeId = null;
  refs.mainLayout.classList.remove('modal-mode');
  refs.mainLayout.classList.add('map-only');
  refs.storyPanel.classList.add('hidden');
  refs.storyPanel.classList.remove('hide-resources');
}

function mountTemplate(templateId) {
  const template = document.getElementById(templateId);
  refs.contentCard.replaceChildren(template.content.cloneNode(true));
}

function createButton({ label, className, onClick, disabled = false, id = '' }) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = label;
  if (id) button.dataset.actionId = id;
  button.disabled = disabled;
  if (disabled) button.classList.add('is-disabled');
  button.addEventListener('click', onClick);
  return button;
}

function getNodeStatusLabel(nodeId) {
  if (nodeId === 'center') return 'Start node';
  const node = nodes[nodeId];
  const typeLabel = node.type === 'info' ? 'Info' : node.type === 'quiz' ? 'Quiz' : 'Story';
  if (state.closedNodes.has(nodeId)) return `Closed route · ${typeLabel}`;
  if (state.completedNodes.has(nodeId)) return `Completed · ${typeLabel}`;
  if (state.availableNodes.has(nodeId)) return `Available · ${typeLabel}`;
  return `Blocked · ${typeLabel}`;
}

function renderClusters(computedClusters) {
  refs.boardClusters.innerHTML = computedClusters
    .map(
      (cluster) => `
        <div class="cluster-zone cluster-${escapeHtml(cluster.id)}" style="left:${cluster.x}px; top:${cluster.y}px; width:${cluster.w}px; height:${cluster.h}px;">
          <div class="cluster-kicker">${escapeHtml(cluster.kicker)}</div>
          <h3>${escapeHtml(cluster.title)}</h3>
          <p>${escapeHtml(cluster.blurb)}</p>
        </div>
      `,
    )
    .join('');
}

function renderBoardNodes(offsets) {
  refs.boardNodes.innerHTML = Object.values(nodes)
    .map((node) => {
      const frame = getResolvedNodeFrame(node, offsets);
      const classes = [
        'node',
        node.id === 'center' ? 'node-center node-circle' : `node-${node.type}-shape`,
      ];
      if (state.closedNodes.has(node.id)) {
        classes.push('closed-route', 'node-clickable');
      } else if (state.completedNodes.has(node.id)) {
        classes.push('completed', 'node-clickable');
      } else if (state.availableNodes.has(node.id) || node.id === 'center') {
        classes.push('node-available', 'node-clickable');
        if (!state.completedNodes.has(node.id)) classes.push('pulse');
      } else {
        classes.push('node-locked');
      }

      const title = resolveValue(node.title, node);
      return `
        <div
          id="node-${escapeHtml(node.id)}"
          class="${classes.join(' ')}"
          data-node="${escapeHtml(node.id)}"
          style="left:${frame.x}px; top:${frame.y}px; width:${frame.w}px; min-height:${frame.h}px;"
          tabindex="0"
          role="button"
        >
          <span class="node-title">${escapeHtml(title)}</span>
          <span class="node-tag">${escapeHtml(getNodeStatusLabel(node.id))}</span>
        </div>
      `;
    })
    .join('');

  refs.boardNodes.querySelectorAll('[data-node]').forEach((element) => {
    const nodeId = element.dataset.node;
    element.addEventListener('click', () => handleBoardNodeClick(nodeId));
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleBoardNodeClick(nodeId);
      }
    });
  });

  renderPlayerMarker();
}

function renderPlayerMarker() {
  refs.boardNodes.querySelectorAll('.player-marker').forEach((element) => element.remove());
  if (!state.playerName) return;
  const target = document.getElementById(`node-${state.lastCompletedNodeId}`);
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

function renderBoardLines(offsets) {
  const lines = [];
  Object.values(nodes).forEach((node) => {
    const from = getNodeCenterPoint(node, offsets);
    getOutgoingLinks(node).forEach((targetId) => {
      const target = nodes[targetId];
      if (!target) return;
      const to = getNodeCenterPoint(target, offsets);
      lines.push(
        `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" class="chapter-line line-${escapeHtml(node.chapter)}"></line>`,
      );
    });
  });
  refs.boardLines.innerHTML = lines.join('');
}

function renderBoard() {
  const offsets = getLayoutOffsets();
  const computedClusters = getComputedChapterClusters(offsets);
  const boardBounds = getBoardBounds(offsets, computedClusters);
  refs.board.style.width = `${boardBounds.width}px`;
  refs.board.style.height = `${boardBounds.height}px`;
  refs.boardLines.setAttribute('viewBox', `0 0 ${boardBounds.width} ${boardBounds.height}`);
  renderClusters(computedClusters);
  renderBoardLines(offsets);
  renderBoardNodes(offsets);
}

function refreshGlobalUnlocks() {
  if (isEvaluationComplete('pre')) {
    unlockNodes(['funding_01', 'team_01', 'data_01']);
  }
  if (
    state.chapterMilestones.has('funding') &&
    state.chapterMilestones.has('team') &&
    state.chapterMilestones.has('data')
  ) {
    unlockNodes(['launch_01']);
  }
}

function unlockNodes(nodeIds = []) {
  nodeIds.forEach((nodeId) => {
    if (!nodeId || state.closedNodes.has(nodeId) || state.completedNodes.has(nodeId)) return;
    state.availableNodes.add(nodeId);
  });
}

function closeNodes(nodeIds = [], reason = '') {
  nodeIds.forEach((nodeId) => {
    if (!nodeId || state.completedNodes.has(nodeId)) return;
    state.availableNodes.delete(nodeId);
    state.closedNodes.add(nodeId);
    if (reason) state.closedReasons[nodeId] = reason;
  });
}

function markNodeCompleted(nodeId) {
  state.availableNodes.delete(nodeId);
  state.completedNodes.add(nodeId);
  state.lastCompletedNodeId = nodeId;
  if (nodes[nodeId].completeChapter) {
    state.chapterMilestones.add(nodes[nodeId].completeChapter);
  }
}

function applyBranchFlags(flags = []) {
  flags.forEach((flag) => state.branchFlags.add(flag));
}

function clampResource(value) {
  return Math.max(0, Math.min(100, value));
}

function recordThresholdEvents(previousResources, nextResources) {
  const events = [];
  Object.keys(previousResources).forEach((resource) => {
    const previous = previousResources[resource];
    const next = nextResources[resource];
    const lowKey = `low-${resource}`;
    const highKey = `high-${resource}`;

    if (previous > LOWER_LIMIT && next <= LOWER_LIMIT && !state.shownThresholds.has(lowKey)) {
      state.shownThresholds.add(lowKey);
      const meta = resourceMeta[resource];
      state.thresholdHistory.push({ resource, level: 'low', value: next });
      events.push({
        resource,
        level: 'low',
        title: meta.lowTitle,
        lead: meta.lowLead,
        lesson: meta.lowLesson,
        label: meta.label,
      });
    }

    if (previous < UPPER_LIMIT && next >= UPPER_LIMIT && !state.shownThresholds.has(highKey)) {
      state.shownThresholds.add(highKey);
      const meta = resourceMeta[resource];
      state.thresholdHistory.push({ resource, level: 'high', value: next });
      events.push({
        resource,
        level: 'high',
        title: meta.highTitle,
        lead: meta.highLead,
        lesson: meta.highLesson,
        label: meta.label,
      });
    }
  });
  return events;
}

function applyImpact(impact = {}) {
  const previous = { ...state.resources };
  const appliedImpact = {
    social: impact.social || 0,
    financial: impact.financial || 0,
    performance: impact.performance || 0,
  };
  if (appliedImpact.social || appliedImpact.financial || appliedImpact.performance) {
    state.impactHistory.push(appliedImpact);
  }
  state.resources.social = clampResource(state.resources.social + appliedImpact.social);
  state.resources.financial = clampResource(state.resources.financial + appliedImpact.financial);
  state.resources.performance = clampResource(state.resources.performance + appliedImpact.performance);
  updateResources();
  return recordThresholdEvents(previous, state.resources);
}

function getChoiceConstraint(choice) {
  const lowBlocked = (choice.requires || []).filter((resource) => state.resources[resource] <= LOWER_LIMIT);
  if (lowBlocked.length) {
    return {
      blocked: true,
      reason: choice.blockedReason || 'This path is unavailable because a necessary balance has been neglected.',
      entries: lowBlocked.map((resource) => ({
        resource,
        level: 'low',
        title: resourceMeta[resource].lowTitle,
        lead: resourceMeta[resource].lowLead,
        lesson: resourceMeta[resource].lowLesson,
        label: resourceMeta[resource].label,
      })),
    };
  }

  const highBlocked = (choice.overRequires || []).filter((resource) => state.resources[resource] >= UPPER_LIMIT);
  if (highBlocked.length) {
    return {
      blocked: true,
      reason: choice.blockedReason || 'This path would over-concentrate a balance that is already too dominant.',
      entries: highBlocked.map((resource) => ({
        resource,
        level: 'high',
        title: resourceMeta[resource].highTitle,
        lead: resourceMeta[resource].highLead,
        lesson: resourceMeta[resource].highLesson,
        label: resourceMeta[resource].label,
      })),
    };
  }

  return { blocked: false, reason: '', entries: [] };
}

function renderIntro(nodeId) {
  const node = nodes[nodeId];
  state.currentNodeId = nodeId;
  openModalPanel(node.showResources !== false);
  mountTemplate('introTemplate');
  document.getElementById('introBadge').textContent = getBadgeLabel(node);
  document.getElementById('introTitle').textContent = resolveValue(node.title, node);
  document.getElementById('introText').textContent = resolveValue(node.introText, node) || 'Open this node to continue the game.';
  const introHint = document.getElementById('introHint');
  const hintHtml =
    node.id === 'center'
      ? '<h3>How the game opens</h3><p>The center node records three mirrored scenario blocks without changing any resource. After that, the first chapter entry nodes unlock around the board and major decisions begin to close alternate routes.</p>'
      : resolveValue(node.introHtml, node);

  if (hintHtml) {
    introHint.classList.remove('hidden');
    introHint.innerHTML = hintHtml;
  } else {
    introHint.classList.add('hidden');
  }

  const introActions = document.getElementById('introActions');
  introActions.appendChild(
    createButton({
      label: node.evaluationOnly && isEvaluationComplete('pre') ? 'Review assessment' : 'Open node',
      className: 'primary-btn',
      onClick: () => renderActionStage(nodeId),
    }),
  );
  introActions.appendChild(
    createButton({
      label: 'Back to board',
      className: 'ghost-btn',
      onClick: closePanel,
    }),
  );
}

function renderActionStage(nodeId, options = {}) {
  const node = nodes[nodeId];
  const reviewMode = options.reviewMode === true;
  const storedReview = state.feedbackByNode[nodeId];
  const reviewChoiceIndex =
    reviewMode && node.type === 'decision' ? storedReview?.selectedChoiceIndex : null;
  if (node.evaluationOnly === 'pre') {
    if (isEvaluationComplete('pre')) {
      renderEvaluationReview('pre');
    } else {
      renderEvaluationStage('pre');
    }
    return;
  }

  state.currentNodeId = nodeId;
  openModalPanel(node.showResources !== false);
  mountTemplate('nodeTemplate');
  document.getElementById('nodeTypeBadge').textContent = getBadgeLabel(node);
  document.getElementById('nodeTitle').textContent = resolveValue(node.title, node);
  const introLead = resolveValue(node.introText, node);
  const mainText = resolveValue(node.text, node);
  const nodeText = document.getElementById('nodeText');
  if (introLead && introLead !== mainText) {
    nodeText.innerHTML = `<span class="story-lead">${escapeHtml(introLead)}</span><br><br>${escapeHtml(mainText)}`;
  } else {
    nodeText.textContent = mainText;
  }

  const extra = document.getElementById('nodeExtra');
  const extraHtml = resolveValue(node.extraHtml, node);
  if (extraHtml) {
    extra.classList.remove('hidden');
    extra.innerHTML = extraHtml;
  } else {
    extra.classList.add('hidden');
  }

  const choicesContainer = document.getElementById('choices');
  const actions = document.getElementById('secondaryAction');

  if (node.choices) {
    let selectedChoice = null;
    const readOnlyDecisionReview =
      reviewMode && node.type === 'decision' && Number.isInteger(reviewChoiceIndex);

    const nextButton = readOnlyDecisionReview
      ? null
      : createButton({
          label: 'Next',
          className: 'primary-btn',
          disabled: !selectedChoice,
          onClick: () => {
            if (selectedChoice) handleChoice(nodeId, selectedChoice);
          },
        });

    node.choices.forEach((choice, index) => {
      const constraint = getChoiceConstraint(choice);
      const button = document.createElement('button');
      const isRecordedChoice = readOnlyDecisionReview && reviewChoiceIndex === index;
      const isDimmedChoice = readOnlyDecisionReview && reviewChoiceIndex !== index;
      button.className = `choice-btn${constraint.blocked ? ' is-blocked' : ''}${selectedChoice === choice ? ' is-selected' : ''}${isRecordedChoice ? ' is-selected' : ''}${isDimmedChoice ? ' is-review-dimmed' : ''}`;
      button.innerHTML = `<span class="choice-label">${escapeHtml(choice.text)}</span>`;
      if (constraint.blocked) {
        button.innerHTML += `<span class="choice-note">${escapeHtml(constraint.reason)}</span>`;
      }

      if (readOnlyDecisionReview) {
        button.disabled = true;
        choicesContainer.appendChild(button);
        return;
      }

      button.addEventListener('click', () => {
        if (constraint.blocked) {
          openThresholdOverlay(constraint.entries, constraint.reason);
          return;
        }
        selectedChoice = choice;
        Array.from(choicesContainer.children).forEach((child) => child.classList.remove('is-selected'));
        button.classList.add('is-selected');
        nextButton.disabled = false;
        nextButton.classList.remove('is-disabled');
      });

      choicesContainer.appendChild(button);
    });

    if (nextButton) {
      actions.appendChild(nextButton);
    }
  } else {
    actions.appendChild(
      createButton({
        label: node.continueLabel || 'Continue',
        className: 'primary-btn',
        onClick: () => completePassiveNode(nodeId),
      }),
    );
  }

  actions.appendChild(
    createButton({
      label: 'Back',
      className: 'ghost-btn',
      onClick: () => renderIntro(nodeId),
    }),
  );
  actions.appendChild(
    createButton({
      label: 'Back to board',
      className: 'ghost-btn',
      onClick: closePanel,
    }),
  );
}

function renderFeedbackModal(nodeId, feedback, options = {}) {
  const node = nodes[nodeId];
  state.currentNodeId = nodeId;
  openModalPanel(node.showResources !== false);
  mountTemplate('feedbackTemplate');
  document.getElementById('feedbackTitle').textContent = feedback.feedbackTitle;
  document.getElementById('feedbackStory').textContent = feedback.feedbackStory;
  document.getElementById('feedbackText').textContent = feedback.feedbackText;

  if (options.showImpact) {
    const impactBox = document.getElementById('impactBox');
    const deltaList = document.getElementById('deltaList');
    impactBox.classList.remove('hidden');
    Object.entries(options.showImpact).forEach(([key, value]) => {
      if (!value) return;
      const item = document.createElement('div');
      item.className = 'delta-item';
      item.innerHTML = `<span>${escapeHtml(resourceMeta[key].label)}</span><strong class="${getDeltaClass(value)}">${formatSignedValue(value)}</strong>`;
      deltaList.appendChild(item);
    });
  }

  const feedbackActions = document.getElementById('feedbackActions');
  feedbackActions.appendChild(
    createButton({
      label: 'Back to board',
      className: 'primary-btn',
      onClick: closePanel,
    }),
  );
  feedbackActions.appendChild(
    createButton({
      label: 'Review node',
      className: 'ghost-btn',
      onClick: () =>
        renderActionStage(nodeId, {
          reviewMode: node.type === 'decision',
        }),
    }),
  );
}

function handleRetry(nodeId, choice) {
  renderFeedbackModal(nodeId, {
    feedbackTitle: choice.feedbackTitle,
    feedbackStory: choice.feedbackStory,
    feedbackText: `${choice.feedbackText} Try again to continue the project.`,
  });
}

function handleChoice(nodeId, choice) {
  const node = nodes[nodeId];
  const selectedChoiceIndex = node.choices ? node.choices.indexOf(choice) : -1;
  const constraint = getChoiceConstraint(choice);
  if (constraint.blocked) {
    openThresholdOverlay(constraint.entries, constraint.reason);
    return;
  }

  if (choice.retry) {
    handleRetry(nodeId, choice);
    return;
  }

  const thresholdEvents = applyImpact(choice.impact || {});
  markNodeCompleted(nodeId);
  applyBranchFlags(choice.branchFlagsSet || []);
  if (choice.locks) {
    closeNodes(choice.locks, choice.lockReason || 'This route was closed by an earlier project decision.');
  }
  if (choice.next) unlockNodes([choice.next]);
  if (choice.unlocks) unlockNodes(choice.unlocks);
  refreshGlobalUnlocks();

  const feedback = {
    feedbackTitle: choice.feedbackTitle || 'Choice recorded',
    feedbackStory: choice.feedbackStory || 'The project moved forward on the basis of this choice.',
    feedbackText: choice.feedbackText || 'This decision changed how the project can proceed.',
  };
  const options = choice.impact ? { showImpact: choice.impact } : {};
  state.feedbackByNode[nodeId] = { feedback, options, selectedChoiceIndex };
  renderBoard();
  renderFeedbackModal(nodeId, feedback, options);

  if (thresholdEvents.length) {
    openThresholdOverlay(thresholdEvents);
  }
}

function completePassiveNode(nodeId) {
  const node = nodes[nodeId];
  markNodeCompleted(nodeId);
  applyBranchFlags(node.branchFlagsSet || []);
  if (node.unlocks) unlockNodes(node.unlocks);
  if (node.continueTo) unlockNodes([node.continueTo]);
  refreshGlobalUnlocks();
  renderBoard();
  if (nodeId === 'launch_10') {
    renderEvaluationStage('post');
    return;
  }
  closePanel();
}

function openCompletedReview(nodeId) {
  if (nodeId === 'center' && isEvaluationComplete('pre')) {
    renderEvaluationReview('pre');
    return;
  }
  if (nodeId === 'launch_10') {
    if (isEvaluationComplete('post')) {
      renderEvaluationReview('post');
    } else {
      renderEvaluationStage('post');
    }
    return;
  }
  const stored = state.feedbackByNode[nodeId];
  if (!stored) {
    renderIntro(nodeId);
    return;
  }
  renderFeedbackModal(nodeId, stored.feedback, stored.options || {});
}

function handleBoardNodeClick(nodeId) {
  if (!state.onboardingComplete) return;
  if (state.closedNodes.has(nodeId)) {
    openRouteClosedOverlay(nodeId);
    return;
  }
  if (nodeId !== 'center' && !state.availableNodes.has(nodeId) && !state.completedNodes.has(nodeId)) {
    return;
  }
  if (nodeId === 'center') {
    renderIntro(nodeId);
    return;
  }
  if (state.completedNodes.has(nodeId)) {
    openCompletedReview(nodeId);
    return;
  }
  renderIntro(nodeId);
}

function renderOnboardingPage(index) {
  const page = onboardingPages[index];
  if (!page) {
    state.onboardingComplete = true;
    closePanel();
    renderBoard();
    return;
  }

  openModalPanel(page.showResources);
  mountTemplate('introTemplate');
  document.getElementById('introBadge').textContent = page.badge;
  document.getElementById('introTitle').textContent = page.title(state.playerName || 'Player');
  document.getElementById('introText').textContent = page.text;
  const introHint = document.getElementById('introHint');
  introHint.classList.remove('hidden');
  introHint.innerHTML = page.extraHtml;

  const introActions = document.getElementById('introActions');
  if (index > 0) {
    introActions.appendChild(
      createButton({
        label: 'Back',
        className: 'ghost-btn',
        onClick: () => renderOnboardingPage(index - 1),
      }),
    );
  }
  introActions.appendChild(
    createButton({
      label: 'Skip and go to the board',
      className: 'ghost-btn',
      onClick: () => renderOnboardingPage(onboardingPages.length),
    }),
  );
  introActions.appendChild(
    createButton({
      label: index === onboardingPages.length - 1 ? 'Enter project' : 'Next',
      className: 'primary-btn',
      onClick: () => renderOnboardingPage(index + 1),
    }),
  );
}

function completeSetup() {
  refs.setupOverlay.classList.add('hidden');
  renderBoard();
  renderOnboardingPage(0);
}

function resetPrototype() {
  state = {
    resources: { ...initialResources },
    currentNodeId: null,
    completedNodes: new Set(),
    availableNodes: new Set(['center']),
    closedNodes: new Set(),
    closedReasons: {},
    feedbackByNode: {},
    playerName: '',
    playerTheme: 'midnight',
    lastCompletedNodeId: 'center',
    onboardingComplete: false,
    impactHistory: [],
    preEvaluationAnswers: {},
    postEvaluationAnswers: {},
    comparisonSummary: null,
    startAssessmentScore: null,
    endAssessmentScore: null,
    progressDelta: null,
    branchFlags: new Set(),
    chapterMilestones: new Set(),
    shownThresholds: new Set(),
    thresholdHistory: [],
  };

  refs.playerNameInput.value = '';
  document.querySelector('input[name="themeChoice"][value="midnight"]').checked = true;
  updateResources();
  applyTheme('midnight');
  closeWindowOverlay();
  closePanel();
  refs.setupOverlay.classList.remove('hidden');
  showNameStep();
  renderBoard();
}

refs.recapBtn.addEventListener('click', openRecapOverlay);
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
  const selected = document.querySelector('input[name="themeChoice"]:checked');
  applyTheme(selected ? selected.value : 'midnight');
  completeSetup();
});

refs.windowOverlay.addEventListener('click', (event) => {
  if (event.target === refs.windowOverlay) {
    closeWindowOverlay();
  }
});

updateResources();
applyTheme(state.playerTheme);
showNameStep();
closePanel();
renderBoard();
