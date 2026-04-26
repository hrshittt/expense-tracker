export const COLORS = {
    background: '#0B0C10', // Deep dark blue/black
    surface: '#1A1C24',    // Lighter dark for cards
    primary: '#8B5CF6',    // Purple accent
    primaryLight: '#A78BFA', // Lighter purple
    secondary: '#10B981',  // Green (positive/health/utilities)
    accent: '#F43F5E',     // Rose/Red (negative/logout)
    text: '#FFFFFF',       // Primary text
    textSecondary: '#9CA3AF', // Gray text
    border: '#2D3342',     // Subtle borders
    error: '#EF4444',      // Error red
    info: '#3B82F6',       // Transport/Info blue
    warning: '#F59E0B',    // Food/Warning yellow
};

export const CATEGORY_MAP = {
    'Food': { icon: 'fast-food', color: COLORS.warning, bg: 'rgba(245, 158, 11, 0.15)' },
    'Health': { icon: 'medical', color: COLORS.secondary, bg: 'rgba(16, 185, 129, 0.15)' },
    'Transport': { icon: 'car', color: COLORS.info, bg: 'rgba(59, 130, 246, 0.15)' },
    'Shopping': { icon: 'bag-handle', color: COLORS.accent, bg: 'rgba(244, 63, 94, 0.15)' },
    'Bills': { icon: 'bulb', color: '#FCD34D', bg: 'rgba(252, 211, 77, 0.15)' },
    'Utilities': { icon: 'flash', color: COLORS.secondary, bg: 'rgba(16, 185, 129, 0.15)' },
    'Entertainment': { icon: 'game-controller', color: COLORS.primaryLight, bg: 'rgba(167, 139, 250, 0.15)' },
    'Other': { icon: 'cube', color: COLORS.textSecondary, bg: 'rgba(156, 163, 175, 0.15)' }
};
