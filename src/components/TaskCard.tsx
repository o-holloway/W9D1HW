import { TaskType } from '../types';
import Card from 'react-bootstrap/Card';

type TaskCardProps = {
    task: TaskType
}

export default function TaskCard({ task }: TaskCardProps) {
    
    return (
        <Card className='my-3 bg-custom' text='white'>
            <Card.Header>{ task.dateCreated }</Card.Header>
            <Card.Body>
                <Card.Title>{ task.title }</Card.Title>
                <Card.Subtitle>{ task.author.username }</Card.Subtitle>
                <Card.Text>{ task.body }</Card.Text>
            </Card.Body>
        </Card>
    )
}
