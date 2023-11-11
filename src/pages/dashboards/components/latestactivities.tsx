import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

const activities = [
    { id: 1, user: 'Alice', action: 'created', target: 'Task 1', time: '2 hours ago' },
    { id: 2, user: 'Bob', action: 'updated', target: 'Task 2', time: '5 hours ago' },
    { id: 3, user: 'Charlie', action: 'deleted', target: 'Task 3', time: '1 day ago' },
    { id: 4, user: 'David', action: 'created', target: 'Task 4', time: '2 days ago' },
    { id: 5, user: 'Eve', action: 'updated', target: 'Task 5', time: '3 days ago' },
    { id: 6, user: 'Frank', action: 'deleted', target: 'Task 6', time: '1 week ago' },
];

export const LatestActivities: React.FC = () => {
    const getIcon = (action: 'created' | 'updated' | 'deleted') => {
        switch(action) {
            case 'created': return <CreateIcon />;
            case 'updated': return <UpdateIcon />;
            case 'deleted': return <DeleteIcon />;
            default: return <CreateIcon />;
        }
    };

    return (
        <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                Latest Activities
            </Typography>
            <List>
                {activities.map(activity => (
                    <ListItem key={activity.id} alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar>
                            {getIcon(activity.action as 'created' | 'updated' | 'deleted')}
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${activity.user} ${activity.action} ${activity.target}`}
                            secondary={activity.time}
                        />
                    </ListItem>
                ))}
            </List>
            </CardContent>
        </Card>
    );
};
