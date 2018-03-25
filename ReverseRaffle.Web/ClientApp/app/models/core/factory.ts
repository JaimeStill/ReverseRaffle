export class Factory<T> {
    constructor(private type: new () => T) { }
  
    create(): T {
      return new this.type();
    }
  }