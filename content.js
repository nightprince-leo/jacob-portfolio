// ============================================================
// CONTENT.JS — Single source of truth for all portfolio content
// Edit this file to update copy, projects, metadata, and links
// ============================================================

export const SITE = {
  name: "Jacob Alley",
  title: "Senior Product Designer",
  email: "jacob.alley21@gmail.com",
  linkedin: "https://www.linkedin.com/in/jacoballey/",
  phone: "812-363-4885",
};

export const HERO = {
  headline: ["The hard problems", "are the good ones."],
  subheadline:
    "Designing and shipping high-stakes product systems under real constraints.",
};

export const CREDIBILITY = {
  line: "Past clients include Anheuser-Busch, IQVIA, Fox Corporation, CBC, HBO, and National Geographic.",
};

/** Homepage case study grid — section heading above the cards */
export const CASE_STUDY_CARDS = {
  sectionLabel: "Selected Work",
};

export const CASE_STUDIES = [
  {
    id: "anheuser-busch",
    label: "Case Study 01",
    client: "Anheuser-Busch — M360",
    slug: "anheuser-busch",
    via: "via Willowtree Apps",
    period: "Mar 2019 – Oct 2019",
    tags: ["Enterprise", "B2B", "iOS"],
    teaser: "$37M in SaaS eliminated. 93% AI adoption. A narrow feature request became a platform strategy.",
    heroImage: "/images/ab-hero.jpg",
    available: true,
    meta: {
      role: "Lead Product Designer & Strategic Partner",
      team: "1 designer · 1 researcher · 1 PM · 12 engineers · 2 QA",
      users: "4,000+ field sales representatives",
      constraints: ["Fixed timeline", "8+ legacy tools", "Stakeholder skepticism", "High-autonomy user base"],
      period: "Mar 2019 – Oct 2019",
      via: "via Willowtree Apps",
    },
    outcomes: [
      { value: 37, display: "$37M", label: "Annual SaaS eliminated", prefix: "$", suffix: "M", countTo: 37 },
      { value: 93, display: "93%", label: "Weekly LOLA adoption", prefix: "", suffix: "%", countTo: 93 },
      { value: 14, display: "14%", label: "Increase in sales", prefix: "", suffix: "%", countTo: 14 },
      { value: null, display: "129→27", label: "Clicks per order", prefix: "", suffix: "", countTo: null },
      { value: 5.2, display: "5.2hrs", label: "Saved per rep/week", prefix: "", suffix: "hrs", countTo: 5 },
    ],
    beforeAfter: [
      { metric: "Platform", before: "8 fragmented tools", after: "1 owned iOS platform" },
      { metric: "Annual SaaS cost", before: "$37M", after: "Eliminated" },
      { metric: "Clicks per order", before: "129", after: "27" },
      { metric: "LOLA adoption", before: "—", after: "93% weekly" },
      { metric: "Sales impact", before: "—", after: "+14%" },
      { metric: "Time saved", before: "—", after: "5.2 hrs/rep/week" },
    ],
    sections: [
      {
        id: "brief",
        label: "THE BRIEF — AND WHAT IT WAS ACTUALLY ABOUT",
        annotation: { label: "$37M/yr", sub: "SaaS spend identified at project kickoff" },
        body: [
          "AB came to us with a focused ask: introduce LOLA, an internal algorithm surfacing localized sales recommendations to field reps. A week into discovery, it was clear that was the wrong problem.",
          "AB was spending $37M annually across five mobile tools and three legacy systems — none owned, none connected, none giving leadership visibility into how 4,000+ reps actually worked. Introducing LOLA into that ecosystem wouldn't fix anything. It would add noise to a workflow already breaking under its own weight.",
        ],
        reframe: {
          from: "\"How do we introduce AI?\"",
          to: "\"How do we take back control of the sales ecosystem?\"",
        },
        figure: { label: "FIG. 01 — FIELD SALES REP WORKFLOW, PRE-M360", caption: "3 critical failure points identified · ride-alongs + engineering documentation · Feb 2019", placeholder: true },
      },
      {
        id: "discovery",
        label: "DISCOVERY",
        annotation: { label: "8 days", sub: "Full-day ride-alongs, multiple territories" },
        body: [
          "Eight full-day ride-alongs across multiple territories. Reps were working in stockrooms and beer caves with mobile-hostile tools, switching apps constantly, spending 5+ hours a week building their own sales materials from scratch — work leadership had no idea existed.",
        ],
        blockquote: {
          text: "\"We have a whole damn marketing department — and they're making their own presentations?\"",
          attribution: "— Anheuser-Busch Executive, 2019",
        },
        figure: { label: "FIG. 02 — FIELD RESEARCH", caption: "Insert: journey map / annotated field findings", placeholder: true },
      },
      {
        id: "pivot",
        label: "THE PIVOT",
        annotation: { label: "Strategic call", sub: "Presented to St. Louis HQ" },
        body: [
          "The organization was leaning toward buying more external tools. My engineering lead and I assessed that path — it would deepen fragmentation, not solve it. LOLA needed real order data, trust signals, and seamless workflow integration. A reskinned third-party app could deliver none of those reliably.",
          "I built the case with engineering, aligned AB's own engineers in advance, and presented the recommendation to St. Louis executives: stop the acquisition, build an owned native iOS platform. They said yes.",
        ],
      },
      {
        id: "architecture",
        label: "DEFINING THE SYSTEM",
        annotation: { label: "Pivoted direction", sub: "Field research overruled initial instinct" },
        body: [
          "Two architectural directions: dashboard-based for visibility, or task-focused for speed. My instinct was the dashboard. Field research corrected me — reps didn't need an overview, they needed to act immediately in a constantly interrupted environment.",
          "I shifted to a task-focused architecture: speed in the moment, reduced cognitive load, built to scale.",
          "Interactive planograms scored high in the feature prioritization workshop — but sized as an XL against a fixed timeline, we cut it before it became a liability. The golden path was ordering and LOLA. Everything else waited.",
        ],
        figure: { label: "FIG. 03 — ARCHITECTURE DECISION", caption: "Insert: dashboard vs. task-focused comparison", placeholder: true },
      },
      {
        id: "dataviz",
        label: "DATA VISUALIZATION: CLARITY OVER FLEXIBILITY",
        body: [
          "The existing ecosystem had 12+ inconsistent chart types accumulated over years. I proposed consolidating to three: historical trends, current-month performance, incentive tracking.",
          "Regional managers pushed back — their workflows depended on legacy reporting. I ran a working session to map real needs against assumed needs. We chose clarity with extensibility built in.",
        ],
        figure: { label: "FIG. 04 — DATA VIZ CONSOLIDATION", caption: "Insert: 12 patterns → 3", placeholder: true },
      },
      {
        id: "orderflow",
        label: "THE ORDER FLOW: 129 CLICKS TO 27",
        annotation: { label: "82% reduction", sub: "Interaction cost per order" },
        body: [
          "The order flow touched every rep, every day. 129 clicks per order, mobile-hostile touch targets, no intelligent defaults, and early LOLA recommendations that felt intrusive and untrustworthy.",
        ],
        decisions: [
          { title: "Redesigning LOLA's presence.", body: "Early versions felt directive. I shifted to a non-intrusive toggle with transparent, locally explainable logic — reps could see exactly why a recommendation was being made. One rep during testing: \"I can see how products are performing at other locations now?\" That was the signal." },
          { title: "Eliminating hidden workarounds.", body: "Reps were building their own materials because the tools didn't support product context at point of ordering. I integrated product imagery and marketing assets directly into the flow. The workaround became unnecessary." },
          { title: "Speed and flexibility.", body: "Custom stepper and dropdown for fast quantity input. Smart defaults. Inline progress tracking to prevent lost orders." },
        ],
        result: "129 → 27 clicks. 14% increase in sales.",
        figure: { label: "FIG. 05 — ORDER FLOW EVOLUTION", caption: "Insert: before/after order flow", placeholder: true },
      },
      {
        id: "lola",
        label: "93%",
        isCallout: true,
        body: [
          "Two months post-launch, 93% of reps engaged with LOLA weekly.",
          "For a high-autonomy, deeply skeptical sales force that didn't trust tools or algorithms — that number doesn't happen by accident. It happens when the trust signals are visible, the integration is invisible, and the container is finally right.",
        ],
        figure: { label: "FIG. 06 — LOLA RECOMMENDATION SCREEN", caption: "Insert: trust metrics visible in UI", placeholder: true },
      },
      {
        id: "reflection",
        label: "WHAT I'D DO DIFFERENTLY",
        body: [
          "I let the scope expand before fully pressure-testing whether a smaller intervention could solve the core problem. The platform strategy was right — but I got there through discovery when I should have pushed for faster conviction.",
          "Not every complex problem needs a platform. Sometimes it needs a focused fix. Knowing the difference sooner is worth more than any individual design decision.",
        ],
      },
    ],
  },
  {
    id: "fox-weather",
    label: "Case Study 02",
    client: "Fox Weather",
    slug: "fox-weather",
    via: "via Willowtree Apps",
    period: "Jan 2021 – Sep 2021",
    tags: ["Consumer", "iOS", "Android"],
    teaser: "Saturated market. Immovable deadline. One shot. 2M+ downloads, 4.8★ at launch.",
    heroImage: "/images/fox-hero.jpg",
    available: true,
    meta: {
      role: "Lead Product Designer",
      team: "2 designers (1 mentored) · 1 PM · iOS + Android engineering",
      users: "General consumer — millions of potential downloads",
      constraints: ["Fixed broadcast launch date", "Saturated market", "New brand with no equity", "Android team significantly smaller than iOS"],
      period: "Jan 2021 – Sep 2021",
      via: "via Willowtree Apps",
    },
    outcomes: [
      { value: 2, display: "2M+", label: "Downloads at launch", prefix: "", suffix: "M+", countTo: 2 },
      { value: 4.8, display: "4.8★", label: "iOS App Store rating", prefix: "", suffix: "★", countTo: 4 },
      { value: 6, display: "6hr", label: "Radar — first in market", prefix: "", suffix: "hr", countTo: 6 },
      { value: 50, display: "50+", label: "Users polled for homepage", prefix: "", suffix: "+", countTo: 50 },
    ],
    beforeAfter: [
      { metric: "Market position", before: "Entrenched competitors", after: "Distinct visual identity" },
      { metric: "Differentiating feature", before: "None at launch", after: "6-hour interactive radar" },
      { metric: "Downloads", before: "—", after: "2M+ at launch" },
      { metric: "iOS rating", before: "—", after: "4.8★" },
      { metric: "Android", before: "—", after: "Shipped on date" },
      { metric: "Post-launch", before: "—", after: "Data surfaced via live feedback" },
    ],
    sections: [
      {
        id: "problem",
        label: "THE PROBLEM",
        body: [
          "Weather apps are a graveyard of good intentions. By 2021 the market had entrenched players with years of user trust, deep data partnerships, and established visual languages. Fox Weather had none of that.",
          "What it had: a hard launch date tied to a Fox Corp broadcast commitment, a brand new logo, and an enormous amount of weather data with no established way to present it.",
        ],
        reframe: {
          from: "\"Make a weather app.\"",
          to: "\"What makes someone switch — and keep — it?\"",
        },
      },
      {
        id: "visual-direction",
        label: "GROUNDING THE VISUAL DIRECTION",
        annotation: { label: "Dot-vote workshop", sub: "Clarity dominant across all participants" },
        body: [
          "Before a single screen was designed I ran a dot-vote workshop with Fox executives — printed hundreds of UI screens, illustration styles, and icon sets and had them vote. The output wasn't a style guide. It was a shared vocabulary.",
          "One word dominated: Clarity. Everything that followed was in service of that.",
          "I developed two directions — Immersive Imagery and Energetic Illustration — both anchored in clarity, differentiated by feel. Both ran against Fox's other app brands. That was intentional.",
          "Six weeks in I flew to New York with my PM and tech lead. I held the line on the data visualization when they pushed back — the research was in the next slides. Energetic Illustration won. The room left excited.",
        ],
        figure: { label: "FIG. 01 — VISUAL DIRECTION COMPARISON", caption: "Insert: immersive imagery vs energetic illustration", placeholder: true },
      },
      {
        id: "homepage",
        label: "DESIGNING THE HOMEPAGE: RESEARCH VS. JUDGMENT",
        annotation: { label: "50+ users polled", sub: "Quant + qual prototype sessions" },
        body: [
          "The homepage was the highest-stakes surface. In a saturated market it's the only thing that earns a second open.",
          "I polled 50+ users on what mattered most when opening a weather app. The quantitative ranking was clear: emergency alerts first, hourly breakdown second, daily forecast third.",
          "The final design diverges from that ranking — deliberately. Quantitative data tells you what users value. Qualitative research tells you what they actually do. What it showed: people open a weather app to answer one question first. What's it like right now?",
          "The 6-hour precipitation graph extends the same visual language as the temperature arc: an x-y graph that makes change over time immediately readable. Consistency over novelty.",
        ],
        figure: { label: "FIG. 02 — RESEARCH VS. FINAL DESIGN", caption: "Insert: quant ranking alongside final home screen", placeholder: true },
      },
      {
        id: "system",
        label: "BUILDING THE SYSTEM WHILE SHIPPING IT",
        annotation: { label: "9 months", sub: "Design system built in parallel with engineering" },
        body: [
          "After the NYC presentation the roadmap was locked and engineering was onboarding within a week. There was no time to build a design system before designs were needed — so I built it alongside them.",
          "I sat shoulder-to-shoulder with iOS and Android devs onsite. The \"system\" in those early weeks was a WIP Figma file with rules at the top: Proxima Nova. Base-8 grid. Odd numbers mean something's wrong.",
          "Proximity replaced process. It worked because I was there.",
          "Android was the harder constraint. Smaller team, later start, iOS as the primary focus. Widgets didn't ship at launch — they followed a week later. Articles planned as native were scoped to browser links with approved card designs to protect the deadline. Clean tradeoff, right call.",
        ],
        figure: { label: "FIG. 03 — DESIGN SYSTEM", caption: "Insert: WIP Figma system — rules, components, iconography (60+ icons)", placeholder: true },
      },
      {
        id: "radar",
        label: "THE FEATURE WE BUILT WITHOUT PERMISSION",
        annotation: { label: "Most praised", sub: "App Store reviews via live Slackbot" },
        body: [
          "The original radar screen was planned as static. During development my iOS and Android devs and I had a few hours on the side.",
          "I'd been looking at what the weather API could actually deliver. No major competitor was offering a 6-hour radar view — the data existed, nobody had surfaced it. We built it: a fully interactive 3D radar with 6-hour range, playback controls, and precipitation type overlay.",
          "We showed it to Fox during a routine demo. They thought they were getting a static map.",
          "We kept it for launch. App Store reviews cited it as the best feature in the app.",
        ],
        figure: { label: "FIG. 04 — 6-HOUR RADAR", caption: "Insert: 3D radar view, playback controls, precipitation overlay", placeholder: true },
      },
      {
        id: "feedback",
        label: "POST-LAUNCH: THE FEEDBACK LOOP",
        body: [
          "The Slackbot caught a real usability issue two weeks post-launch — users wanted humidity, UV index, and sunrise/sunset without tapping into a detail card.",
          "We surfaced those fields directly into the main feed. Scrollable, immediate, no extra tap. Small lift, meaningful retention signal.",
        ],
        figure: { label: "FIG. 05 — BEFORE / AFTER", caption: "Insert: buried data vs surfaced in main feed", placeholder: true },
      },
      {
        id: "reflection",
        label: "WHAT I'D DO DIFFERENTLY",
        body: [
          "Android deserved more design attention earlier. I was embedded with iOS and the disparity showed at launch — not in quality, but in what each platform shipped on day one.",
          "Next time: treat Android as a co-equal platform from week one, not a parallel track that catches up.",
        ],
      },
    ],
  },
];

export const EXPERIMENTS = [
  {
    id: "current",
    label: "Current",
    title: "Placeholder — Current Project Title",
    description: "Brief description of what you're currently working on or exploring. Keep it to 2 sentences max.",
    tags: ["AI", "Design Systems"],
    status: "In progress",
  },
  {
    id: "past-1",
    label: "Past",
    title: "Placeholder — Past Project Title",
    description: "Brief description of an interesting past project. Not Dribbble. Something real and relevant.",
    tags: ["Nonprofit", "UX"],
    status: "Complete",
  },
  {
    id: "past-2",
    label: "Past",
    title: "Placeholder — Past Project Title",
    description: "Brief description of another past project. Focus on what was interesting about it.",
    tags: ["AI Tooling"],
    status: "Complete",
  },
];

export const HOT_TAKES = [
  {
    id: 1,
    image: "/images/hot-take-1.jpg",
    title: "Curate your inputs, not just your outputs.",
    subtitle: [
      "Most people focus on refining AI output—better prompts, better generations. Less attention goes to what they consume before they start.",
      "Too much input flattens thinking. Endless inspiration feeds, Pinterest loops, one more prompt tweak—it all converges toward the same ideas.",
      "The best ideas tend to show up after the input stops. Real divergence needs space.",
      "Get bored. Actually bored.",
      "That's usually where something original shows up.",
       ],
  },
  {
    id: 2,
    image: "/images/hot-take-2.jpg",
    title: "Placeholder Hot Take Title",
    subtitle: "A short, punchy subtitle. One sentence. Strong opinion.",
  },
  {
    id: 3,
    image: "/images/hot-take-3.jpg",
    title: "Placeholder Hot Take Title",
    subtitle: "A short, punchy subtitle. One sentence. Strong opinion.",
  },
];

export const ABOUT = {
  paragraphs: [
    "I do my best thinking in the room — whiteboard, engineers, real problem in front of us.",
    "I've spent the last decade working on products with real constraints: complex systems, small teams, and decisions that actually matter. That's not a tradeoff—it's the work I look for.",
    "Outside of work, I grow things. Gardens are slow and don't tolerate shortcuts. Strategy games scratch the same itch—clear rules, many paths, no perfect answer.",
    "I'm drawn to frontier problems. The ones few have solved before.",
  ],
};

export const CONTACT = {
  headline: "If you're building something hard and need someone who can own the design function — let's talk.",
  email: "jacob.alley21@gmail.com",
  modal: {
    title: "Get in touch",
    intro:
      "A short note is enough — context, timeline, and what you're trying to ship. I'll read it carefully.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    submit: "Send message",
    close: "Close",
    requiredHint: "Required",
    sending: "Sending…",
    sendError:
      "Something went wrong sending that. You can still reach me at the address below.",
    successTitle: "Thank you",
    successBody:
      "Your message is in my inbox. I reply when I can give it a real read — usually within a couple of days.",
    successDismiss: "Close",
  },
};
