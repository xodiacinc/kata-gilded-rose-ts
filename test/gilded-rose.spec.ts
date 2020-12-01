import {Item, GildedRose} from '../app/gilded-rose';
import {runGoldenMaster} from "./golden-master-text-test";
import {readFileSync} from "fs";

describe('Gilded Rose', function () {

    const STANDARD = 'Standard Item';
    const LEGENDARY = 'Sulfuras, Hand of Ragnaros';
    const CHEESE = 'Aged Brie';
    const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
    const CONJURED = 'Conjured Mana Cake';

    it('should return same result as golden master', () => {
        let goldenMaster = readFileSync('test/golden-master.original', 'utf8');
        expect(runGoldenMaster()).toEqual(goldenMaster);
    });

    it('should age all items in the list', () => {
        let rose = new GildedRose([new Item(STANDARD, 5, 10), new Item(STANDARD, 3, 15)]);
        let items = rose.updateQuality();
        expect(items[0].sellIn).toEqual(4);
        expect(items[1].sellIn).toEqual(2);
    });

    describe('Standard Item', () => {
        it('should age', () => {
            let rose = new GildedRose([new Item(STANDARD, 5, 10)]);
            expect(rose.updateQuality()[0].sellIn).toEqual(4);
        });

        it('should reduce quality with aging', () => {
            let rose = new GildedRose([new Item(STANDARD, 5, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(9);
        });

        it('should reduce quality to minimum 0', () => {
            let rose = new GildedRose([new Item(STANDARD, 5, 0)]);
            expect(rose.updateQuality()[0].quality).toEqual(0);
        });

        it('should reduce quality twice as fast when expired', () => {
            let rose = new GildedRose([new Item(STANDARD, 0, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(8);
        });
    });

    describe('Legendary Item', () => {
        it('should not age', () => {
            let rose = new GildedRose([new Item(LEGENDARY, 5, 10)]);
            expect(rose.updateQuality()[0].sellIn).toEqual(5);
        });

        it('should not change quality', () => {
            let rose = new GildedRose([new Item(LEGENDARY, 5, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(10);
        });
    });

    describe('Cheese', () => {
        it('should age', () => {
            let rose = new GildedRose([new Item(CHEESE, 5, 10)]);
            expect(rose.updateQuality()[0].sellIn).toEqual(4);
        });

        it('should increase quality with aging', () => {
            let rose = new GildedRose([new Item(CHEESE, 5, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(11);
        });

        it('should increase quality twice as fast when expired', () => {
            let rose = new GildedRose([new Item(CHEESE, 0, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(12);
        });

        it('should increase quality to maximum 50', () => {
            let rose = new GildedRose([new Item(CHEESE, 0, 50)]);
            expect(rose.updateQuality()[0].quality).toEqual(50);
        });
    });

    describe('Backstage Pass', () => {
        it('should age', () => {
            let rose = new GildedRose([new Item(BACKSTAGE, 5, 10)]);
            expect(rose.updateQuality()[0].sellIn).toEqual(4);
        });

        it('should increase quality with aging', () => {
            let rose = new GildedRose([new Item(BACKSTAGE, 11, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(11);
        });

        it('should increase quality twice as fast when expiring in 10 days or less', () => {
            let rose = new GildedRose([new Item(BACKSTAGE, 10, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(12);
        });

        it('should increase quality three times as fast when expiring in 5 days or less', () => {
            let rose = new GildedRose([new Item(BACKSTAGE, 5, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(13);
        });

        it('should increase quality to maximum 50', () => {
            let rose = new GildedRose([new Item(BACKSTAGE, 5, 50)]);
            expect(rose.updateQuality()[0].quality).toEqual(50);
        });

        it('should set quality to 0 when expired', () => {
            let rose = new GildedRose([new Item(BACKSTAGE, 0, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(0);
        });
    });

    xdescribe('Conjured Item', () => {
        it('should age', () => {
            let rose = new GildedRose([new Item(CONJURED, 5, 10)]);
            expect(rose.updateQuality()[0].sellIn).toEqual(4);
        });

        it('should reduce quality twice as fast with aging', () => {
            let rose = new GildedRose([new Item(CONJURED, 5, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(8);
        });

        it('should reduce quality to minimum 0', () => {
            let rose = new GildedRose([new Item(CONJURED, 5, 0)]);
            expect(rose.updateQuality()[0].quality).toEqual(0);
        });

        it('should reduce quality twice as fast when expired', () => {
            let rose = new GildedRose([new Item(CONJURED, 0, 10)]);
            expect(rose.updateQuality()[0].quality).toEqual(6);
        });
    });

});
