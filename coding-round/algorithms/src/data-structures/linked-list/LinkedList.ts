import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList<T> {
  private _head: LinkedListNode<T>;

  private _tail: LinkedListNode<T>;

  private _compare: Comparator<T>;

  constructor(comparatorFunction?: (a: T, b: T) => number) {
    this._head = null;
    this._tail = null;

    this._compare = new Comparator<T>(comparatorFunction);
  }

  get head(): LinkedListNode<T> {
    return this._head;
  }

  get tail(): LinkedListNode<T> {
    return this._tail;
  }

  prepend(value: T): LinkedList<T> {
    // Make new node to be a head
    const newNode = new LinkedListNode<T>(value, this._head);
    this._head = newNode;

    // If there is no tail yet, let's make new node a tail
    if (!this._tail) {
      this._tail = newNode;
    }

    return this;
  }

  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<T>(value);

    // If there is no head yet, let's make new node a head
    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
      return this;
    }

    // Attach new node to the end of linked list
    this._tail.next = newNode;
    this._tail = newNode;
    return this;
  }

  delete(value: T): LinkedListNode<T> {
    if (!this._head) {
      return null;
    }

    let deletedNode: LinkedListNode<T> = null;

    // If the head must be deleted then make 2nd node to be a head
    while (this._head && this._compare.equal(this._head.value, value)) {
      deletedNode = this._head;
      this._head = this._head.next;
    }

    let currentNode: LinkedListNode<T> = this._head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one
      while (currentNode.next) {
        if (this._compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted
    if (this._compare.equal(this._tail.value, value)) {
      this._tail = currentNode;
    }

    return deletedNode;
  }

  find(
    { value = undefined, callback = undefined }: { value?: T; callback?: (value: T) => boolean },
  ): LinkedListNode<T> {
    if (!this._head) {
      return null;
    }

    let currentNode: LinkedListNode<T> = this._head;

    while (currentNode) {
      // If callback is specified then try to find node by callback
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value
      if (value !== undefined && this._compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): LinkedListNode<T> {
    if (this._head === this._tail) {
      // There is only one node in linked list
      const deletedTail: LinkedListNode<T> = this._tail;
      this._head = null;
      this._tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...
    const deletedTail: LinkedListNode<T> = this._tail;

    // Rewind to the last node and delete "next" link for the node before the last one
    let currentNode = this._head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this._tail = currentNode;
    return deletedTail;
  }

  deleteHead(): LinkedListNode<T> {
    if (!this._head) {
      return null;
    }

    const deletedHead: LinkedListNode<T> = this._head;

    if (this._head.next) {
      this._head = this._head.next;
    } else {
      this._head = null;
      this._tail = null;
    }

    return deletedHead;
  }

  toArray(): LinkedListNode<T>[] {
    const nodes: LinkedListNode<T>[] = [];

    let currentNode: LinkedListNode<T> = this._head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?: (node: T) => string): string {
    return this
      .toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
