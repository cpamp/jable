import { IEqualityComparer } from "./IEqualityComperer";
import { IOrder } from "./IOrder";

export interface IEnumerable<T = {}> extends Iterable<T> {
    length: number;
    Aggregate(func: (working: T, next: T) => T): T;
    Aggregate<TResult>(func: (working: TResult, next: T) => TResult, seed: TResult): TResult;
    All(func: (item: T) => boolean): boolean;
    Any(): boolean;
    Any(func: (item: T) => boolean): boolean;
    Average(): number;
    Average(func: (item: T) => number): number;
    Concat(collection: IEnumerable<T> | Array<T>): IEnumerable<T>;
    Contains(item: T): boolean;
    Contains(item: T, equalityComparer: IEqualityComparer<T>): boolean;
    Count(): number;
    Count(func: (item: T) => boolean): number;
    Distinct(): IEnumerable<T>;
    Distinct(equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    ElementAt(index: number): T;
    ElementAtOrDefault(index: number): T | null;
    Except(collection: IEnumerable<T> | Array<T>): IEnumerable<T>;
    Except(collection: IEnumerable<T> | Array<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    First(): T;
    First(func: (item: T) => boolean): T;
    FirstOrDefault(): T | null;
    FirstOrDefault(func: (item: T) => boolean): T | null;
    GroupBy<TResult>(): IEnumerable<TResult>;
    GroupBy<TResult>(groupFunc: (item: T) => TResult, equalityComparer: IEqualityComparer<T>): IEnumerable<TResult>;
    Intersect(collection: IEnumerable<T> | Array<T>): IEnumerable<T>;
    Intersect(collection: IEnumerable<T> | Array<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    Join<TCollection, TResult>(collection: IEnumerable<T> | Array<T>, resultFactory: (itemA: T, itemB: TCollection) => TResult): IEnumerable<TResult>;
    Join<TCollection, TResult>(collection: IEnumerable<T> | Array<T>, resultFactory: (itemA: T, itemB: TCollection) => TResult, equalityComparer: IEqualityComparer<T, TCollection>): IEnumerable<TResult>;
    Last(): T;
    Last(func: (item: T) => boolean): T;
    LastOrDefault(): T | null;
    LastOrDefault(func: (item: T) => boolean): T | null;
    Max(): number;
    Max(func: (item: T) => number): number;
    Min(): number;
    Min(func: (item: T) => number): number;
    OfType(type: Function): IEnumerable<T>;
    OrderBy(): IEnumerable<T>;
    OrderBy(func: IOrder<T>): IEnumerable<T>;
    OrderByDescending(): IEnumerable<T>;
    OrderByDescending(func: IOrder<T>): IEnumerable<T>;
    Reverse(): IEnumerable<T>;
    Select<TResult>(func: (item: T) => TResult): IEnumerable<TResult>;
    Equals(collection: IEnumerable<T>): boolean;
    Equals(collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): boolean;
    Single(): T;
    SingleOrDefault(): T;
    Skip(count: number): IEnumerable<T>;
    SkipWhile(func: (item: T) => boolean): IEnumerable<T>;
    Sum(): number;
    Sum(func: (item: T) => number): number;
    Take(count: number): IEnumerable<T>;
    TakeWhile(func: (item: T) => boolean): IEnumerable<T>;
    ToArray(): Array<T>;
    Union(collection: IEnumerable<T>): IEnumerable<T>;
    Union(collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    Where(func: (item: T) => boolean): IEnumerable<T>;
    Where(func: (item: T, index: number) => boolean): IEnumerable<T>;
    Zip<TCollection, TResult>(collection: IEnumerable<TCollection>, func: (itemA: T, itemB: TCollection) => TResult): Array<TResult>;
}