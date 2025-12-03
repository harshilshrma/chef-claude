import ReactMarkDown from 'react-markdown'

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container">
            <h2>Chef Claude Recommends:</h2>
            <ReactMarkDown>{props.recipe}</ReactMarkDown>
        </section>

    )
}