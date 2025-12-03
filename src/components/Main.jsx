import { useState } from 'react'
import './Main.css'
import ClaudeRecipe from './ClaudeRecipe.jsx'
import IngredientsList from './IngredientsList.jsx'

export default function Main() {
    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);

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
        console.log("clicked");
        setLoading(true);
        setRecipe(null);

        try {
            const res = await fetch("/api/generateRecipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredientsList })
            })

            const recipeMarkdown = await res.json();
            setRecipe(recipeMarkdown.recipe);
        } catch (error) {
            console.error("Error generating recipe:", error);
            setRecipe("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }

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
                <IngredientsList ingredientsList={ingredientsList} getRecipe={getRecipe} loading={loading} />
            }

            {recipe &&
                <ClaudeRecipe recipe={recipe} />
            }
        </main>
    )
}