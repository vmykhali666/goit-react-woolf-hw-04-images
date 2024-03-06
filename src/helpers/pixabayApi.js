import config from 'configs/pixabayConfig.json';
import axios from 'axios';

export class PixabayApi {
  static #baseUrl = config.PIXABAY_URL;

  static fetchImages = async (query, page) => {
    const { PIXABAY_KEY, ImagesSettings } = config;
    const { image_type, orientation, per_page } = ImagesSettings;

    let parameters = {
      key: PIXABAY_KEY,
      q: query,
      image_type: image_type,
      orientation: orientation,
      safesearch: 'true',
      page,
      per_page: per_page,
    };

    let requestUrl = this.#createRequestURL(parameters);
    return await axios.get(requestUrl).then(responce => {
      console.log(page);
      return responce.data;
    });
  };

  static #createRequestURL(params) {
    return this.#baseUrl + '?' + new URLSearchParams(params);
  }
}
