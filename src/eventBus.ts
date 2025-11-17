class EventBus {
  private events: Record<PropertyKey, Array<(...args: any[]) => void>>;
  constructor() {
    this.events = {};
  }

  on(eventName: string, callback: (...args: any[]) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].includes(callback)) {
      this.events[eventName].push(callback);
    }
  }

  off(eventName: string, callback?: (...args: any[]) => void): void {
    if (!this.events[eventName]) return;
    if (callback) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    } else {
      this.events[eventName] = [];
    }
  }

  emit(eventName: string, ...args: any[]): void {
    if (!this.events[eventName]) return;
    [...this.events[eventName]].forEach(callback => {
      callback(...args);
    });
  }

  once(eventName: string, callback: (...args: any[]) => void): void {
    const wrapper = (...args: any[]) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

export default new EventBus();