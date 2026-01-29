export const BADGES = [
    { id: 'novice', name: 'Novice Scribe', min: 1, icon: '🌟', desc: 'First Contribution' },
    { id: 'scholar', name: 'Scholar', min: 5, icon: '📜', desc: '5 Contributions' },
    { id: 'master', name: 'Master Linguist', min: 20, icon: '👑', desc: '20+ Contributions' },
    { id: 'guardian', name: 'Guardian', min: 50, icon: '🛡️', desc: 'True Protector' }
];

export const getContributionCount = () => {
    return parseInt(localStorage.getItem('contributionCount') || '0');
};

export const incrementContribution = () => {
    const current = getContributionCount();
    const newVal = current + 1;
    localStorage.setItem('contributionCount', newVal.toString());
    return newVal;
};

export const getBadges = () => {
    const count = getContributionCount();
    return BADGES.filter(b => count >= b.min);
};

export const getNextBadge = () => {
    const count = getContributionCount();
    return BADGES.find(b => count < b.min);
};
