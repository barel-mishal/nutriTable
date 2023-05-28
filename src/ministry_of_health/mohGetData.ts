import axios from "axios";
import { existsSync, mkdirSync } from "fs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const newNameDir = "ministryOfHealthData";

const mohPath = path.resolve(
  path.join(__dirname, "..", "..", "public", newNameDir)
);

// TODO: לכתוב קוד שיורץ ויכניס את המידע לשרת של האפליקציה

if (!existsSync(mohPath)) {
  mkdirSync(mohPath);
}
const NEW_LINKS = [
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=b9125bf7-cf1b-4faa-bf5c-43aa04fe4210",
    name: "IngredientsStruct",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2",
    name: "Ingredients",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=98fb46fe-e8de-4067-94d2-b0a8ea4269da",
    name: "Units",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=755d28c0-75f7-40e1-9c8c-ecdd106f9b2d",
    name: "UnitsIngredients",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=5c726506-5c1e-43a7-94f7-24845dbde9c3",
    name: "Recipes",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=22612122-51ef-4b0d-81ba-b4c7a8720fda",
    name: "RecipesStruct",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=7b9e9ae3-1082-460e-a3e8-3d0ff2eb5dc6",
    name: "UnitsIngredientsStruct",
  },
  {
    link: "https://data.gov.il/api/3/action/datastore_search?resource_id=2c78a1d6-a949-47a5-934e-bfe4a0fbb665",
    name: "UnitsStruct",
  },
];
export const unitEnglish = `unit
A very small unit
small unit
Medium unit
Large unit
A very large unit
Small pouch
Medium pouch
glass
measuring cup
cup
A mug for soup
A glass of wine
a cup of dice
A cup of slices
Chopped cup
crushed glass
A glass of wine
tablespoon
flat spoon
A heaping spoonful
Ice cream scoop
a small ladle
a large ladle
measuring spoon
teaspoon
flat spoon
heaping teaspoon
slice
thin slice
Medium slice
slab
Goblet
A very small cup
small cup
Medium cup
big cup
Cup shared
grams
dose
A small portion
Medium portion
A big dish
packing
package
packet
bag
cardboard
Individual packaging
box
tube
jar
A small carton
A large carton
Small package/bag
Great packaging
small plate
Medium plate
big plate
soup plate
A bowl of soup
A bowl of veal
disposable bowl
Bottle
A small bottle
Medium bottle
big bottle
tin
A small can
A big can
stalk
strip/stick
Increased
circle/ball
segment
triangular
square/cube
finger
Galilee
tablet
tooth
flower
thick stick
thin stick
head
Drop
cob
handful
snack
Mini snack
A small snack
Medium snack
A big snack
bun
candy
Pita
Homemade pita bread
grapefruit
A small fillet
Medium fillet
A large fillet
small boneless
Medium boneless
large boneless
whole small
whole medium
whole big
kilogram`.split("\n");

for (const i in NEW_LINKS) {
  const { link, name } = NEW_LINKS[i];
  axios.get(link).then((response) => {
    const { total } = response.data.result;

    axios.get(`${link}&limit=${total}`).then((response) => {
      const data = response.data;
      if (name === "Units") {
        fs.writeFileSync(
          path.join(mohPath, `${name}.json`),
          JSON.stringify(data)
        );
      } else {
        fs.writeFileSync(
          path.join(mohPath, `${name}.json`),
          JSON.stringify(data)
        );
      }
    });
  });
}
