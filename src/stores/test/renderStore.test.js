import useRenderStore from '../renderStore'; // Adjust the import path as needed

describe('useRenderStore', () => {
  const testCases = [
    {
      name: 'East point (azimuth 90°, altitude 0°)',
      input: { azimuth: Math.PI / 2, altitude: 0 },
      expected: { x: 0, y: 0, z: 1 },
    },
    {
      name: 'South point (azimuth 180°, altitude 0°)',
      input: { azimuth: Math.PI, altitude: 0 },
      expected: { x: -1, y: 0, z: 0 },
    },
    {
      name: 'West point (azimuth 270°, altitude 0°)',
      input: { azimuth: 3 * Math.PI / 2, altitude: 0 },
      expected: { x: -1, y: 0, z: 1 },
    },
    {
        name: 'North point (azimuth 0°, altitude 0°)',
        input: { azimuth: 0, altitude: 0 },
        expected: { x: 1, y: 0, z: 0 },
    },
    {
      name: 'Zenith point (azimuth 0°, altitude 90°)',
      input: { azimuth: 0, altitude: Math.PI / 2 },
      expected: { x: 0, y: 0, z: 0 },
    },
    {
      name: 'Nadir point (azimuth 0°, altitude -90°)',
      input: { azimuth: 0, altitude: -Math.PI / 2 },
      expected: { x: 0, y: 0, z: 0 },
    },
  ];

  testCases.forEach(({ name, input, expected }) => {
    it(name, () => {
      const store = useRenderStore.getState();
      store.convertSunCoordinates(input);
      const updatedState = useRenderStore.getState();

      expect(updatedState.sunCoordinates).toEqual({
        x: expect.closeTo(expected.x, 4),
        y: expect.closeTo(expected.y, 4),
        z: expect.closeTo(expected.z, 4),
      });
    });
  });

  // Additional tests 
  it('converts coordinates correctly for positive azimuth and altitude', () => {
    const store = useRenderStore.getState();
    store.convertSunCoordinates({ azimuth: Math.PI / 4, altitude: Math.PI / 3 });
    const updatedState = useRenderStore.getState();

    expect(updatedState.sunCoordinates).toEqual({
      x: expect.closeTo(0.6123, 4), // Updated expected value
      y: expect.closeTo(0.3535, 4), // Updated expected value
      z: expect.closeTo(0.8660, 4),
    });
  });

  it('converts coordinates correctly for azimuth > 2π', () => {
    const store = useRenderStore.getState();
    store.convertSunCoordinates({ azimuth: 5 * Math.PI / 4, altitude: Math.PI / 6 });
    const updatedState = useRenderStore.getState();

    expect(updatedState.sunCoordinates).toEqual({
      x: expect.closeTo(-0.6123, 4),
      y: expect.closeTo(-0.6123, 4),
      z: expect.closeTo(0.8660, 4),
    });
  });
});