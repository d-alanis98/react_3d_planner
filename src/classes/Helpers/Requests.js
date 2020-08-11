/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 */

export default class Requests {
    static makeRequest = (endpoint, headers = { }, onSuccess = null, onError = null, ...callbackArguments) => {
        fetch(endpoint, headers)
        .then(response => {
            if(response.status === 200){
                response.json()
                .then(data => {
                    if(onSuccess && typeof(onSuccess) === 'function')
                        onSuccess(data, ...callbackArguments);
                });
            }
            throw new Error(`${response.status}|${response.statusText}`);
        })
        .catch(error => {
            let { message } = error;
            let [errorCode, errorMessage] = message.split('|');
            if(onError && typeof(onError) === 'function')
                onError(errorCode, errorMessage, ...callbackArguments);
        })
    }
}