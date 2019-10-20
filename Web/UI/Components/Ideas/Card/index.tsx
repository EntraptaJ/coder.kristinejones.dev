// Web/UI/Components/Ideas/Card/index.tsx
import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Idea } from 'UI/GraphQL/graphqlTypes.gen';
import { useStyles } from './Styles';

type IdeaData = Pick<Idea, 'id' | 'title' | 'body'>;

export function IdeaCard({ title }: IdeaData): React.ReactElement {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
