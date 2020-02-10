/**
 * Shared DTO to apply filters to the `Rechnung` Data Source
 * @see {@link https://github.com/Jan-Ka/bug-free-spork/issues/20 Add `RechnungFilter` shared interface}
 */
export interface IRechnungFilter {
    /**
     * how many `Rechnung` DTOs can be sent to frontend
     */
    chunkSize: number;

    /**
     * advancing in the available Data Source; multiplicator of chunkSize
     * If not enough data is available, will return up to `chunkSize` of data from the end of the data
     */
    chunkOffset: number;
}
