import { useState } from 'react'
import './Main.css'
import ClaudeRecipe from './ClaudeRecipe.jsx'
import IngredientsList from './IngredientsList.jsx'

export default function Main() {
    const [ingredientsList, setIngredientsList] = useState(["a", "v", "asc", "asc"]);
    const [recipeShown, setRecipeShown] = useState(false);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        
        if (newIngredient === "") {
            return;
        }

        setIngredientsList((prev) => {
            return [...prev, newIngredient]
        });
    }

    function toggleRecipeShown() {
        setRecipeShown((prevValue) => {
            return !prevValue;
        })
    }

    return (
        <main>
            {ingredientsList.length >= 0 && ingredientsList.length <= 3 && <p className="caution-text">Please add more than 3 ingredients to generate a recipe</p>}

            <form className="add-ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="e.g. jalapeño"
                    aria-label="Add Ingredient"
                    name="ingredient"
                />
                <button>
                    + Add Ingredient
                </button>
            </form>


            {ingredientsList.length > 0 &&
                <IngredientsList ingredientsList={ingredientsList} toggleRecipeShown={toggleRecipeShown} />
            }

            {recipeShown &&
                <ClaudeRecipe />
            }
        </main>
    )
}