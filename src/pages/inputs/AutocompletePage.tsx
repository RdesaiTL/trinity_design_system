import * as React from 'react';
import { TextField, Autocomplete, Chip } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

const movies = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Interstellar', year: 2014 },
];

export const AutocompletePage: React.FC = () => (
  <ComponentPage
    title="Autocomplete"
    description="The autocomplete is a text input enhanced with a panel of suggested options."
  >
    <Section title="Basic">
      <Showcase>
        <Autocomplete
          options={movies}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Showcase>
    </Section>

    <Section title="Multiple Values">
      <Showcase>
        <Autocomplete
          multiple
          options={movies}
          defaultValue={[movies[0]]}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Movies" placeholder="Add movie" />}
        />
      </Showcase>
    </Section>

    <Section title="With Chips">
      <Showcase>
        <Autocomplete
          multiple
          options={movies}
          defaultValue={[movies[0], movies[1]]}
          sx={{ width: 400 }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option.label} {...getTagProps({ index })} size="small" />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Favorites" />}
        />
      </Showcase>
    </Section>

    <Section title="Sizes">
      <Showcase>
        <Autocomplete
          options={movies}
          size="small"
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Small" />}
        />
        <Autocomplete
          options={movies}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Medium" />}
        />
      </Showcase>
    </Section>

    <Section title="Disabled & Read-only">
      <Showcase>
        <Autocomplete
          options={movies}
          disabled
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Disabled" />}
        />
        <Autocomplete
          options={movies}
          readOnly
          value={movies[0]}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Read-only" />}
        />
      </Showcase>
    </Section>
  </ComponentPage>
);
