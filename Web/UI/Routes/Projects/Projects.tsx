// Web/UI/Routes/Projects/Projects.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { ProjectsTable } from 'UI/Components/Projects/Table/ProjectsTable';

export default function ProjectsRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Projects' }} />
      <ProjectsTable />
    </>
  );
}
