import { z } from "zod";

export const DIET_TYPES = {
  english: ["vegan", "vegetarian", "pescatarian", "no specific diet"] as const,
  hebrew: ["טבעוני", "צמחוני", "פסקטרי", "ללא דיאטה מסוימת"] as const,
};

export const RELIGIOUS_DIETS = {
  english: "kosher" as const,
  hebrew: "כשר" as const,
};

const ALLERGENS = ["peanuts", "soy", "wheat", "shellfish"] as const;

const NutritionPreferenceSchema = z.object({
  id: z.string().uuid().nonempty("ID cannot be empty"),
  dietType: z.enum(DIET_TYPES.english).or(z.string()),
  religiousDiet: z.literal(RELIGIOUS_DIETS.english).optional(),
  allergies: z.enum(ALLERGENS).optional(),
  intolerances: z.array(z.string()).optional(),
  dislikes: z.array(z.string()).optional(),
  likes: z.array(z.string()).optional(),
  medicine: z.array(z.string()).optional(),
  noSpecialTreatment: z.boolean(),
});

export const NutritionPreferenceSchemaValidate =
  NutritionPreferenceSchema.transform((data) => {
    if (data.noSpecialTreatment) {
      data.allergies = undefined;
      data.intolerances = undefined;
      data.dislikes = undefined;
      data.likes = undefined;
      data.medicine = undefined;
    }
    return data;
  }).refine(
    (data) => {
      // If noSpecialTreatment is false, then at least one of the options must be selected.
      if (!data.noSpecialTreatment) {
        return (
          data.allergies !== undefined ||
          data.intolerances !== undefined ||
          data.dislikes !== undefined ||
          data.likes !== undefined ||
          data.medicine !== undefined
        );
      }
      return true;
    },
    {
      message:
        "If noSpecialTreatment is false, then at least one of allergies, intolerances, dislikes, likes, or medicine must be selected.",
      path: ["allergies", "intolerances", "dislikes", "likes", "medicine"],
    }
  );

export type NutritionPreferenceType = z.infer<typeof NutritionPreferenceSchema>;
export type KeyOfNutritionPreferenceType = keyof NutritionPreferenceType;

export default NutritionPreferenceSchema;

export const DIET_TYPE = "dietType";
export const RELIGIOUS_DIET = "religiousDiet";
export const ALLERGIES = "allergies";
export const INTOLERANCES = "intolerances";
export const DISLIKES = "dislikes";
export const LIKES = "likes";
export const MEDICINE = "medicine";
