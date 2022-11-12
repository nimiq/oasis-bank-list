import supportedCountries from './generated/supportedCountries.json';
import { Bank } from './types';

export async function loadBankList() {
    return (await import('./generated/bankList.json')).default as Bank[];
}

export function getBankCountryList() {
    return supportedCountries as string[];
}

export * from './types'
