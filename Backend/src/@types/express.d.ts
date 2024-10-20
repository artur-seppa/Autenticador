/*
    Adiciona uma tipagem do express a mais alem das outras.
    Sendo importante para o typescript nao der erro de 
    tipagem
*/

declare namespace Express{
    export interface Request {
        userId: string;
    }
}