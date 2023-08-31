import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { fetchingMovies } from "./api/fetchingDataApi";
import MainMovies from "./components/MainMovies";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDetail";

function App() {

  const [category, setCategory] = useState('movie');
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [valueInput, setValueInput] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchingMovies(searchKey, setMovies, page, category);
  }, [page, searchKey, category]);

  const handleForm = (e) => {
    e.preventDefault();
    setSearchKey(valueInput);
  };

  return (
    <BrowserRouter>
      <Header setSearchKey={setSearchKey} setCategory={setCategory} setPage={setPage} category={category}/>

      <Routes>
        <Route
          path="/"
          element={
            <MainMovies
              handleForm={handleForm}
              movies={movies}
              setPage={setPage}
              page={page}
              valueInput={valueInput}
              setValueInput={setValueInput}
              searchKey={searchKey}
              category={category}
              setMovies={setMovies}
            />
          }
        />
        <Route path="/movieDetail/:id" element={<MovieDetail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
export default App;
