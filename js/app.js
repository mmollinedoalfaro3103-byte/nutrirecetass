
/* ==========================================
   NUTRIRECETAS - FUNCIONES DE LA PÁGINA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    
    // ==========================================
    // MENÚ RESPONSIVE PARA CELULARES
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    // Abrir y cerrar el menú
    menuToggle?.addEventListener("click", () => {

        const abierto = nav.classList.toggle("nav-open");

        menuToggle.textContent = abierto ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            String(abierto)
        );

        menuToggle.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });

    // Cerrar el menú al seleccionar una opción
    nav?.querySelectorAll("a").forEach(enlace => {

        enlace.addEventListener("click", () => {

            nav.classList.remove("nav-open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Abrir menú");
        });

    });

    // Cerrar el menú al tocar fuera
    document.addEventListener("click", e => {

        if (
            nav &&
            menuToggle &&
            !nav.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            nav.classList.remove("nav-open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Abrir menú");
        }

    });


    // ==========================================
    // BASE DE DATOS Y ELEMENTOS
    // ==========================================

    const recetas = window.recetas || [];

    const recipeGrid = document.getElementById("recipeGrid");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const originFilter = document.getElementById("originFilter");

    const dialog = document.getElementById("recipeDialog");
    const dialogContent = document.getElementById("dialogContent");
    const dialogClose = document.getElementById("dialogClose");

    const favoritesGrid = document.getElementById("favoritesGrid");
    const favoritesEmpty = document.getElementById("favoritesEmpty");

    const profileForm = document.getElementById("profileForm");
    const profileMessage = document.getElementById("profileMessage");

    const recommendationTitle =
        document.getElementById("recommendationTitle");

    const recommendationText =
        document.getElementById("recommendationText");

    const recommendationBox =
        document.getElementById("recommendationBox");

    const recipeRecommendationText =
        document.getElementById("recipeRecommendationText");

    // ==========================================
    // ESTADO DE LA APLICACIÓN
    // ==========================================

    let favoritos = [];

    try {
        favoritos = JSON.parse(
            localStorage.getItem("recetasFavoritas") || "[]"
        ).map(Number);
    } catch (error) {
        favoritos = [];
    }

    let categoriaNutricional = "Todas";
    let perfilActivo = null;

    const adaptaciones = {
        General: "Recetas variadas para una alimentación equilibrada.",
        Deportista: "Opciones que pueden acompañar la actividad física.",
        Diabetes: "Revisa los carbohidratos y las porciones con orientación profesional.",
        "Bajar de peso": "Considera las porciones y la variedad de alimentos.",
        "Subir de peso": "Puedes adaptar las porciones según tus necesidades.",
        Especial: "Revisa ingredientes, alérgenos y sustituciones necesarias."
    };

    // ==========================================
    // UTILIDADES
    // ==========================================

    function normalizar(texto) {
        return String(texto || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function obtenerIngredientes(receta) {
        if (Array.isArray(receta.ingredientes)) {
            return receta.ingredientes.join(" ").toLowerCase();
        }

        return String(receta.ingredientes || "").toLowerCase();
    }

    function guardarFavoritos() {
        localStorage.setItem(
            "recetasFavoritas",
            JSON.stringify(favoritos)
        );
    }

    // ==========================================
    // COMPATIBILIDAD ALIMENTARIA
    // ==========================================

    function evaluarPreferencia(receta, preferencia) {

        const ingredientes = normalizar(
            obtenerIngredientes(receta)
        );

        if (!preferencia || preferencia === "Todas") {
            return {
                compatible: true,
                advertencia: ""
            };
        }

        if (!ingredientes) {
            return {
                compatible: true,
                advertencia: "No hay suficientes datos de ingredientes para comprobar esta preferencia."
            };
        }

        const contiene = (lista) =>
            lista.some(palabra => ingredientes.includes(palabra));

        const carnesYPescados = [
            "carne", "res", "cerdo", "pollo", "pavo",
            "jamon", "tocino", "chorizo", "salchicha",
            "pescado", "atun", "sardina", "salmon",
            "mariscos", "camaron", "langostino",
            "caldo de carne", "caldo de pollo"
        ];

        const productosAnimales = [
            ...carnesYPescados,
            "huevo", "leche", "queso", "yogur",
            "yogurt", "mantequilla", "crema de leche",
            "nata", "miel", "gelatina"
        ];

        const lacteos = [
            "leche", "queso", "yogur", "yogurt",
            "mantequilla", "crema de leche", "nata",
            "suero de leche", "leche en polvo"
        ];

        const gluten = [
            "harina de trigo", "trigo", "cebada",
            "centeno", "pan", "fideos", "pasta",
            "macarrones", "cuscus", "semola",
            "galleta", "galletas", "avena",
            "salsa de soja", "salsa soya"
        ];

        if (preferencia === "Vegetariana") {
            if (contiene(carnesYPescados)) {
                return {
                    compatible: false,
                    advertencia: "Contiene ingredientes de carne o pescado."
                };
            }
        }

        if (preferencia === "Vegana") {
            if (contiene(productosAnimales)) {
                return {
                    compatible: false,
                    advertencia: "Contiene ingredientes de origen animal."
                };
            }
        }

        if (preferencia === "Sin lactosa") {

            const tieneLacteo = contiene(lacteos);

            const tieneDeslactosado =
                ingredientes.includes("deslactosada") ||
                ingredientes.includes("deslactosado");

            if (tieneLacteo && !tieneDeslactosado) {
                return {
                    compatible: false,
                    advertencia: "Podría contener lácteos con lactosa."
                };
            }
        }

        if (preferencia === "Sin gluten") {
            if (contiene(gluten)) {
                return {
                    compatible: false,
                    advertencia: "Contiene o podría contener ingredientes con gluten."
                };
            }
        }

        return {
            compatible: true,
            advertencia: ""
        };
    }

    // ==========================================
    // EVALUAR UNA RECETA SEGÚN EL PERFIL
    // ==========================================

    function evaluarReceta(receta, perfil) {

        let puntuacion = 0;
        const razones = [];
        const advertencias = [];

        if (!perfil) {
            return {
                compatible: true,
                puntuacion: 0,
                razones: [],
                advertencias: []
            };
        }

        // OBJETIVO ALIMENTICIO
        if (receta.nutricion === perfil.objetivo) {
            puntuacion += 5;
            razones.push("Coincide con tu objetivo alimenticio.");
        }

        // ACTIVIDAD FÍSICA
        const proteinas = Number(receta.proteinas) || 0;
        const carbohidratos = Number(receta.carbohidratos) || 0;

        if (perfil.actividad === "Alta") {

            if (proteinas >= 15) puntuacion += 2;
            if (carbohidratos >= 30) puntuacion += 1;

            razones.push(
                "Se considera tu nivel alto de actividad física."
            );

        } else if (perfil.actividad === "Moderada") {

            if (proteinas >= 8) puntuacion += 1;

            razones.push(
                "Se considera tu actividad física moderada."
            );

        } else {
            razones.push(
                "Se considera tu nivel bajo de actividad física."
            );
        }

        // PREFERENCIA ALIMENTARIA
        const preferencia = evaluarPreferencia(
            receta,
            perfil.preferencia
        );

        if (!preferencia.compatible) {
            return {
                compatible: false,
                puntuacion: puntuacion,
                razones: razones,
                advertencias: [preferencia.advertencia]
            };
        }

        if (perfil.preferencia !== "Todas") {
            puntuacion += 2;
            razones.push(
                "No se detectaron ingredientes incompatibles con tu preferencia."
            );
        }

        if (preferencia.advertencia) {
            advertencias.push(preferencia.advertencia);
        }

        // CONDICIÓN DE SALUD
        const condicion = perfil.condicion || "Ninguna";

        if (
            condicion === "Intolerancia lactosa" ||
            condicion === "Celiaquia"
        ) {

            const preferenciaCondicion =
                condicion === "Intolerancia lactosa"
                    ? "Sin lactosa"
                    : "Sin gluten";

            const evaluacionCondicion = evaluarPreferencia(
                receta,
                preferenciaCondicion
            );

            if (!evaluacionCondicion.compatible) {
                return {
                    compatible: false,
                    puntuacion: puntuacion,
                    razones: razones,
                    advertencias: [evaluacionCondicion.advertencia]
                };
            }

            puntuacion += 2;

            razones.push(
                "No se detectaron ingredientes incompatibles en la lista disponible."
            );

            advertencias.push(
                "Comprueba las etiquetas y la posible contaminación cruzada."
            );
        }

        if (condicion === "Diabetes") {
            razones.push(
                "Se muestra información de carbohidratos para revisar las porciones."
            );

            advertencias.push(
                "La cantidad de carbohidratos y las porciones deben evaluarse individualmente."
            );
        }

        if (condicion === "Hipertension") {
            advertencias.push(
                "No se dispone de información completa sobre sodio; no es posible verificar que la receta sea baja en sal."
            );
        }

        if (condicion === "Enfermedad renal") {
            advertencias.push(
                "No se registran todos los datos de potasio, fósforo y sodio. Consulta con un profesional antes de elegir estas recetas."
            );
        }

        if (condicion === "Otra") {
            advertencias.push(
                "Revisa los ingredientes y consulta si la receta es compatible con tu condición de salud."
            );
        }

        // EDAD
        if (Number(perfil.edad) < 18) {
            advertencias.push(
                "En menores de 18 años, las necesidades nutricionales dependen del crecimiento y requieren una valoración específica."
            );
        }

        // PESO Y ALTURA
        if (
            Number(perfil.edad) >= 18 &&
            Number(perfil.peso) > 0 &&
            Number(perfil.altura) > 0
        ) {
            razones.push(
                "Se registraron tu peso y altura para mostrar un dato orientativo en tu perfil."
            );
        }

        return {
            compatible: true,
            puntuacion: puntuacion,
            razones: razones,
            advertencias: [...new Set(advertencias)]
        };
    }

    // ==========================================
    // CREAR TARJETA DE RECETA
    // ==========================================

    function crearTarjeta(receta) {

        const favorito = favoritos.includes(receta.id);

        let indicador = "";

        if (perfilActivo) {

            const evaluacion = evaluarReceta(
                receta,
                perfilActivo
            );

            if (evaluacion.razones.length > 0) {
                indicador = `
                    <p class="recipe-match">
                        ✦ Recomendación según tu perfil
                    </p>
                `;
            }
        }

        return `
            <article class="recipe-card">

                <div class="recipe-image">

                    <img
                        src="${receta.imagen}"
                        alt="${receta.nombre}"
                        loading="lazy"
                    >

                    <button
                        class="favorite-btn"
                        data-favorite="${receta.id}"
                        aria-label="Agregar o quitar favorito"
                        type="button"
                    >
                        ${favorito ? "♥" : "♡"}
                    </button>

                </div>

                <div class="recipe-content">

                    <span class="recipe-category">
                        ${receta.categoria}
                    </span>

                    <h3>${receta.nombre}</h3>

                    <p>⏱ ${receta.tiempo}</p>

                    <p>🔥 ${receta.calorias} kcal estimadas</p>

                    ${indicador}

                    <button
                        class="btn btn-primary"
                        data-detail="${receta.id}"
                        type="button"
                    >
                        Ver receta →
                    </button>

                </div>

            </article>
        `;
    }

    // ==========================================
    // MOSTRAR Y FILTRAR RECETAS
    // ==========================================

    function mostrarRecetas() {

        if (!recipeGrid) return;

        const texto = normalizar(searchInput?.value || "");
        const categoria = categoryFilter?.value || "Todas";
        const origen = originFilter?.value || "Todos";

        let filtradas = recetas.filter(receta => {

            const nombre = normalizar(receta.nombre);

            const ingredientes = normalizar(
                obtenerIngredientes(receta)
            );

            const coincideTexto =
                nombre.includes(texto) ||
                ingredientes.includes(texto);

            const coincideCategoria =
                categoria === "Todas" ||
                receta.categoria === categoria;

            const coincideOrigen =
                origen === "Todos" ||
                receta.origen === origen;

            const coincideNutricion =
                categoriaNutricional === "Todas" ||
                normalizar(receta.nutricion) ===
                normalizar(categoriaNutricional);

            return (
                coincideTexto &&
                coincideCategoria &&
                coincideOrigen &&
                coincideNutricion
            );
        });

        if (perfilActivo) {

            filtradas = filtradas
                .map(receta => ({
                    receta: receta,
                    evaluacion: evaluarReceta(receta, perfilActivo)
                }))
                .filter(item => item.evaluacion.compatible)
                .sort((a, b) =>
                    b.evaluacion.puntuacion -
                    a.evaluacion.puntuacion
                )
                .map(item => item.receta);
        }

        recipeGrid.innerHTML = filtradas
            .map(crearTarjeta)
            .join("");

        const empty = document.getElementById("emptyMessage");

        if (empty) {
            empty.hidden = filtradas.length > 0;
        }

        if (recipeRecommendationText) {

            if (perfilActivo && categoriaNutricional === "Todas") {

                recipeRecommendationText.textContent =
                    `Encontramos ${filtradas.length} recetas compatibles con los criterios disponibles de tu perfil. Las primeras tienen mayor coincidencia con tu objetivo y actividad.`;

            } else if (categoriaNutricional !== "Todas") {

                recipeRecommendationText.textContent =
                    `Se muestran ${filtradas.length} recetas de la categoría ${categoriaNutricional}.`;

            } else {

                recipeRecommendationText.textContent =
                    "Consulta ingredientes, preparación y valores nutricionales estimados.";
            }
        }
    }

    // ==========================================
    // MOSTRAR FAVORITOS
    // ==========================================

    function mostrarFavoritos() {

        if (!favoritesGrid) return;

        const lista = recetas.filter(receta =>
            favoritos.includes(receta.id)
        );

        favoritesGrid.innerHTML = lista
            .map(crearTarjeta)
            .join("");

        if (favoritesEmpty) {
            favoritesEmpty.hidden = lista.length > 0;
        }
    }

    // ==========================================
    // DETALLES DE UNA RECETA
    // ==========================================

    function verDetalle(id) {

        const receta = recetas.find(
            item => item.id === Number(id)
        );

        if (!receta || !dialog || !dialogContent) return;

        let informacionPerfil = "";

        if (perfilActivo) {

            const evaluacion = evaluarReceta(
                receta,
                perfilActivo
            );

            informacionPerfil = `
                <h3>Relación con tu perfil</h3>

                ${
                    evaluacion.razones.length
                        ? `<ul>${evaluacion.razones.map(
                            razon => `<li>${razon}</li>`
                        ).join("")}</ul>`
                        : "<p>Esta receta no presenta coincidencias destacadas con tu perfil.</p>"
                }

                ${
                    evaluacion.advertencias.length
                        ? `<h3>Observaciones importantes</h3>
                           <ul>${evaluacion.advertencias.map(
                               aviso => `<li>${aviso}</li>`
                           ).join("")}</ul>`
                        : ""
                }
            `;
        }

        dialogContent.innerHTML = `

            <img
                src="${receta.imagen}"
                alt="${receta.nombre}"
                style="
                    width:100%;
                    max-height:260px;
                    object-fit:cover;
                    border-radius:12px;
                "
            >

            <h2>${receta.nombre}</h2>

            <p>
                ${receta.categoria} | ${receta.origen}
            </p>

            <p>
                Tiempo de preparación: ${receta.tiempo}
            </p>

            <h3>Información nutricional estimada</h3>

            <ul>
                <li>Calorías: ${receta.calorias} kcal</li>
                <li>Proteínas: ${receta.proteinas} g</li>
                <li>Carbohidratos: ${receta.carbohidratos} g</li>
                <li>Grasas: ${receta.grasas} g</li>
                <li>Fibra: ${receta.fibra} g</li>
            </ul>

            <h3>Ingredientes</h3>

            <ul>
                ${receta.ingredientes.map(
                    ingrediente => `<li>${ingrediente}</li>`
                ).join("")}
            </ul>

            <h3>Preparación</h3>

            <ol>
                ${receta.preparacion.map(
                    paso => `<li>${paso}</li>`
                ).join("")}
            </ol>

            <h3>Adaptación nutricional</h3>

            <p>
                ${adaptaciones[receta.nutricion] || adaptaciones.General}
            </p>

            ${informacionPerfil}

            <p>
                <small>
                    Los valores nutricionales son aproximados.
                    En algunas recetas se utilizan estimaciones.
                    Verifica ingredientes, porciones y etiquetas.
                    Esta información no sustituye una evaluación profesional.
                </small>
            </p>

            <button
                class="btn btn-primary"
                data-favorite="${receta.id}"
                type="button"
            >
                ${favoritos.includes(receta.id)
                    ? "♥ Quitar de favoritos"
                    : "♡ Agregar a favoritos"}
            </button>
        `;

        if (!dialog.open) {
            dialog.showModal();
        }
    }

    // ==========================================
    // FAVORITOS
    // ==========================================

    function alternarFavorito(id) {

        id = Number(id);

        if (favoritos.includes(id)) {
            favoritos = favoritos.filter(x => x !== id);
        } else {
            favoritos.push(id);
        }

        guardarFavoritos();
        mostrarRecetas();
        mostrarFavoritos();

        if (dialog?.open) {
            verDetalle(id);
        }
    }

    // ==========================================
    // EVENTOS DE LOS BOTONES
    // ==========================================

    document.addEventListener("click", e => {

        const favorito = e.target.closest("[data-favorite]");
        const detalle = e.target.closest("[data-detail]");
        const nutricion = e.target.closest(".nutrition-category");

        if (favorito) {
            alternarFavorito(favorito.dataset.favorite);
            return;
        }

        if (detalle) {
            verDetalle(detalle.dataset.detail);
            return;
        }

        if (nutricion) {

            categoriaNutricional =
                nutricion.dataset.nutrition;

            perfilActivo = null;

            document.querySelectorAll(".nutrition-category")
                .forEach(b => {
                    b.classList.toggle(
                        "active",
                        b.dataset.nutrition === categoriaNutricional
                    );
                });

            const titulo = document.querySelector(
                "#recetas .section-heading h2"
            );

            if (titulo) {
                titulo.textContent =
                    "Recetas: " + categoriaNutricional;
            }

            if (searchInput) searchInput.value = "";
            if (categoryFilter) categoryFilter.value = "Todas";
            if (originFilter) originFilter.value = "Todos";

           mostrarRecetas();

document.getElementById("recetas")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
        }
    });

    // ==========================================
    // BUSCADOR Y FILTROS
    // ==========================================

    searchInput?.addEventListener("input", mostrarRecetas);
    categoryFilter?.addEventListener("change", mostrarRecetas);
    originFilter?.addEventListener("change", mostrarRecetas);

    // ==========================================
    // CERRAR VENTANA
    // ==========================================

    dialogClose?.addEventListener("click", () => {
        dialog?.close();
    });

    dialog?.addEventListener("click", e => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

    // ==========================================
    // GENERAR GUÍA ALIMENTARIA PERSONALIZADA
    // ==========================================

    function generarGuiaAlimentaria(perfil) {

        const incluir = [
            "Frutas variadas, preferentemente enteras.",
            "Verduras de diferentes colores.",
            "Legumbres como lentejas, garbanzos y porotos.",
            "Cereales integrales y tubérculos según tus necesidades.",
            "Fuentes de proteínas como huevo, pescado, pollo o alternativas vegetales.",
            "Agua durante el día, ajustando la cantidad a tus necesidades."
        ];

        const moderar = [
            "Bebidas azucaradas y refrescos.",
            "Productos ultraprocesados de consumo frecuente.",
            "Dulces y productos con azúcares añadidos.",
            "Alimentos con exceso de sal.",
            "Frituras frecuentes y preparaciones con exceso de grasas."
        ];

        const habitos = [
            "Mantener horarios de alimentación regulares.",
            "Incorporar frutas y verduras en las comidas.",
            "Beber agua a lo largo del día.",
            "Prestar atención a las señales de hambre y saciedad.",
            "Realizar actividad física adecuada a tu condición.",
            "Procurar un descanso suficiente."
        ];

        const observaciones = [];

        // OBJETIVO
        switch (perfil.objetivo) {

            case "Deportista":
                incluir.push(
                    "Alimentos con proteínas para apoyar la recuperación muscular.",
                    "Fuentes de carbohidratos como arroz, avena, papa y frutas."
                );

                habitos.push(
                    "Organizar las comidas alrededor de los horarios de entrenamiento.",
                    "Mantener una hidratación adecuada durante la actividad física."
                );
                break;

            case "Bajar de peso":
                incluir.push(
                    "Alimentos ricos en fibra, como verduras, frutas y legumbres.",
                    "Fuentes de proteínas que contribuyan a la saciedad."
                );

                habitos.push(
                    "Priorizar cambios alimentarios sostenibles y evitar dietas extremas.",
                    "Respetar las señales de hambre y saciedad."
                );
                break;

            case "Subir de peso":
                incluir.push(
                    "Frutos secos y semillas.",
                    "Aguacate y otras fuentes de grasas saludables.",
                    "Preparaciones nutritivas con mayor aporte energético."
                );

                habitos.push(
                    "Mantener comidas regulares e incorporar colaciones si son necesarias."
                );
                break;
        }

        // CONDICIONES DE SALUD
        switch (perfil.condicion) {

            case "Diabetes":
                incluir.push(
                    "Verduras, legumbres y alimentos ricos en fibra."
                );

                moderar.push(
                    "Bebidas azucaradas y productos con grandes cantidades de azúcar añadido."
                );

                observaciones.push(
                    "La cantidad y distribución de carbohidratos debe adaptarse individualmente. No modifiques medicamentos ni tratamientos por esta guía."
                );
                break;

            case "Hipertension":
                moderar.push(
                    "Embutidos, sopas instantáneas y productos con alto contenido de sodio."
                );

                observaciones.push(
                    "Revisa el contenido de sodio en las etiquetas y sigue las indicaciones del profesional que lleva tu control."
                );
                break;

            case "Intolerancia lactosa":
                incluir.push(
                    "Productos sin lactosa o alternativas vegetales fortificadas, según tu tolerancia."
                );

                observaciones.push(
                    "Comprueba las etiquetas de los productos y considera tu tolerancia individual."
                );
                break;

            case "Celiaquia":
                incluir.push(
                    "Arroz, maíz, quinoa y papa como opciones naturalmente libres de gluten."
                );

                moderar.push(
                    "Productos con trigo, cebada o centeno."
                );

                observaciones.push(
                    "Utiliza productos certificados sin gluten y evita la contaminación cruzada durante la preparación."
                );
                break;

            case "Enfermedad renal":
                observaciones.push(
                    "Las necesidades de proteínas, potasio, fósforo, sodio y líquidos varían según cada persona y la etapa de la enfermedad. Esta guía no establece restricciones renales: consulta con un nutricionista o nefrólogo."
                );
                break;

            case "Otra":
                observaciones.push(
                    "Consulta con un profesional para determinar qué alimentos son adecuados para tu condición."
                );
                break;
        }

        // PREFERENCIAS ALIMENTARIAS
        switch (perfil.preferencia) {

            case "Vegetariana":
                incluir.push(
                    "Legumbres, frutos secos, semillas y, si los consumes, huevos y lácteos."
                );
                break;

            case "Vegana":
                incluir.push(
                    "Legumbres, tofu, frutos secos y semillas.",
                    "Alimentos fortificados que aporten calcio y vitamina B12."
                );

                observaciones.push(
                    "Una alimentación vegana requiere planificar nutrientes como vitamina B12, hierro, calcio y proteínas."
                );
                break;

            case "Sin lactosa":
                incluir.push(
                    "Bebidas vegetales fortificadas y productos lácteos sin lactosa, si los toleras."
                );
                break;

            case "Sin gluten":
                incluir.push(
                    "Arroz, maíz, quinoa y productos certificados sin gluten."
                );

                observaciones.push(
                    "Verifica que los productos no tengan contaminación cruzada con gluten."
                );
                break;
        }

        // EDAD
        if (Number(perfil.edad) < 18) {
            observaciones.push(
                "Durante la adolescencia el cuerpo continúa creciendo. Evita las dietas restrictivas y busca orientación profesional antes de realizar cambios importantes."
            );
        }

        // ACTIVIDAD FÍSICA
        if (perfil.actividad === "Alta") {
            habitos.push(
                "Planificar la alimentación y la hidratación de acuerdo con la intensidad del ejercicio."
            );
        }

        if (perfil.actividad === "Baja") {
            habitos.push(
                "Incorporar movimiento de forma gradual y adaptada a tus posibilidades."
            );
        }

        // ELIMINAR ELEMENTOS REPETIDOS
        const listaIncluir = [...new Set(incluir)];
        const listaModerar = [...new Set(moderar)];
        const listaHabitos = [...new Set(habitos)];
        const listaObservaciones = [...new Set(observaciones)];

        // CONSTRUIR HTML
        return `
            <div class="food-guide">

                <h3>🥗 Alimentos que puedes incluir</h3>

                <ul>
                    ${listaIncluir.map(item =>
                        `<li>${item}</li>`
                    ).join("")}
                </ul>

                <h3>⚖️ Alimentos que conviene moderar</h3>

                <ul>
                    ${listaModerar.map(item =>
                        `<li>${item}</li>`
                    ).join("")}
                </ul>

                <h3>🌿 Hábitos saludables</h3>

                <ul>
                    ${listaHabitos.map(item =>
                        `<li>${item}</li>`
                    ).join("")}
                </ul>

                ${
                    listaObservaciones.length
                        ? `
                            <div class="food-observations">

                                <h3>📌 Importante para tu perfil</h3>

                                <ul>
                                    ${listaObservaciones.map(item =>
                                        `<li>${item}</li>`
                                    ).join("")}
                                </ul>

                            </div>
                        `
                        : ""
                }

                <p class="food-guide-note">
                    Esta guía tiene fines educativos.
                    No constituye una dieta personalizada,
                    diagnóstico ni tratamiento médico.
                    Las necesidades nutricionales varían
                    según cada persona.
                </p>

            </div>
        `;
    }

    // ==========================================
    // MOSTRAR RECOMENDACIÓN DEL PERFIL
    // ==========================================

    function mostrarRecomendacion(perfil) {

        if (!recommendationTitle ||
            !recommendationText ||
            !recommendationBox) return;

        const mensajes = {
            General: [
                "Alimentación equilibrada",
                "Se priorizarán recetas variadas que pueden formar parte de una alimentación equilibrada."
            ],

            Deportista: [
                "Rendimiento deportivo",
                "Se dará prioridad a preparaciones con aportes estimados de proteínas y carbohidratos que pueden acompañar tu actividad física."
            ],

            Diabetes: [
                "Alimentación para diabetes",
                "Se mostrará información sobre carbohidratos y fibra para que puedas revisar las porciones con orientación profesional."
            ],

            "Bajar de peso": [
                "Control de peso",
                "Se priorizarán recetas de la categoría seleccionada, sin considerar que una sola receta determine el control de peso."
            ],

            "Subir de peso": [
                "Aumentar de peso",
                "Se priorizarán preparaciones de la categoría seleccionada, considerando que las necesidades energéticas son individuales."
            ]
        };

        const mensaje =
            mensajes[perfil.objetivo] || mensajes.General;

        recommendationTitle.textContent = mensaje[0];

        let recomendacion = mensaje[1];

        const edad = Number(perfil.edad);
        const peso = Number(perfil.peso);
        const altura = Number(perfil.altura);

        recomendacion += ` Edad registrada: ${edad} años.`;
        recomendacion += ` Actividad física: ${perfil.actividad}.`;

        if (peso > 0) {
            recomendacion += ` Peso registrado: ${peso} kg.`;
        }

        if (altura > 0) {
            recomendacion += ` Altura registrada: ${altura} cm.`;
        }

        if (edad >= 18 && peso > 0 && altura > 0) {

            const alturaMetros = altura / 100;
            const imc = peso / (alturaMetros * alturaMetros);

            recomendacion +=
                ` IMC orientativo: ${imc.toFixed(1)}. No constituye un diagnóstico.`;
        }

        if (edad < 18) {
            recomendacion +=
                " Al ser menor de 18 años, no se aplican criterios de IMC de adultos; se necesita una valoración específica del crecimiento.";
        }

        recomendacion +=
            ` Preferencia alimentaria: ${perfil.preferencia}.`;

        recomendacion +=
            ` Condición indicada: ${perfil.condicion}.`;

        if (perfil.condicion === "Diabetes") {
            recomendacion +=
                " Revisa carbohidratos y porciones con un profesional.";
        }

        if (perfil.condicion === "Hipertension") {
            recomendacion +=
                " No contamos con datos completos de sodio para verificar recetas bajas en sal.";
        }

        if (perfil.condicion === "Enfermedad renal") {
            recomendacion +=
                " No contamos con datos completos de potasio, fósforo y sodio para recomendar recetas como seguras.";
        }

        if (perfil.condicion === "Celiaquia") {
            recomendacion +=
                " Se revisarán ingredientes que podrían contener gluten, pero debes comprobar etiquetas y contaminación cruzada.";
        }

        if (perfil.condicion === "Intolerancia lactosa") {
            recomendacion +=
                " Se revisarán ingredientes lácteos, pero verifica las etiquetas de cada producto.";
        }

        if (perfil.condicion === "Otra") {
            recomendacion +=
                " Consulta con un profesional para adaptar las recetas a tu condición.";
        }

        recommendationText.textContent = recomendacion;

        // CREAR O ACTUALIZAR LA GUÍA ALIMENTARIA
        let foodGuide = recommendationBox.querySelector("#foodGuide");

        if (!foodGuide) {
            foodGuide = document.createElement("div");
            foodGuide.id = "foodGuide";
            recommendationBox.appendChild(foodGuide);
        }

        foodGuide.innerHTML = generarGuiaAlimentaria(perfil);

        recommendationBox.hidden = false;
    }

    // ==========================================
    // GUARDAR PERFIL NUTRICIONAL
    // ==========================================

    profileForm?.addEventListener("submit", e => {

        e.preventDefault();

        const edad = Number(
            document.getElementById("edad").value
        );

        const pesoTexto =
            document.getElementById("peso").value;

        const alturaTexto =
            document.getElementById("altura").value;

        const peso = Number(pesoTexto);
        const altura = Number(alturaTexto);

        if (!Number.isFinite(edad) || edad < 1 || edad > 120) {
            profileMessage.textContent =
                "Ingresa una edad válida.";
            return;
        }

        if (
            pesoTexto &&
            (!Number.isFinite(peso) || peso < 2 || peso > 500)
        ) {
            profileMessage.textContent =
                "Ingresa un peso válido.";
            return;
        }

        if (
            alturaTexto &&
            (!Number.isFinite(altura) || altura < 40 || altura > 250)
        ) {
            profileMessage.textContent =
                "Ingresa una altura válida en centímetros.";
            return;
        }

        const perfil = {
            edad: edad,
            peso: pesoTexto ? peso : "",
            altura: alturaTexto ? altura : "",
            actividad: document.getElementById("actividad").value,
            objetivo: document.getElementById("objetivo").value,
            preferencia: document.getElementById("preferencia").value,
            condicion: document.getElementById("condicion").value
        };

        try {
            localStorage.setItem(
                "perfilNutricional",
                JSON.stringify(perfil)
            );
        } catch (error) {
            profileMessage.textContent =
                "No se pudo guardar el perfil en este navegador.";
            return;
        }

        perfilActivo = perfil;
        categoriaNutricional = "Todas";

        document.querySelectorAll(".nutrition-category")
            .forEach(b => b.classList.remove("active"));

        const titulo = document.querySelector(
            "#recetas .section-heading h2"
        );

        if (titulo) {
            titulo.textContent = "Recetas para tu perfil";
        }

        if (searchInput) searchInput.value = "";
        if (categoryFilter) categoryFilter.value = "Todas";
        if (originFilter) originFilter.value = "Todos";

      mostrarRecomendacion(perfil);
      mostrarRecetas();

      profileMessage.textContent =
          "¡Tu perfil se guardó correctamente! Tus recomendaciones están listas.";

// Ir directamente a las recomendaciones
requestAnimationFrame(() => {
    recommendationBox?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
    });

    // ==========================================
    // RECUPERAR PERFIL GUARDADO
    // ==========================================

    let perfilGuardado = null;

    try {
        perfilGuardado = JSON.parse(
            localStorage.getItem("perfilNutricional") || "null"
        );
    } catch (error) {
        perfilGuardado = null;
    }

    if (perfilGuardado) {

        const campos = [
            "edad",
            "peso",
            "altura",
            "actividad",
            "objetivo",
            "preferencia",
            "condicion"
        ];

        campos.forEach(campo => {

            const elemento =
                document.getElementById(campo);

            if (
                elemento &&
                perfilGuardado[campo] !== undefined
            ) {
                elemento.value = perfilGuardado[campo];
            }
        });

        perfilActivo = perfilGuardado;
        mostrarRecomendacion(perfilGuardado);
    }

    // ==========================================
    // AÑO DEL PIE DE PÁGINA
    // ==========================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ==========================================
    // INICIAR APLICACIÓN
    // ==========================================

    categoriaNutricional = "Todas";

    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "Todas";
    if (originFilter) originFilter.value = "Todos";

    document.querySelectorAll(".nutrition-category")
        .forEach(b => b.classList.remove("active"));

    const titulo = document.querySelector(
        "#recetas .section-heading h2"
    );

    if (titulo) {
        titulo.textContent = perfilActivo
            ? "Recetas para tu perfil"
            : "Recetas para descubrir";
    }

    mostrarRecetas();
    mostrarFavoritos();

    console.log(
        "NutriRecetas iniciada correctamente.",
        "Recetas disponibles:",
        recetas.length
    );

});
