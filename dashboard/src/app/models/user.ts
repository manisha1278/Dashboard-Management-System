export interface User {

    id: string;

    username: string;

    fullName: string;

    email: string;

    contact: string;

    userTypeId: string;

    dashboardIds: string[];

    isActive: boolean;

    createdByUserId: string;

    createdOn: Date;

    isSystem:boolean;
    
    createdBy:string;
}