const sharedPassword = 'secret_sauce';

export const users = {
  standard: {
    username: 'standard_user',
    password: sharedPassword
  },
  lockedOut: {
    username: 'locked_out_user',
    password: sharedPassword
  },
  problem: {
    username: 'problem_user',
    password: sharedPassword
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: sharedPassword
  },
  error: {
    username: 'error_user',
    password: sharedPassword
  },
  visual: {
    username: 'visual_user',
    password: sharedPassword
  }
} as const;

export const invalidLoginData = {
  wrongPassword: 'wrong_password',
  blankUsername: '',
  blankPassword: ''
} as const;
