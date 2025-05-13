import config from "../config/config";

export default class CredentialCache {
  private store: Map<string, number>;
  private elementTTL: number = config.CACHE_ELEMENT_TTL;

  constructor() {
    this.store = new Map();
  }

  add(username: string): void {
    const expiresAt = Date.now() + this.elementTTL;
    this.store.set(username, expiresAt);

    setTimeout(() => {
      const expiry = this.store.get(username);
      if (expiry && expiry <= Date.now()) {
        this.store.delete(username);
      }
    }, this.elementTTL);
  }

  has(username: string): boolean {
    const expiresAt = this.store.get(username);
    if (!expiresAt) return false;

    if (Date.now() > expiresAt) {
      this.store.delete(username);
      return false;
    }

    return true;
  }

  remove(username: string): void {
    this.store.delete(username);
  }

  clear(): void {
    this.store.clear();
  }
}
