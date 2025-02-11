import LOCALES from './LOCALES';

export const ROOT = {
  DEFAULT: {
    LOCALE: LOCALES.FA
  },
  VIDEO_MIN_PUBLISH_DATE: 1920,
  LINKEDIN:
    'https://www.linkedin.com/in/nobino-vod-3551032b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  INSTAGRAM: 'https://www.instagram.com/nobino.ir?igsh=c2tvOHJqN3hrc3V3',
  SAMANDEHI: 'https://samandehi.ir/',
  ENAMAD: 'https://trustseal.enamad.ir/?id=202419&Code=jbLnZm9oI1nCeACW4XUa',
  SAPRA: 'https://sapra.ir/',
  SATRA: 'https://satra.ir/',
  PHONE_LANDLINE: '021-43431000',
  PHONE_CALL: '+982143431000',
  PHONE_LOCAL: '442',
  SMS_NUMBER: '5000402525',
  EMAIL: 'support@nobino.ir',
  COOKIE_LIFETIME: {
    USER_TOKEN: 7 * 24 * 60 * 60,
    VOLUME_TOKEN: 24 * 60 * 60
  },
  FEATURES: {
    /**
     * If ad limit time is true the ad time is limit
     */
    IS_AD_LIMIT_TIME_ENABLED: false,

    /**
     * Ad time in second
     */
    AD_LIMIT_TIME: 10,

    /**
     * - This feature flag determines whether to show ISP usage(with/without discount)
     *     on the `SingleVOD` and `Player` pages or not.
     * - If we have a contract with an ISP for a discount, set this to `true`. Otherwise, leave it `false`.
     */
    IS_ISP_DISCOUNT_CHECK_ENABLED: true
  }
};
