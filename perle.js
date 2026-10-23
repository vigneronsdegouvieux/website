const data = {
  "2024": {
    perle_blanc: {
      ingredients: "Raisins (chardonnay), sucre, levures, agents de tirage",
      nutrition: {
        energie: "290 kJ / 70 kcal",
        glucides: "1,5 g",
        sucres: "1,2 g"
      }
    },
    perle_rose: {
      ingredients: "Raisins (chardonnay, pinot noir), sucre, levures, agents de tirage",
      nutrition: {
        energie: "295 kJ / 71 kcal",
        glucides: "1,7 g",
        sucres: "1,3 g"
      }
    },
    perle_blanc_de_noir: {
      ingredients: "Raisins (pinot noir), sucre, levures, agents de tirage"
    },
    coteaux_chardonnay: {
      ingredients: "Raisins (chardonnay)"
    },
    coteaux_pinot_noir: {
      ingredients: "Raisins (pinot noir)"
    }
  },
  "2023": {
    perle_blanc: {
      ingredients: "Raisins (chardonnay), sucre, levures, agents de tirage",
      nutrition: {
        energie: "295 kJ / 71 kcal",
        glucides: "1,7 g",
        sucres: "1,3 g"
      }
    },
    perle_rose: {
      ingredients: "Raisins (chardonnay, pinot noir), sucre, levures, agents de tirage",
      nutrition: {
        energie: "300 kJ / 72 kcal",
        glucides: "1,8 g",
        sucres: "1,4 g"
      }
    },
    perle_blanc_de_noir: {
      ingredients: "Raisins (pinot noir), sucre, levures, agents de tirage"
    },
    coteaux_chardonnay: {
      ingredients: "Raisins (chardonnay)"
    },
    coteaux_pinot_noir: {
      ingredients: "Raisins (pinot noir)"
    }
  },
  "2022": {
    perle_blanc: {
      ingredients: "Raisins (chardonnay), sucre, levures, agents de tirage",
      nutrition: {
        energie: "300 kJ / 72 kcal",
        glucides: "1,9 g",
        sucres: "1,4 g"
      }
    },
    perle_rose: {
      ingredients: "Raisins (chardonnay, pinot noir), sucre, levures, agents de tirage",
      nutrition: {
        energie: "305 kJ / 73 kcal",
        glucides: "2,0 g",
        sucres: "1,5 g"
      }
    },
    perle_blanc_de_noir: {
      ingredients: "Raisins (pinot noir), sucre, levures, agents de tirage"
    },
    coteaux_chardonnay: {
      ingredients: "Raisins (chardonnay)"
    },
    coteaux_pinot_noir: {
      ingredients: "Raisins (pinot noir)"
    }
  }
};

const COLOR_LABELS = {
  perle_blanc: "Perle - blanc de blancs",
  perle_rose: "Perle - rosé",
  perle_blanc_de_noir: "Perle - blanc de noirs",
  coteaux_chardonnay: "Coteaux - Chardonnay",
  coteaux_pinot_noir: "Coteaux - Pinot Noir"
};

function getElements() {
  return {
    yearSelect: document.getElementById("millesime"),
    colorSelect: document.getElementById("couleur"),
    contentRoot: document.getElementById("vintage-content")
  };
}

function createOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

function renderMessage(contentRoot, message) {
  if (!contentRoot) return;
  contentRoot.textContent = message;
}

function renderVintageInfo(contentRoot, year, color, info) {
  if (!contentRoot) return;

  contentRoot.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = `Millésime ${year} - ${COLOR_LABELS[color] || color}`;

  const ingredients = document.createElement("p");
  ingredients.innerHTML = `<strong>Ingrédients :</strong> ${info.ingredients || "Donnée en cours de mise à jour."}`;

  const nutritionTitle = document.createElement("p");
  nutritionTitle.innerHTML = "<strong>Informations nutritionnelles (pour 100 ml):</strong>";

  if (!info.nutrition) {
    const nutritionMessage = document.createElement("p");
    nutritionMessage.textContent = "Données en cours de mise à jour pour ce vin.";
    contentRoot.append(title, ingredients, nutritionTitle, nutritionMessage);
    return;
  }

  const list = document.createElement("ul");

  const energyItem = document.createElement("li");
  energyItem.textContent = `Énergie : ${info.nutrition.energie}`;

  const carbsItem = document.createElement("li");
  carbsItem.textContent = `Glucides : ${info.nutrition.glucides}`;

  const sugarItem = document.createElement("li");
  sugarItem.textContent = `Dont sucres : ${info.nutrition.sucres}`;

  list.append(energyItem, carbsItem, sugarItem);
  contentRoot.append(title, ingredients, nutritionTitle, list);
}

function updateColorOptions() {
  const { yearSelect, colorSelect, contentRoot } = getElements();
  if (!yearSelect || !colorSelect || !contentRoot) return;

  const year = yearSelect.value;
  const yearData = data[year];

  colorSelect.replaceChildren();

  if (!yearData || Object.keys(yearData).length === 0) {
    renderMessage(contentRoot, "Informations non disponibles pour ce millésime.");
    return;
  }

  Object.keys(yearData).forEach((color) => {
    colorSelect.appendChild(createOption(color, COLOR_LABELS[color] || color));
  });

  updateVintageInfo();
}

function updateVintageInfo() {
  const { yearSelect, colorSelect, contentRoot } = getElements();
  if (!yearSelect || !colorSelect || !contentRoot) return;

  const year = yearSelect.value;
  const color = colorSelect.value;
  const info = data[year]?.[color];

  if (!info) {
    renderMessage(contentRoot, "Informations non disponibles pour cette sélection.");
    return;
  }

  renderVintageInfo(contentRoot, year, color, info);
}

function initVintageSelector() {
  const { yearSelect, colorSelect, contentRoot } = getElements();
  if (!yearSelect || !colorSelect || !contentRoot) return;

  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));
  yearSelect.replaceChildren();

  if (years.length === 0) {
    renderMessage(contentRoot, "Aucune donnée de millésime n'est disponible actuellement.");
    return;
  }

  years.forEach((year) => {
    yearSelect.appendChild(createOption(year, year));
  });

  yearSelect.addEventListener("change", updateColorOptions);
  colorSelect.addEventListener("change", updateVintageInfo);

  updateColorOptions();
}

document.addEventListener("DOMContentLoaded", initVintageSelector);