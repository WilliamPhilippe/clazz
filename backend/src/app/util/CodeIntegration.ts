const CODE = {
  err: {
    session: {
      VALIDATION_FAILURE: ['ES-001', 'VALIDATION FAILURE'],
      CREDENTIAL_FAILURE: ['ES-002', 'CREDENTIAL_FAILURE'],
    },
    auth: {
      TOKEN_NOT_PROVIDED: ['EA-001', 'TOKEN NOT PROVIDED'],
      TOKEN_INVALID_OR_EXPIRED: ['EA-002', 'TOKEN INVALID OR EXPIRED'],
    },
  },
  warn: {
    profile: {
      EMAIL_IN_USE: ['WP-001', 'EMAIL IN USE'],
      USERNAME_IN_USE: ['WP-002', 'USERNAME IN USE'],
    },
  },
};

export default CODE;
