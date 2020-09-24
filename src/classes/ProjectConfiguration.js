export default class ProjectConfiguration {
static CLOSET_PROJECT         = 'CLOSET';
    static KITCHEN_PROJECT    = 'KITCHEN';
    static CLOSET_PROJECT_ID  = 1;
    static KITCHEN_PROJECT_ID = 3;

    static getFamilyIdByProjectType = projectType => {
        const { 
            CLOSET_PROJECT, 
            KITCHEN_PROJECT,
            CLOSET_PROJECT_ID,
            KITCHEN_PROJECT_ID 
        } = ProjectConfiguration;
        switch(projectType) {
            case CLOSET_PROJECT:
                return CLOSET_PROJECT_ID;
            case KITCHEN_PROJECT:
                return KITCHEN_PROJECT_ID;
            default:
                return CLOSET_PROJECT_ID;
        }
    }
    
}