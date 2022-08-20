type TodoModel = {
    id: number | null,
    due: Date,
    description: string,
    isChecked: boolean,
    personId: number
}

export default TodoModel;
