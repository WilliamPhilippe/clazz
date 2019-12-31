const CODE = {
  err: {
    session: {
      VALIDATION_FAILURE: ['ES-001', 'VALIDATION_FAILURE'],
      CREDENTIAL_FAILURE: ['ES-002', 'CREDENTIAL_FAILURE'],
    },
    auth: {
      TOKEN_NOT_PROVIDED: ['EA-001', 'TOKEN_NOT_PROVIDED'],
      TOKEN_INVALID_OR_EXPIRED: ['EA-002', 'TOKEN_INVALID_OR_EXPIRED'],
      PASSWORD_INCORRECT: ['EA-003', 'PASSWORD_INCORRECT'],
    },
    intern: {
      INTERNAL_DB_ERROR: ['EI-001', 'INTERNAL_DB_ERROR'],
    },
  },
  warn: {
    profile: {
      EMAIL_IN_USE: ['WP-001', 'EMAIL_IN_USE'],
      USERNAME_IN_USE: ['WP-002', 'USERNAME_IN_USE'],
    },
  },
};

export default CODE;
