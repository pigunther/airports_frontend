interface PropertyHandlers<T> {
  beforeChange?: { (newValue: T, oldValue: T): boolean | void },
  afterChange?: { (newValue: T, oldValue: T): void }
}

export function PropertyHandler<T>(handlers: PropertyHandlers<T>): PropertyDecorator {

  return (target: any, propertyKey: string | symbol): void => {

    let spoofPropertyKey = `__PropertyHandler_${propertyKey}_value`;

    let propertyDescriptor = {
      configurable: true,
      enumerable: false,
      get: function () {
        return this[spoofPropertyKey];
      },
      set: function (newValue: T) {
        let oldValue = this[spoofPropertyKey];
        if (newValue === oldValue) {
          return;
        }
        if (handlers.beforeChange && handlers.beforeChange.call(this, newValue, oldValue) === false) {
          return;
        }
        this[spoofPropertyKey] = newValue;
        if (handlers.afterChange) {
          handlers.afterChange.call(this, newValue, oldValue);
        }
      }
    };

    Object.defineProperty(target, propertyKey, propertyDescriptor);
  }
}
