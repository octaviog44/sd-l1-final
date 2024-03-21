import { Peli, PelisCollection } from "./models";
import { SearchOptions } from "./models";

type Options = {
  id?: number;
  search?: SearchOptions;
};

class PelisController {
  private collection: PelisCollection;

  constructor(collection?: PelisCollection) {
    this.collection = collection || new PelisCollection();
  }

  async get(options?: Options): Promise<any> {
    if (!options) {
      const allPelis = await this.collection.getAll();
      return { title: "Todas las películas", pelis: allPelis };
    } else if (options.id !== undefined) {
      const peli = await this.collection.getById(options.id);
      return peli ? peli : null;
    } else if (options.search) {
      const pelis = await this.collection.search(options.search);
      return { title: "Multiple Películas", pelis: pelis || [] };
    } else {
      return null;
    }
  }


  async add(peli: Peli | Peli[]): Promise<boolean> {
    if (Array.isArray(peli)) {
      // Asegurarse de que todos los elementos sean del tipo Peli
      return (await Promise.all(peli.map(p => this.collection.add(p)))).every(result => result === true);
    } else {
      // Verificar que el objeto pasado sea del tipo Peli
      if (this.isValidPeli(peli)) {
        return await this.collection.add(peli);
      } else {
        return false;
      }
    }
  }

  // Método para validar si un objeto es del tipo Peli
  private isValidPeli(peli: any): peli is Peli {
    return (
      typeof peli === "object" &&
      typeof peli.id === "number" &&
      typeof peli.title === "string" &&
      Array.isArray(peli.tags) &&
      typeof peli.director === "string" &&
      typeof peli.añoDeEstreno === "number"
    );
  }
}

export { PelisController };
