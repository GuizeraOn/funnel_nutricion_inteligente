
export const APP_COPY = {
    header: {
        logo: "Logo",
        menu: ["Inicio", "Dietas", "Perfil"],
        logout: "Cerrar sesión",
    },
    home: {
        calculator: {
            // title: "Calculadora de Medidas", // Removed per request
            subtitle: "Medidas Corporales",
            description: "Completa tus datos para calcular tu dieta personalizada",
            inputs: {
                weight: "Peso (kg)",
                height: "Estatura (cm)",
                age: "Edad",
                goal: "Objetivo",
                gender: {
                    male: "Masculino",
                    female: "Femenino",
                },
            },
            // New Options Lists
            options: {
                calories: [
                    "No sabría decirte",
                    "1200 kcal",
                    "1500 kcal",
                    "1800 kcal",
                    "2100 kcal",
                    "2400 kcal",
                    "2700 kcal",
                    "3000 kcal"
                ],
                goals: [
                    "Pérdida de peso",
                    "Definición muscular",
                    "Aumento de masa",
                    "Bajar de peso + Masa",
                    "Definición + Masa"
                ],
                schedules: [
                    "05:30, 08:30, 12:00, 15:00, 19:00",
                    "06:30, 09:30, 13:00, 16:00, 20:00",
                    "07:30, 10:30, 13:30, 16:30, 20:30",
                    "08:00, 11:00, 14:00, 17:00, 21:00",
                    "09:00, 12:00, 15:00, 18:00, 22:00"
                ]
            },
            sections: {
                calories: "Calorías diarias 🔥",
                preferences: "Preferencias de Comidas",
                schedule: "Horarios de tus comidas",
            },
        },
        menuBuilder: {
            breakfast: {
                title: "☕ Desayuno",
                instruction: "Arma tu desayuno seleccionando alimentos de cada categoría:",
            },
            lunch: {
                title: "🍽️ Almuerzo",
                instruction: "Arma tu almuerzo seleccionando alimentos de cada categoría:",
            },
            snack: {
                title: "🍪 Merienda / Snack", // Simplified natural text
                instruction: "Elige un alimento para tu merienda:",
                details: "(Mismos ítems que el desayuno)",
            },
            dinner: {
                title: "🌙 Cena",
                instruction: "Arma tu cena seleccionando alimentos de cada categoría:",
                details: "(Mismos ítems que el almuerzo)",
            },
            selectionCount: "seleccionado(s)",
        },
        routine: {
            title: "Información de Rutina",
            subtitle: "Detalles sobre tu rutina de ejercicios",
            questions: {
                description: "¿Cómo es tu rutina?",
                activity: "Nivel de actividad física actual",
                training: "¿Quieres entrenar?",
                chocolate: "¿Se te antoja algo dulce?",
            },
            options: {
                activity: [
                    { id: "sedentario", label: "Sedentario", sub: "Poca o ninguna actividad" },
                    { id: "ligero", label: "Ligero", sub: "1-3 días por semana" },
                    { id: "moderado", label: "Moderado", sub: "3-5 días por semana" },
                    { id: "intenso", label: "Intenso", sub: "6-7 días por semana" },
                    { id: "muy_intenso", label: "Muy intenso", sub: "Doble jornada o atleta" }, // "Doble jornada" is very natural for heavy exercisers
                ],
                training: [
                    "No, no quiero entrenar",
                    "Sí, entreno en casa",
                    "Sí, entreno en el gimnasio"
                ],
                chocolate: [
                    "No, no quiero chocolate",
                    "Chocolate Blanco",
                    "Chocolate Amargo" // "Amargo" is very common for Dark choco
                ]
            }
        },
        offer: {
            badge: "Oferta / CTA",
            title: "Dieta Personalizada",
            subtitle: "Nutrición accesible para ti",
            priceText: "Dieta personalizada por menos de [Moneda Local] (aprox. $2 USD)",
            priceSub: "Por un precio accesible",
            features: [
                "Plan alimenticio completo",
                "Calorías totales de tu dieta",
                "Basado en tus preferencias",
                "Cantidades exactas de cada alimento",
                "Recetas fitness",
                "Horario sugerido para cada comida", // "Sugerido" implies flexibility
            ],
            cta: "Crear mi dieta",
            secure: "🔒 Pago seguro",
        },
    },
    plans: {
        header: "Elige tu plan",
        subHeader: "Selecciona la mejor opción para ti",
        featuresMock: {
            goal: "Objetivo: Definición Muscular",
            changeGoal: "Cambiar objetivo",
        },
        items: [
            {
                id: "basic",
                name: "Plan 1: Básico",
                title: "Plan Definición Muscular",
                price: "9.99",
                currency: "$",
                features: [
                    "Plan personalizado",
                    "Cantidades exactas de alimentos", // "de los" -> "de" sounds cleaner
                    "Monitoreo de progreso", // "Monitorea tu" -> "Monitoreo de" (Noun phrase)
                    "Soporte por correo",
                ],
                cta: "Elegir Plan",
            },
            {
                id: "bestseller",
                name: "Plan 2: Best Seller",
                label: "⭐ Más vendido",
                title: "Tu Dieta + Entrenamiento",
                price: "14.99",
                currency: "$",
                features: [
                    "Plan personalizado",
                    "Plan de entrenamiento incluido",
                    "Modificar Dieta",
                    "Recetas Fitness",
                    "Soporte vía WhatsApp",
                    "Guías de suplementación",
                ],
                cta: "Elegir Plan",
                highlight: true,
            },
            {
                id: "recommended",
                name: "Plan 3: Recomendado",
                label: "🔥 Recomendado",
                title: "Plan Completo",
                price: "15.99",
                currency: "$",
                features: [
                    "Libertad para modificar tu dieta",
                    "Entrenamientos con GIFs",
                    "Recetas Fitness",
                    "Horarios de comidas",
                    "Lista de sustituciones",
                    "Guía de Whey y Creatina",
                ],
                cta: "Elegir Plan",
                highlight: true,
            },
            {
                id: "premium",
                name: "Plan 4: Premium",
                title: "Completo",
                subtitle: "Consulta con Nutricionista",
                price: "29.99",
                currency: "$",
                features: [
                    "Todo lo de los planes anteriores",
                    "Seguimiento nutricional",
                    "Entrenamientos personalizados",
                    "Asesoría completa",
                    "Soporte prioritario",
                ],
                cta: "Elegir Plan",
            },
        ],
    },
};

// Polished items for natural reading
export const BREAKFAST_ITEMS = [
    { id: "pan_pollo", emoji: "🥖", name: "Pan con Pollo" },
    { id: "pan_huevo", emoji: "🍳", name: "Pan con Huevo" },
    { id: "pan_queso", emoji: "🧀", name: "Pan con Queso" },
    { id: "pan_jamon_queso", emoji: "🥪", name: "Pan Jamón y Queso" },
    { id: "arepa_queso", emoji: "🌮", name: "Arepa / Quesadilla" },
    { id: "arepa_pollo", emoji: "🌮", name: "Arepa / Taco de Pollo" },
    { id: "arepa_maiz_huevo", emoji: "🌽", name: "Arepa / Tortilla" },
    { id: "pan_bono", emoji: "🧀", name: "Pan de Bono" },
    { id: "omelette", emoji: "🍳", name: "Omelette" },
    { id: "manzana", emoji: "🍎", name: "Manzana" },
    { id: "banana", emoji: "🍌", name: "Banana" },
    { id: "papaya", emoji: "🥭", name: "Papaya" },
    { id: "cafe_leche", emoji: "☕", name: "Café con Leche" },
    { id: "cafe", emoji: "☕", name: "Café Negro" },
    { id: "yogur", emoji: "🥛", name: "Yogur" },
];

export const LUNCH_ITEMS = [
    { id: "arroz", emoji: "🍚", name: "Arroz" },
    { id: "frijoles", emoji: "🫘", name: "Frijoles / Caraotas" },
    { id: "polenta", emoji: "🌽", name: "Polenta / Maíz" },
    { id: "pastas", emoji: "🍝", name: "Pastas" },
    { id: "camote", emoji: "🍠", name: "Camote / Batata" },
    { id: "yuca", emoji: "🥔", name: "Yuca / Mandioca" },
    { id: "name", emoji: "🥔", name: "Ñame / Papa" },
    { id: "papa", emoji: "🥔", name: "Papa Cocida" },
    { id: "calabaza", emoji: "🎃", name: "Calabaza / Zapallo" },
    { id: "pollo_plancha", emoji: "🍗", name: "Pollo Plancha" },
    { id: "carne_asada", emoji: "🥩", name: "Carne Asada" },
    { id: "carne_plancha", emoji: "🥩", name: "Bistec Plancha" },
    { id: "cerdo", emoji: "🐖", name: "Lomo de Cerdo" },
    { id: "carne_molida", emoji: "🥩", name: "Carne Molida" },
    { id: "pescado", emoji: "🐟", name: "Pescado" },
    { id: "ensalada_mixta", emoji: "🍅", name: "Ensalada Mixta" },
    { id: "ensalada_lechuga", emoji: "🥬", name: "Ensalada Verde" },
    { id: "ensalada_veg", emoji: "🥗", name: "Vegetales Cocidos" },
];
