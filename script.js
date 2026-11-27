const moreBtn = document.querySelector('.more-btn');
const moreMenu = document.getElementById('more-menu');

function setMenu(open) {
  moreMenu.hidden = !open;
  moreBtn.setAttribute('aria-expanded', String(open));
}

moreBtn.addEventListener('click', () => setMenu(moreMenu.hidden));

// Close on a link click or a click outside the menu
document.addEventListener('click', (event) => {
  if (event.target === moreBtn) return;
  if (event.target.closest('a') || !moreMenu.contains(event.target)) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !moreMenu.hidden) {
    setMenu(false);
    moreBtn.focus();
  }
});

// Swap dropdown functionality
const payDropdown = document.getElementById('pay-dropdown');
const payMenu = document.getElementById('pay-menu');
const selectValue = payDropdown.querySelector('.select-value');
const menuItems = payMenu.querySelectorAll('li');

function toggleSelectMenu(open) {
  payMenu.hidden = !open;
  payDropdown.setAttribute('aria-expanded', String(open));
}

payDropdown.addEventListener('click', () => {
  toggleSelectMenu(payMenu.hidden);
});

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    const value = item.getAttribute('data-value');
    selectValue.textContent = value;

    menuItems.forEach((el) => el.removeAttribute('aria-selected'));
    item.setAttribute('aria-selected', 'true');

    toggleSelectMenu(false);
  });
});

// Close dropdown on outside click or escape
document.addEventListener('click', (event) => {
  if (event.target === payDropdown) return;
  if (!payDropdown.contains(event.target)) toggleSelectMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !payMenu.hidden) {
    toggleSelectMenu(false);
    payDropdown.focus();
  }
});

// Crash game countdown and multiplier
const countdownTimer = document.querySelector('.countdown-timer');
const multiplierValue = document.querySelector('.multiplier-value');

function generateRandomMultiplier() {
  return (Math.random() * 50 + 5).toFixed(2) + 'x';
}

function startCountdown() {
  let count = 3;
  countdownTimer.textContent = count;

  const interval = setInterval(() => {
    count--;
    countdownTimer.textContent = count;

    if (count <= 0) {
      clearInterval(interval);
      multiplierValue.textContent = generateRandomMultiplier();
      setTimeout(startCountdown, 500);
    }
  }, 1000);
}

// Initialize crash game
startCountdown();

// Review submission and display
const reviewForm = document.getElementById('review-form');
const reviewTextarea = document.getElementById('review-textarea');
const reviewsCarousel = document.getElementById('reviews-carousel');

if (!reviewsCarousel) {
  console.error('Reviews carousel element not found');
}

const sampleReviews = [
  "Best Web3 ecosystem I've used! The hardware vaults are top-tier security.",
  "Incredible yields on the staking pools. Already made 5x my initial investment!",
  "The crash game is so addictive, pulled a 50x multiplier yesterday! 🚀",
  "Discord Casino integration is seamless. Love the instant payouts!",
  "Zero friction swaps, best liquidity pools in the ecosystem.",
  "The DAO governance is actually transparent. Really impressed with the voting system.",
  "Flash loan arbitrage made me $2k in one day. This platform is insane.",
  "Hardware wallets arrived faster than expected. Quality is exceptional.",
  "AI Copy-Trading pulled +$8K in passive income last month alone!",
  "Pre-IPO allocations are legit. Got in early on ANT and already up 180%.",
];

function getStoredReviews() {
  try {
    const stored = localStorage.getItem('dscdReviews');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReview(text) {
  try {
    const reviews = getStoredReviews();
    reviews.unshift({
      text,
      timestamp: new Date().toLocaleString(),
      id: Date.now(),
    });
    localStorage.setItem('dscdReviews', JSON.stringify(reviews.slice(0, 50)));
  } catch {
    console.error('Failed to save review');
  }
}

function displayReviews() {
  const allReviews = [...sampleReviews, ...getStoredReviews().map((r) => r.text)];
  const shuffled = allReviews.sort(() => Math.random() - 0.5).slice(0, 3);

  reviewsCarousel.innerHTML = shuffled
    .map(
      (review) => `
    <div class="review-card">
      <div class="review-card-text">"${review}"</div>
      <div class="review-card-author">@Web3Trader</div>
      <div class="review-card-time">Just now</div>
    </div>
  `
    )
    .join('');
}

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = reviewTextarea.value.trim();

  if (text.length > 10) {
    saveReview(text);
    reviewTextarea.value = '';
    displayReviews();
  }
});

displayReviews();

// Activity feed functionality
const feedForm = document.getElementById('feed-form');
const feedInput = document.getElementById('feed-input');
const feedMessages = document.getElementById('feed-messages');

const usernames = [
  '@NFT_Lord',
  '@SatoshiNerd',
  '@YieldKing',
  '@MoonShot2027',
  '@AlphaHunter',
  '@CryptoWhale',
  '@DefiGod',
  '@LiquidityMaster',
  '@VaultKeeper',
  '@ArbitrageBot',
];

const sampleActivities = [
  'hit a massive 82.5x multiplier on Crash Arena!! 🚀',
  'just purchased Discord S1 Pro hardware wallet safely!',
  'executed a flash-loan arbitrage yielding +12.4 ETH profit.',
  'pulled +15,420 $DSCD from AI Copy-Trading Vaults!',
  'staked 10,000 $DSCD and earned +2,850 tokens today!',
  'won the Fortune Spin and got +5,000 $DSCD bonus!',
  'completed a 50x multiplier on Crash Arena! 🎯',
  'swapped 5 ETH for 1,250 $DSCD at zero friction!',
  'executed a successful flash arbitrage yielding +8.6 ETH!',
  'just got approved for $50,000 credit line against vaults!',
];

function getStoredActivities() {
  try {
    const stored = localStorage.getItem('dscdActivities');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveActivity(text) {
  try {
    const activities = getStoredActivities();
    activities.unshift({
      text,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      id: Date.now(),
    });
    localStorage.setItem('dscdActivities', JSON.stringify(activities.slice(0, 100)));
  } catch {
    console.error('Failed to save activity');
  }
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `[${hours}:${minutes}:${seconds} UTC]`;
}

function displayActivities() {
  const allActivities = [
    ...sampleActivities.map((text) => ({
      text,
      username: usernames[Math.floor(Math.random() * usernames.length)],
    })),
    ...getStoredActivities(),
  ];

  const displayed = allActivities.slice(0, 7);

  feedMessages.innerHTML = displayed
    .map(
      (activity) => `
    <div class="feed-message">
      <span class="message-time">${getCurrentTime()}</span>
      <span class="message-user">${activity.username}:</span>
      <span class="message-text">${activity.text.includes('+') ? activity.text.replace(/(\+[\d,]+)/g, '<span class="highlight green">$1</span>').replace(/(\d+x)/g, '<span class="highlight green">$1</span>') : activity.text}</span>
    </div>
  `
    )
    .join('');

  feedMessages.scrollTop = feedMessages.scrollHeight;
}

feedForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = feedInput.value.trim();

  if (text.length > 5) {
    saveActivity(text);
    feedInput.value = '';
    displayActivities();
  }
});

// Auto-generate demo activities
function addDemoActivity() {
  const randomActivity = sampleActivities[Math.floor(Math.random() * sampleActivities.length)];
  const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];

  saveActivity(randomActivity);
  displayActivities();
}

// Initial display
displayActivities();

// Add a demo activity every 4-6 seconds
setInterval(() => {
  addDemoActivity();
}, 4000 + Math.random() * 2000);

// Referral link copy functionality
const referralBtn = document.querySelector('.referral-btn');
const referralInput = document.querySelector('.referral-input');

if (referralBtn) {
  referralBtn.addEventListener('click', () => {
    referralInput.select();
    document.execCommand('copy');

    const originalText = referralBtn.textContent;
    referralBtn.textContent = 'COPIED!';
    referralBtn.style.background = '#27ae60';

    setTimeout(() => {
      referralBtn.textContent = originalText;
      referralBtn.style.background = '';
    }, 2000);
  });
}

// Countdown timer for token distribution
const distributionCountdownTimer = document.getElementById('countdown-timer');

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}

if (distributionCountdownTimer) {
  let remainingSeconds = 2 * 3600 + 41 * 60 + 12;

  function updateCountdown() {
    distributionCountdownTimer.textContent = formatTime(remainingSeconds);
    remainingSeconds--;

    if (remainingSeconds < 0) {
      remainingSeconds = 2 * 3600 + 41 * 60 + 12;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Security log feed - generate random blocks
const threatFeed = document.getElementById('threat-feed');

const securityLogTemplates = [
  { type: 'SAFE', text: 'Discord ID link verified clean via automated heuristic query.' },
  { type: 'BLOCKED', text: 'RIP virtual machine session terminated: fake user registration signature flagged.' },
  { type: 'BLOCKED', text: 'Anonymous SOCKS5 proxy tunnel blacklisted from site interaction.' },
  { type: 'BLOCKED', text: 'Multi-accounting spoof attempt neutralized via hardware fingerprint watch.' },
  { type: 'BLOCKED', text: 'Automated bot script attempt intercepted on registration gate.' },
  { type: 'BLOCKED', text: 'Phishing redirect detected and blocked: credential harvesting attempt.' },
  { type: 'BLOCKED', text: 'Malicious smart contract signature prevented: drain attempt intercepted.' },
  { type: 'SAFE', text: '$DSCD wallet address verified and whitelisted by community audit.' },
  { type: 'BLOCKED', text: 'VPN/Proxy connection rejected: suspicious geographic pattern detected.' },
  { type: 'BLOCKED', text: 'Session cookie hijack attempt blocked by encryption protocol.' },
  { type: 'SAFE', text: 'Hardware wallet signature validated: transaction approved.' },
  { type: 'BLOCKED', text: 'Duplicate account creation attempt from same IP address blocked.' },
];

const origins = ['Azerbajan', 'France', 'Singapore', 'Russia', 'Nigeria', 'China', 'Brazil', 'India', 'Pakistan'];
const chains = ['Optimism L2', 'Binance Smart Chain', 'Arbitrum', 'Polygon', 'Base', 'Avalanche'];

function generateRandomSecurityEntry() {
  const template = securityLogTemplates[Math.floor(Math.random() * securityLogTemplates.length)];
  const origin = origins[Math.floor(Math.random() * origins.length)];
  const chain = chains[Math.floor(Math.random() * chains.length)];
  const wallet = '0x' + Math.random().toString(16).slice(2, 10).padEnd(8, '0');
  const time = new Date().toLocaleTimeString('en-US', { hour12: false });

  const entryDiv = document.createElement('div');
  entryDiv.className = `threat-entry ${template.type.toLowerCase()}`;
  entryDiv.innerHTML = `
    <span class="threat-time">[${time}] ${template.type === 'BLOCKED' ? 'TELEMETRY ALERT!' : ''}</span>
    <span class="threat-status">⚠ Origin: ${origin}</span>
    <span class="threat-chain">🔗 Chain: ${chain}</span>
    <span class="threat-wallet">👛 Wallet: ${wallet}</span>
    <span class="threat-action">⛔ Status: ${template.text}</span>
  `;

  return entryDiv;
}

if (threatFeed) {
  // Add random entries every 3-5 seconds
  setInterval(() => {
    const newEntry = generateRandomSecurityEntry();
    threatFeed.insertBefore(newEntry, threatFeed.firstChild);

    // Keep only last 10 entries
    while (threatFeed.children.length > 10) {
      threatFeed.removeChild(threatFeed.lastChild);
    }

    // Auto-scroll to top
    threatFeed.scrollTop = 0;
  }, 3000 + Math.random() * 2000);
}

// Security feed - generate random entries (Ecosystem Matrix section)
const securityFeed = document.getElementById('security-feed');

const securityMessages = [
  { badge: 'SAFE', text: '$DSCD wallet address verified and whitelisted.' },
  { badge: 'BLOCKED', text: 'RIP virtual machine session terminated: fake registration signature flagged.' },
  { badge: 'BLOCKED', text: 'Anonymous SOCKS5 proxy tunnel blacklisted from site.' },
  { badge: 'BLOCKED', text: 'Multi-accounting spoof neutralized via hardware fingerprint.' },
  { badge: 'BLOCKED', text: 'Automated bot script intercepted on registration gate.' },
  { badge: 'SAFE', text: 'Discord ID verified clean via heuristic query.' },
  { badge: 'BLOCKED', text: 'Phishing redirect detected: credential harvest blocked.' },
  { badge: 'BLOCKED', text: 'Malicious contract signature prevented: drain intercepted.' },
  { badge: 'SAFE', text: 'Hardware wallet signature validated and approved.' },
  { badge: 'BLOCKED', text: 'VPN/Proxy connection rejected: suspicious pattern.' },
];

function generateRandomSecurityMessage() {
  const message = securityMessages[Math.floor(Math.random() * securityMessages.length)];
  const entryDiv = document.createElement('div');
  entryDiv.className = `security-entry ${message.badge.toLowerCase()}`;
  entryDiv.innerHTML = `
    <span class="log-badge ${message.badge.toLowerCase()}">${message.badge}</span>
    <span class="log-text">${message.text}</span>
  `;
  return entryDiv;
}

if (securityFeed) {
  // Add random entries every 2-4 seconds
  setInterval(() => {
    const newEntry = generateRandomSecurityMessage();
    securityFeed.insertBefore(newEntry, securityFeed.firstChild);

    // Keep only last 7 entries
    while (securityFeed.children.length > 7) {
      securityFeed.removeChild(securityFeed.lastChild);
    }

    // Auto-scroll to top
    securityFeed.scrollTop = 0;
  }, 2000 + Math.random() * 2000);
}

// Live Wire Activity Log - generate random transactions
const wireLog = document.querySelector('.wire-log');

const activityTypes = [
  'Funded',
  'DEX SWAP',
  'MINT',
  'Staked',
  'Flash Loan',
  'Arbitrage',
  'Harvested',
  'Bridged',
  'Wrapped',
  'Unwrapped',
];

const descriptions = [
  'Going-Forward High Position-Custodial • TX finalized',
  'Instant Arbitrage • TX confirmed for hash',
  'Yield-vault flash-loaned • TX completed',
  'High-yield perpetual volatility pool • TX executed',
  'Cross-chain liquidity routing • TX finalized',
  'Multi-signature consensus • TX approved',
  'Automated market maker • TX settled',
  'Smart contract execution • TX validated',
  'Blockchain settlement • TX recorded',
  'Decentralized exchange • TX processed',
];

const amounts = ['$1,250', '$4,201', '$8,547', '$2,890', '$15,340', '$567', '$12,100', '$3,456', '$9,870', '$5,678'];

function generateRandomWireEntry() {
  const isUser = Math.random() > 0.5;
  const id = isUser ? `USER_${Math.floor(Math.random() * 1000)}` : `0x${Math.random().toString(16).slice(2, 6)}`;
  const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];
  const desc = descriptions[Math.floor(Math.random() * descriptions.length)];

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `${id} • ${activity} • ${amount} ${desc}`;
  return entry;
}

if (wireLog) {
  // Add random entries every 3-5 seconds
  setInterval(() => {
    const newEntry = generateRandomWireEntry();
    wireLog.insertBefore(newEntry, wireLog.firstChild);

    // Keep only last 4 entries
    while (wireLog.children.length > 4) {
      wireLog.removeChild(wireLog.lastChild);
    }

    // Auto-scroll to top
    wireLog.scrollTop = 0;
  }, 3000 + Math.random() * 2000);
}

// Update stats dynamically
const statElements = document.querySelectorAll('.stat dd');

function updateStats() {
  if (statElements.length >= 3) {
    // Update Indexed Message Count
    const msgCount = 11826 + Math.floor(Math.random() * 500);
    statElements[0].textContent = `${msgCount.toLocaleString()} Msgs`;

    // Update Est. Daily AI Yield
    const yield_amount = 298.48 + (Math.random() * 150 - 75);
    statElements[2].textContent = `+${yield_amount.toFixed(2)} $DSCD / day`;
  }
}

// Update stats every 4-6 seconds
if (statElements.length > 0) {
  updateStats();
  setInterval(updateStats, 4000 + Math.random() * 2000);
}

// Modal functionality for token drop claim
const tokenModal = document.getElementById('token-modal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalConnectBtn = document.querySelector('.modal-connect-btn');

// Buttons that should NOT open the modal (they have specific functionality)
const excludedButtonSelectors = [
  '.more-btn',
  '.connect-btn',
  '.module-tab',
  '.newsletter-form button',
  '.modal-close',
  '.modal-connect-btn',
  'button[type="submit"]',
  '.sync-btn',
];

function shouldOpenModal(button) {
  // Check if button matches excluded selectors
  for (let selector of excludedButtonSelectors) {
    if (button.matches(selector)) {
      return false;
    }
  }
  return true;
}

function openModal() {
  if (tokenModal) {
    tokenModal.removeAttribute('hidden');
  }
}

function closeModal() {
  if (tokenModal) {
    tokenModal.setAttribute('hidden', '');
  }
}

// Add click listeners to all buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (shouldOpenModal(button)) {
      e.preventDefault();
      openModal();
    }
  });
});

// Close modal on close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

// Close modal on Connect button click
if (modalConnectBtn) {
  modalConnectBtn.addEventListener('click', () => {
    alert('Wallet connection initiated. Please complete the connection in your wallet...');
    closeModal();
  });
}

// Close modal when clicking outside
if (tokenModal) {
  tokenModal.addEventListener('click', (e) => {
    if (e.target === tokenModal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !tokenModal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}
