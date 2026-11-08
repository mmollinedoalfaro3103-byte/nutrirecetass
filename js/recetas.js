/* ==========================================
   NUTRIRECETAS - BASE DE DATOS
   21 recetas distribuidas por categoría
========================================== */

const recetas = [
{
  id: 1,
  nombre: "Majadito de pollo",
  categoria: "Almuerzo",
  origen: "Boliviana",
  nutricion: "General",
  imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Majadito%20o%20majau.jpg",
  tiempo: "40 minutos",
  calorias: 420, proteinas: 28, carbohidratos: 48, grasas: 12, fibra: 5,
  ingredientes: ["150 g de pollo", "1 taza de arroz", "1 tomate", "1/2 cebolla", "Achiote"],
  preparacion: ["Cocinar el pollo.", "Preparar un ahogado con cebolla y tomate.", "Agregar el arroz.", "Incorporar el pollo y servir."]
},
{
  id: 2,
  nombre: "Quinoa con verduras",
  categoria: "Almuerzo",
  origen: "Boliviana",
  nutricion: "General",
  imagen: "https://d2yoo3qu6vrk5d.cloudfront.net/pulzo-lite/images-resized/PP322R-s-o.webp",
  tiempo: "25 minutos",
  calorias: 320, proteinas: 12, carbohidratos: 48, grasas: 9, fibra: 7,
  ingredientes: ["1 taza de quinoa cocida", "1 zanahoria", "1/2 pimiento", "Arvejas", "Aceite"],
  preparacion: ["Lavar y cocinar la quinoa.", "Picar las verduras.", "Saltear las verduras.", "Mezclar con la quinoa."]
},
{
  id: 3,
  nombre: "Sopa de verduras",
  categoria: "Cena",
  origen: "Boliviana",
  nutricion: "General",
  imagen: "https://www.bekiacocina.com/images/cocina/0000/669-c.jpg",
  tiempo: "30 minutos",
  calorias: 180, proteinas: 6, carbohidratos: 30, grasas: 4, fibra: 6,
  ingredientes: ["1 papa", "1 zanahoria", "Zapallo", "Cebolla", "Agua"],
  preparacion: ["Cortar las verduras.", "Colocar en una olla con agua.", "Cocinar hasta que estén tiernas."]
},
{
  id: 4,
  nombre: "Tostadas con pollo, palta y tomate",
  categoria: "Desayuno",
  origen: "Internacional",
  nutricion: "Deportista",
  imagen: "https://www.bekiacocina.com/images/cocina/0000/669-c.jpg",
  tiempo: "15 minutos",
  calorias: 360, proteinas: 27, carbohidratos: 34, grasas: 13, fibra: 7,
  ingredientes: ["2 rebanadas de pan integral", "80 g de pollo cocido desmenuzado", "1/4 de palta", "1/2 tomate", "Limón"],
  preparacion: ["Tostar las rebanadas de pan.", "Mezclar el pollo con unas gotas de limón.", "Cortar la palta y el tomate.", "Distribuir los ingredientes sobre las tostadas y servir."]
},
{
  id: 5,
  nombre: "Tortilla de avena y huevo",
  categoria: "Desayuno",
  origen: "Internacional",
  nutricion: "Deportista",
  imagen: "https://images.mrcook.app/recipe-image/01917bb5-9089-7877-907a-8aad913bf681",
  tiempo: "15 minutos",
  calorias: 380, proteinas: 23, carbohidratos: 38, grasas: 14, fibra: 5,
  ingredientes: ["2 huevos", "1/2 taza de avena", "Tomate", "Espinaca"],
  preparacion: ["Batir los huevos.", "Agregar la avena.", "Incorporar las verduras.", "Cocinar en una sartén."]
},
{
  id: 6,
  nombre: "Avena cocida con manzana y canela",
  categoria: "Desayuno",
  origen: "Internacional",
  nutricion: "Diabetes",
  imagen: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=700",
  tiempo: "12 minutos",
  calorias: 260, proteinas: 8, carbohidratos: 43, grasas: 7, fibra: 7,
  ingredientes: ["1/2 taza de avena", "1 taza de leche o bebida sin azúcar", "1/2 manzana", "Canela al gusto", "Agua si es necesario"],
  preparacion: ["Colocar la avena y la leche en una olla.", "Cocinar a fuego bajo, removiendo.", "Agregar la manzana picada y la canela.", "Cocinar hasta lograr la consistencia deseada y servir."]
},
{
  id: 7,
  nombre: "Pescado al horno con brócoli",
  categoria: "Cena",
  origen: "Internacional",
  nutricion: "Diabetes",
  imagen: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/baked_hake_with_broccoli.jpg",
  tiempo: "30 minutos",
  calorias: 290, proteinas: 32, carbohidratos: 12, grasas: 13, fibra: 5,
  ingredientes: ["150 g de pescado", "Brócoli", "Zanahoria", "Limón", "Ajo"],
  preparacion: ["Condimentar el pescado.", "Colocar en una fuente.", "Agregar las verduras.", "Hornear hasta cocinar."]
},
{
  id: 8,
  nombre: "Licuado de papaya y naranja",
  categoria: "Bebida",
  origen: "Internacional",
  nutricion: "Bajar de peso",
  imagen: "https://www.netdeal.com.br/api/images/producao.spayce.com.br/1776101128905_2025_07_04_edicasevitamina_de_mamao_cenoura_e_laranjaimagem_tatiana_bralnina_shutterstock_uow1xre.jpg",
  tiempo: "5 minutos",
  calorias: 110, proteinas: 2, carbohidratos: 27, grasas: 0, fibra: 3,
  ingredientes: ["1 taza de papaya en cubos", "1 naranja", "1/2 taza de agua fría", "Hielo al gusto"],
  preparacion: ["Pelar la naranja y retirar las semillas.", "Colocar la papaya, la naranja y el agua en la licuadora.", "Licuar hasta integrar.", "Agregar hielo y servir sin azúcar añadida."]
},
{
  id: 9,
  nombre: "Crema de zapallo",
  categoria: "Cena",
  origen: "Boliviana",
  nutricion: "Bajar de peso",
  imagen: "https://www.encancha.cl/resizer/v2/crema-de-zapallo-ALDOWWYK3ZBFTCOHVROQBEU4GI.png?height=800&quality=70&width=1200",
  tiempo: "30 minutos",
  calorias: 190, proteinas: 5, carbohidratos: 32, grasas: 6, fibra: 5,
  ingredientes: ["2 tazas de zapallo", "Cebolla", "Zanahoria", "Agua", "Pimienta"],
  preparacion: ["Cortar las verduras.", "Cocinar en agua.", "Procesar hasta obtener una crema.", "Calentar y servir."]
},
{
  id: 10,
  nombre: "Batido de banana y avena",
  categoria: "Desayuno",
  origen: "Internacional",
  nutricion: "Subir de peso",
  imagen: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/banana_smoothie.jpg",
  tiempo: "5 minutos",
  calorias: 430, proteinas: 16, carbohidratos: 65, grasas: 13, fibra: 8,
  ingredientes: ["1 banana", "1 taza de leche", "1/2 taza de avena", "Mantequilla de maní"],
  preparacion: ["Colocar los ingredientes en la licuadora.", "Licuar hasta obtener una mezcla homogénea.", "Servir."]
},
{
  id: 11,
  nombre: "Panqueques de avena y banana",
  categoria: "Desayuno",
  origen: "Internacional",
  nutricion: "Especial",
  imagen: "https://moncoachgourmand.com/_next/image?q=75&url=https%3A%2F%2Fstatic.moncoachgourmand.com%2Frecipes%2Fpancakes-avoine-banane-etape-3.webp&w=1920",
  tiempo: "15 minutos",
  calorias: 330, proteinas: 12, carbohidratos: 52, grasas: 9, fibra: 6,
  ingredientes: ["1 banana madura", "1 huevo", "1/2 taza de avena molida", "1/4 cucharadita de polvo de hornear", "Canela al gusto"],
  preparacion: ["Aplastar la banana en un recipiente.", "Agregar el huevo, la avena, el polvo de hornear y la canela.", "Mezclar hasta integrar.", "Cocinar porciones pequeñas en una sartén antiadherente por ambos lados."]
},
{
  id: 12,
  nombre: "Salteado de tofu y verduras",
  categoria: "Cena",
  origen: "Internacional",
  nutricion: "Especial",
  imagen: "https://cdn.knuspr.de/images/meals/large/recipe_2858_1777328177682_tofu-vegetable-stir-fry-with-broccoli-and-peppers_1aee1cea.jpg",
  tiempo: "20 minutos",
  calorias: 280, proteinas: 17, carbohidratos: 24, grasas: 13, fibra: 6,
  ingredientes: ["120 g de tofu", "Brócoli", "Zanahoria", "Pimiento", "Aceite"],
  preparacion: ["Cortar el tofu.", "Picar las verduras.", "Saltear las verduras.", "Agregar el tofu y cocinar."]
},
{
  id: 13,
  nombre: "Majadito de pollo saludable",
  categoria: "Almuerzo",
  origen: "Boliviana",
  nutricion: "General",
  imagen: "https://pxcdn.eldeber.com.bo/eldeber/20465/092025/1757287476887.jpg?ch=630&cw=1200",
  tiempo: "40 minutos",
  calorias: 390, proteinas: 30, carbohidratos: 46, grasas: 10, fibra: 4,
  ingredientes: [
    "150 g de pechuga de pollo sin piel",
    "1 taza de arroz cocido",
    "1 tomate",
    "1/2 cebolla",
    "1/2 zanahoria rallada",
    "1 cucharadita de aceite",
    "Achiote, ajo y sal moderada"
  ],
  preparacion: [
    "Cocinar el pollo en agua con ajo y una pizca de sal.",
    "Desmenuzar el pollo y reservar un poco del caldo.",
    "Preparar un ahogado con cebolla, tomate, zanahoria y achiote usando poco aceite.",
    "Agregar el arroz cocido y mezclar.",
    "Incorporar el pollo desmenuzado y un poco de caldo.",
    "Cocinar unos minutos y servir."
  ]
},
{
  id: 14,
  nombre: "Batido energético de avena y plátano",
  categoria: "Merienda",
  origen: "Internacional",
  nutricion: "Deportista",
  imagen: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/banana_smoothie.jpg",
  tiempo: "5 minutos",
  calorias: 320, proteinas: 13, carbohidratos: 52, grasas: 8, fibra: 7,
  ingredientes: [
    "1 plátano mediano",
    "1/3 taza de avena",
    "1 taza de leche",
    "1 cucharadita de mantequilla de maní",
    "Canela al gusto",
    "Hielo al gusto"
  ],
  preparacion: [
    "Pelar y cortar el plátano.",
    "Colocar el plátano, la avena y la leche en la licuadora.",
    "Agregar la mantequilla de maní y la canela.",
    "Licuar hasta obtener una mezcla homogénea.",
    "Agregar hielo si se desea y servir."
  ]
},
{
  id: 15,
  nombre: "Ensalada de quinua con pollo",
  categoria: "Almuerzo",
  origen: "Boliviana",
  nutricion: "Deportista",
  imagen: "https://itsonly.recipes/images/recipeimages/herb-infused-quinoa-chicken-salad.webp",
  tiempo: "25 minutos",
  calorias: 380, proteinas: 32, carbohidratos: 38, grasas: 11, fibra: 7,
  ingredientes: [
    "1 taza de quinua cocida",
    "120 g de pechuga de pollo",
    "1/2 tomate",
    "1/2 pepino",
    "1/4 pimiento",
    "Jugo de medio limón",
    "1 cucharadita de aceite de oliva"
  ],
  preparacion: [
    "Lavar la quinua y cocinarla hasta que esté tierna.",
    "Cocinar la pechuga de pollo y cortarla en trozos.",
    "Lavar y picar el tomate, pepino y pimiento.",
    "Mezclar la quinua con las verduras.",
    "Agregar el pollo, el limón y el aceite de oliva.",
    "Mezclar y servir."
  ]
},
{
  id: 16,
  nombre: "Limonada de frutilla sin azúcar",
  categoria: "Bebida",
  origen: "Internacional",
  nutricion: "General",
  imagen: "https://www.therandomrecipe.com/_next/image?q=75&url=https%3A%2F%2Fd2aq0yf1s46hyj.cloudfront.net%2Ftherandomrecipe%2Fdrinks%2F71.png&w=3840",
  tiempo: "10 minutos",
  calorias: 45, proteinas: 1, carbohidratos: 11, grasas: 0, fibra: 2,
  ingredientes: [
    "1 taza de frutillas frescas",
    "2 limones",
    "2 tazas de agua fría",
    "Hojas de menta",
    "Hielo al gusto"
  ],
  preparacion: [
    "Lavar y retirar las hojas de las frutillas.",
    "Exprimir los limones.",
    "Licuar las frutillas con una taza de agua.",
    "Mezclar con el jugo de limón y el resto del agua.",
    "Agregar hielo y hojas de menta.",
    "Servir sin añadir azúcar."
  ]
},
{
  id: 17,
  nombre: "Sopa de quinua con verduras",
  categoria: "Almuerzo",
  origen: "Boliviana",
  nutricion: "General",
  imagen: "https://itsonly.recipes/images/recipeimages/hearty-vegetable-quinoa-soup.webp",
  tiempo: "35 minutos",
  calorias: 230, proteinas: 9, carbohidratos: 39, grasas: 5, fibra: 7,
  ingredientes: [
    "1/2 taza de quinua",
    "1 papa mediana",
    "1 zanahoria",
    "1/2 taza de zapallo",
    "1/2 taza de arvejas",
    "1/2 cebolla",
    "1 litro de agua o caldo de verduras",
    "Perejil y sal moderada"
  ],
  preparacion: [
    "Lavar la quinua varias veces.",
    "Picar la papa, zanahoria, zapallo y cebolla.",
    "Colocar el agua o caldo en una olla.",
    "Agregar la cebolla, zanahoria, papa y zapallo.",
    "Incorporar la quinua y cocinar durante unos 20 minutos.",
    "Agregar las arvejas y continuar cocinando hasta que todo esté tierno.",
    "Añadir perejil y servir caliente."
  ]
},
{
  id: 18,
  nombre: "Hamburguesa de garbanzo",
  categoria: "Cena",
  origen: "Internacional",
  nutricion: "Especial",
  imagen: "https://scrolldiction.com/api/app/content/69948e287756e15eaf509546",
  tiempo: "30 minutos",
  calorias: 340, proteinas: 15, carbohidratos: 48, grasas: 10, fibra: 10,
  ingredientes: [
    "1 taza de garbanzos cocidos",
    "1/4 cebolla picada",
    "1 diente de ajo",
    "2 cucharadas de avena molida",
    "1 cucharadita de perejil",
    "1/2 cucharadita de comino",
    "1 cucharadita de aceite",
    "Pan integral y verduras para acompañar"
  ],
  preparacion: [
    "Escurrir los garbanzos cocidos.",
    "Aplastarlos con un tenedor hasta formar una pasta.",
    "Agregar la cebolla, el ajo, el perejil y el comino.",
    "Incorporar la avena molida para dar consistencia.",
    "Formar hamburguesas con las manos.",
    "Cocinar en una sartén con poco aceite hasta dorar ambos lados.",
    "Servir en pan integral con verduras frescas."
  ]
},
{
  id: 19,
  nombre: "Yogur con frutas y semillas",
  categoria: "Merienda",
  origen: "Internacional",
  nutricion: "General",
  imagen: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/yogurt_with_chia_seeds.jpg",
  tiempo: "5 minutos",
  calorias: 210, proteinas: 10, carbohidratos: 28, grasas: 7, fibra: 4,
  ingredientes: ["1 taza de yogur natural", "1/2 taza de frutillas o fruta de temporada", "1 cucharada de chía", "1 cucharada de avena"],
  preparacion: ["Colocar el yogur en un recipiente.", "Lavar y cortar las frutas.", "Añadir las frutas, la chía y la avena.", "Mezclar y servir."]
},
{
  id: 20,
  nombre: "Tostadas de palta y tomate",
  categoria: "Merienda",
  origen: "Internacional",
  nutricion: "General",
  imagen: "https://comabien.es/images/recetas/bocadillos-sandwiches/tostada-aguacate-tomate-banner.jpg",
  tiempo: "10 minutos",
  calorias: 190, proteinas: 5, carbohidratos: 24, grasas: 9, fibra: 6,
  ingredientes: ["1 rebanada grande de pan integral", "1/4 de palta", "1/2 tomate", "Unas gotas de limón", "Pimienta al gusto"],
  preparacion: ["Tostar el pan.", "Aplastar la palta con unas gotas de limón.", "Cortar el tomate en rodajas.", "Untar la palta sobre el pan, añadir el tomate y servir."]
},
{
  id: 21,
  nombre: "Agua fresca de piña y hierbabuena",
  categoria: "Bebida",
  origen: "Internacional",
  nutricion: "General",
  imagen: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=700",
  tiempo: "10 minutos",
  calorias: 55, proteinas: 0, carbohidratos: 14, grasas: 0, fibra: 1,
  ingredientes: ["1 taza de piña en cubos", "2 tazas de agua fría", "Hojas de hierbabuena", "Jugo de 1/2 limón", "Hielo al gusto"],
  preparacion: ["Colocar la piña y una taza de agua en la licuadora.", "Licuar y, si se desea, colar.", "Añadir el resto del agua, el limón y la hierbabuena.", "Agregar hielo y servir sin azúcar añadida."]
},
];

// ==========================================
// 105 RECETAS ADICIONALES
// IDs del 22 al 126
// ==========================================

const recetasAdicionales = [
[22,"Ensalada tibia de arroz integral","Almuerzo","Internacional","General",["1 taza de arroz integral cocido","1/2 zanahoria","1/2 taza de choclo","1/4 pimiento","Limón y aceite de oliva"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],

[23,"Omelette de espinaca y queso","Desayuno","Internacional","General",["2 huevos","1 taza de espinaca","30 g de queso fresco","1 tomate pequeño"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],

[24,"Pollo al horno con camote","Almuerzo","Internacional","General",["150 g de pollo","1 camote mediano","1/2 cebolla","Ajo y orégano"],"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700"],

[25,"Sopa de lentejas casera","Cena","Internacional","General",["1/2 taza de lentejas","1 zanahoria","1/2 cebolla","1 tomate","Agua y comino"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],

[26,"Ensalada de tomate y queso fresco","Cena","Internacional","General",["1 tomate grande","50 g de queso fresco","Hojas de lechuga","Limón y orégano"],"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"],

[27,"Tortilla de verduras","Desayuno","Internacional","General",["2 huevos","1/2 zanahoria rallada","1/4 pimiento","1/2 taza de espinaca"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],

[28,"Arroz con huevo y vegetales","Desayuno","Internacional","General",["1 taza de arroz cocido","1 huevo","1/2 taza de arvejas","1/2 zanahoria","Cebolla"],"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700"],

[29,"Crema de zanahoria","Cena","Internacional","General",["2 zanahorias","1/2 papa","1/4 cebolla","Agua o caldo de verduras"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],

[30,"Yogur con avena y durazno","Merienda","Internacional","General",["1 taza de yogur natural","1/2 durazno","2 cucharadas de avena","Canela"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],

[31,"Galletas caseras de avena","Merienda","Internacional","General",["1 taza de avena","1 banana madura","1 huevo","Canela"],"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700"],

[32,"Licuado de mango natural","Bebida","Internacional","General",["1/2 mango","1 taza de leche","1/2 taza de agua","Hielo"],"https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700"],

[33,"Agua de limón y pepino","Bebida","Internacional","General",["1/2 pepino","1 limón","2 tazas de agua","Hojas de menta"],"https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=700"],

[34,"Avena con huevo y plátano","Desayuno","Internacional","Deportista",["1/2 taza de avena","2 huevos","1 plátano","1 taza de leche"],"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=700"],

[35,"Sándwich integral de pavo","Desayuno","Internacional","Deportista",["2 panes integrales","100 g de pavo","Tomate","Lechuga","Palta"],"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700"],

[36,"Arroz con pollo y brócoli","Almuerzo","Internacional","Deportista",["150 g de pollo","1 taza de arroz","1 taza de brócoli","Ajo"],"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700"],

[37,"Pasta integral con atún","Almuerzo","Internacional","Deportista",["1 taza de pasta integral cocida","1 lata de atún al agua","Tomate","Cebolla"],"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700"],

[38,"Carne magra con papa cocida","Almuerzo","Boliviana","Deportista",["150 g de carne magra","1 papa mediana","Ensalada verde","Limón"],"https://images.unsplash.com/photo-1544025162-d76694265947?w=700"],

[39,"Tortilla de claras con espinaca","Desayuno","Internacional","Deportista",["3 claras y 1 huevo","1 taza de espinaca","2 cucharadas de avena"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],

[40,"Bowl de quinoa y huevo","Desayuno","Boliviana","Deportista",["1 taza de quinoa cocida","2 huevos","Tomate","Pepino","Palta"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],

[41,"Pechuga con puré de camote","Almuerzo","Internacional","Deportista",["150 g de pechuga","1 camote","1/4 taza de leche","Pimienta"],"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700"],

[42,"Pescado con arroz y verduras","Cena","Internacional","Deportista",["150 g de pescado","3/4 taza de arroz","Zanahoria","Brócoli","Limón"],"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=700"],

[43,"Tortilla de papa al horno","Cena","Boliviana","Deportista",["1 papa","2 huevos","Cebolla","Perejil"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],

[44,"Ensalada de garbanzos y atún","Cena","Internacional","Deportista",["1/2 taza de garbanzos","1/2 lata de atún","Tomate","Pepino"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],

[45,"Panqueques de avena y yogur","Desayuno","Internacional","Deportista",["1/2 taza de avena","1 huevo","1/2 taza de yogur","Canela"],"https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=700"],

[46,"Batido de cacao y leche","Bebida","Internacional","Deportista",["1 taza de leche","1 banana","1 cucharadita de cacao","2 cucharadas de avena"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],

[47,"Tostadas con ricota y miel","Merienda","Internacional","Deportista",["2 tostadas integrales","3 cucharadas de ricota","1 cucharadita de miel"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],

[48,"Yogur con granola y banana","Merienda","Internacional","Deportista",["1 taza de yogur","1/3 taza de granola","1/2 banana"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],

[49,"Licuado de avena y frutilla","Bebida","Internacional","Deportista",["1 taza de leche","5 frutillas","1/4 taza de avena","Hielo"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],

[50,"Batido de mango y yogur","Bebida","Internacional","Deportista",["1/2 mango","1 taza de yogur","1/2 taza de agua"],"https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700"],
[51,"Huevos revueltos con tomate","Desayuno","Internacional","Diabetes",["2 huevos","1 tomate","1/2 taza de espinaca","Pimienta"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[52,"Yogur natural con chía","Desayuno","Internacional","Diabetes",["1 taza de yogur natural sin azúcar","1 cucharada de chía","1/4 taza de frutillas"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],
[53,"Porridge de avena y nueces","Desayuno","Internacional","Diabetes",["1/3 taza de avena","1 taza de leche sin azúcar","1 cucharada de nueces","Canela"],"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=700"],
[54,"Pollo a la plancha con ensalada","Almuerzo","Internacional","Diabetes",["150 g de pollo","Lechuga","Pepino","Tomate","Limón"],"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700"],
[55,"Pescado con coliflor al vapor","Almuerzo","Internacional","Diabetes",["150 g de pescado","1 taza de coliflor","1/2 zanahoria","Ajo"],"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=700"],
[56,"Carne magra con ensalada de repollo","Almuerzo","Internacional","Diabetes",["120 g de carne magra","1 taza de repollo","1/2 tomate","Limón"],"https://images.unsplash.com/photo-1544025162-d76694265947?w=700"],
[57,"Sopa de pollo y verduras","Cena","Internacional","Diabetes",["100 g de pollo","Zapallo","Apio","Zanahoria","Agua"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[58,"Zapallitos rellenos de verduras","Cena","Internacional","Diabetes",["2 zapallitos","Tomate","Cebolla","1/4 taza de queso fresco"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[59,"Ensalada de huevo y palta","Cena","Internacional","Diabetes",["2 huevos cocidos","1/4 palta","Lechuga","Pepino","Limón"],"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700"],
[60,"Tortilla de champiñones","Desayuno","Internacional","Diabetes",["2 huevos","1/2 taza de champiñones","Cebolla","Perejil"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[61,"Pan integral con queso fresco","Desayuno","Internacional","Diabetes",["1 rebanada de pan integral","40 g de queso fresco","Tomate"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[62,"Berenjena al horno con pollo","Almuerzo","Internacional","Diabetes",["1 berenjena","100 g de pollo","Tomate","Ajo","Orégano"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[63,"Ensalada de atún y porotos verdes","Almuerzo","Boliviana","Diabetes",["1/2 lata de atún","1 taza de porotos verdes","Tomate","Limón"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[64,"Crema de coliflor","Cena","Internacional","Diabetes",["1 taza de coliflor","1/4 cebolla","1/2 taza de leche sin azúcar","Nuez moscada"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[65,"Rollitos de lechuga con pollo","Cena","Internacional","Diabetes",["4 hojas de lechuga","100 g de pollo","Pepino","Yogur natural"],"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700"],
[66,"Pepino con queso fresco","Merienda","Internacional","Diabetes",["1 pepino","40 g de queso fresco","Orégano"],"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"],
[67,"Puñado de nueces y almendras","Merienda","Internacional","Diabetes",["10 almendras","3 nueces","Agua"],"https://images.unsplash.com/photo-1505576633757-0ac1084af824?w=700"],
[68,"Huevo duro con tomate cherry","Cena","Internacional","Diabetes",["1 huevo","6 tomates cherry","Pimienta"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[69,"Agua de frutilla y limón sin azúcar","Bebida","Internacional","Diabetes",["4 frutillas","1 limón","2 tazas de agua","Hielo"],"https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=700"],

[70,"Tostada integral con huevo","Desayuno","Internacional","Bajar de peso",["1 rebanada integral","1 huevo","Tomate","Espinaca"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[71,"Yogur con papaya","Desayuno","Boliviana","Bajar de peso",["1 taza de yogur natural","1/2 taza de papaya","Canela"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],
[72,"Avena con pera","Desayuno","Internacional","Bajar de peso",["1/3 taza de avena","1 taza de leche descremada","1/2 pera","Canela"],"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=700"],
[73,"Pescado a la plancha con ensalada","Almuerzo","Internacional","Bajar de peso",["150 g de pescado","Lechuga","Tomate","Pepino","Limón"],"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=700"],
[74,"Pollo salteado con verduras","Almuerzo","Internacional","Bajar de peso",["120 g de pollo","Brócoli","Zanahoria","Pimiento","Salsa de soja reducida"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[75,"Ensalada de lentejas y pepino","Almuerzo","Internacional","Bajar de peso",["1/2 taza de lentejas cocidas","Pepino","Tomate","Perejil","Limón"],"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700"],
[76,"Caldo de verduras con pollo","Cena","Internacional","Bajar de peso",["100 g de pollo","Zapallo","Apio","Zanahoria","Cebolla"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[77,"Berenjena rellena de quinoa","Cena","Boliviana","Bajar de peso",["1 berenjena","1/2 taza de quinoa cocida","Tomate","Cebolla"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[78,"Ensalada de atún y hojas verdes","Cena","Internacional","Bajar de peso",["1/2 lata de atún al agua","Lechuga","Rúcula","Pepino","Limón"],"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"],
[79,"Omelette de tomate y albahaca","Desayuno","Internacional","Bajar de peso",["1 huevo y 2 claras","Tomate","Albahaca","Pimienta"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[80,"Batido de yogur y frutos rojos","Desayuno","Internacional","Bajar de peso",["1 taza de yogur natural","1/2 taza de frutos rojos","Hielo"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],
[81,"Pavo al horno con verduras","Almuerzo","Internacional","Bajar de peso",["120 g de pavo","Zapallito","Zanahoria","Cebolla","Romero"],"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700"],
[82,"Ensalada de garbanzos y pepino","Almuerzo","Internacional","Bajar de peso",["1/2 taza de garbanzos","Pepino","Tomate","Perejil","Limón"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[83,"Sopa ligera de zapallito","Cena","Internacional","Bajar de peso",["2 zapallitos","1/4 cebolla","1/2 papa pequeña","Agua"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[84,"Revuelto de tofu con espinaca","Cena","Internacional","Bajar de peso",["100 g de tofu","1 taza de espinaca","Champiñones","Ajo"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[85,"Manzana con yogur natural","Merienda","Internacional","Bajar de peso",["1 manzana pequeña","1/2 taza de yogur natural","Canela"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],
[86,"Zanahoria y hummus","Merienda","Internacional","Bajar de peso",["1 zanahoria","3 cucharadas de hummus"],"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"],
[87,"Gelatina con fruta fresca","Merienda","Internacional","Bajar de peso",["1 porción de gelatina sin azúcar","1/4 taza de fruta picada"],"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700"],
[88,"Agua de naranja y menta","Bebida","Internacional","Bajar de peso",["1/2 naranja","2 tazas de agua","Menta","Hielo"],"https://images.unsplash.com/photo-1497534446932-c925b458314e?w=700"],

[89,"Panqueques de banana y ricota","Desayuno","Internacional","Subir de peso",["1 banana","1 huevo","1/2 taza de ricota","1/3 taza de avena"],"https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=700"],
[90,"Avena cremosa con mantequilla de maní","Desayuno","Internacional","Subir de peso",["1/2 taza de avena","1 taza de leche","1 cucharada de mantequilla de maní","Banana"],"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=700"],
[91,"Sándwich de huevo y palta","Desayuno","Internacional","Subir de peso",["2 panes integrales","2 huevos","1/2 palta","Tomate"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[92,"Arroz con carne y verduras","Almuerzo","Internacional","Subir de peso",["150 g de carne","1 taza de arroz","Zanahoria","Arvejas"],"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700"],
[93,"Pasta con pollo y salsa de yogur","Almuerzo","Internacional","Subir de peso",["1 taza de pasta","120 g de pollo","1/2 taza de yogur natural","Espinaca"],"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700"],
[94,"Quinoa cremosa con queso","Desayuno","Boliviana","Subir de peso",["1 taza de quinoa cocida","50 g de queso","1/2 taza de choclo","Leche"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[95,"Lasaña de verduras y ricota","Almuerzo","Internacional","Subir de peso",["Láminas de pasta","1/2 taza de ricota","Espinaca","Tomate"],"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=700"],
[96,"Pollo al horno con arroz","Almuerzo","Internacional","Subir de peso",["150 g de pollo","1 taza de arroz","Zanahoria","Ajo"],"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700"],
[97,"Puré de papa con pescado","Cena","Boliviana","Subir de peso",["150 g de pescado","1 papa grande","1/4 taza de leche","Perejil"],"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=700"],
[98,"Tortilla de queso y verduras","Cena","Internacional","Subir de peso",["2 huevos","50 g de queso","Zapallito","Pimiento"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[99,"Crema de zapallo con semillas","Cena","Boliviana","Subir de peso",["2 tazas de zapallo","1/2 taza de leche","1 cucharada de semillas","Cebolla"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[100,"Sopa de fideos y pollo","Cena","Internacional","Subir de peso",["100 g de pollo","1/2 taza de fideos","Zanahoria","Apio","Caldo"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[101,"Tostadas con ricota y fruta","Merienda","Internacional","Subir de peso",["2 tostadas","1/3 taza de ricota","1/2 taza de fruta"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[102,"Batido de palta y cacao","Bebida","Internacional","Subir de peso",["1/4 palta","1 taza de leche","1 cucharadita de cacao","Banana"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],
[103,"Yogur con frutos secos","Merienda","Internacional","Subir de peso",["1 taza de yogur","2 cucharadas de nueces","1 cucharada de pasas"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],
[104,"Pan de banana casero","Merienda","Internacional","Subir de peso",["1 banana","1 huevo","1/2 taza de avena","Canela"],"https://images.unsplash.com/photo-1606101273944-845c7e02d7c7?w=700"],
[105,"Batido de avena y dátiles","Bebida","Internacional","Subir de peso",["1 taza de leche","1/3 taza de avena","2 dátiles","Canela"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],
[106,"Licuado de papaya y yogur","Bebida","Boliviana","Subir de peso",["1 taza de papaya","1 taza de yogur","1 cucharada de avena"],"https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700"],
[107,"Leche con banana y canela","Bebida","Internacional","Subir de peso",["1 taza de leche","1 banana","Canela","Hielo"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],
[108,"Batido de frutilla y avena","Bebida","Internacional","Subir de peso",["1 taza de leche","5 frutillas","1/4 taza de avena"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"],

[109,"Tostada de hummus y pepino","Desayuno","Internacional","Especial",["1 rebanada integral","3 cucharadas de hummus","Pepino","Pimentón"],"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"],
[110,"Pudín de chía con bebida vegetal","Desayuno","Internacional","Especial",["3 cucharadas de chía","1 taza de bebida vegetal","Vainilla","Frutillas"],"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700"],
[111,"Revuelto de tofu y tomate","Desayuno","Internacional","Especial",["120 g de tofu","1 tomate","Espinaca","Cúrcuma"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[112,"Bowl de arroz y tofu","Almuerzo","Internacional","Especial",["1 taza de arroz","120 g de tofu","Zanahoria","Brócoli","Salsa de soja"],"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700"],
[113,"Ensalada de quinoa y garbanzos","Almuerzo","Boliviana","Especial",["1/2 taza de quinoa","1/2 taza de garbanzos","Pepino","Tomate","Limón"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[114,"Pasta de lentejas con verduras","Almuerzo","Internacional","Especial",["1 taza de pasta de lentejas","Tomate","Zapallito","Albahaca"],"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700"],
[115,"Tacos de porotos negros","Almuerzo","Boliviana","Especial",["2 tortillas de maíz","1/2 taza de porotos negros","Tomate","Lechuga","Palta"],"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=700"],
[116,"Pastel de papa y soja texturizada","Almuerzo","Boliviana","Especial",["1 papa grande","1/2 taza de soja texturizada","Tomate","Cebolla"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[117,"Sopa de tofu y champiñones","Cena","Internacional","Especial",["100 g de tofu","1/2 taza de champiñones","Cebolla de verdeo","Caldo"],"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
[118,"Zapallo relleno de quinoa","Cena","Boliviana","Especial",["1/2 zapallo pequeño","1/2 taza de quinoa","Pimiento","Cebolla"],"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"],
[119,"Hamburguesa de lentejas al horno","Cena","Internacional","Especial",["1 taza de lentejas cocidas","2 cucharadas de avena","Ajo","Perejil"],"https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700"],
[120,"Ensalada de edamame y verduras","Cena","Internacional","Especial",["1/2 taza de edamame","Pepino","Zanahoria","Repollo","Limón"],"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"],
[121,"Muffins de avena y manzana","Merienda","Internacional","Especial",["1 taza de avena","1 manzana","1 huevo","Canela"],"https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=700"],
[122,"Hummus con bastones de verduras","Merienda","Internacional","Especial",["1/2 taza de garbanzos","Limón","Tahini","Zanahoria","Pepino"],"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"],
[123,"Fruta fresca con semillas","Merienda","Internacional","Especial",["1 taza de fruta de temporada","1 cucharada de semillas de zapallo"],"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700"],
[124,"Licuado vegetal de mango","Bebida","Internacional","Especial",["1/2 mango","1 taza de bebida de avena","Hielo"],"https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700"],
[125,"Agua de pepino y hierbabuena","Bebida","Internacional","Especial",["1/2 pepino","Hierbabuena","2 tazas de agua","Limón"],"https://images.unsplash.com/photo-1497534446932-c925b458314e?w=700"],
[126,"Batido de cacao y bebida de soja","Bebida","Internacional","Especial",["1 taza de bebida de soja","1 cucharadita de cacao","1/2 banana"],"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700"]
];

// ==========================================
// IMÁGENES SEGÚN CATEGORÍA
// ==========================================

const imagenPorCategoria = {
  Desayuno: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=700",
  Almuerzo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
  Cena: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700",
  Merienda: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700",
  Bebida: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700"
};

// ==========================================
// PASOS DE PREPARACIÓN
// ==========================================

function pasosPreparacion(categoria) {
  if (categoria === "Desayuno") {
    return [
      "Lavar y preparar los ingredientes.",
      "Cortar o mezclar los ingredientes.",
      "Cocinar en sartén u olla a fuego medio si corresponde.",
      "Servir recién preparado."
    ];
  }

  if (categoria === "Almuerzo") {
    return [
      "Lavar y preparar los ingredientes.",
      "Cocinar el cereal, legumbre o acompañamiento si corresponde.",
      "Cocinar la proteína y las verduras hasta que estén tiernas.",
      "Combinar, condimentar y servir."
    ];
  }

  if (categoria === "Cena") {
    return [
      "Lavar y cortar los ingredientes.",
      "Cocinar en olla, sartén u horno según corresponda.",
      "Verificar que los ingredientes estén bien cocidos.",
      "Servir caliente o templado."
    ];
  }

  if (categoria === "Merienda") {
    return [
      "Lavar y preparar los ingredientes.",
      "Cortar, mezclar o triturar según la preparación.",
      "Integrar hasta obtener una mezcla uniforme.",
      "Servir."
    ];
  }

  return [
    "Lavar y cortar las frutas o verduras.",
    "Colocar los ingredientes en una licuadora o jarra.",
    "Procesar o mezclar hasta integrar.",
    "Agregar agua o hielo si se desea y servir."
  ];
}

// ==========================================
// AGREGAR LAS RECETAS A LA BASE DE DATOS
// ==========================================

recetas.push(...recetasAdicionales.map(([id, nombre, categoria, origen, nutricion, ingredientes, imagen]) => {

  const caloriasBase = {
    Desayuno: 260,
    Almuerzo: 390,
    Cena: 280,
    Merienda: 180,
    Bebida: 100
  }[categoria];

  const ajuste = {
    General: 0,
    Deportista: 90,
    Diabetes: -20,
    "Bajar de peso": -50,
    "Subir de peso": 130,
    Especial: 10
  }[nutricion];

  const calorias = caloriasBase + ajuste + (id % 17);

  return {
    id,
    nombre,
    categoria,
    origen,
    nutricion,
    ingredientes,
    imagen: imagen || imagenPorCategoria[categoria],

    tiempo: categoria === "Almuerzo" ? "30 minutos"
      : categoria === "Cena" ? "25 minutos"
      : categoria === "Desayuno" ? "15 minutos"
      : categoria === "Merienda" ? "10 minutos"
      : "8 minutos",

    calorias,
    proteinas: Math.max(2, Math.round(calorias * 0.1 / 4)),
    carbohidratos: Math.round(calorias * 0.48 / 4),
    grasas: Math.round(calorias * 0.28 / 9),
    fibra: 3 + (id % 5),
    preparacion: pasosPreparacion(categoria)
  };
}));

// Actualizar la variable global
window.recetas = recetas;

console.log("Total de recetas:", recetas.length);

window.recetas = recetas;

console.log("Recetas cargadas:", recetas.length);

console.table(
  ["Desayuno", "Almuerzo", "Cena", "Merienda", "Bebida"].map(categoria => ({
    categoria,
    cantidad: recetas.filter(receta => receta.categoria === categoria).length
  }))
);