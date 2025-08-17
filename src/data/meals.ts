export type LocalizedString = {
  bg: string;
  en: string;
};

export type Ingredient = {
  name: LocalizedString;
  amount: number;
  unit: string;
};

export type Meal = {
  slug: string;
  icon: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  weight: number;
  categories: string[];
  name: LocalizedString;
  recipe: LocalizedString;
  ingredients: Ingredient[];
  link: string;
  mealType: string[];
  proteinSource: string;
};


export const meals = [
 
  {
    slug: "oatmeal-banana-pb",
    icon: "🥣",
    kcal: 400,
    protein: 14,
    carbs: 45,
    fat: 18,
    weight: 350,
    categories: ["vegan", "vegetarian", "balanced", "high-carb"],
    name: {
      bg: "Овесена каша с банан и фъстъчено масло",
      en: "Oatmeal with Banana and Peanut Butter"
    },
    recipe: {
      bg: "Смеси овес, вода/ядково мляко, нарязан банан и 1 с.л. фъстъчено масло.",
      en: "Mix oats, water/plant milk, sliced banana, and 1 tbsp peanut butter."
    },
    ingredients: [
      { name: { bg: "овесени ядки", en: "oats" }, amount: 60, unit: "g" },
      { name: { bg: "банан", en: "banana" }, amount: 1, unit: "pcs" },
      { name: { bg: "фъстъчено масло", en: "peanut butter" }, amount: 15, unit: "g" },
      { name: { bg: "растително мляко", en: "plant milk" }, amount: 200, unit: "ml" }
    ],
    link: "/meals/oatmeal-banana-pb",
    mealType: ["breakfast"],
    proteinSource: "vegan"
  },
  {
    slug: "keto-salad-egg-avocado",
    icon: "🥗",
    kcal: 540,
    protein: 28,
    carbs: 6,
    fat: 45,
    weight: 350,
    categories: ["keto", "carnivore"],
    name: {
      bg: "Кето салата с яйце, авокадо и бекон",
      en: "Keto Salad with Egg, Avocado, and Bacon"
    },
    recipe: {
      bg: "Салата с маруля, варено яйце, авокадо, бекон и зехтин.",
      en: "Salad with lettuce, boiled egg, avocado, bacon, and olive oil."
    },
    ingredients: [
      { name: { bg: "маруля", en: "lettuce" }, amount: 50, unit: "g" },
      { name: { bg: "яйца", en: "egg" }, amount: 1, unit: "pcs" },
      { name: { bg: "авокадо", en: "avocado" }, amount: 0.5, unit: "pcs" },
      { name: { bg: "бекон", en: "bacon" }, amount: 40, unit: "g" },
      { name: { bg: "зехтин", en: "olive oil" }, amount: 10, unit: "ml" }
    ],
    link: "/meals/keto-salad-egg-avocado",
    mealType: ["lunch"],
    proteinSource: "pork"
  },
  {
    slug: "vegan-protein-shake",
    icon: "🥤",
    kcal: 320,
    protein: 27,
    carbs: 30,
    fat: 7,
    weight: 400,
    categories: ["vegan", "vegetarian", "balanced", "high-protein"],
    name: {
      bg: "Протеинов шейк с банан и веган протеин",
      en: "Vegan Protein Shake with Banana"
    },
    recipe: {
      bg: "Блендирай банан, веган протеин, ядково мляко и лед.",
      en: "Blend banana, vegan protein, plant milk, and ice."
    },
    ingredients: [
      { name: { bg: "банан", en: "banana" }, amount: 1, unit: "pcs" },
      { name: { bg: "веган протеин", en: "vegan protein" }, amount: 30, unit: "g" },
      { name: { bg: "растително мляко", en: "plant milk" }, amount: 200, unit: "ml" }
    ],
    link: "/meals/vegan-protein-shake",
    mealType: ["snack", "breakfast"],
    proteinSource: "vegan"
  },
  {
    slug: "beef-egg-cheese",
    icon: "🥩",
    kcal: 540,
    protein: 45,
    carbs: 3,
    fat: 38,
    weight: 350,
    categories: ["carnivore", "keto", "high-protein"],
    name: {
      bg: "Говеждо месо с яйца и сирене",
      en: "Beef with Eggs and Cheese"
    },
    recipe: {
      bg: "Запържи говеждо с яйца и малко настъргано сирене.",
      en: "Fry beef with eggs and a little grated cheese."
    },
    ingredients: [
      { name: { bg: "говеждо месо", en: "beef" }, amount: 150, unit: "g" },
      { name: { bg: "яйца", en: "eggs" }, amount: 2, unit: "pcs" },
      { name: { bg: "сирене", en: "cheese" }, amount: 30, unit: "g" }
    ],
    link: "/meals/beef-egg-cheese",
    mealType: ["dinner", "lunch"],
    proteinSource: "beef"
  },
  {
    slug: "lentil-stew",
    icon: "🍲",
    kcal: 420,
    protein: 23,
    carbs: 45,
    fat: 12,
    weight: 450,
    categories: ["vegan", "vegetarian", "balanced", "high-carb"],
    name: {
      bg: "Леща яхния с моркови и домат",
      en: "Lentil Stew with Carrots and Tomato"
    },
    recipe: {
      bg: "Свари леща с лук, моркови, домат и подправки.",
      en: "Cook lentils with onion, carrots, tomato, and spices."
    },
    ingredients: [
      { name: { bg: "леща", en: "lentils" }, amount: 80, unit: "g" },
      { name: { bg: "морков", en: "carrot" }, amount: 1, unit: "pcs" },
      { name: { bg: "домати", en: "tomatoes" }, amount: 100, unit: "g" },
      { name: { bg: "лук", en: "onion" }, amount: 0.5, unit: "pcs" }
    ],
    link: "/meals/lentil-stew",
    mealType: ["lunch"],
    proteinSource: "vegan"
  },

];



