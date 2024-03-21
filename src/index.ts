import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli, PelisCollection } from "./models";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const collection = new PelisCollection();
  const controller = new PelisController(collection);

  if (params._.includes("add")) {
    const peli: Peli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
      director: params.director,
      añoDeEstreno: params.añoDeEstreno
    };
    const added = await controller.add(peli);
    console.log("Pelicula agregada:", added);
  } else if (params._.includes("get")) {
    const result = await controller.get({ id: params._[1] });
    console.log("Pelicula obtenida:", result);
  } else if (params._.includes("search")) {
    const searchOptions: any = {};
    if (params.title) searchOptions.title = params.title;
    if (params.tag) searchOptions.tag = params.tag;
    const result = await controller.get({ search: searchOptions });
    console.log("Resultados de búsqueda:", result);
  } else {
    const allPelis = await controller.get();
    console.log("Todas las peliculas:", allPelis);
  }
}

main();
