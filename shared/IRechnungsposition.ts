/**
 * Shared DTO to transport Rechnungsposition Objects
 * @see {@link https://github.com/Jan-Ka/bug-free-spork/wiki/%60Rechnungposition%60-Model `Rechnungsposition` Model}
 */
export interface IRechnungsposition {
    /**
     * Identifies a parent `Rechnung` Object
     */
    'Rechnungs-UID': string;

    /**
     * name of product
     */
    'Produkt Name': string;

    /**
     * net price of ordered product
     */
    'Produkt Betrag Netto': string;
}
