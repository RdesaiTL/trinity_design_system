import * as React from 'react';
import { Chip, Avatar } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import DoneIcon from '@mui/icons-material/Done';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const ChipPage: React.FC = () => {
  const handleClick = () => console.log('Chip clicked');
  const handleDelete = () => console.log('Chip deleted');

  return (
    <ComponentPage
      title="Chip"
      description="Chips are compact elements that represent an input, attribute, or action."
    >
      <Section title="Basic">
        <Showcase>
          <Chip label="Chip Filled" />
          <Chip label="Chip Outlined" variant="outlined" />
        </Showcase>
      </Section>

      <Section title="Clickable">
        <Showcase>
          <Chip label="Clickable" onClick={handleClick} />
          <Chip label="Clickable" variant="outlined" onClick={handleClick} />
        </Showcase>
      </Section>

      <Section title="Deletable">
        <Showcase>
          <Chip label="Deletable" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Custom Icon" onDelete={handleDelete} deleteIcon={<DoneIcon />} />
        </Showcase>
      </Section>

      <Section title="Clickable & Deletable">
        <Showcase>
          <Chip label="Clickable Deletable" onClick={handleClick} onDelete={handleDelete} />
          <Chip label="Clickable Deletable" variant="outlined" onClick={handleClick} onDelete={handleDelete} />
        </Showcase>
      </Section>

      <Section title="With Avatar">
        <Showcase>
          <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
          <Chip avatar={<Avatar src="https://mui.com/static/images/avatar/1.jpg" />} label="Image" />
          <Chip avatar={<Avatar>M</Avatar>} label="Deletable" onDelete={handleDelete} />
        </Showcase>
      </Section>

      <Section title="With Icon">
        <Showcase>
          <Chip icon={<FaceIcon />} label="With Icon" />
          <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
          <Chip icon={<FaceIcon />} label="Deletable" onDelete={handleDelete} />
        </Showcase>
      </Section>

      <Section title="Colors">
        <Showcase>
          <Chip label="Default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Error" color="error" />
          <Chip label="Warning" color="warning" />
          <Chip label="Info" color="info" />
        </Showcase>
      </Section>

      <Section title="Outlined Colors">
        <Showcase>
          <Chip label="Default" variant="outlined" />
          <Chip label="Primary" color="primary" variant="outlined" />
          <Chip label="Secondary" color="secondary" variant="outlined" />
          <Chip label="Success" color="success" variant="outlined" />
          <Chip label="Error" color="error" variant="outlined" />
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase>
          <Chip label="Small" size="small" />
          <Chip label="Medium" />
        </Showcase>
      </Section>

      <Section title="Disabled">
        <Showcase>
          <Chip label="Disabled" disabled />
          <Chip label="Disabled" disabled variant="outlined" />
          <Chip label="Disabled" disabled onClick={handleClick} />
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
