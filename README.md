# OASIS-bank-list

This package allows you to fetch the updated list of banks supported by OASIS as a JSON file, as well as the list of supported countries, and use it in your application.

The list of supported banks are being extracted from the XLSX files found on:

- the [ebaclearing.eu](https://www.ebaclearing.eu/services/rt1/participants/) website for **SEPA RT1**
- the [ecb.europa.eu](https://www.ecb.europa.eu/paym/target/tips/facts/html/index.en.html) website for **SEPA TIPS**

## Update the bank list

Updating the bank list requires Node to be installed.
You can manually update the bank list by calling either:

- the **npm bin** named **oasis-bank-list-update** from your project, if using it as a dependency:
  - `oasis-bank-list-update`
  - `yarn oasis-bank-list-update`
  - `npm oasis-bank-list-update`

- or the **npm script** named **fetch** directly from the package root folder:
  - `yarn fetch`
  - `npm run fetch`

## Use the Bank list and country list in your project

The package export an asynchronous function called `loadBankList` that returns a list of all the supported banks by OASIS as a typed JSON object. You can use it like the following for example:

```typescript
import { Bank, loadBankList } from '@nimiq/oasis-bank-list';

loadBankList().then((bankList: Bank[]) => {
    // Do soemthing with the bank list
});
```

As well as a synchronous `getBankCountryList` function that returns a list of all the supported countries as an **ISO 3166-1 alpha-2 country code** array:

```typescript
import { getBankCountryList } from '@nimiq/oasis-bank-list';

const countries: string[] = getBankCountryList(); // ["FI","DE","NL","IT", ...]
```

## Types

The package also export those typescript types if needed:

```typescript
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

export type Bank = {
    name: string,
    BIC: string,
    country: string, // ISO 3166-1 alpha-2 country code
    support: AtLeastOne<{
        [key in BANK_NETWORK]: {
            inbound: SEPA_INSTANT_SUPPORT,
            outbound: SEPA_INSTANT_SUPPORT,
        }
    }>,
}
```
