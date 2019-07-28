import addAlerts from '../../../src/utils/alert';

describe('Alert', () => {
  it('adds alerts', () => {
    const data = {
      message: 'Alert!'
    };
    const alerts = addAlerts(data, 'success');

    expect(alerts.length).toBe(1);
    expect(alerts[0].type).toBe('general');
    expect(alerts[0].alertType).toBe('success');
    expect(alerts[0].messages.length).toBe(1);
    expect(alerts[0].messages[0]).toBe(data.message);
  });
});
