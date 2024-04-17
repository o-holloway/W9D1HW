
export type UserType = {
    id:number,
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    dateCreated:string
}

export type TaskType = {
    id:number,
    title:string,
    description:string,
    dateCreated:string,
    dueDate: string,
    author:UserType,
    completed: boolean,
    toggleCompletion: () => void,
}

export type TaskFormDataType = {
    title:string,
    description:string,
    dueDate: string
}
