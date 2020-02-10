/**
 * Tool Script to generate Demo Data from external partial JSON Data
 */

import rechnungDemoData from './bug-free-spork_demo_rechnung.json';
import produktDemoData from './bug-free-spork_demo_produkt.json';
import lieferstatusDemoData from './bug-free-spork_demo_lieferstatus.json';

import { IRechnung, IRechnungsposition, ILieferstatus } from '../shared/shared.module';

/**
 * Copy from rechnung.service.ts
 */
interface IJsonRechnung {
    'Rechnungs-UID': string;
    Rechnungsnummer: string;
    Rechnungsempfänger: string;
    'Betrag Netto': string;
    Datum: string;
}

interface IJsonProdukt {
    'Produkt Name': string;
    'Produkt Betrag Netto': string;
}

interface IJsonLieferstatus {
    'status': string;
}

interface IDemoProdukt {
    'Produkt Name': string;
    'Produkt Betrag Netto': number;
}

interface IGeneratedData {
    /**
     * Updated Rechnung Array matching the generated new RechnungspositionArray
     */
    updatedRechnungArray: IRechnung[];

    /**
     * Generated Rechnungsposition Array
     */
    rechnungspositionArray: IRechnungsposition[];

    /**
     * Generated Lieferstatus Array
     */
    lieferstatusArray: ILieferstatus[];
}

function toDistinctProduktArray(produktArray: IJsonProdukt[]): IDemoProdukt[] {
    const result: IDemoProdukt[] = [];
    const map = new Map();
    for (const produkt of produktArray) {
        if (!map.has(produkt['Produkt Name'])) {
            map.set(produkt['Produkt Name'], true);
            result.push({
                'Produkt Name': produkt['Produkt Name'],
                'Produkt Betrag Netto': parseFloat(produkt['Produkt Betrag Netto'])
            });
        }
    }

    return result;
}

/**
 * Copy from rechnung.service.ts
 */
function reviveRechnungDemoData(importedData: IJsonRechnung[]): IRechnung[] {
    // missing file, empty file, broken JSON, wrong JSON are all be handled by the import
    // anything that makes it to here will crash in the frontend which is acceptable for this project
    return importedData.map((val: IJsonRechnung) => {
        return {
            'Rechnungs-UID': val['Rechnungs-UID'],
            Rechnungsnummer: val.Rechnungsnummer,
            Rechnungsempfänger: val.Rechnungsempfänger,
            'Betrag Netto': parseFloat(val['Betrag Netto']),
            Datum: new Date(val.Datum)
        };
    });
}

/**
 * Generates an Integer between two Numbers
 * @param min inclusive lower end
 * @param max exclusive top end
 */
function randomBetween(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generates a Rechnungposition Array for provided rechnung array
 * @param rechnungArray reference to rechnung array
 */
function generate(rechnungArray: IRechnung[], produktArray: IDemoProdukt[], lieferstatusArray: IJsonLieferstatus[]): IGeneratedData {
    const rechnungspositionArray: IRechnungsposition[] = [];
    // shallow copy of the input param
    // we don't want to change the passed variable by mistake
    const updatedRechnungArray = [...rechnungArray];
    const generatedLieferstatusArray: ILieferstatus[] = [];

    // step through all available Rechnung items
    for (const rechnung of updatedRechnungArray) {
        // Don't populate Rechnung items with miniscule sums
        if (rechnung['Betrag Netto'] < 1) {
            continue;
        }

        // decide how many produkt we link to a rechnung item
        // it will be at least one and up to the amount of provided Produkt
        const numPosition = randomBetween(0, produktArray.length);
        const map = new Map();
        let addedProdukt = 0;
        let rechnungspositionSum = 0;

        while (addedProdukt < numPosition) {
            // get a random produkt index
            const produktIndex = randomBetween(0, produktArray.length);
            const produkt = produktArray[produktIndex];

            // skip adding multiple produkts
            if (map.has(produkt['Produkt Name'])) {
                continue;
            }

            rechnungspositionArray.push({
                'Rechnungs-UID': rechnung['Rechnungs-UID'],
                'Produkt Name': produkt['Produkt Name'],
                'Produkt Betrag Netto': produkt['Produkt Betrag Netto']
            });

            rechnungspositionSum += produkt['Produkt Betrag Netto'];
            addedProdukt++;
            map.set(produkt['Produkt Name'], true);
        }

        // sum of all rechnungsposition items is usually the sum stored inside a rechnung item
        rechnung['Betrag Netto'] = rechnungspositionSum;
    }

    for (const produkt of produktArray) {
        const randomStatusNum = randomBetween(0, lieferstatusArray.length);

        generatedLieferstatusArray.push({
            'Produkt Name': produkt['Produkt Name'],
            Lieferstatus: lieferstatusArray[randomStatusNum].status
        });
    }

    return {
        updatedRechnungArray,
        rechnungspositionArray,
        lieferstatusArray: generatedLieferstatusArray
    };
}

const distinctProduktArray = toDistinctProduktArray(produktDemoData);
const revivedRechnungArray = reviveRechnungDemoData(rechnungDemoData);
const generatedData = generate(revivedRechnungArray, distinctProduktArray, lieferstatusDemoData);

console.log('Combined generated Data as JSON');

// we need to normalize some data types to match previously used demo data
// most importantly we want to store numbers in strings to fixate available precision
const normalizedData = {
    updatedRechnungArray: [],
    rechnungspositionArray: [],
    lieferstatusArray: generatedData.lieferstatusArray
};

normalizedData.updatedRechnungArray = generatedData.updatedRechnungArray.map((val) => {
    return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        Rechnungsnummer: val.Rechnungsnummer,
        Rechnungsempfänger: val.Rechnungsempfänger,
        'Betrag Netto': val['Betrag Netto'].toString(10),
        Datum: val.Datum
    };
});

normalizedData.rechnungspositionArray = generatedData.rechnungspositionArray.map((val) => {
    return {
        'Rechnungs-UID': val['Rechnungs-UID'],
        'Produkt Name': val['Produkt Name'],
        'Produkt Betrag Netto': val['Produkt Betrag Netto'].toString(10)
    };
});

console.log(JSON.stringify(normalizedData, null, 3));
