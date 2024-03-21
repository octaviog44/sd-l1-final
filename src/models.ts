import * as jsonfile from "jsonfile";

export interface Peli {
  id: number;
  title: string;
  tags: string[];
  director?: string;
  añoDeEstreno?: number;
}

export type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  private filePath: string;

  constructor(filePath: string = "./pelis.json") {
    this.filePath = filePath;
  }

  async add(peli: Peli): Promise<boolean> {
    const existingPeli = await this.getById(peli.id);
    if (existingPeli) {
      return false;
    } else {
      try {
        const data: Peli[] = await jsonfile.readFile(this.filePath);
        data.push(peli);
        await jsonfile.writeFile(this.filePath, data);
        return true;
      } catch (error) {
        console.error("Error al agregar película:", error);
        return false;
      }
    }
  }

  async getAll(): Promise<Peli[]> {
    try {
      const data: Peli[] = await jsonfile.readFile(this.filePath);
      return data;
    } catch (error) {
      console.error("Error al obtener todas las películas:", error);
      return [];
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    try {
      const data: Peli[] = await jsonfile.readFile(this.filePath);
      return data.find((peli: Peli) => peli.id === id);
    } catch (error) {
      console.error("Error al obtener película por ID:", error);
      return undefined;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    try {
      const data: Peli[] = await jsonfile.readFile(this.filePath);
      let filteredPelis = data;
      if (options.title) {
        filteredPelis = filteredPelis.filter(peli =>
          peli.title.toLowerCase().includes(options.title!.toLowerCase())
        );
      }
      if (options.tag) {
        filteredPelis = filteredPelis.filter(peli =>
          peli.tags.some(tag => tag.toLowerCase().includes(options.tag!.toLowerCase()))
        );
      }
      return filteredPelis;
    } catch (error) {
      console.error("Error al buscar películas:", error);
      return [];
    }
  }
}
export { PelisCollection };
