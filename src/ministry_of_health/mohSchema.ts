import { z } from "zod";
import { zodConvertibleNumericType, zodConvertibleDateType } from "~/utiles/zodUtiles";

export const zodUnitsSchema = z.object({
    "_id":z.number(),
    "mmitzrach":z.number().or(z.string()),
    "mida":z.string(),
    "mishkal":zodConvertibleNumericType,
    "shmmida":z.string(),
});

export const zodIngredientSchema = z.object({
    "_id":z.number(),
    "Code":z.number(),
    "smlmitzrach":z.number(),
    "shmmitzrach":z.string(),
    "makor":z.number().optional().default(-1),
    "protein":zodConvertibleNumericType,
    "total_fat":zodConvertibleNumericType,
    "carbohydrates":zodConvertibleNumericType.optional().default(-1),
    "food_energy":zodConvertibleNumericType,
    "alcohol":zodConvertibleNumericType.optional().default(-1),
    "moisture":zodConvertibleNumericType.optional().default(-1),
    "total_dietary_fiber":zodConvertibleNumericType.optional().default(-1),
    "calcium":zodConvertibleNumericType.optional().default(-1),
    "iron":zodConvertibleNumericType.optional().default(-1),
    "magnesium":zodConvertibleNumericType.optional().default(-1),
    "phosphorus":zodConvertibleNumericType.optional().default(-1),
    "potassium":zodConvertibleNumericType.optional().default(-1),
    "sodium":zodConvertibleNumericType.optional().default(-1),
    "zinc":zodConvertibleNumericType.optional().default(-1),
    "copper":zodConvertibleNumericType.optional().default(-1),
    "vitamin_a_iu":zodConvertibleNumericType.optional().default(-1),
    "carotene":zodConvertibleNumericType.optional().default(-1),
    "vitamin_e":zodConvertibleNumericType.optional().default(-1),
    "vitamin_c":zodConvertibleNumericType.optional().default(-1),
    "thiamin":zodConvertibleNumericType.optional().default(-1),
    "riboflavin":zodConvertibleNumericType.optional().default(-1),
    "niacin":zodConvertibleNumericType.optional().default(-1),
    "vitamin_b6":zodConvertibleNumericType.optional().default(-1),
    "folate":zodConvertibleNumericType.optional().default(-1),
    "folate_dfe":zodConvertibleNumericType.optional().default(-1),
    "vitamin_b12":zodConvertibleNumericType.optional().default(-1),
    "cholesterol":zodConvertibleNumericType.optional().default(-1),
    "saturated_fat":zodConvertibleNumericType.optional().default(-1),
    "butyric":zodConvertibleNumericType.optional().default(-1),
    "caproic":zodConvertibleNumericType.optional().default(-1),
    "caprylic":zodConvertibleNumericType.optional().default(-1),
    "capric":zodConvertibleNumericType.optional().default(-1),
    "lauric":zodConvertibleNumericType.optional().default(-1),
    "myristic":zodConvertibleNumericType.optional().default(-1),
    "palmitic":zodConvertibleNumericType.optional().default(-1),
    "stearic":zodConvertibleNumericType.optional().default(-1),
    "oleic":zodConvertibleNumericType.optional().default(-1),
    "linoleic":zodConvertibleNumericType.optional().default(-1),
    "linolenic":zodConvertibleNumericType.optional().default(-1),
    "arachidonic":zodConvertibleNumericType.optional().default(-1),
    "docosahexanoic":zodConvertibleNumericType.optional().default(-1),
    "palmitoleic":zodConvertibleNumericType.optional().default(-1),
    "parinaric":zodConvertibleNumericType.optional().default(-1),
    "gadoleic":zodConvertibleNumericType.optional().default(-1),
    "eicosapentaenoic":zodConvertibleNumericType.optional().default(-1),
    "erucic":zodConvertibleNumericType.optional().default(-1),
    "docosapentaenoic":zodConvertibleNumericType.optional().default(-1),
    "mono_unsaturated_fat":zodConvertibleNumericType.optional().default(-1),
    "poly_unsaturated_fat":zodConvertibleNumericType.optional().default(-1),
    "total_sugars":zodConvertibleNumericType.optional().default(-1),
    "vitamin_a_re":zodConvertibleNumericType.optional().default(-1),
    "isoleucine":zodConvertibleNumericType.optional().default(-1),
    "leucine":zodConvertibleNumericType.optional().default(-1),
    "valine":zodConvertibleNumericType.optional().default(-1),
    "lysine":zodConvertibleNumericType.optional().default(-1),
    "threonine":zodConvertibleNumericType.optional().default(-1),
    "methionine":zodConvertibleNumericType.optional().default(-1),
    "phenylalanine":zodConvertibleNumericType.optional().default(-1),
    "tryptophan":zodConvertibleNumericType.optional().default(-1),
    "histidine":zodConvertibleNumericType.optional().default(-1),
    "tyrosine":zodConvertibleNumericType.optional().default(-1),
    "arginine":zodConvertibleNumericType.optional().default(-1),
    "cystine":zodConvertibleNumericType.optional().default(-1),
    "serine":zodConvertibleNumericType.optional().default(-1),
    "vitamin_k":zodConvertibleNumericType.optional().default(-1),
    "pantothenic_acid":zodConvertibleNumericType.optional().default(-1),
    "selenium":zodConvertibleNumericType.optional().default(-1),
    "choline":zodConvertibleNumericType.optional().default(-1),
    "manganese":zodConvertibleNumericType.optional().default(-1),
    "tarich_ptiha":zodConvertibleDateType,
    "tarich_idkun":zodConvertibleDateType,
    "english_name":z.string(),
    "units":z.array(zodUnitsSchema)
});

export type TypeIngredient = z.infer<typeof zodIngredientSchema>;

type TypeKeyOfIngredient = keyof TypeIngredient;

export const IngredientKeys: readonly TypeKeyOfIngredient[] = [
    "_id",
    "Code",
    "makor",
    "smlmitzrach",
    "shmmitzrach",
    "protein",
    "total_fat",
    "carbohydrates",
    "food_energy",
    "alcohol",
    "moisture",
    "total_dietary_fiber",
    "calcium",
    "iron",
    "magnesium",
    "phosphorus",
    "potassium",
    "sodium",
    "zinc",
    "copper",
    "vitamin_a_iu",
    "carotene",
    "vitamin_e",
    "vitamin_c",
    "thiamin",
    "riboflavin",
    "niacin",
    "vitamin_b6",
    "folate",
    "folate_dfe",
    "vitamin_b12",
    "cholesterol",
    "saturated_fat",
    "butyric",
    "caproic",
    "caprylic",
    "capric",
    "lauric",
    "myristic",
    "palmitic",
    "stearic",
    "oleic",
    "linoleic",
    "linolenic",
    "arachidonic",
    "docosahexanoic",
    "palmitoleic",
    "parinaric",
    "gadoleic",
    "eicosapentaenoic",
    "erucic",
    "docosapentaenoic",
    "mono_unsaturated_fat",
    "poly_unsaturated_fat",
    "total_sugars",
    "vitamin_a_re",
    "isoleucine",
    "leucine",
    "valine",
    "lysine",
    "threonine",
    "methionine",
    "phenylalanine",
    "tryptophan",
    "histidine",
    "tyrosine",
    "arginine",
    "cystine",
    "serine",
    "vitamin_k",
    "pantothenic_acid",
    "selenium",
    "choline",
    "manganese",
    "tarich_ptiha",
    "tarich_idkun",
    "english_name",
    "units",
] as const;

export type TypeIngredientKey = typeof IngredientKeys[number];

export type TypeFoodKey = keyof Omit<TypeIngredient, "units">;

export const FoodKeys: readonly TypeFoodKey[] = [
    "_id",
    "Code",
    "makor",
    "smlmitzrach",
    "shmmitzrach",
    "protein",
    "total_fat",
    "carbohydrates",
    "food_energy",
    "alcohol",
    "moisture",
    "total_dietary_fiber",
    "calcium",
    "iron",
    "magnesium",
    "phosphorus",
    "potassium",
    "sodium",
    "zinc",
    "copper",
    "vitamin_a_iu",
    "carotene",
    "vitamin_e",
    "vitamin_c",
    "thiamin",
    "riboflavin",
    "niacin",
    "vitamin_b6",
    "folate",
    "folate_dfe",
    "vitamin_b12",
    "cholesterol",
    "saturated_fat",
    "butyric",
    "caproic",
    "caprylic",
    "capric",
    "lauric",
    "myristic",
    "palmitic",
    "stearic",
    "oleic",
    "linoleic",
    "linolenic",
    "arachidonic",
    "docosahexanoic",
    "palmitoleic",
    "parinaric",
    "gadoleic",
    "eicosapentaenoic",
    "erucic",
    "docosapentaenoic",
    "mono_unsaturated_fat",
    "poly_unsaturated_fat",
    "total_sugars",
    "vitamin_a_re",
    "isoleucine",
    "leucine",
    "valine",
    "lysine",
    "threonine",
    "methionine",
    "phenylalanine",
    "tryptophan",
    "histidine",
    "tyrosine",
    "arginine",
    "cystine",
    "serine",
    "vitamin_k",
    "pantothenic_acid",
    "selenium",
    "choline",
    "manganese",
    "tarich_ptiha",
    "tarich_idkun",
    "english_name",
] as const;

export const IngredientKeysSet = new Set(IngredientKeys);


