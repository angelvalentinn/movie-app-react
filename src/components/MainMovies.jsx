import Loader from './Loader/Loader'
import { apiConfig } from '../api/api.config.js'
import { Link } from 'react-router-dom'


const Main = ({handleForm, setValueInput , valueInput ,movies, setPage, page, searchKey, category }) => {
    
    const handleUp = () =>  window.scrollTo(0,0)

    return (
        <>
            <main className="relative flex flex-col gap-6 items-center justify-center py-12 bg-secundary min-h-[500px]">
                <form onSubmit={handleForm} className='absolute top-12'>
                        <span className="relative flex items-center">
                            <i className="bi bi-search cursor-pointer absolute right-2 text-black_text border-l border-white_text pl-2"></i>
                            <input value={valueInput} onChange={(e) => setValueInput(e.target.value)} type="text" className="pl-2 py-1 rounded-sm outline-none text-black_text  pr-12 w-[300px]" placeholder={`Busca tu ${category == 'movie' ? 'peli' : 'serie'}...`} />
                        </span>
                </form>
                <section className="flex flex-wrap justify-center items-center gap-6 py-16">
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
                {searchKey == '' && <section className="absolute bottom-[20px] flex gap-12 items-center border-2 rounded-lg justify-self-end">
                    <i onClick={() => page > 1 && setPage(page - 1)} className={`${page == 1 && 'opacity-20'} bi bi-arrow-left cursor-pointer text-4xl px-2 border-r-2`}></i>
                    <span className="text-2xl font-semibold text-primary min-w-[20px] text-center">{page}</span>
                    <i onClick={() => movies != null && setPage(page + 1)} className="bi bi-arrow-right cursor-pointer text-4xl px-2 border-l-2"></i>
                </section>}
                <i onClick={handleUp}class="hover:scale-105 transition linear bi bi-arrow-up fixed flex justify-center items-center bottom-12 right-4 text-primary border-2 h-12 w-12 text-2xl cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out border-primary rounded-full"></i>
            </main>
        </>
    )
}

export default Main