/**
 * !=======================================
 * !Estamos llegando a la finalización del curso de Javascript Vanilla
 * !y vamos a realizar un repaso de los temas vistos mediante un ejercicio
 * !integrador conectadonos con Api...
 *
 * !Para eso deberas realizar las siguientes consignas siguiendo las buenas practicas vistas en clase
 * !y utilizando todo el conocimiento aprendido en clases anteriores...
 *
 * * ...
 *
 * !Comencemos.
 * !===========================================
 */


/**
 * *=====================================
 * *            PRIMERA  PARTE
 * *-------------------------------------
 */

/**
 * Vamos a trabajar con PokeApi. La Api de Pokemon.
 * ? 1) Almacenar la base url en una constante.
 */

// todo: todo: Code here
let BASE_URL = "https://pokeapi.co/api/v2/";

/**
 * ? 2) Crear la configuración de un fetch para ejecutar en una consola del navegador.
 */

// todo: Code here
const opts = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * ? 3) Realizar una busqueda de los primeros 20 pokemones
 */

// todo: Code here
const getPokemons = async () => {
  const result = await fetch(`${BASE_URL}/pokemon?limit=20`, opts);

  return result.json();
};

const pokemons = await getPokemons();

const pokemonsNames = []
for (let i = 0; i < 20; i++) {
  pokemonsNames.push(pokemons.results[i].name);
}

console.log("Ejercicio 3");
console.log("Los primero 20 Pokemones son: ",pokemonsNames);

/**
 * ? 4) Buscar al pokemon 'Charmander', armar un objeto literal con las siguientes propiedades de este pokemon:
 *      id, name, tipo y almenos 2 movimientos
 *       Luego mostrar por consola
 */

// todo: Code here
const getCharmander = async () => {
  const result = await fetch(`${BASE_URL}/pokemon/4`, opts);

  return result.json();
};

const pokemon = await getCharmander();

const charmander = {
  id: pokemon.id,
  name: pokemon.name,
  type: pokemon.types[0].type.name,
  moves: [
    pokemon.moves[0].move.name,
    pokemon.moves[1].move.name,
    pokemon.moves[2].move.name,
  ],
};

console.log("Ejercicio 4");
console.log("Charmander: ",charmander);

/**
 * ? 5) Obtener la cadena de evoluciones de Charmander
 */

// todo: Code here
const getPokemonEvolution = async (n) => {
  const result = await fetch(`${BASE_URL}/evolution-chain/${n}`, opts);

  return result.json();
};
const pEvolution = await getPokemonEvolution(2);

const firstEvolution = pEvolution.chain.evolves_to[0].species.name;
const secondEvolution = pEvolution.chain.evolves_to[0].evolves_to[0].species.name;

console.log("Ejercicio 5");
console.log(`Evolucion Pokemon: \nPrimera Evolucion: ${firstEvolution} | Segunda Evolucion: ${secondEvolution}`);

/**
 * *=====================================
 * *            SEGUNDA  PARTE
 * *-------------------------------------
 */

/**
 * ? 6) Indicar cual es el id del tipo psiquico. Armar un objeto con las características que consideres importantes del tipo electrico
 */

// todo: Code here
const getPokemonTypes = async () => {
  const result = await fetch(`${BASE_URL}/type`, opts);

  return result.json();
};

const pTypes = await getPokemonTypes();

const type = "psychic";
const id = pTypes.results.findIndex(p => p.name === type) + 1;
const stringId= `El id del tipo ${type} es: ${id}`;


const getElectricTypes = async () => {
  const result = await fetch(`${BASE_URL}/type/13`, opts);

  return result.json();
};

const pElectricType = await getElectricTypes();

const listNameElectricPokemons = [];
const electricPokemonsNumber = pElectricType.pokemon.length;
for (let i = 0; i < electricPokemonsNumber; i++) {
listNameElectricPokemons.push(pElectricType.pokemon[i].pokemon.name);  
};

const listMovesElectricPokemons = []
const electricMovesNumber = pElectricType.moves.length; 
for (let i = 0; i < electricMovesNumber; i++) {
  listMovesElectricPokemons.push(pElectricType.moves[i].name);
};

const objetElectricType = {
  id: pElectricType.id,
  moves: listMovesElectricPokemons,
  pokemons: listNameElectricPokemons,
  doubleDamageTo: pElectricType.damage_relations.double_damage_to,
  noDamageTo: pElectricType.damage_relations.no_damage_to,
}

console.log("Ejercicio 6");
console.log(stringId);
console.log("Caracteristicas más importantes del Tipo Electrico: ",objetElectricType);

/**
 * ? 7) Indicar cuantos pokemons electricos hay, y crear objetos literales con alguna descripción de 5 de estos pokemons electricos
 */

// todo: Code here

//Trae los primeros 5 pokemones
const objetsElectricPokemons = [];
for (let i = 0; i < 5; i++) {
  const getElectricPokemon = async () => {
    const result = await fetch(pElectricType.pokemon[i].pokemon.url, opts);
  
    return result.json();
  };
  
  ePokemon = await getElectricPokemon();

  const listAbilities = [];
  for (let i = 0; i < ePokemon.abilities.length; i++) {
    listAbilities.push(ePokemon.abilities[i].ability.name)
  } 
  objetsElectricPokemons.push({id: ePokemon.id, name: ePokemon.name, baseExperience: ePokemon.base_experience, abilities: listAbilities} )
};

console.log("Ejercicio 7");
console.log(`Cantidad de Pokemones Electricos: ${electricPokemonsNumber}`);
console.log("Cinco Pokemones Electricos: ",objetsElectricPokemons);

/**
 * ? 8) Que hay de particular en la especie del pokemon Lugia
 */

// todo: Code here
const getSpecies = async (specie) => {
  const result = await fetch(`${BASE_URL}/pokemon-species/${specie}`, opts);

  return result.json();
};

const Lugia = await getSpecies("lugia");
const Mew = await getSpecies("mew");
const Rattata = await getSpecies("rattata");

const mythicalOrLegendary = (pokemon) => {
  if (pokemon.is_legendary === true){
    return console.log(`${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)} es un Pokemon Lengendario`);
  }
  else if (pokemon.is_mythical){
    return console.log(`${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)} es un Pokemon Mítico`);
  }
  else 
    return console.log(`${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)} es un pokemon Ordinario`);
}

console.log("Ejercicio 8")
mythicalOrLegendary(Lugia);
mythicalOrLegendary(Mew);
mythicalOrLegendary(Rattata);