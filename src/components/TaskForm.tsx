import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { TaskFormDataType } from '../types';

type TaskFormProps = {
    addNewTask: (data: TaskFormDataType) => void
}

const getFormattedDateTime = () => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function TaskForm({ addNewTask: addNewTask }: TaskFormProps) {
    const [newTask, setNewTask] = useState<TaskFormDataType>({title: '', description: '', dueDate: getFormattedDateTime()});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({...newTask, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (newTask.title === '' || newTask.description === '' || newTask.dueDate === '') {
            setError('All fields are required');
        } else {
            setError('');
            addNewTask(newTask);
        }
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Task</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control required name='title' placeholder='Enter New Task Title' value={newTask.title} onChange={handleInputChange} />
                    <Form.Label>Task Body</Form.Label>
                    <Form.Control required name='description' placeholder='Enter New Task Description' value={newTask.description} onChange={handleInputChange} />
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control required type='datetime-local' name='dueDate' value={newTask.dueDate} onChange={handleInputChange} />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Task</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}