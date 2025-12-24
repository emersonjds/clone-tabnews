export class Database {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.connected = false;
  }
}