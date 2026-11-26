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
