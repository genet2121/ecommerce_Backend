

export default class UpdateUserUseCase{

    databaseService;

    constructor(deps){
        this.databaseService = deps;
    }

    async execute(id, updatedUser){
        return this.databaseService.update(id, updatedUser);
    }

}