export default class LinkedListNode<T> {
  constructor(private _value: T, private _next: LinkedListNode<T> = null) {}

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  get next(): LinkedListNode<T> {
    return this._next;
  }

  set next(node: LinkedListNode<T>) {
    this._next = node;
  }

  toString(callback?: (value: T) => string): string {
    return callback ? callback(this._value) : `${this._value}`;
  }
}
