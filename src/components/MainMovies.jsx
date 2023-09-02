import Loader from './Loader'
import { apiConfig } from '../api/api.config.js'
import { Link } from 'react-router-dom'
import { fetchingMovies } from '../api/fetchingDataApi'
import { useEffect, useState } from 'react'

const Main = ({ handleForm, setValueInput, valueInput, movies, setPage, page, searchKey, category, setMovies, setCategory }) => {

    const [generos, setGeneros] = useState(null);
    const [activeCategory, setActiveCategory] = useState(false);
    const handleUp = () => window.scrollTo(0, 0);

    useEffect(() => {
        fetchingMovies(null, setGeneros, null, null, `https://api.themoviedb.org/3/genre/${category}/list?language=en&api_key=${apiConfig.API_KEY}`)
    }, [generos])

    const handleFetchCategory = (genre_id) => {
        fetchingMovies(null, setMovies, null, null, `https://api.themoviedb.org/3/discover/${category}?with_genres=${genre_id}&api_key=${apiConfig.API_KEY}`)
    }

    return (
        <>
            <main className="relative flex flex-col gap-6 items-center justify-center py-12 bg-secundary min-h-[500px]">
                <div className='flex flex-col items-center justify-around w-full absolute top-8 px-8'>

                    <form onSubmit={handleForm} >
                        <span className="relative flex items-center">
                            <button type='submit'><i className="bi bi-search cursor-pointer absolute right-2 top-2/4 -translate-y-2/4 text-black border-l border-white_text pl-2"></i></button>
                            <input onChange={(e) => setValueInput(e.target.value)} type="text" className="pl-2 py-1 rounded-sm outline-none text-black_text  pr-12 w-[300px]" placeholder={`Busca tu ${category == 'movie' ? 'peli' : 'serie'}...`} />
                        </span>
                    </form>
                </div>

                <div className='flex flex-col  gap-4 justify-center items-center relative pt-12 px-4 lg:px-14 self-center lg:self-start'>
                    <button className='button-categoria lg:self-start' onClick={() => setActiveCategory(!activeCategory)}>
                        <p>Géneros</p>
                        <svg strokeWidth="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                    </button>
                    {activeCategory && <ul className={`slide-in-right grid  grid-cols-2 gap-y-2 gap-x-2 content-center sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7`}>
                        {
                            generos && generos.genres.map(gen => {
                                return (
                                    <li onClick={() => handleFetchCategory(gen.id)} key={gen.id} className='justify-center min-w-[120px] h-max text-sm whitespace-nowrap border-black rounded-full py-[3px] px-6 flex items-center bg-black text-white_text cursor-pointer hover:scale-105 hover:skew-y-2 transition linear hover:shadow-md hover:shadow-black'>{gen.name}</li>
                                )
                            })
                        }
                    </ul>}
                </div>

                <section className="flex flex-wrap justify-center items-center gap-6 pb-16 min-h-[500px]">

                    {
                        movies == null ? <Loader /> : movies.results.map(movie => {
                            return (
                                <Link key={movie.id} to={`movieDetail/${movie.id}`}>
                                    <article className="flex flex-col gap-2 items-center cursor-pointer">
                                        <img className="rounded-3xl max-h-[270x] max-w-[270px]" src={apiConfig.IMAGE_ORIGINAL(movie.poster_path || movie.backdrop_path)} alt={`Imágen de la pelicula ${movie.title}`} />
                                    </article>
                                </Link>
                            )
                        })
                    }
                </section>
                {searchKey == '' && 
                <section className="absolute bottom-[20px] flex gap-12 items-center border-2 rounded-lg justify-self-end">
                    <i onClick={() => page > 1 && setPage(page - 1)} className={`${page == 1 && 'opacity-20'} bi bi-arrow-left cursor-pointer text-4xl px-2 border-r-2`}></i>
                    <span className="text-2xl font-semibold text-primary min-w-[20px] text-center">{page}</span>
                    <i onClick={() => movies != null && setPage(page + 1)} className="bi bi-arrow-right cursor-pointer text-4xl px-2 border-l-2"></i>
                </section>}
                <i onClick={handleUp} className="hover:scale-105  linear bi bi-arrow-up fixed flex justify-center items-center bottom-12 right-4 text-primary border-2 h-12 w-12 text-2xl cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out border-primary rounded-full"></i>
            </main>
        </>
    )
}

export default Main