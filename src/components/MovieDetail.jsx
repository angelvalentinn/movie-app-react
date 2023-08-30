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

    useEffect(() => {
        fetchingMovies(Number(id), setMovie);
        if (movie && movie.videos.results) {
            const trailer = movie.videos.results.find(
                (vid) => vid.name.includes("Tráiler Oficial" || "Trailer" || "Tráiler" || "Teaser Tráiler oficial" || "Official Trailer")
            );
            setTrailer(trailer ? trailer : movie.videos.results[0]);
        }
    }, [id]);

    return (
        <>
            {movie ? <main
                className="flex flex-col relative z-10 after:-z-10 after:absolute after:bg-gradient-to-tr after:inset-0  after:from-black  w-full bg-center  bg-no-repeat bg-cover min-h-full pb-12 sm:min-h-0"
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
                        {!playing && trailer ?
                            <button className="button max-w-max" onClick={() => setPlaying(true)}>
                                Ver trailer
                            </button>
                            :
                            !playing && !trailer && <p className="border-b w-max">Lo siento, trailer no disponible 😕</p>
                        }
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
            </main>
                : <main className="bg-secundary flex justify-center items-center min-h-[500px]"><Loader /></main>
            }
        </>
    );
};

export default MovieDetail;
