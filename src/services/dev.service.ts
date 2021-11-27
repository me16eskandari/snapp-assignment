export namespace DevService {

    export const isDev = (): boolean => {
        return process.env.NODE_ENV && process.env.NODE_ENV === 'development';
    };

}