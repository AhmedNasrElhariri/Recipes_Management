import React ,{useState,useEffect} from 'react';
import './App.css'
import Recipe from './components/Recipe';

const App = () => {
  const APP_ID = '302e5800'
  const APP_KEY = '4aed83c2b3d76efa9b01144800e50c14'
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Chicken');
  useEffect(() => {
     getRecipes();
  },[query])
  const getRecipes = async () => {
     const response = await fetch(
       `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10&calories=591-722&health=alcohol-free`
       );
     const data = await response.json();
     setRecipes(data.hits);
     console.log(data.hits)
  }
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.calories}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
