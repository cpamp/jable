import { IEnumerable } from "./IEnumerable";
import { IEqualityComparer } from "./IEqualityComperer";

export abstract class Enumerable {
    private static isFunction(func: any) {
        return typeof func === 'function';
    }

    private static equalityComparer<T>(itemA: T, itemB: T): boolean {
        return itemA === itemB;
    }

    private static ArgumentNullException() {
        return new Error('ArgumentNullException');
    }

    private static ArgumentOutOfRangeException() {
        return new Error('ArgumentOutOfRangeException');
    }

    private static ArgumentInvalidException() {
        return new Error('ArgumentInvalidException');
    }

    private static InvalidOperationException() {
        return new Error('InvalidOperationException');
    }

    public static Aggregate<T>(base: IEnumerable<T> | Array<T>, func: (working: T, next: T) => T): T;
    public static Aggregate<T, TResult>(base: IEnumerable<T> | Array<T>, func: (working: TResult, next: T) => TResult, seed: TResult): TResult;
    public static Aggregate<T>(base: IEnumerable<T> | Array<T>, func: any, seed?: any) {
        if (base == null || func == null || !this.isFunction(func)) throw this.ArgumentNullException();
        base = base instanceof Array ? base : base.ToArray();
        if (base.length === 0) throw this.InvalidOperationException();

        let current;
        let start = 0;
        if (seed == null) {
            current = seed;
        } else {
            current = base[start++];
        }

        for (let i = start; i < base.length - 1; i++) {
            current = func(current, base[i]);
        }
        return current;
    }

    public static All<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): boolean {
        if (base == null || func == null || !this.isFunction(func)) throw this.ArgumentNullException();

        for (let item of base) {
            if (func(item) === false) return false;
        }
        return true;
    }

    public static Any<T>(base: IEnumerable<T> | Array<T>): boolean;
    public static Any<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): boolean;
    public static Any<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        if (base == null) throw this.ArgumentNullException();

        if (func == null) {
            if (base.length > 0) return true;
            else return false;
        }
        
        for (let item of base) {
            if (func(item) === true) return true;
        }
        return false;
    }

    public static Average<T>(base: IEnumerable<T> | Array<T>): number;
    public static Average<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Average<T>(base: IEnumerable<T> | Array<T>,func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null || !this.isFunction(func)) func = (item: T) => item;
        //base = this.getArray(base);

        let total = 0;
        for (let item of base) {
            total += func(item);
        }
        return total / base.length;
    }

    public static Concat<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | Array<T>): Array<T> {
        if (collection == null || base == null) throw this.ArgumentNullException();
        base = this.ToArray(base);
        collection = this.ToArray(collection);
        return base.concat(collection);
    }

    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: T): boolean;
    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: T, equalityComparer: IEqualityComparer<T>): boolean;
    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: any, equalityComparer?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        for (let baseItem of base) {
            if (equalityComparer(baseItem, item)) return true;
        }
        return false;
    }

    public static Count<T>(base: IEnumerable<T> | Array<T>): number;
    public static Count<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): number;
    public static Count<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        if (func == null) return base.length;
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();

        let count = 0;
        for (let item of base) {
            if (func(item) === true) count++;
        }
        return count;
    }

    public static Distinct<T>(base: IEnumerable<T> | Array<T>): Array<T>;
    public static Distinct<T>(base: IEnumerable<T> | Array<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Distinct<T>(base: IEnumerable<T> | Array<T>, equalityComparer?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        let result: Array<T> = [];
        for (let item of base) {
            let found = false;
            for (let dist of result) {
                if (equalityComparer(item, dist)) {
                    found = true;
                    break;
                }
            }
            if (found === false) result.push(item);
        }
        return result;
    }

    public static ElementAt<T>(base: IEnumerable<T> | Array<T>, index: number): T {
        if (base == null) throw this.ArgumentNullException();
        if (base instanceof Array) return base[index];

        let count = 0;
        for (let item of base) {
            if (count === index) return item;
        }
        throw this.ArgumentOutOfRangeException();
    }

    public static ElementAtOrDefault<T>(base: IEnumerable<T> | Array<T>, index: number): T | null {
        if (base == null) throw this.ArgumentNullException();

        try {
            return this.ElementAt(base, index);
        } catch(e) {
            return null;
        }
    }

    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): Array<T>;
    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        if (base == null || collection == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        let result: Array<T> = [];
        for (let baseItem of base) {
            let found = false;
            for (let colItem of collection) {
                if (equalityComparer(baseItem, colItem)) {
                    found = true;
                    break;
                }
            }
            if (found === false) result.push(baseItem);
        }
        return result;
    }
    
    public static First<T>(base: IEnumerable<T> | Array<T>): T;
    public static First<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static First<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null) {
            if (base instanceof Array) return base[0];
            return base.ElementAt(0);
        }
        
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();
        for (let item of base) {
            if (func(item) === true) return item;
        }
        throw this.InvalidOperationException();
    }

    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>): T;
    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null) {
            if (base instanceof Array) return base[0];
            return base.ElementAtOrDefault(0);
        }

        if (!this.isFunction(func)) throw this.ArgumentInvalidException();
        try { return this.First(base, func); }
        catch(e) { return null; }
    }
    public static GroupBy<T, TResult>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[]): IEnumerable<TResult>;
    public static GroupBy<T, TResult>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): IEnumerable<TResult>;
    public static GroupBy(keys: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | T[]): Array<T>;
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | T[], equalityComparer: (itemA: T, itemB: T) => boolean): Array<T>;
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Join<T>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[]): Array<T>;
    public static Join<T>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): Array<T>;
    public static Join<T>(base: IEnumerable<T> | Array<T>, keys: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Last<T>(base: IEnumerable<T> | Array<T>): T;
    public static Last<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static Last<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static LastOrDefault(): T;
    public static LastOrDefault(func: (item: T) => boolean): T;
    public static LastOrDefault(func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Max<T>(base: IEnumerable<T> | Array<T>): number;
    public static Max<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Max<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Min<T>(base: IEnumerable<T> | Array<T>): number;
    public static Min<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Min<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static OfType<T>(base: IEnumerable<T> | Array<T>, type: Function): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>): Array<T>;
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => ): Array<T>;
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Reverse<T>(base: IEnumerable<T> | Array<T>): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static Select<T, TResult>(base: IEnumerable<T> | Array<T>, func: (item: T) => TResult): IEnumerable<TResult> {
        throw new Error("Method not implemented.");
    }
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): boolean;
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): boolean;
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Single<T>(base: IEnumerable<T> | Array<T>): T {
        throw new Error("Method not implemented.");
    }
    public static SingleOrDefault<T>(base: IEnumerable<T> | Array<T>): T {
        throw new Error("Method not implemented.");
    }
    public static Skip<T>(base: IEnumerable<T> | Array<T>, count: number): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static SkipWhile<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static Sum<T>(base: IEnumerable<T> | Array<T>): number;
    public static Sum<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Sum<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Take<T>(base: IEnumerable<T> | Array<T>, count: number): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static TakeWhile<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static ToArray<T>(base: IEnumerable<T> | Array<T>): Array<T> {
        let result: Array<T> = [];
        for (let item of base) result.push(item);
        return result;
    }
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): Array<T>;
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): Array<T>;
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: (item: T, index: number) => boolean): Array<T>;
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: any) {
        throw new Error("Method not implemented.");
    }
    public static Zip<T, TCollection, TResult>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<TCollection>, func: (itemA: T, itemB: TCollection) => TResult): TResult {
        throw new Error("Method not implemented.");
    }

}