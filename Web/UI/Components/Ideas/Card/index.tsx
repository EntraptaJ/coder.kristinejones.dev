// Web/UI/Components/Ideas/Card/index.tsx
import React, { useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Idea } from 'UI/GraphQL/graphqlTypes.gen';
import { useStyles } from './Styles';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import { useDeleteIdeaMutation } from '../GraphQL/DeleteIdea.gen';
import { useSnackbar } from 'notistack';
import { oc } from 'ts-optchain';

type IdeaData = Pick<Idea, 'id' | 'title' | 'body'>;

export function IdeaCard({ title, body, id }: IdeaData): React.ReactElement {
  const [deleteIdea] = useDeleteIdeaMutation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleDeleteClick = useCallback(async () => {
    const response = await deleteIdea({ variables: { ideaId: id } });
    if (oc(response).data.deleteIdea())
      enqueueSnackbar('Idea successfully deleted', { variant: 'success' });
  }, [id, deleteIdea, enqueueSnackbar]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
      </CardContent>
      <CardActions>
        <BaseButtonCore label='Edit' color='primary' variant='text' />
        <BaseButtonCore label='Delete' color='primary' variant='text' onClick={handleDeleteClick} />
      </CardActions>
    </Card>
  );
}
