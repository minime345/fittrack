export const meals = [
  {
  name: "Овесена каша с банан и фъстъчено масло",
  slug: "oatmeal-banana-pb",
  icon: "🥣",
  kcal: 400,
  protein: 14,
  carbs: 45,
  fat: 18,
  weight: 350,
  categories: ["vegan", "vegetarian", "balanced", "high-carb"],
  recipe: "Смеси овес, вода/ядково мляко, нарязан банан и 1 с.л. фъстъчено масло.",
  ingredients: [
    { name: "овесени ядки", amount: 60, unit: "g" },
    { name: "банан", amount: 1, unit: "бр" },
    { name: "фъстъчено масло", amount: 15, unit: "g" },
    { name: "растително мляко", amount: 200, unit: "ml" }
  ],
  link: "/meals/oatmeal-banana-pb",
  mealType: ["breakfast"],
  proteinSource: "vegan"
},
{
  name: "Кето салата с яйце, авокадо и бекон",
  slug: "keto-salad-egg-avocado",
  icon: "🥗",
  kcal: 540,
  protein: 28,
  carbs: 6,
  fat: 45,
  weight: 350,
  categories: ["keto", "carnivore"],
  recipe: "Салата с маруля, варено яйце, авокадо, бекон и зехтин.",
  ingredients: [
    { name: "маруля", amount: 50, unit: "g" },
    { name: "яйца", amount: 1, unit: "бр" },
     { "name": "авокадо", "amount": 0.5, "unit": "бр." },
    { name: "бекон", amount: 40, unit: "g" },
    { name: "зехтин", amount: 10, unit: "ml" }
  ],
  link: "/meals/keto-salad-egg-avocado",
  mealType: ["lunch"],
  proteinSource: "pork"
},
{
  name: "Протеинов шейк с банан и веган протеин",
  slug: "vegan-protein-shake",
  icon: "🥤",
  kcal: 320,
  protein: 27,
  carbs: 30,
  fat: 7,
  weight: 400,
  categories: ["vegan", "vegetarian", "balanced", "high-protein"],
  recipe: "Блендирай банан, веган протеин, ядково мляко и лед.",
  ingredients: [
    { name: "банан", amount: 1, unit: "бр" },
    { name: "веган протеин", amount: 30, unit: "g" },
    { name: "растително мляко", amount: 200, unit: "ml" }
   
  ],
  link: "/meals/vegan-protein-shake",
  mealType: ["snack", "breakfast"],
  proteinSource: "vegan"
},
{
  name: "Говеждо месо с яйца и сирене",
  slug: "beef-egg-cheese",
  icon: "🥩",
  kcal: 540,
  protein: 45,
  carbs: 3,
  fat: 38,
  weight: 350,
  categories: ["carnivore", "keto", "high-protein"],
  recipe: "Запържи говеждо с яйца и малко настъргано сирене.",
  ingredients: [
    { name: "говеждо месо", amount: 150, unit: "g" },
    { name: "яйца", amount: 2, unit: "бр" },
    { name: "сирене", amount: 30, unit: "g" }
  ],
  link: "/meals/beef-egg-cheese",
  mealType: ["dinner", "lunch"],
  proteinSource: "beef"
},
{
  name: "Леща яхния с моркови и домат",
  slug: "lentil-stew",
  icon: "🍲",
  kcal: 420,
  protein: 23,
  carbs: 45,
  fat: 12,
  weight: 450,
  categories: ["vegan", "vegetarian", "balanced", "high-carb"],
  recipe: "Свари леща с лук, моркови, домат и подправки.",
  ingredients: [
    { name: "леща", amount: 80, unit: "g" },
    { name: "морков", amount: 1, unit: "бр" },
    { name: "домати", amount: 100, unit: "g" },
    { name: "лук", amount: 0.5, unit: "бр" }
  ],
  link: "/meals/lentil-stew",
  mealType: ["lunch"],
  proteinSource: "vegan"
},
{
  name: "Омлет с гъби и спанак",
  slug: "omelet-mushrooms-spinach",
  icon: "🍳",
  kcal: 350,
  protein: 26,
  carbs: 5,
  fat: 24,
  weight: 250,
  categories: ["keto", "vegetarian", "balanced", "high-protein"],
  recipe: "Приготви омлет от яйца с гъби и спанак.",
  ingredients: [
    { name: "яйца", amount: 2, unit: "бр" },
    { name: "гъби", amount: 50, unit: "g" },
    { name: "спанак", amount: 50, unit: "g" }
  ],
  link: "/meals/omelet-mushrooms-spinach",
  mealType: ["breakfast"],
  proteinSource: "egg"
},
{
  name: "Печена сьомга със задушени зеленчуци",
  slug: "salmon-veggies",
  icon: "🐟",
  kcal: 520,
  protein: 35,
  carbs: 10,
  fat: 38,
  weight: 400,
  categories: ["keto", "balanced", "high-protein"],
  recipe: "Печена сьомга, сервирана със задушени броколи и моркови.",
  ingredients: [
    { name: "сьомга", amount: 150, unit: "g" },
    { name: "броколи", amount: 100, unit: "g" },
    { name: "морков", amount: 1, unit: "бр" }
  ],
  link: "/meals/salmon-veggies",
  mealType: ["dinner", "lunch"],
  proteinSource: "fish"
},
{
  name: "Паста с тофу и доматен сос",
  slug: "tofu-pasta",
  icon: "🍝",
  kcal: 470,
  protein: 22,
  carbs: 55,
  fat: 16,
  weight: 400,
  categories: ["vegan", "vegetarian", "balanced"],
  recipe: "Цели зърна паста с тофу и доматен сос.",
  ingredients: [
    { name: "паста", amount: 80, unit: "g" },
    { name: "тофу", amount: 100, unit: "g" },
    { name: "доматен сос", amount: 100, unit: "ml" }
  ],
  link: "/meals/tofu-pasta",
  mealType: ["lunch"],
  proteinSource: "tofu"
},
{
  name: "Телешки стек със зелена салата",
  slug: "beef-steak-salad",
  icon: "🥩",
  kcal: 580,
  protein: 48,
  carbs: 6,
  fat: 40,
  weight: 350,
  categories: ["carnivore", "keto", "high-protein"],
  recipe: "Грилован телешки стек със зелена салата и зехтин.",
  ingredients: [
    { name: "телешко месо", amount: 180, unit: "g" },
    { name: "зелена салата", amount: 50, unit: "g" }
    
  ],
  link: "/meals/beef-steak-salad",
  mealType: ["dinner", "lunch"],
  proteinSource: "beef"
},
{
  name: "Гриловано пилешко с ориз и броколи",
  slug: "chicken",
  icon: "🍗",
  kcal: 520,
  protein: 42,
  carbs: 45,
  fat: 18,
  weight: 450,
  categories: ["balanced", "high-protein"],
  recipe: "Гриловано пилешко филе, варен ориз и задушени броколи.",
  ingredients: [
    { name: "пилешко филе", amount: 150, unit: "g" },
    { name: "ориз", amount: 60, unit: "g" },
    { name: "броколи", amount: 100, unit: "g" }
  ],
  link: "/meals/chicken",
  mealType: ["lunch", "dinner"],
  proteinSource: "chicken"
},
  {
    "name": "Микс от сурови ядки (30g)",
    "slug": "mixed-nuts",
    "icon": "🥜",
    "kcal": 180,
    "protein": 5,
    "carbs": 6,
    "fat": 16,
    "weight": 30,
    "categories": ["vegan", "vegetarian", "keto", "snack"],
    "recipe": "Шепа сурови ядки – орехи, бадеми, лешници.",
    "ingredients": [
      { "name": "ядки", "amount": 30, "unit": "g" }
      
    ],
    "link": "",
    "mealType": ["snack"],
    "proteinSource": "vegan"
  },
  {
    "name": "Протеинов бар с шоколад и фъстъци",
    "slug": "protein-bar-choco",
    "icon": "🍫",
    "kcal": 220,
    "protein": 20,
    "carbs": 15,
    "fat": 10,
    "weight": 60,
    "categories": ["high-protein", "balanced", "snack"],
    "recipe": "Готов протеинов бар с шоколадов вкус и ядки.",
    "ingredients": [
      { "name": "протеинов бар", "amount": 60, "unit": "g" }
    ],
    "link": "",
    "mealType": ["snack"],
    "proteinSource": "supplement"
  },
  {
    "name": "Оризовки с фъстъчено масло (2 бр.)",
    "slug": "rice-cakes-pb",
    "icon": "🍘",
    "kcal": 190,
    "protein": 6,
    "carbs": 24,
    "fat": 8,
    "weight": 50,
    "categories": ["vegan", "vegetarian", "balanced", "snack"],
    "recipe": "Намажи 2 оризовки с фъстъчено масло.",
    "ingredients": [
      { "name": "оризовки", "amount": 2, "unit": "бр." },
      { "name": "фъстъчено масло", "amount": 15, "unit": "g" }
    ],
    "link": "",
    "mealType": ["snack"],
    "proteinSource": "vegan"
  },
  {
    "name": "Кисело мляко с мед и орехи",
    "slug": "yogurt-honey-walnuts",
    "icon": "🥣",
    "kcal": 250,
    "protein": 12,
    "carbs": 20,
    "fat": 14,
    "weight": 200,
    "categories": ["vegetarian", "balanced", "snack"],
    "recipe": "Смеси кисело мляко, 1 ч.л. мед и счукани орехи.",
    "ingredients": [
      { "name": "кисело мляко", "amount": 150, "unit": "g" },
      { "name": "мед", "amount": 5, "unit": "g" },
      { "name": "орехи", "amount": 15, "unit": "g" }
    ],
    "link": "",
    "mealType": ["snack", "breakfast"],
    "proteinSource": "dairy"
  },
  {
    "name": "Варено яйце с резен авокадо",
    "slug": "boiled-egg-avocado",
    "icon": "🥚",
    "kcal": 160,
    "protein": 8,
    "carbs": 2,
    "fat": 13,
    "weight": 100,
    "categories": ["keto", "carnivore", "snack"],
    "recipe": "Сервирай 1 варено яйце с 1/4 авокадо.",
    "ingredients": [
      { name: "яйца", amount: 1, unit: "бр" },
      { "name": "авокадо", "amount": 0.5, "unit": "бр." }
    ],
    "link": "",
    "mealType": ["snack", "breakfast"],
    "proteinSource": "egg"
  },
  {
    "name": "Веган протеинов бар с фурми и ядки",
    "slug": "vegan-protein-bar",
    "icon": "🌰",
    "kcal": 210,
    "protein": 12,
    "carbs": 18,
    "fat": 10,
    "weight": 50,
    "categories": ["vegan", "vegetarian", "high-protein", "snack"],
    "recipe": "Бар от фурми, ядки и растителен протеин.",
    "ingredients": [
      { "name": "фурми", "amount": 20, "unit": "g" },
      { "name": "ядки", "amount": 20, "unit": "g" },
      { "name": "веган протеин", "amount": 10, "unit": "g" }
    ],
    "link": "",
    "mealType": ["snack"],
    "proteinSource": "vegan"
  },
  {
    "name": "Пресни зеленчуци с хумус",
    "slug": "fresh-veggies-hummus",
    "icon": "🥕",
    "kcal": 150,
    "protein": 5,
    "carbs": 18,
    "fat": 7,
    "weight": 200,
    "categories": ["vegan", "vegetarian", "balanced", "snack"],
    "recipe": "Нарежи краставици, чушки и моркови, сервирай с хумус.",
    "ingredients": [
      { "name": "краставици", "amount": 70, "unit": "g" },
      { "name": "чушки", "amount": 70, "unit": "g" },
      { name: "морков", amount: 1, unit: "бр" },
      { "name": "хумус", "amount": 30, "unit": "g" }
    ],
    "link": "",
    "mealType": ["snack"],
    "proteinSource": "vegan"
  },
  {
    "name": "Пълнозърнест тост с авокадо и яйце",
    "slug": "wholegrain-toast-avocado-egg",
    "icon": "🥑",
    "kcal": 350,
    "protein": 20,
    "carbs": 30,
    "fat": 18,
    "weight": 200,
    "categories": ["vegetarian", "balanced", "high-protein", "breakfast"],
    "recipe": "Пълнозърнест тост с намачкано авокадо и пържено яйце.",
    "ingredients": [
      { "name": "пълнозърнест хляб", "amount": 100, "unit": "гр." },
       { "name": "авокадо", "amount": 1, "unit": "бр." },
      { name: "яйца", amount: 1, unit: "бр" }
    ],
    "link": "",
    "mealType": ["breakfast"],
    "proteinSource": "egg"
  },
  {
    "name": "Чиа пудинг с растително мляко и ягоди",
    "slug": "chia-pudding-coconut-strawberries",
    "icon": "🥥",
    "kcal": 280,
    "protein": 10,
    "carbs": 30,
    "fat": 15,
    "weight": 250,
    "categories": ["vegan", "vegetarian", "balanced", "high-fat"],
    "recipe": "Накисни чиа семена в растително мляко и добави пресни ягоди.",
    "ingredients": [
      { "name": "чиа семена", "amount": 30, "unit": "g" },
      { "name": "растително мляко", "amount": 150, "unit": "ml" },
      { "name": "ягоди", "amount": 70, "unit": "g" }
    ],
    "link": "",
    "mealType": ["breakfast"],
    "proteinSource": "vegan"
  },
  {
    "name": "Веган протеинов шейк с растително мляко",
    "slug": "vegan-protein-shake-plant-milk",
    "icon": "🥤",
    "kcal": 150,
    "protein": 25,
    "carbs": 3,
    "fat": 2,
    "weight": 300,
    "categories": ["vegan", "vegetarian", "high-protein", "snack"],
    "recipe": "Смеси веган протеин на прах с растително мляко и лед.",
    "ingredients": [
      { "name": "веган протеин", "amount": 30, "unit": "g" },
      { "name": "растително мляко", "amount": 250, "unit": "ml" }
      
    ],
    "link": "",
    "mealType": ["snack"],
    "proteinSource": "supplement"
  },
  {
    "name": "Веганска тиквичка с киноа и зеленчуци",
    "slug": "vegan-zucchini-quinoa",
    "icon": "🥒",
    "kcal": 450,
    "protein": 18,
    "carbs": 50,
    "fat": 12,
    "weight": 400,
    "categories": ["vegan", "vegetarian", "balanced", "dinner"],
    "recipe": "Запечи тиквички с киноа, чушки, домати и подправки.",
    "ingredients": [
      { "name": "тиквички", "amount": 150, "unit": "g" },
      { "name": "киноа", "amount": 70, "unit": "g" },
      { "name": "чушки", "amount": 80, "unit": "g" },
      { "name": "домати", "amount": 100, "unit": "g" },
      { "name": "подправки", "amount": 5, "unit": "g" }
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "vegan"
  },
  {
    "name": "Вегетарианска лазаня със спанак и рикота",
    "slug": "vegetarian-lasagna-spinach-ricotta",
    "icon": "🥘",
    "kcal": 520,
    "protein": 30,
    "carbs": 45,
    "fat": 20,
    "weight": 450,
    "categories": ["vegetarian", "balanced", "dinner"],
    "recipe": "Лазаня с домашна паста, спанак, рикота и доматен сос.",
    "ingredients": [
      { "name": "домашна лазаня паста", "amount": 150, "unit": "g" },
      { "name": "спанак", "amount": 100, "unit": "g" },
      { "name": "рикота", "amount": 100, "unit": "g" },
      { name: "доматен сос", amount: 100, unit: "ml" }
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "dairy"
  },
  {
    "name": "Веганско къри с нахут и растително мляко",
    "slug": "vegan-chickpea-curry",
    "icon": "🍛",
    "kcal": 480,
    "protein": 22,
    "carbs": 55,
    "fat": 15,
    "weight": 400,
    "categories": ["vegan", "vegetarian", "balanced", "dinner"],
    "recipe": "Къри с нахут, зеленчуци и растително млякоо, поднесено с ориз.",
    "ingredients": [
      { "name": "нахут", "amount": 150, "unit": "g" },
      { "name": "растително мляко", "amount": 100, "unit": "ml" },
      { "name": "ориз", "amount": 50, "unit": "g" },
     
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "vegan"
  },
  {
    "name": "Вегетарианска мусака с патладжан и картофи",
    "slug": "vegetarian-moussaka",
    "icon": "🍆",
    "kcal": 530,
    "protein": 28,
    "carbs": 40,
    "fat": 22,
    "weight": 450,
    "categories": ["vegetarian", "balanced", "dinner"],
    "recipe": "Мусака с патладжан, картофи и млечен сос.",
    "ingredients": [
      { "name": "патладжан", "amount": 150, "unit": "g" },
      { "name": "картофи", "amount": 150, "unit": "g" },
      { "name": "млечен сос", "amount": 150, "unit": "g" },
    
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "dairy"
  },
  {
    "name": "Вегански спагети с доматен сос и нахутени кюфтета",
    "slug": "vegan-spaghetti-chickpea-balls",
    "icon": "🍝",
    "kcal": 500,
    "protein": 25,
    "carbs": 60,
    "fat": 14,
    "weight": 400,
    "categories": ["vegan", "vegetarian", "balanced", "dinner"],
    "recipe": "Спагети с доматен сос и кюфтета от нахут и подправки.",
    "ingredients": [
      { "name": "паста", "amount": 150, "unit": "g" },
      { "name": "домати", "amount": 100, "unit": "g" },
      { "name": "нахутени кюфтета", "amount": 120, "unit": "g" }
      
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "vegan"
  },
  {
    "name": "Агнешки котлети на скара",
    "slug": "grilled-lamb-chops",
    "icon": "🍖",
    "kcal": 560,
    "protein": 42,
    "carbs": 0,
    "fat": 44,
    "weight": 300,
    "categories": ["carnivore", "keto", "high-protein"],
    "recipe": "Овкуси агнешките котлети със сол и черен пипер, след което ги изпечи на скара до желаната готовност.",
    "ingredients": [
      { "name": "агнешки котлети", "amount": 250, "unit": "g" }
      
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "lamb"
  },
  {
    "name": "Свински ребра на фурна",
    "slug": "oven-pork-ribs",
    "icon": "🍖",
    "kcal": 700,
    "protein": 50,
    "carbs": 1,
    "fat": 55,
    "weight": 400,
    "categories": ["carnivore", "keto", "high-fat"],
    "recipe": "Овкуси ребрата със сол и подправки, покрий с фолио и печи бавно на фурна до пълна готовност.",
    "ingredients": [
      { "name": "свински ребра", "amount": 350, "unit": "g" }
     
    ],
    "link": "",
    "mealType": ["dinner"],
    "proteinSource": "pork"
  },
  {
    "name": "Телешки бургер (без хляб)",
    "slug": "beef-burger-no-bun",
    "icon": "🍔",
    "kcal": 550,
    "protein": 40,
    "carbs": 2,
    "fat": 42,
    "weight": 300,
    "categories": ["carnivore", "keto", "high-protein"],
    "recipe": "Изпечи телешко кюфте и сервирай с резен кашкавал и яйце (по избор), без хляб.",
    "ingredients": [
      { "name": "телешко кюфте", "amount": 200, "unit": "g" },
      { "name": "кашкавал", "amount": 50, "unit": "g" },
      { name: "яйца", amount: 1, unit: "бр" },
    ],
    "link": "",
    "mealType": ["lunch"],
    "proteinSource": "beef"
  },
];



