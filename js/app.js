
/* ==========================================
   NUTRIRECETAS - FUNCIONES DE LA PÁGINA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

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

    // Categoría seleccionada manualmente.
    let categoriaNutricional = "Todas";

    // Perfil guardado y utilizado para recomendar.
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

        // CON PERFIL: DESCARTAR INCOMPATIBILIDADES
        // Y ORDENAR SEGÚN LOS DATOS DEL USUARIO.

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

            // Al elegir una categoría manualmente,
            // se deja de aplicar el orden del perfil.
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

            document.getElementById("recetas")
                ?.scrollIntoView({ behavior: "smooth" });
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

        // Activar el perfil y quitar el filtro exacto
        // de las categorías nutricionales.
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

        // Reiniciar los filtros
        if (searchInput) searchInput.value = "";
        if (categoryFilter) categoryFilter.value = "Todas";
        if (originFilter) originFilter.value = "Todos";

        mostrarRecomendacion(perfil);
        mostrarRecetas();

        profileMessage.textContent =
            "¡Tu perfil se guardó correctamente! Las recetas se ordenaron según tus datos.";

        document.getElementById("recetas")
            ?.scrollIntoView({ behavior: "smooth" });
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
