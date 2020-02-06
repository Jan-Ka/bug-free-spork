/**
 * Shared DTO to transport Rechnung Objects
 * @see {@link https://github.com/Jan-Ka/bug-free-spork/issues/16 Add `Rechnung` shared interface}
 */
export interface IRechnung {
    'Rechnungs-UID': string;
    Rechnungsnummer: string;
    Rechnungsempfänger: string;
    'Betrag Netto': number;
    'Datum': Date;
}
