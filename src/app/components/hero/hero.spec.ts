import { selectDailyPhoto } from './hero';

describe('daily hero photo selection', () => {
  const photos = ['one.jpeg', 'two.jpeg', 'three.jpeg', 'four.jpeg'];

  it('keeps the selection stable throughout the same local day', () => {
    const morning = new Date(2026, 6, 31, 8, 0);
    const evening = new Date(2026, 6, 31, 22, 30);

    expect(selectDailyPhoto(photos, morning)).toBe(
      selectDailyPhoto(photos, evening)
    );
  });

  it('changes the photo on consecutive days', () => {
    const firstDay = new Date(2026, 6, 31);
    const nextDay = new Date(2026, 7, 1);

    expect(selectDailyPhoto(photos, firstDay)).not.toBe(
      selectDailyPhoto(photos, nextDay)
    );
  });

  it('returns undefined for an empty collection', () => {
    expect(selectDailyPhoto([], new Date(2026, 6, 31))).toBeUndefined();
  });
});
