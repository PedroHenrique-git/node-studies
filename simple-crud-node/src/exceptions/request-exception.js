export default class RequestException extends Error {
    constructor(message) {
        super(message);
        this.name = 'Request error';
    }
}