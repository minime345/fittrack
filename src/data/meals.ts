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
  },{
  slug: "omelet-mushrooms-spinach",
  icon: "🍳",
  kcal: 350,
  protein: 26,
  carbs: 5,
  fat: 24,
  weight: 250,
  categories: ["keto", "vegetarian", "balanced", "high-protein"],
  name: {
    bg: "Омлет с гъби и спанак",
    en: "Omelet with Mushrooms and Spinach"
  },
  recipe: {
    bg: "Приготви омлет от яйца с гъби и спанак.",
    en: "Cook an omelet with eggs, mushrooms, and spinach."
  },
  ingredients: [
    { name: { bg: "яйца", en: "eggs" }, amount: 2, unit: "pcs" },
    { name: { bg: "гъби", en: "mushrooms" }, amount: 50, unit: "g" },
    { name: { bg: "спанак", en: "spinach" }, amount: 50, unit: "g" }
  ],
  link: "/meals/omelet-mushrooms-spinach",
  mealType: ["breakfast"],
  proteinSource: "egg"
},
{
  slug: "salmon-veggies",
  icon: "🐟",
  kcal: 520,
  protein: 35,
  carbs: 10,
  fat: 38,
  weight: 400,
  categories: ["keto", "balanced", "high-protein"],
  name: {
    bg: "Печена сьомга със задушени зеленчуци",
    en: "Baked Salmon with Steamed Vegetables"
  },
  recipe: {
    bg: "Печена сьомга, сервирана със задушени броколи и моркови.",
    en: "Bake salmon and serve with steamed broccoli and carrots."
  },
  ingredients: [
    { name: { bg: "сьомга", en: "salmon" }, amount: 150, unit: "g" },
    { name: { bg: "броколи", en: "broccoli" }, amount: 100, unit: "g" },
    { name: { bg: "морков", en: "carrot" }, amount: 1, unit: "pcs" }
  ],
  link: "/meals/salmon-veggies",
  mealType: ["dinner", "lunch"],
  proteinSource: "fish"
},
{
  slug: "tofu-pasta",
  icon: "🍝",
  kcal: 470,
  protein: 22,
  carbs: 55,
  fat: 16,
  weight: 400,
  categories: ["vegan", "vegetarian", "balanced"],
  name: {
    bg: "Паста с тофу и доматен сос",
    en: "Pasta with Tofu and Tomato Sauce"
  },
  recipe: {
    bg: "Цели зърна паста с тофу и доматен сос.",
    en: "Cook whole grain pasta with tofu and tomato sauce."
  },
  ingredients: [
    { name: { bg: "паста", en: "pasta" }, amount: 80, unit: "g" },
    { name: { bg: "тофу", en: "tofu" }, amount: 100, unit: "g" },
    { name: { bg: "доматен сос", en: "tomato sauce" }, amount: 100, unit: "ml" }
  ],
  link: "/meals/tofu-pasta",
  mealType: ["lunch"],
  proteinSource: "tofu"
},
{
  slug: "beef-steak-salad",
  icon: "🥩",
  kcal: 580,
  protein: 48,
  carbs: 6,
  fat: 40,
  weight: 350,
  categories: ["carnivore", "keto", "high-protein"],
  name: {
    bg: "Телешки стек със зелена салата",
    en: "Beef Steak with Green Salad"
  },
  recipe: {
    bg: "Грилован телешки стек със зелена салата и зехтин.",
    en: "Grill a beef steak and serve with green salad and olive oil."
  },
  ingredients: [
    { name: { bg: "телешко месо", en: "beef" }, amount: 180, unit: "g" },
    { name: { bg: "зелена салата", en: "green salad" }, amount: 50, unit: "g" }
  ],
  link: "/meals/beef-steak-salad",
  mealType: ["dinner", "lunch"],
  proteinSource: "beef"
},
{
  slug: "chicken",
  icon: "🍗",
  kcal: 520,
  protein: 42,
  carbs: 45,
  fat: 18,
  weight: 450,
  categories: ["balanced", "high-protein"],
  name: {
    bg: "Гриловано пилешко с ориз и броколи",
    en: "Grilled Chicken with Rice and Broccoli"
  },
  recipe: {
    bg: "Гриловано пилешко филе, варен ориз и задушени броколи.",
    en: "Grill chicken fillet and serve with boiled rice and steamed broccoli."
  },
  ingredients: [
    { name: { bg: "пилешко филе", en: "chicken fillet" }, amount: 150, unit: "g" },
    { name: { bg: "ориз", en: "rice" }, amount: 60, unit: "g" },
    { name: { bg: "броколи", en: "broccoli" }, amount: 100, unit: "g" }
  ],
  link: "/meals/chicken",
  mealType: ["lunch", "dinner"],
  proteinSource: "chicken"
},
{
  slug: "mixed-nuts",
  icon: "🥜",
  kcal: 180,
  protein: 5,
  carbs: 6,
  fat: 16,
  weight: 30,
  categories: ["vegan", "vegetarian", "keto", "snack"],
  name: {
    bg: "Микс от сурови ядки (30g)",
    en: "Mixed Nuts (30g)"
  },
  recipe: {
    bg: "Шепа сурови ядки – орехи, бадеми, лешници.",
    en: "A handful of raw nuts – walnuts, almonds, hazelnuts."
  },
  ingredients: [
    { name: { bg: "ядки", en: "nuts" }, amount: 30, unit: "g" }
  ],
  link: "",
  mealType: ["snack"],
  proteinSource: "vegan"
},
{
  slug: "protein-bar-choco",
  icon: "🍫",
  kcal: 220,
  protein: 20,
  carbs: 15,
  fat: 10,
  weight: 60,
  categories: ["high-protein", "balanced", "snack"],
  name: {
    bg: "Протеинов бар с шоколад и фъстъци",
    en: "Protein Bar with Chocolate and Peanuts"
  },
  recipe: {
    bg: "Готов протеинов бар с шоколадов вкус и ядки.",
    en: "Ready-made protein bar with chocolate flavor and nuts."
  },
  ingredients: [
    { name: { bg: "протеинов бар", en: "protein bar" }, amount: 60, unit: "g" }
  ],
  link: "",
  mealType: ["snack"],
  proteinSource: "supplement"
},
{
  slug: "rice-cakes-pb",
  icon: "🍘",
  kcal: 190,
  protein: 6,
  carbs: 24,
  fat: 8,
  weight: 50,
  categories: ["vegan", "vegetarian", "balanced", "snack"],
  name: {
    bg: "Оризовки с фъстъчено масло (2 бр.)",
    en: "Rice Cakes with Peanut Butter (2 pcs)"
  },
  recipe: {
    bg: "Намажи 2 оризовки с фъстъчено масло.",
    en: "Spread peanut butter on 2 rice cakes."
  },
  ingredients: [
    { name: { bg: "оризовки", en: "rice cakes" }, amount: 2, unit: "бр." },
    { name: { bg: "фъстъчено масло", en: "peanut butter" }, amount: 15, unit: "g" }
  ],
  link: "",
  mealType: ["snack"],
  proteinSource: "vegan"
},


];



