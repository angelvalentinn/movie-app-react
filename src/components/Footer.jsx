const Footer = () => {
    return (
        <footer className="bg-black_text min-h-20 p-4 text-left flex items-center justify-center">
            <article className="flex flex-col gap-2 text-white_text">
                <p>
                    Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB.
                </p>
                <div className="flex justify-center items-center gap-12">
                    <a className="text-2xl  linear hover:text-primary hover:scale-110 transition linear" href="https://www.linkedin.com/in/%C3%A1ngel-valent%C3%ADn-altieri-a319a0256/" target="_blank"><i className="bi bi-linkedin"></i></a>
                    <a className="text-2xl  linear hover:text-red hover:scale-110 transition linear" href="https://github.com/angelvalentinn" target="_blank"><i class="bi bi-github"></i></a>
                    <a className="text-2xl  linear hover:text-primary hover:scale-110 transition linear" href="https://www.instagram.com/angel_altieri_/" target="_blank"><i class="bi bi-instagram"></i></a>
                    <a className="text-2xl  linear hover:text-red hover:scale-110 transition linear" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSKkHhksQChtdvjwPXtGdwvffSTTVDXZJWLNFStrGBvjCzcKPFQddMpMMzQRKLBwzDDcphhN" target="_blank"><i class="bi bi-envelope"></i></a>
                </div>
            </article>
        </footer>
    )
}

export default Footer