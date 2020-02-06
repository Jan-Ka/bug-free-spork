/**
 * Shared DTO to transport Rechnung Objects
 * @see {@link https://github.com/Jan-Ka/bug-free-spork/issues/16 Add `Rechnung` shared interface}
 */
export interface IRechnung {
    /**
     * Identifies an `Rechnung` Object
     */
    'Rechnungs-UID': string;

    /**
     * Sequential number
     */
    Rechnungsnummer: string;

    /**
     * Recipient of `Rechnung` Objects
     */
    Rechnungsempfänger: string;

    /**
     * net price; Sum of all `Rechnungspositionen\Product Betrag Netto`
     */
    'Betrag Netto': number;

    /**
     * invoicing date
     */
    'Datum': Date;
}
