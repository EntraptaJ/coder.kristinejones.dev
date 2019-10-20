// Web/UI/Routes/Ideas/Ideas.tsx
import React from 'react';
import { useIdeasQuery } from 'UI/Components/Ideas/GraphQL/Ideas.gen';
import { Header } from 'UI/Components/Styles/Header';
import Grid from '@material-ui/core/Grid';
import { oc } from 'ts-optchain';
import { IdeaCard } from 'UI/Components/Ideas/Card';
import { useStyles } from './Styles';

export default function IdeasRoute(): React.ReactElement {
  const classes = useStyles();
  const { data } = useIdeasQuery();

  return (
    <>
      <Header title={{ primary: 'Ideas' }} />
      <Grid container className={classes.root} spacing={2}>
        {oc(data)
          .currentUser.ideas([])
          .map((idea) => (
            <Grid key={idea.id} item>
              <IdeaCard {...idea} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
