import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ComponentPage, Section } from '../../components/shared';

const itemData = [
  { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast', author: '@bkristastucchio' },
  { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger', author: '@rollelflex_graphy726' },
  { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera', author: '@helloimnik' },
  { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee', author: '@nodaramago' },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats', author: '@hjrc33' },
  { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey', author: '@arwinneil' },
];

const quilted = [
  { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast', cols: 2, rows: 2 },
  { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger', cols: 1, rows: 1 },
  { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera', cols: 1, rows: 1 },
  { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee', cols: 2, rows: 1 },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats', cols: 1, rows: 1 },
  { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey', cols: 1, rows: 1 },
];

export const ImageListPage: React.FC = () => (
  <ComponentPage
    title="Image List"
    description="Image lists display a collection of images in an organized grid."
  >
    <Section title="Standard">
      <ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>

    <Section title="Quilted">
      <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={4} rowHeight={121}>
        {quilted.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              src={`${item.img}?w=${121 * (item.cols || 1)}&h=${121 * (item.rows || 1)}&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>

    <Section title="Woven">
      <ImageList sx={{ width: 500, height: 300 }} variant="woven" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=161&fit=crop&auto=format`}
              srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>

    <Section title="Masonry">
      <ImageList variant="masonry" cols={3} gap={8} sx={{ width: 500 }}>
        {itemData.map((item, index) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ height: 150 + (index % 3) * 50 }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>

    <Section title="With Title Bar">
      <ImageList sx={{ width: 500, height: 300 }} cols={3}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>

    <Section title="Title Bar Below">
      <ImageList sx={{ width: 500, height: 300 }} cols={3}>
        {itemData.slice(0, 3).map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>
  </ComponentPage>
);
