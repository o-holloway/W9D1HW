import { TaskType } from '../types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

type TaskCardProps = {
    task: TaskType
}

const getFormattedDateTimeForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });
}

export default function TaskCard({ task }: TaskCardProps) {
    
    return (
        <Card className={`my-3 ${task.completed ? 'completed' : 'uncompleted'}`}>
            <Card.Header>Created: { getFormattedDateTimeForDisplay(task.dateCreated) }</Card.Header>
            <Card.Body>
                <Card.Title>{ task.title }</Card.Title>
                <Card.Subtitle>Created by: { task.author.username }</Card.Subtitle>
                <Card.Text>Due Date: {getFormattedDateTimeForDisplay(task.dueDate)}</Card.Text>
                <Card.Text>{ task.description }</Card.Text>
                <Button onClick={task.toggleCompletion}>{task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}</Button>
            </Card.Body>
        </Card>
    )
}
