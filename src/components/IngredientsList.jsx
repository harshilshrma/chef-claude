export default function IngredientsList(props) {
    return (
        <section>
            <div className="ingredients-list-parent">
                <h2>Ingredients at hand:</h2>
                <ul className="ingredients-list">
                    {props.ingredientsList.map((ingredient) => {
                        return <li>{ingredient}</li>;
                    })}
                </ul>
            </div>

            {props.ingredientsList.length > 3 &&
                <div className="cta-container">
                    <div className="cta-container-left">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.toggleRecipeShown}>
                        Get a recipe
                    </button>
                </div>
            }
        </section>
    )
}