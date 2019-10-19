// Web/UI/Routes/Projects/Project.tsx
import React, { useState, useCallback, ChangeEvent } from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { useParams } from 'react-router';
import { useProjectQuery } from 'UI/Components/Projects/GraphQL/Project.gen';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { useStyles } from '../../Components/Styles';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import Typography from '@material-ui/core/Typography';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from 'UI/Components/Styles/Loader';
import { Project, UpdateProjectAuthInput } from 'UI/GraphQL/graphqlTypes.gen';
import { oc } from 'ts-optchain';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useUpdateProjectMutation } from 'UI/Components/Projects/GraphQL/UpdateProject.gen';
import { useSnackbar } from 'notistack';
import { useStartCodingSessionMutation } from 'UI/Components/Projects/GraphQL/StartCodingSession.gen';
import { useFinishCodingSessionMutation } from 'UI/Components/Projects/GraphQL/FinishCodingSession.gen';

interface ProjectRouteParams {
  projectId: string;
}

type ProjectValue = Pick<Partial<Project>, 'name' | 'gitUrl'>;

type ChangeHandler<A> = <T extends keyof A>(
  field: T,
) => (evt: ChangeEvent<{ value: A[T] }>) => void;

export default function ProjectRoute(): React.ReactElement {
  const { projectId } = useParams<ProjectRouteParams>();

  const { data } = useProjectQuery({ variables: { projectId } });

  const [
    startCodingSession,
    { loading: codingLoading },
  ] = useStartCodingSessionMutation();

  const [
    updateProject,
    { loading: updateLoading },
  ] = useUpdateProjectMutation();

  const [finishCodingSession] = useFinishCodingSessionMutation();

  const [value, setValue] = useState<ProjectValue>({
    name: undefined,
    gitUrl: undefined,
  });
  const [projectAuth, setProjectAuth] = useState<UpdateProjectAuthInput>();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  const handleChangeValue: ChangeHandler<ProjectValue> = useCallback(
    (field) => ({ target }) =>
      setValue((currentValue) => ({ ...currentValue, [field]: target.value })),
    [setValue],
  );

  const handleChangeProjectAuth: ChangeHandler<
    UpdateProjectAuthInput
  > = useCallback(
    (field) => ({ target }) =>
      setProjectAuth((currentState) =>
        currentState
          ? {
              ...currentState,
              [field]: target.value,
            }
          : {
              [field]: target.value,
            },
      ),
    [setProjectAuth],
  );

  const handleFinishCodingSession = useCallback(async () => {
    const response = await finishCodingSession({ variables: { projectId } });
    if (oc(response).data.finishCodingSession)
      enqueueSnackbar('Deleted Coding Session', { variant: 'success' });
  }, [projectId, finishCodingSession, enqueueSnackbar]);

  const handleStartCodingSessionClick = useCallback(async () => {
    await startCodingSession({ variables: { projectId } });
    console.log(`Start coding session for ${projectId}`);
  }, [projectId, startCodingSession]);

  const handleSaveBtnClick = useCallback(async () => {
    const response = await updateProject({
      variables: { projectId, input: { auth: projectAuth, ...value } },
    });

    if (oc(response).data.updateProject())
      enqueueSnackbar('Saved Project', { variant: 'success' });
  }, [projectId, projectAuth, value, updateProject, enqueueSnackbar]);

  const CodeButton = useCallback(
    () =>
      oc(data).project.codeSession() ? (
        <>
          <a
            href={`https://${oc(
              data,
            ).project.codeSession.containerId()}.coder.kristianjones.dev`}
          >
            Session
          </a>
          <BaseButtonCore
            label='Remove coding session'
            variant='contained'
            color='primary'
            onClick={handleFinishCodingSession}
          />
        </>
      ) : (
        <BaseButtonCore
          label='Start Coding Session'
          variant='contained'
          color='primary'
          onClick={handleStartCodingSessionClick}
        >
          {codingLoading && (
            <CircularProgress
              style={{ color: 'white', marginRight: '1em' }}
              size={25}
            />
          )}
        </BaseButtonCore>
      ),
    [
      data,
      handleStartCodingSessionClick,
      codingLoading,
      handleFinishCodingSession,
    ],
  );

  if (!data) return <></>;

  return (
    <>
      <Header title={{ primary: data ? data.project.name : 'Project' }} />
      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <PaperSection>
            <Typography variant='h4'>Project Settings</Typography>
            <TextField
              label='Name'
              variant='outlined'
              className={classes.input}
              defaultValue={oc(data).project.name('')}
              value={value.name}
              onChange={handleChangeValue('name')}
            />
            <TextField
              label='GIT URL'
              variant='outlined'
              className={classes.input}
              defaultValue={oc(data).project.gitUrl('')}
              value={value.gitUrl}
              onChange={handleChangeValue('gitUrl')}
            />
          </PaperSection>

          <PaperSection>
            <Typography variant='h4'>Project Auth</Typography>
            <TextField
              label='Auth Username'
              variant='outlined'
              className={classes.input}
              defaultValue={oc(data).project.projectAuth.username('')}
              value={oc(projectAuth).username()}
              onChange={handleChangeProjectAuth('username')}
            />
            <TextField
              label='Auth Password'
              variant='outlined'
              className={classes.input}
              defaultValue={oc(data).project.projectAuth.password('')}
              value={oc(projectAuth).password()}
              onChange={handleChangeProjectAuth('password')}
            />
          </PaperSection>

          <BaseButtonCore
            variant='contained'
            label='Save Changes'
            color='primary'
            onClick={handleSaveBtnClick}
          >
            {updateLoading && (
              <CircularProgress
                style={{ color: 'white', marginRight: '1em' }}
                size={25}
              />
            )}
          </BaseButtonCore>

          <CodeButton />
        </PageSectionRoot>
      </div>
    </>
  );
}
