import * as React from 'react';
import { Avatar, AvatarGroup, Badge } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import { deepOrange, deepPurple, green, pink } from '@mui/material/colors';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const AvatarPage: React.FC = () => (
  <ComponentPage
    title="Avatar"
    description="Avatars are found throughout material design with uses in everything from tables to dialog menus."
  >
    <Section title="Image Avatars">
      <Showcase>
        <Avatar alt="User 1" src="https://mui.com/static/images/avatar/1.jpg" />
        <Avatar alt="User 2" src="https://mui.com/static/images/avatar/2.jpg" />
        <Avatar alt="User 3" src="https://mui.com/static/images/avatar/3.jpg" />
      </Showcase>
    </Section>

    <Section title="Letter Avatars">
      <Showcase>
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        <Avatar sx={{ bgcolor: green[500] }}>JD</Avatar>
        <Avatar sx={{ bgcolor: pink[500] }}>AB</Avatar>
      </Showcase>
    </Section>

    <Section title="Icon Avatars">
      <Showcase>
        <Avatar><FolderIcon /></Avatar>
        <Avatar sx={{ bgcolor: pink[500] }}><PersonIcon /></Avatar>
        <Avatar sx={{ bgcolor: green[500] }}><FolderIcon /></Avatar>
      </Showcase>
    </Section>

    <Section title="Sizes">
      <Showcase>
        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>S</Avatar>
        <Avatar>M</Avatar>
        <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
        <Avatar sx={{ width: 72, height: 72 }}>XL</Avatar>
      </Showcase>
    </Section>

    <Section title="Variants">
      <Showcase>
        <Avatar variant="circular">C</Avatar>
        <Avatar variant="rounded">R</Avatar>
        <Avatar variant="square">S</Avatar>
      </Showcase>
    </Section>

    <Section title="Avatar Group">
      <Showcase direction="column">
        <AvatarGroup max={4}>
          <Avatar alt="User 1" src="https://mui.com/static/images/avatar/1.jpg" />
          <Avatar alt="User 2" src="https://mui.com/static/images/avatar/2.jpg" />
          <Avatar alt="User 3" src="https://mui.com/static/images/avatar/3.jpg" />
          <Avatar alt="User 4" src="https://mui.com/static/images/avatar/4.jpg" />
          <Avatar alt="User 5" src="https://mui.com/static/images/avatar/5.jpg" />
        </AvatarGroup>
        <AvatarGroup total={24}>
          <Avatar alt="User 1" src="https://mui.com/static/images/avatar/1.jpg" />
          <Avatar alt="User 2" src="https://mui.com/static/images/avatar/2.jpg" />
        </AvatarGroup>
      </Showcase>
    </Section>

    <Section title="With Badge">
      <Showcase>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<Avatar sx={{ width: 22, height: 22, bgcolor: green[500] }}>✓</Avatar>}
        >
          <Avatar alt="User" src="https://mui.com/static/images/avatar/1.jpg" />
        </Badge>
      </Showcase>
    </Section>
  </ComponentPage>
);
