import * as React from 'react';
import { Pagination, PaginationItem, Stack, TablePagination, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const PaginationPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [tablePage, setTablePage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <ComponentPage
      title="Pagination"
      description="The Pagination component enables the user to select a specific page from a range of pages."
    >
      <Section title="Basic">
        <Stack spacing={2}>
          <Pagination count={10} />
          <Pagination count={10} color="primary" />
          <Pagination count={10} color="secondary" />
          <Pagination count={10} disabled />
        </Stack>
      </Section>

      <Section title="Outlined">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" />
          <Pagination count={10} variant="outlined" color="primary" />
          <Pagination count={10} variant="outlined" color="secondary" />
          <Pagination count={10} variant="outlined" disabled />
        </Stack>
      </Section>

      <Section title="Rounded">
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" />
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Section>

      <Section title="Sizes">
        <Stack spacing={2}>
          <Pagination count={10} size="small" />
          <Pagination count={10} size="medium" />
          <Pagination count={10} size="large" />
        </Stack>
      </Section>

      <Section title="Buttons">
        <Stack spacing={2}>
          <Pagination count={10} showFirstButton showLastButton />
          <Pagination count={10} hidePrevButton hideNextButton />
        </Stack>
      </Section>

      <Section title="Controlled">
        <Pagination
          count={10}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Section>

      <Section title="Custom Icons">
        <Pagination
          count={10}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Section>

      <Section title="Ranges">
        <Stack spacing={2}>
          <Pagination count={11} defaultPage={6} siblingCount={0} />
          <Pagination count={11} defaultPage={6} />
          <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
          <Pagination count={11} defaultPage={6} boundaryCount={2} />
        </Stack>
      </Section>

      <Section title="Table Pagination">
        <Box>
          <TablePagination
            component="div"
            count={100}
            page={tablePage}
            onPageChange={(_, newPage) => setTablePage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setTablePage(0);
            }}
          />
        </Box>
      </Section>
    </ComponentPage>
  );
};
