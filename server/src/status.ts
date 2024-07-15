export enum BamblooStatusCode {
    Success = 0,
    TokenInvalid,
    AuthenticationFail,
    TokenSigningError,

    EntityNonexist,
    EntityExists,
    HandleClosed,

    IllegalState,
    TokenMismatch,
    FormatError,

    Unauthorized,
    DatabaseError,
    NetworkInvalid,
}

export class BamblooError extends Error {
    code : BamblooStatusCode

    constructor(code : BamblooStatusCode, mesg: string) {
        super(mesg)
        this.code = code
    }
}