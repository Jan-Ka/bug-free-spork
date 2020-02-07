/**
 * Shared DTO for Lieferstatus Objects
 * @see {@link https://github.com/Jan-Ka/bug-free-spork/issues/34 Add `Lieferstatus` shared interface}
 */
export interface ILieferstatus {
    /**
     * Identifies a product
     */
    'Produkt Name': string;

    /**
     * Availability status message
     */
    'Lieferstatus': string;
}
