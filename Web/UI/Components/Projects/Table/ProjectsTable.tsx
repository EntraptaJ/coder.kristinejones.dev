// Web/UI/Components/Table/ProjectsTable.tsx
import React, { useCallback } from 'react';
import MaterialTable from 'material-table';
import { useProjectsQuery } from '../GraphQL/Projects.gen';
import { Project, ProjectInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateProjectMutation } from '../GraphQL/CreateProject.gen';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

type ProjectData = Pick<Project, 'id' | 'name' | 'gitUrl'>;

export function ProjectsTable(): React.ReactElement {
  const history = useHistory();
  const { data } = useProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleRowClick: RowClick<ProjectData> = useCallback(
    (a, rowData) => rowData && history.push(`/Projects/${rowData.id}`),
    [history],
  );

  const handleAddProject = useCallback(
    async (input: ProjectInput) => {
      const response = await createProject({ variables: { input } });
      if (response.data && response.data.createProject)
        enqueueSnackbar('Project added successfully', { variant: 'success' });
    },
    [enqueueSnackbar],
  );

  return (
    <>
      <MaterialTable
        title='Projects'
        style={{ margin: '1em' }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'GIT', field: 'gitUrl' },
        ]}
        data={data && data.currentUser ? data.currentUser.projects : []}
        onRowClick={handleRowClick}
        editable={{
          onRowAdd: handleAddProject,
        }}
      />
    </>
  );
}
