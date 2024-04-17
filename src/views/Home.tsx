import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { TaskFormDataType, TaskType } from '../types';


type Sorting = {
    idAsc: (a: TaskType, b:TaskType) => number,
    idDesc: (a: TaskType, b:TaskType) => number,
    titleAsc: (a: TaskType, b:TaskType) => number,
    titleDesc: (a: TaskType, b:TaskType) => number,
}


type HomeProps = {
    isLoggedIn: boolean,
    handleClick: () => void
}

export default function Home({isLoggedIn, handleClick}: HomeProps) {

    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState<TaskType[]>([
            {
                author: {
                    dateCreated: "Wed, 29 May 2023 10:19:32 GMT",
                    email: "john@doe.com",
                    firstName: "John",
                    id: 1,
                    lastName: "Doe",
                    username: "johnd"
                },
                body: "Bury electric conduit to shed",
                dateCreated: "Wed, 29 May 2023 11:13:41 GMT",
                id: 1,
                title: "Bury electric"
            },
            {
                author: {
                    dateCreated: "Wed, 29 May 2023 15:28:25 GMT",
                    email: "jane@doe.com",
                    firstName: "Jane",
                    id: 1,
                    lastName: "Doe",
                    username: "janed"
                },
                body: "Organize spice rack",
                dateCreated: "Wed, 29 May 2023 16:09:59 GMT",
                id: 2,
                title: "Spice Rack"
            },
        ])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:TaskType, b:TaskType) => a.id - b.id,
            idDesc: (a:TaskType, b:TaskType) => b.id - a.id,
            titleAsc: (a:TaskType, b:TaskType) => a.title > b.title ? 1 : -1,
            titleDesc: (a:TaskType, b:TaskType) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...tasks].sort(func);
        setTasks(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const addNewTask = (newTaskData: TaskFormDataType) => {
        const author = {id: 1, firstName: 'John', lastName: 'Doe', email: 'john@doe.com', username:'johnd', dateCreated: "Wed, 14 May 2023 09:41:32 GMT"};
        const newTask: TaskType = {...newTaskData, id:tasks.length+1, dateCreated:new Date().toString(), author};
        setTasks([...tasks, newTask]);
        setShowForm(false);
    }

    return (
        <>
            <h3>To-Do List 1.0 - Productivity Unlocked</h3>
                <Button variant='primary' onClick={handleClick}>Log-In</Button>
                <h2>{isLoggedIn ? `Welcome Back` : 'Please Log In or Sign Up'}</h2>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control value={searchTerm} placeholder='Search Tasks' onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By ID ASC</option>
                            <option value="idDesc">Sort By ID DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Task+'}</Button>
                    </Col>
                </Row>
                { showForm && <TaskForm addNewTask={addNewTask} /> }
                {tasks.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <TaskCard key={p.id} task={p} /> )}
        </>
    )
}
