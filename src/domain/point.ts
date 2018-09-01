import { Subject, Observable } from 'rxjs';
import { RandomGenerator } from '../service/random-generator';
import { Delta } from './delta';

export class Point {
  private readonly _whenMoved: Subject<Delta> = new Subject();
  public readonly whenMoved: Observable<Delta> = this._whenMoved.asObservable();
  public readonly id: string = RandomGenerator.identifier();

  constructor(
    public _x: number,
    public _y: number,
  ) { }

  get x(): number { return this._x; }
  get y(): number { return this._y; }

  isEqualTo(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  getDistanceTo(otherPoint: Point): number {
    const deltaX: number = this.x - otherPoint.x;
    const deltaY: number = this.y - otherPoint.y;
    return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
  }

  updateTo(x: number, y: number, notify: boolean = true): void {
    if (notify) {
      const delta: Delta = new Delta(this.x - x, this.y - y);
      this._whenMoved.next(delta);
    }
    this._x = x;
    this._y = y;
  }

  toString(): string {
    return `(${this.x.toFixed(0)}, ${this.y.toFixed(0)})`;
  }
}
