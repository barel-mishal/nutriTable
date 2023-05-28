import type { z } from "zod";
import fs from "fs";
import path from "path";
import { ageRangeDRISchema } from './DRISchema.ts';

import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const mohPath = path.resolve(
  path.join(__dirname, "..", "..", "public", "ministryOfHealthData", "data")
);
const filePath = path.join(mohPath, "mohDRI.json");

const arrayAgeRangeDRISchema = ageRangeDRISchema;
type DRI = z.infer<typeof arrayAgeRangeDRISchema>;
const dri = ageRangeDRISchema.array().parse(driData());

fs.writeFileSync(filePath, JSON.stringify(dri));

exec(
  `
gzip -k -f ${filePath}`,
  (err, stdout) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  }
);

export function driData(): Required<DRI>[] {
  return [
    {
      ageRange: "Infants 0-6 months",
      calcium: {
        value: "200",
        unit: "mg/day",
        comment: "AI",
      },
      vitaminD: {
        value: "10",
        unit: "mcg (400 IU)/day",
        comment: "AI",
      },
      iron: {
        value: "0.27",
        unit: "mg/day",
        comment: "AI",
      },
      vitaminA: {
        value: "400",
        unit: "mcg RAE/day",
        comment: "AI",
      },
      magnesium: {
        value: "30",
        unit: "mg/day",
        comment: "AI",
      },
      sodium: {
        value: "0.11",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "110",
        unit: "mcg/day",
        comment: "AI",
      },
    },
    {
      ageRange: "Infants 7-12 months",
      calcium: {
        value: "260",
        unit: "mg/day",
        comment: "AI",
      },
      vitaminD: {
        value: "10",
        unit: "mcg (400 IU)/day",
        comment: "AI",
      },
      iron: {
        value: "11",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "500",
        unit: "mcg RAE/day",
        comment: "AI",
      },
      magnesium: {
        value: "75",
        unit: "mg/day",
        comment: "AI",
      },
      sodium: {
        value: "0.37",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "130",
        unit: "mcg/day",
        comment: "AI",
      },
    },
    {
      ageRange: "Children 1-3 years",
      calcium: {
        value: "700",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "7",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "300",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "80",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "0.8",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "90",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Children 4-8 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "10",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "400",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "130",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "90",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Males 9-13 years",
      calcium: {
        value: "1300",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "600",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "240",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.2",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "120",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Males 14-18 years",
      calcium: {
        value: "1300",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "11",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "900",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "410",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Males 19-30 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "900",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "400",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Males 31-50 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "900",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "420",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Males 51-70 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "900",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "420",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Males >70 years",
      calcium: {
        value: "1200",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "20",
        unit: "mcg (800 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "900",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "420",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Females 9-13 years",
      calcium: {
        value: "1300",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "700",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "240",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.2",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "120",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Females 14-18 years",
      calcium: {
        value: "1300",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "15",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "700",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "360",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Females 19-30 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "18",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "700",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "310",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Females 31-50 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "18",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "700",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "320",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Females 51-70 years",
      calcium: {
        value: "1200",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "20",
        unit: "mcg (800 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "700",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "320",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Females >70 years",
      calcium: {
        value: "1200",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "20",
        unit: "mcg (800 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "8",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "700",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "320",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "150",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Pregnancy <18 years",
      calcium: {
        value: "1300",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "27",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "750",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "400",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "220",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Pregnancy 19-30 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "27",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "770",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "350",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "220",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Pregnancy 31-50 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "27",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "770",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "360",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "220",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Lactation <18 years",
      calcium: {
        value: "1300",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "10",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "1200",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "360",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "290",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Lactation 19-30 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "9",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "1300",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "310",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "290",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
    {
      ageRange: "Lactation 31-50 years",
      calcium: {
        value: "1000",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminD: {
        value: "15",
        unit: "mcg (600 IU)/day",
        comment: "RDA",
      },
      iron: {
        value: "9",
        unit: "mg/day",
        comment: "RDA",
      },
      vitaminA: {
        value: "1300",
        unit: "mcg RAE/day",
        comment: "RDA",
      },
      magnesium: {
        value: "320",
        unit: "mg/day",
        comment: "RDA",
      },
      sodium: {
        value: "1.5",
        unit: "g/day",
        comment: "AI",
      },
      iodine: {
        value: "290",
        unit: "mcg/day",
        comment: "RDA",
      },
    },
  ];
}

// https://docs.google.com/document/d/19C2ID_xMhRzHbvtHZcZOm-g1Xxr1ekp3gAr6rtumH2Q/edit?pli=1
// This is the AI and RDA values for the nutrients from the above link

export const MACROS = {
  // figure out how to use it
  // page 8
};

export const UL = {
  // future work
  // 6-7
};
