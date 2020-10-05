export default class URLParameters {

    static getURLSearchParameters = () => {
        const queryString = window.location.search;
        return new URLSearchParams(queryString);
    }

    static getParameter = parameter => {
        const urlSearchParameters = URLParameters.getURLSearchParameters();
        return urlSearchParameters.get(parameter);
    }
}