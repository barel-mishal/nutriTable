// function that read json file
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { zodIngredientFields, zodIngredientSchema } from "./mohSchema";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const MOH_PATH = path.resolve(
  path.join(__dirname, "..", "..", "public", "ministryOfHealthData")
);

/**
 * names of the files in the ministryOfHealthData folder
 *'Ingredients',
  'IngredientsStruct',
  'Recipes',
  'RecipesStruct',
  'Units',
  'UnitsIngredients',
  'UnitsIngredientsStruct',
  'UnitsStruct'
 */
const mohFiles = fs
  .readdirSync(MOH_PATH)
  .flatMap((file: string) => {
    if (path.extname(file) === ".json") {
      return [[file.replace(".json", ""), path.join(MOH_PATH, file)]];
    } else {
      return [];
    }
  })
  .reduce((acc: any, filePath: any[]) => {
    acc[filePath[0]] = JSON.parse(
      fs.readFileSync(filePath[1], { encoding: "utf-8" })
    );
    return acc;
  }, {});

  export const setIngredientsKeys = new Set();
  function insertToSet(obj: any) {
    for (const key in obj) {
      setIngredientsKeys.add(key);
    }
  }

const mohFilesCleanNull = objectMap(mohFiles, (obj: any, key: any) => {
  const cleaned = obj.result.records.map((record: any) => {
    insertToSet(record)
    const cleanedObj = {};
    const nullebelpaths = [];
    for (const prop in record) {
      if (record[prop] !== null) {
        (cleanedObj as any)[prop] = record[prop];
      } else {
        nullebelpaths.push([key, prop, record._id, record[prop]].join(" > "));
      }
    }
    // console.log('nullebelpaths', nullebelpaths);
    return cleanedObj;
  });

  return cleaned;
});
// console.log('foods', mohFilesCleanNull);



export const parsedFoods = (() => {
  const oldParsedFoods = JSON.parse(
    fs.readFileSync(path.join(MOH_PATH, "Ingredients.json"), {
      encoding: "utf-8",
    })
  ).result.records.reduce((acc: any, food: any) => {
    acc.set(food.smlmitzrach, food);
    return acc;
  }, new Map());
  const unitsMidaMap = new Map(
    mohFilesCleanNull["Units"].map((unit: any) => [Number(unit.smlmida), unit])
  );
  // algoFood
  const unitsSmlMidaMap = mohFilesCleanNull["UnitsIngredients"].reduce(
    (acc: any, unit: any) => {
      if (!acc.has(Number(unit.mmitzrach))) {
        acc.set(Number(unit.mmitzrach), []);
      }
      const getUnit = unitsMidaMap.get(Number(unit.mida)) as any;
      if (!getUnit) {
        console.log(
          "none check in units and unit of ings - unit.mida",
          unit.mida
        );
        return acc;
      }
      const newUnit: UnitsFoods = {
        ...unit,
        shmmida: getUnit.shmmida,
        englishName: getUnit.englishName,
      };
      acc.get(Number(unit.mmitzrach)).push(newUnit);
      return acc;
    },
    new Map()
  );

  const setTarichIdkun: string[] = [];
  const noneUnitsIngredients: any[] = [];
  const parsed = mohFilesCleanNull["Ingredients"].map((food: any, index: number) => {
    let newIng;
    setTarichIdkun.push(food.tarich_idkun);
    if (!unitsSmlMidaMap.has(Number(food.Code))) {
      noneUnitsIngredients.push(food);
      const unit: UnitsFoods = {
        _id: -index,
        mida: "-1",
        mmitzrach: `${food.Code}`,
        shmmida: "100 גרמים",
        englishName: "100 grams",
        mishkal: 100,
      };
      newIng = { ...food, units: [unit] };
    } else {
      newIng = { ...food, units: unitsSmlMidaMap.get(Number(food.Code)) };
    }

    if (oldParsedFoods.has(newIng.smlmitzrach)) {
      newIng = {
        ...newIng,
        algoFood: oldParsedFoods.get(newIng.smlmitzrach).algoFood,
      };
    } else {
      newIng = { ...newIng, algoFood: false };
      console.log("newIng without algo food", newIng);
    }
    return newIng;
  });


  const setFieldsNames = new Set()
  const fieldsIngredients = mohFilesCleanNull["IngredientsStruct"].map((field: any) => {
      // "_id":2,"שם שדה":"smlmitzrach","תיאור":"סמל מצרך","יחידות":"מספר" ,"ערך לדוגמא":"63135030.0","ערכים אפשריים":"","הערות":""
      if (field["שם שדה"] === "code") {
        field["שם שדה"] = "Code"
      } else {
        console.log('field["שם שדה"]', field["שם שדה"], 'משרד הבריאות תיקן את Code מ code')
      }

      setFieldsNames.add(field["שם שדה"])
      const fieldObj = {
        field: field["שם שדה"],
        id: field["_id"],
        title: field["תיאור"],
        unit: field["יחידות"],
        description: field["הערות"],
      }
      return fieldObj;
    }
  );



  console.log(
    "noneUnitsIngredients",
    parsed.slice(0, 10).map((m: any) => m.shmmitzrach),
    noneUnitsIngredients.slice(0, 10).map((m) => m.shmmitzrach),
    noneUnitsIngredients.length,
    parsed.length
  );

  const difference = new Set([...setFieldsNames].filter(x => !setIngredientsKeys.has(x)));
  console.log(
    'fileds names',
    // setFieldsNames,
    // setIngredientsKeys,
    difference,
  )
  


  fs.writeFileSync(
    path.join(MOH_PATH, "data", "noneUnitsIngredients.json"),
    JSON.stringify(
      { data: noneUnitsIngredients, length: noneUnitsIngredients.length },
      null,
      2
    )
    );


  const parsedAgain = zodIngredientSchema.array().safeParse(parsed);
  if (!parsedAgain.success) {
    fs.writeFileSync(
      path.join(MOH_PATH, "data", "parsedFoods.json"),
      JSON.stringify(parsedAgain.error, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(MOH_PATH, "data", "parsedFoods.json"),
      JSON.stringify(parsedAgain.data)
      );
    }

    
  const parsedFields = zodIngredientFields.array().safeParse(fieldsIngredients);
  if (!parsedFields.success) {
    fs.writeFileSync(
      path.join(MOH_PATH, "data", "parsedFields.json"),
      JSON.stringify(parsedFields.error, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(MOH_PATH, "data", "parsedFields.json"),
      JSON.stringify(parsedFields.data)
    );
  }

  // add datetime to the foods object on tarich_idkun try sort by datetime to make sure the latest is first to see if moh is updating the data
  const updatedParsed = parsed.map((food: any) => {
    return {
      name: food.shmmitzrach,
      tarich_idkun: food.tarich_idkun,
      n: new Date(parseDateTime(food.tarich_idkun) as any).valueOf(),
    };
  });
  updatedParsed.sort((a: any, b: any) => {
    return b.n - a.n;
  });
  fs.writeFileSync(
    path.join(MOH_PATH, "data", "sortedFoods.json"),
    JSON.stringify(updatedParsed, null, 2)
  );
  fs.writeFileSync(
    path.join(MOH_PATH, "data", "setTarichIdkun.json"),
    JSON.stringify(setTarichIdkun, null, 2)
  );
  return parsed;
})();
// console.log('parsedFoods', parsedFoods, parsedFoods.length);



export const groupByInputId = (objectArray: Element[], property: string) => {
  return objectArray.reduce((acc: any, obj: any) => {
    const key = obj[property].split(" ")[1];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export function groupBy(objectArray: Element[], property: string) {
  return objectArray.reduce((acc: any, obj: any) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = obj;
    }
    return acc;
  }, {});
}

function objectMap(obj: object, fn: Function) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
  );
}

export function ensureStrings(obj: any) {
  for (const prop in obj) {
    if (typeof obj[prop] !== "string") {
      obj[prop] = obj[prop] ?? "";
    }
  }
  return obj;
}

function parseDateTime(inputString: any) {
  if (!inputString) {
    return null;
  }

  // The expected format is "dd/MM/yyyy HH:mm:ss:SSS"
  const regex =
    /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})(?::(\d{1,5}))?$/;
  const match = inputString.match(regex);

  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are 0-indexed in JavaScript
    const year = parseInt(match[3], 10);
    const hour = parseInt(match[4], 10);
    const minute = parseInt(match[5], 10);
    const second = parseInt(match[6], 10);
    const millisecond = parseInt(match[7], 10);

    return new Date(year, month, day, hour, minute, second, millisecond);
  } else {
    return null;
  }
}

interface UnitsFoods {
  _id: number;
  mida: string;
  mmitzrach: string;
  shmmida: string;
  englishName: string;
  mishkal: number;
}
