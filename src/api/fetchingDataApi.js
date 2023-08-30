import { options } from './api.options.js';
import { apiConfig } from './api.config.js'

export const fetchingMovies = async (currentSearchKey, setFunction, page = null, cat = 'movie' ) => {
    try {
        let type;
        if(typeof currentSearchKey === 'number'){ 
            type = `${cat}/${currentSearchKey}?append_to_response=videos`;
        } else if(typeof currentSearchKey === 'string') {
            type = currentSearchKey != ''  
            ? `search/${cat}?query=${currentSearchKey}&append_to_response=videos`
            : `discover/${cat}?page=${page}&append_to_response=videos`;
        }
        
        const URL = `${apiConfig.API_URL}/${type}&${apiConfig.API_PARAMS}&api_key=${apiConfig.API_KEY}`;
        const response = await fetch(URL, options);
        const data = await response.json();
        setFunction(data);
    } catch {
        alert('Ocurrio un error al peticionar la pelicula');
    }

};