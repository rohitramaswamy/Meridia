// Modern spacing system for Meridia
export const spacing = {
  // Base spacing unit (4px)
  unit: 4,
  
  // Spacing scale
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 12,  // 12px
  base: 16, // 16px
  lg: 20,  // 20px
  xl: 24,  // 24px
  '2xl': 32, // 32px
  '3xl': 40, // 40px
  '4xl': 48, // 48px
  '5xl': 64, // 64px
  
  // Component-specific spacing
  screen: {
    horizontal: 20,
    vertical: 16,
  },
  
  card: {
    padding: 16,
    margin: 12,
  },
  
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
};

// Border radius for modern, sleek design
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999, // For circular elements
};
