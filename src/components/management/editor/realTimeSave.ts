// This module provides the class for real time saving.

class RealTimeSave {
  private cnt = 0;

  public add = () => {
    this.cnt += 1;
  };

  public pop = () => {
    this.cnt -= 1;
  };

  public save = (
    callbackFunc: (...args: any) => void,
    duration: number,
    ...args: any
  ) => {
    this.add();

    setTimeout(() => {
      this.pop();

      if (this.cnt) return;

      callbackFunc(args);
    }, duration);
  };
}

export default RealTimeSave;
