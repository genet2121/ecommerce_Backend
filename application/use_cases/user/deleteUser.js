



export default class DeleteUserUseCase{

    databaseService;

    constructor(deps){
        this.databaseService = deps;
    }

    async execute(user){
        return this.databaseService.delete(user);
    }

}