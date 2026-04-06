import React from 'react';
import './Features.css';

/* ── Shared Tag dot ── */
const TagDot = () => (
  <div className="f-tag-icon">
    <svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" /></svg>
  </div>
);

/* ── Card 1 visual: bar chart ── */
const ChartVisual = () => {
  const heights = [35, 55, 42, 68, 50, 80, 60, 90, 72, 100, 85, 95];
  return (
    <div className="f-visual f-chart-wrap">
      <div className="f-chart-label">Growth</div>
      <div className="f-bars">
        {heights.map((h, i) => (
          <div key={i} className="f-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
        ))}
      </div>
      <div className="f-chart-dates">
        <span>Nov 10</span><span>Nov 11</span><span>Today</span>
      </div>
    </div>
  );
};

/* ── Card 2 visual: notification ── */
const NotifVisual = () => (
  <div className="f-visual f-notif-wrap">
    <div className="f-notif-reviewed">
      <div className="f-dot-reviewed" />
      REVIEWED
    </div>
    <div className="f-notif-new">
      <div className="f-notif-icon">
        <svg viewBox="0 0 24 24" fill="#0d0d0d" width="18" height="18">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <div className="f-notif-body">
        <div className="f-new-tag">
          <div className="f-dot-new" />
          NEW
        </div>
        <div className="f-notif-title">Latest design</div>
        <div className="f-notif-time">Today, 11:50</div>
      </div>
    </div>
  </div>
);

/* ── Card 3 visual: glow line chart ── */
const LineVisual = () => (
  <div className="f-visual f-line-wrap">
    <svg className="f-line-svg" viewBox="0 0 280 140" preserveAspectRatio="none">
      <defs>
        <linearGradient id="f-lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8f135" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c8f135" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,130 C60,120 80,100 120,80 C150,65 160,50 200,30 C230,15 260,10 280,5"
        fill="none" stroke="#c8f135" strokeWidth="2.5" opacity="0.85"
      />
      <path
        d="M0,130 C60,120 80,100 120,80 C150,65 160,50 200,30 C230,15 260,10 280,5 L280,140 L0,140 Z"
        fill="url(#f-lineGrad)"
      />
    </svg>
    <div className="f-glow-dot" />
    <div className="f-graph-numbers">
      <span>45</span><span>35</span><span>25</span><span>15</span><span>5</span><span>-5</span>
    </div>
  </div>
);

/* ── App icons for Workflow card ── */
const AppIcons = () => (
  <div className="f-app-grid">
    {/* Figma */}
    <div className="f-app-icon">
      <svg width="22" height="22" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M9.5 57A9.5 9.5 0 0 1 9.5 38H19V47.5A9.5 9.5 0 0 1 9.5 57z" fill="#0ACF83"/>
        <path d="M19 0H9.5A9.5 9.5 0 0 0 9.5 19H19z" fill="#FF7262"/>
        <path d="M28.5 19A9.5 9.5 0 0 0 19 0V19z" fill="#F24E1E"/>
        <path d="M19 19H9.5A9.5 9.5 0 0 0 19 38z" fill="#FF637E"/>
      </svg>
    </div>
    {/* Notion */}
    <div className="f-app-icon">
      <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="18" fill="#fff"/>
        <path d="M29 20h42l8 8v52H29V20z" fill="#fff" stroke="#ddd" strokeWidth="3"/>
        <rect x="37" y="36" width="26" height="4" rx="2" fill="#bbb"/>
        <rect x="37" y="48" width="20" height="4" rx="2" fill="#bbb"/>
        <rect x="37" y="60" width="22" height="4" rx="2" fill="#bbb"/>
      </svg>
    </div>
    {/* Slack */}
    <div className="f-app-icon">
      <svg width="22" height="22" viewBox="0 0 54 54" fill="none">
        <path d="M20 4a4 4 0 0 0-4 4v8h8V8a4 4 0 0 0-4-4z" fill="#36C5F0"/>
        <path d="M4 20a4 4 0 0 0 4 4h8v-8H8a4 4 0 0 0-4 4z" fill="#2EB67D"/>
        <path d="M34 50a4 4 0 0 0 4-4v-8h-8v8a4 4 0 0 0 4 4z" fill="#ECB22E"/>
        <path d="M50 34a4 4 0 0 0-4-4h-8v8h8a4 4 0 0 0 4-4z" fill="#E01E5A"/>
        <path d="M20 24h14v6H20z" fill="#36C5F0"/>
        <path d="M20 24h6v14H20z" fill="#2EB67D"/>
        <path d="M28 24h6v14H28z" fill="#ECB22E"/>
        <path d="M20 28h14v6H20z" fill="#E01E5A" opacity="0.4"/>
      </svg>
    </div>
    {/* X / Twitter */}
    <div className="f-app-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </div>
    {/* Asterisk */}
    <div className="f-app-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07 19.07 4.93" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </div>
    {/* AI */}
    <div className="f-app-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#6366f1" strokeWidth="2"/>
        <path d="M8 12h8M12 8v8" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
);

/* ── Avatars for Collaborate card ── */
const CollabAvatars = () => (
  <div className="f-avatars-col">
    <div className="f-avatar-row">
      <div className="f-avatar f-av1"><span>👩</span></div>
      <div className="f-avatar f-av2"><span>👨</span></div>
      <div className="f-avatar f-av3"><span>👩</span></div>
      <div className="f-avatar f-av4"><span style={{ fontSize: 13, color: '#777', fontWeight: 600 }}>+2</span></div>
    </div>
    <div className="f-eliah-tag">Eliah</div>
  </div>
);

/* ── Main Features section ── */
const Features = () => (
  <section className="features-section">
    <div className="features-inner">

      {/* Label */}
      <div className="f-label">
        <div className="f-label-icon">
          <svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" /></svg>
        </div>
        What you'll get
      </div>

      {/* Headline */}
      <h2 className="f-headline">
        We resolve problems associated with<br />creative procedures.
      </h2>

      {/* Top 3 cards */}
      <div className="f-top-cards">
        <div className="f-card">
          <ChartVisual />
          <div className="f-card-title">Cost effective solution</div>
          <div className="f-card-desc">Get high-quality design work at a fraction of the cost.</div>
        </div>
        <div className="f-card">
          <NotifVisual />
          <div className="f-card-title">Tailor–made design</div>
          <div className="f-card-desc">We've got the expertise to make your vision a reality.</div>
        </div>
        <div className="f-card">
          <LineVisual />
          <div className="f-card-title">Scalable as you grow</div>
          <div className="f-card-desc">We're ready to meet your evolving needs.</div>
        </div>
      </div>

      {/* Bottom 2 cards */}
      <div className="f-bottom-cards">
        {/* Workflow */}
        <div className="f-card f-card-bottom">
          <div className="f-workflow-content">
            <div className="f-workflow-text">
              <div className="f-card-title">Workflow<br />integration</div>
              <div className="f-card-desc" style={{ marginTop: 10 }}>Seamlessly connect all your<br />existing apps.</div>
            </div>
            <AppIcons />
          </div>
        </div>
        {/* Collaborate */}
        <div className="f-card f-card-bottom">
          <div className="f-collab-content">
            <div className="f-collab-text">
              <div className="f-card-title">Collaborate<br />real-time</div>
              <div className="f-card-desc" style={{ marginTop: 10 }}>Seamlessly connect all<br />your existing apps.</div>
            </div>
            <CollabAvatars />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="f-tags-wrap">
        <div className="f-tags-row">
          {['Design workshops', 'Workshops', 'Trend reports', 'Asset library'].map(t => (
            <div key={t} className="f-tag"><TagDot />{t}</div>
          ))}
        </div>
        <div className="f-tags-row">
          {['Rollover hours', 'Premium designers', 'Multilingual support'].map(t => (
            <div key={t} className="f-tag"><TagDot />{t}</div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default Features;
