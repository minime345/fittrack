import PersonalPlanPage from "@/app/personal-plan/PersonalPlanClient";

// src/lib/translations.ts
export const translations = {
  bg: {
    nav: {
      home: "Начало",
      calculator: "Калкулатор",
      personal: "Персонални режими",
      plans: "Режими",
      meals: "Ястия",
    },
    footer: {
      contacts: "Контакти",
      quick: "Бързи връзки",
      follow: "Последвай ни",
      rights: "Всички права запазени.",
      address: "София, България",
      phone: "Телефон:",
    },
    plansPage: {
      header: {
        title: "Примерни Хранителни Режими",
        subtitle:
          "Разгледай най-популярните режими. Всеки има своя подход – избери това, което пасва на твоите цели.",
      },
      cta: {
        question: "Искаш нещо, съобразено изцяло с теб?",
        button: "Вземи персонален хранителен план",
      },
      diets: [
        {
          name: "Кето",
          description: "Високомазнинен и нисковъглехидратен режим.",
          image: "/diets/keto.jpg",
          href: "/plans/keto",
        },
        {
          name: "Веган",
          description: "Без животински продукти – само растения.",
          image: "/diets/vegan.jpg",
          href: "/plans/vegan",
        },
        {
          name: "Средиземноморски",
          description: "Балансиран режим с много зеленчуци и зехтин.",
          image: "/diets/mediterranean.jpeg",
          href: "/plans/mediterranean",
        },
        {
          name: "Нисковъглехидратен",
          description: "Ограничени въглехидрати за по-добро горене на мазнини.",
          image: "/diets/lowcarb.jpeg",
          href: "/plans/low-carb",
        },
        {
          name: "Палео",
          description: "Хранене като нашите предци – натурално и чисто.",
          image: "/diets/paleo.jpeg",
          href: "/plans/paleo",
        },
        {
          name: "Високо протеинова",
          description:
            "Повишен прием на белтъчини – идеален за мускулен растеж и ситост.",
          image: "/diets/high-protein.jpeg",
          href: "/plans/high-protein",
        },
      ],
    },
    homepage: {
      btnCalc: "Изчисли калорий",
      btnPersonal: "Персонален режим",
      Title: "Добре дошли в FitTack",
      Text:
        " Твоят личен асистент за калории, хранителни режими и здравословен начин на живот. Изчисли своя дневен калориен прием, открий полезни режими и вдъхновяващи рецепти.",
    },
    calculator: {
      title: "Калориен калкулатор",
      age: "Години",
      weight: "Тегло (кг)",
      height: "Височина (см)",
      gender: "Пол",
      activity: "Ниво на активност",
      bodyFat: "Подкожни мазнини (%)",
      option: "По избор",
      male: "Мъж",
      female: "Жена",
      activityOptions: [
        "Седящ начин на живот — малко или никаква физическа активност",
        "Лека активност — леки упражнения 1-3 дни седмично",
        "Умерена активност — умерени упражнения 3-5 дни седмично",
        "Висока активност — интензивни упражнения 6-7 дни седмично",
        "Много висока активност — много тежки упражнения или физическа работа",
      ],
      calculate: "Изчисли",
      resultCalories: "Дневен калориен прием",
      proteinRange: "Препоръчителен дневен прием на протеин за вас",
      formulaKatch: "Формула: Katch-McArdle (на база чиста телесна маса)",
      formulaMifflin: "Формула: Mifflin-St Jeor",
      alertFill: "Моля, попълнете всички задължителни полета",
      planButton: "Направи персонален хранителен режим",
      prot: "г/ден",
      quickCard: [
        "Бързо отслабване",
        "Бавно отслабване",
        "Поддържане",
        "Качване",
      ],
    },
    meals:{
      all:"Всички",
      hed:"Всички Ястия",
      cal:"Калорий",
      prot:"Пеотеин",
      carb:"Въглехидрати",
      fat:"Мазнини",
      category:"Категории",
      button:"Зареди още",
    },
  },




  en: {
    nav: {
      home: "Home",
      calculator: "Calculator",
      personal: "Personal Plans",
      plans: "Plans",
      meals: "Meals",
    },
    footer: {
      contacts: "Contacts",
      quick: "Quick Links",
      follow: "Follow us",
      rights: "All rights reserved.",
      address: "Sofia, Bulgaria",
      phone: "Phone:",
    },
    plansPage: {
      header: {
        title: "Sample Meal Plans",
        subtitle:
          "Explore the most popular diets. Each has its own approach – choose the one that fits your goals.",
      },
      cta: {
        question: "Want something tailored just for you?",
        button: "Get a personalized meal plan",
      },
      diets: [
        {
          name: "Keto",
          description: "High-fat and low-carb diet.",
          image: "/diets/keto.jpg",
          href: "/plans/keto",
        },
        {
          name: "Vegan",
          description: "No animal products – plants only.",
          image: "/diets/vegan.jpg",
          href: "/plans/vegan",
        },
        {
          name: "Mediterranean",
          description: "Balanced diet rich in vegetables and olive oil.",
          image: "/diets/mediterranean.jpeg",
          href: "/plans/mediterranean",
        },
        {
          name: "Low-Carb",
          description: "Reduced carbs for better fat burning.",
          image: "/diets/lowcarb.jpeg",
          href: "/plans/low-carb",
        },
        {
          name: "Paleo",
          description: "Eating like our ancestors – natural and clean.",
          image: "/diets/paleo.jpeg",
          href: "/plans/paleo",
        },
        {
          name: "High-Protein",
          description:
            "Increased protein intake – perfect for muscle growth and satiety.",
          image: "/diets/high-protein.jpeg",
          href: "/plans/high-protein",
        },
      ],
    },
    homepage: {
      btnCalc: "Calculate calories",
      btnPersonal: "Get personal plan",
      Title: "Welcome to FitTrack",
      Text:
        "Your personal assistant for calories, meal plans and a healthy lifestyle. Calculate your daily calorie intake, explore useful plans and inspiring recipes.",
    },
    calculator: {
      title: "Calorie Calculator",
      age: "Age",
      weight: "Weight (kg)",
      height: "Height (cm)",
      gender: "Gender",
      activity: "Activity Level",
      bodyFat: "Body Fat (%)",
      option: "Optional",
      male: "Male",
      female: "Female",
      activityOptions: [
        "Sedentary — little or no exercise",
        "Light — light exercise 1-3 days/week",
        "Moderate — moderate exercise 3-5 days/week",
        "High — intense exercise 6-7 days/week",
        "Very high — very hard exercise or physical job",
      ],
      calculate: "Calculate",
      resultCalories: "Daily Calorie Intake",
      proteinRange: "Recommended daily protein intake for you",
      formulaKatch: "Formula: Katch-McArdle (based on lean body mass)",
      formulaMifflin: "Formula: Mifflin-St Jeor",
      alertFill: "Please fill all required fields",
      planButton: "Create Personal Nutrition Plan",
       prot: "g/day",
      quickCard: ["Fast Weight Loss", "Slow Weight Loss", "Maintenance", "Gain"],
    },
    meals: {
      all:"All meals",
  hed: "All Meals",
  cal: "Calories",
  prot: "Protein",
  carb: "Carbohydrates",
  fat: "Fat",
  category:"Category",
  button:"Load more",
},
  },
} as const;

export type Lang = keyof typeof translations;
