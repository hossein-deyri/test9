import { ROOT } from './ROOT';

type Language = 'FA' | 'EN' | typeof ROOT.DEFAULT.LOCALE;

const LOCALES = {
  FA: 'FA' as const,
  EN: 'EN' as const,
  get DEFAULT_LOCALE(): Language {
    return ROOT.DEFAULT.LOCALE;
  }
};

export default LOCALES;
export type { Language };
