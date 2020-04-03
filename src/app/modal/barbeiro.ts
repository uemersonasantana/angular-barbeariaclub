export class Barbeiro {
    constructor(
        public id: string,
        public nome: string,
        public fone: string,
        public email: string,
        
        public empresa_id?: number,
        public user_id?: number
    ) {
        
    }
}