

export default class AddUserUseCase{

    dependancies;

    constructor(deps){
        this.dependancies = deps;
    }

    async execute(firstName, lastName, email, password){
        const hashedPassword = await this.dependancies.encryptor.hash(password);
        return this.dependancies.DatabaseService.add(firstName, lastName, email, hashedPassword);
    }

}