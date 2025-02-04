export type TodoList = {
    id: number;
    label: string;
    checked: boolean;
    createdAt: string | undefined;
    subTodo: SubTodo[];
}

export type SubTodo = {
    id: number;
    label: string;
    checked: boolean;
}