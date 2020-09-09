/**
 * @author Damián Alanís Ramírez
 * @version 3.2.1
 */

export default class Requests {

    static makeRequest = (endpoint, headers = { }, onSuccess = null, onError = null, ...callbackArguments) => {
        fetch(endpoint, headers)
            .then(response => {
                if(response.status === 200){
                    const contentType = response.headers.get("content-type");
                    let content;
                    if(contentType && contentType.includes('application/json'))
                        content = response.json();
                    else content = response.text()
                    //We resolve the content promise
                    content
                        .then(data => {
                            if(onSuccess && typeof(onSuccess) === 'function')
                                onSuccess(data, ...callbackArguments);
                        });
                }
                else throw new Error(`${response.status}|${response.statusText}`);
            })
            .catch(error => {
                let { message } = error;
                let [errorCode, errorMessage] = message.split('|');
                if(onError && typeof(onError) === 'function')
                    onError(errorCode, errorMessage, ...callbackArguments);
            });
    }

    static getFormDataFromObject = object => {
        let formData = new FormData();
        Object.entries(object).forEach(([key, value]) => formData.append(key, value));
        return formData;
    }
}