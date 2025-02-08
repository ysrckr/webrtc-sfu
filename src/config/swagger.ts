export class Swagger {
  private _title: string;
  private _version: number;

  public constructor(title: string, version?: number) {
    this._title = title;
    this._version = version || 1;
  }

  public get config() {
    return {
      documentation: {
        info: {
          title: this._title,
          version: String(this._version),
        },
      },
    };
  }
}
