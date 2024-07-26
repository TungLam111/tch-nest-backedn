export class FunctionError {
    responseCode: number;
    message: string;

    constructor(
        rspCode: number, msg: string
    ) {
        this.responseCode = rspCode;
        this.message = msg;
    }
}