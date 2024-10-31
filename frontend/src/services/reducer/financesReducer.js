export const myState = [];

/*
    Eh passado dois valores, o state representando a lista
    e o action indicando as acoes e os dados a serem
    manipulados na lista
*/
export function myReducer (state, action) {
    switch (action.type) {
        case 'get':
            console.log('Dados recebidos:', action.data);
            return action.data;

        case 'add':
            return [...state];

        case 'remove':
            return state.filter(item => item.id !== action.id)

        default: return state;
    }
}
