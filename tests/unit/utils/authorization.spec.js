import isAuthorized from '../../../src/utils/authorization';

describe('Authorization', () => {
  it('validates authorization between permission groups', () => {
    const permissions = [{
      subject: 'user',
      actions: ['create', 'read', 'update']
    }];

    const requestedPermissionsA = [{
      subject: 'user',
      actions: ['create', 'read', 'update']
    }];

    const requestedPermissionsB = [{
      subject: 'user',
      actions: ['create', 'read', 'update', 'delete']
    }];

    expect(isAuthorized(permissions, requestedPermissionsA)).toBe(true);
    expect(isAuthorized(permissions, requestedPermissionsB)).toBe(false);
  });
});
