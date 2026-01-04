import * as React from 'react';
import {
  Card, CardContent, CardActions, CardMedia, CardHeader, CardActionArea,
  Typography, Button, Avatar, IconButton, Collapse, Grid,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import { ComponentPage, Section } from '../../components/shared';

export const CardPage: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <ComponentPage
      title="Card"
      description="Cards contain content and actions about a single subject."
    >
      <Section title="Basic Card">
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Basic Card
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              adjective
            </Typography>
            <Typography variant="body2">
              Well meaning and kindly. "a benevolent smile"
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Section>

      <Section title="Outlined Card">
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Outlined Card
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              adjective
            </Typography>
            <Typography variant="body2">
              This card uses the outlined variant which displays a border instead of elevation.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Section>

      <Section title="Media Card">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140, bgcolor: 'primary.main' }}
            title="Image placeholder"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Media Card
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Cards can also include media like images or videos. The colored area above represents where an image would be displayed.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Section>

      <Section title="Complex Card">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
            action={<IconButton><MoreVertIcon /></IconButton>}
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2024"
          />
          <CardMedia
            sx={{ height: 194, bgcolor: 'secondary.main' }}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton><FavoriteIcon /></IconButton>
            <IconButton><ShareIcon /></IconButton>
            <IconButton
              onClick={() => setExpanded(!expanded)}
              sx={{ ml: 'auto', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat oil in a large paella pan. Add chorizo and cook until browned.
              </Typography>
              <Typography>
                Set aside and keep warm.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Section>

      <Section title="Action Area Card">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia sx={{ height: 140, bgcolor: 'info.main' }} title="Clickable area" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Clickable Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The entire card is clickable using CardActionArea. Hover to see the ripple effect.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Section>

      <Section title="Elevation">
        <Grid container spacing={2}>
          {[0, 1, 2, 4, 8, 12].map((elevation) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={elevation}>
              <Card elevation={elevation} sx={{ p: 2, textAlign: 'center' }}>
                <Typography>Elevation {elevation}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </ComponentPage>
  );
};
