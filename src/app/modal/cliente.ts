export class Cliente {
    constructor(
        public id?: number,
        public nome?: string,
        public sobrenome?: string,
        public apelido?: string,
        public cpf?: string,
        public fone1?: string,
        public fone2?: string,
        public email?: string,
        public endereco_id?: number,
        public empresa_id?: number, 
        public user_id?: number
    ) {
        
    }
}