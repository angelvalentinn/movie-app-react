import { useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import { apiConfig } from "../api/api.config";
import { fetchingMovies } from "../api/fetchingDataApi";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';

const MovieDetail = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const [viewCasts, setViewCasts] = useState(false)
    const [casts, setCasts] = useState(null);

    useEffect(() => {
        fetchingMovies(Number(id), setMovie);
        if (movie && movie.videos.results) {
            const trailer = movie.videos.results.find(
                (vid) => vid.name.includes("Tráiler Oficial" || "Trailer" || "Tráiler" || "Teaser Tráiler oficial" || "Official Trailer")
            );
            setTrailer(trailer ? trailer : movie.videos.results[0]);
        }
    }, [id]);

    useEffect(() => {
        movie && fetchingMovies(null, setCasts, null, 'movie', `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiConfig.API_KEY}`);
    }, [movie])
    console.log(casts);
    return (
        <>
            {movie ? <main
                className="overflow-hidden flex flex-col relative z-10 before:absolute before:inset-0 before:bg-hover_black2 w-full bg-center  bg-no-repeat bg-cover min-h-full pb-12 sm:min-h-0"
                style={{
                    backgroundImage: `url(${apiConfig.IMAGE_ORIGINAL(
                        movie.backdrop_path || movie.poster_path
                    )})`
                }}
            >
                <section className="slide-in-right text-white flex flex-col  sm:flex-row gap-y-6 gap-x-2 lg:gap-x-12">
                    <img
                        className="shadow-2xl shadow-[#c1a3626f] h-[250px] sm:h-[400px] w-[220px] sm:w-[300px] lg:h-[500px] lg:w-[500px] rounded-br-[40px] sm:rounded-br-[80px]"
                        src={apiConfig.IMAGE_ORIGINAL(movie.poster_path)}
                        alt=""
                    />
                    <div className="flex flex-col  gap-6 px-2 sm:self-center">

                        <h2 className="font-bold text-2xl sm:text-4xl lg:text-5xl">{movie.title}</h2>

                        <ul className="flex gap-2 flex-wrap font-medium">
                            {
                                movie.genres && movie.genres.map(genero => {
                                    return (
                                        <li key={genero.id} className="border rounded-full hover:scale-105 hover:skew-y-2 transition linear py-[4px] px-2 sm:px-6 sm:py-[6px]">{genero.name}</li>
                                    )
                                })
                            }
                        </ul>
                        <p className=" lg:w-[80%] lg:text-[1.2rem]">{movie.overview}</p>

                        <div className="flex items-center gap-4">
                            {
                                !playing && trailer ?
                                    <button className="button max-w-max" onClick={() => setPlaying(true)}>
                                        Ver trailer
                                    </button>
                                    : !playing && !trailer && <p className="border-b w-max">Lo siento, trailer no disponible 😕</p>
                            }
                            {casts && <button onClick={() => setViewCasts(true)} className="button max-w-max bg-primary text-white">
                                Ver Actores
                            </button>}
                        </div>

                    </div>

                </section>

                {
                    playing && <article className="flex flex-col gap-2">
                        <button className="self-end mr-6 bg-red border-red text-white hover:border-primary hover:text-white button" onClick={() => setPlaying(false)}>Cerrar</button>
                        <YouTube
                            videoId={trailer.key}
                            className="reproductor container"
                            containerClassName={"youtube-container amru"}
                            opts={{
                                width: "100%",
                                height: "500px",
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    cc_load_policy: 0,
                                    fs: 0,
                                    iv_load_policy: 0,
                                    modestbranding: 0,
                                    rel: 0,
                                    showinfo: 0,
                                },
                            }}
                        />
                    </article>
                }
                {viewCasts && <section className="slide-in-right absolute inset-0 bg-hover_black overflow-y-scroll py-8">
                    <i onClick={() => setViewCasts(false)} className="absolute right-8 top-2 bi bi-x text-6xl text-red cursor-pointer border-2 border-red rounded-full transition linear hover:bg-red hover:text-white"></i>
                    <article className="pt-10 flex flex-wrap justify-center gap-10">
                        {casts && casts.cast.map(actor => {
                            return (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <img className="h-[250px] w-[200px] rounded-[50%]" src={apiConfig.IMAGE_ORIGINAL(actor.profile_path)} alt={actor.character} />
                                    <p className="text-white text-xl">{actor.character}</p>
                                </div>
                            )
                        })}
                    </article>
                </section>
                }
            </main>
                : <main className="bg-secundary flex justify-center items-center min-h-[500px]"><Loader /></main>
            }
        </>
    );
};

export default MovieDetail;
