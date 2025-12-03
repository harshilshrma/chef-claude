import { useState } from 'react'
import './Main.css'
import ClaudeRecipe from './ClaudeRecipe.jsx'
import IngredientsList from './IngredientsList.jsx'

export default function Main() {
    const [ingredientsList, setIngredientsList] = useState(["dark chocolate", "paneer", "honey", "cocoa powder"]);
    const [recipe, setRecipe] = useState(null);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");

        if (newIngredient === "") {
            return;
        }

        setIngredientsList((prev) => {
            return [...prev, newIngredient]
        });
    }

    async function getRecipe() {
        const res = await fetch("/api/generateRecipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredientsList })
        })

        const recipeMarkdown = await res.json();
        setRecipe(recipeMarkdown.recipe);
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
                <IngredientsList ingredientsList={ingredientsList} getRecipe={getRecipe} />
            }

            {recipe &&
                <ClaudeRecipe recipe={recipe}/>
            }
        </main>
    )
}