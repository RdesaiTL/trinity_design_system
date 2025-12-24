import * as React from 'react';
import { Badge, Box, IconButton, Avatar, Stack } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const BadgePage: React.FC = () => (
  <ComponentPage
    title="Badge"
    description="Badge generates a small badge to the top-right of its child(ren)."
  >
    <Section title="Basic">
      <Showcase>
        <Badge badgeContent={4} color="primary">
          <MailIcon color="action" />
        </Badge>
        <Badge badgeContent={10} color="secondary">
          <MailIcon color="action" />
        </Badge>
        <Badge badgeContent={100} color="error">
          <MailIcon color="action" />
        </Badge>
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase>
        <Badge badgeContent={4} color="default"><MailIcon /></Badge>
        <Badge badgeContent={4} color="primary"><MailIcon /></Badge>
        <Badge badgeContent={4} color="secondary"><MailIcon /></Badge>
        <Badge badgeContent={4} color="success"><MailIcon /></Badge>
        <Badge badgeContent={4} color="error"><MailIcon /></Badge>
        <Badge badgeContent={4} color="warning"><MailIcon /></Badge>
        <Badge badgeContent={4} color="info"><MailIcon /></Badge>
      </Showcase>
    </Section>

    <Section title="Maximum Value">
      <Showcase>
        <Badge badgeContent={99} color="primary"><MailIcon /></Badge>
        <Badge badgeContent={100} color="primary"><MailIcon /></Badge>
        <Badge badgeContent={1000} max={999} color="primary"><MailIcon /></Badge>
      </Showcase>
    </Section>

    <Section title="Dot Badge">
      <Showcase>
        <Badge variant="dot" color="primary"><MailIcon /></Badge>
        <Badge variant="dot" color="secondary"><NotificationsIcon /></Badge>
        <Badge variant="dot" color="error"><ShoppingCartIcon /></Badge>
      </Showcase>
    </Section>

    <Section title="Badge Visibility">
      <Showcase>
        <Badge badgeContent={0} color="primary"><MailIcon /></Badge>
        <Badge badgeContent={0} color="primary" showZero><MailIcon /></Badge>
        <Badge badgeContent={4} color="primary" invisible><MailIcon /></Badge>
      </Showcase>
    </Section>

    <Section title="Alignment">
      <Showcase>
        <Badge badgeContent={4} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}><MailIcon /></Badge>
        <Badge badgeContent={4} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}><MailIcon /></Badge>
        <Badge badgeContent={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><MailIcon /></Badge>
        <Badge badgeContent={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}><MailIcon /></Badge>
      </Showcase>
    </Section>

    <Section title="With Avatar">
      <Showcase>
        <Badge
          overlap="circular"
          badgeContent={4}
          color="primary"
        >
          <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
        </Badge>
        <Badge
          overlap="circular"
          variant="dot"
          color="success"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Avatar src="https://mui.com/static/images/avatar/2.jpg" />
        </Badge>
      </Showcase>
    </Section>
  </ComponentPage>
);
