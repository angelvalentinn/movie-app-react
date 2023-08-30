import logo from '../assets/logo.png';
import logoTMBD from '../assets/logoTMBD.svg'
import { Link } from 'react-router-dom';

const Header = ({setSearchKey, setCategory, setPage}) => {

    return (
        <header className="flex flex-col gap-2 text-center bg-secundary text-white_text pb-4">

            <p data-aos="fade-right"className="bg-primary text-white text-sm py-1">
                valflix - ¡Gracias por visitarnos! 😄
            </p>

            <div className="px-16 flex flex-col items-center gap-y-4  sm:flex-row bg-secundary pt-4 sm:py-2">
                <Link to={'/'} onClick={() => setSearchKey('')} className='flex-grow basis-0'>
                    <div className="hover:scale-105 transition linear flex gap-1 items-center ">
                        <img className="h-12 w-12" src={logo} alt="Logo de la página" />
                        <h1 className="font-semibold text-3xl">valfli<span className="text-primary">X</span></h1>
                    </div>
                </Link>

                <nav>
                    <ul className="flex gap-8 items-center font-bold text-red-500">
                        <Link to={'/'}><li className="cursor-pointer hover:text-primary transition-all ease-linear uppercase">Home</li></Link>
                        <Link to={'/'}><li className="cursor-pointer hover:text-primary transition-all ease-linear uppercase"  onClick={() => setCategory('movie')} onMouseDown={() => setPage(1)}>Movies</li></Link>
                        <Link to={'/'}><li className="cursor-pointer hover:text-primary transition-all ease-linear uppercase"  onClick={() => setCategory('tv')} onMouseDown={() => setPage(1)}>Series</li></Link>
                    </ul>
                </nav>

                <a href="https://www.themoviedb.org" target='_blank' className='flex flex-grow basis-0 justify-end'>
                    <img className="hover:scale-105 transition linear h-10 w-10" src={logoTMBD} alt="Logo de la API de TMDB" />
                </a>
            
            </div>

        </header>)
}

export default Header