export enum SEPA_INSTANT_SUPPORT {
    FULL = 'full', // all accounts support it
    PARTIAL = 'partial', // some accounts support it, some don't, in the same bank
    NONE = 'no', // no accounts support it
    UNKNOWN = 'unknown', // support is unknown, some accounts may support it sometimes, sometimes not 🤷

    FULL_OR_SHARED = 'full-or-shared', // all accounts support it, but some are using generic iban, some individual ones
}

export enum BANK_NETWORK {
    RT1 = 'rt1',
    TIPS = 'tips',
}

type DirectionSupport = {
    inbound: SEPA_INSTANT_SUPPORT,
    outbound: SEPA_INSTANT_SUPPORT,
}

export type Bank = {
    name: string,
    BIC: string,
    country: string, // ISO 3166-1 alpha-2 country code
    support: {
        rt1: DirectionSupport,
        tips?: DirectionSupport,
    } | {
        rt1?: DirectionSupport,
        tips: DirectionSupport,
    },
}
