import * as React from 'react';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComponentPage, Section } from '../../components/shared';

interface RowData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const sampleData: RowData[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active' },
];

const StatusChip: React.FC<{ status: RowData['status'] }> = ({ status }) => {
  const colors: Record<RowData['status'], 'success' | 'default' | 'warning'> = {
    active: 'success',
    inactive: 'default',
    pending: 'warning',
  };
  return <Chip size="small" label={status} color={colors[status]} />;
};

export const DataTablePage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(sampleData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredData = sampleData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ComponentPage
      title="Data Table"
      description="Data tables display information in a grid-like format with rows and columns, supporting features like sorting, filtering, and selection."
    >
      <Section title="Basic Table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.slice(0, 3).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell><StatusChip status={row.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      <Section title="Table with Selection & Actions">
        <Paper>
          <Box sx={{ p: 2 }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {selected.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {selected.length} selected
              </Typography>
            )}
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < sampleData.length}
                      checked={selected.length === sampleData.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active direction="asc">Name</TableSortLabel>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow
                    key={row.id}
                    selected={selected.includes(row.id)}
                    hover
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell><StatusChip status={row.status} /></TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><EditIcon /></IconButton>
                      <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Section>

      <Section title="Dense Table">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell><StatusChip status={row.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>
    </ComponentPage>
  );
};
