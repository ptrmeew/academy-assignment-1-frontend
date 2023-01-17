import React from 'react';
import TaggedImage from '../tagged-image/TaggedImage';
import type { TaggedImageProps } from '../tagged-image/TaggedImage';

export type TaggedImageGalleryProps = { images: TaggedImageProps[] };

const TaggedImageGallery: React.FC<TaggedImageGalleryProps> = ({ images }) => (
  <div className="flex justify-center">
    <section className="grid grid-cols-2 gap-[20px] gap-x-[20px]">
      {images.map((image, i) => (
        <TaggedImage key={i} imgUrl={image.imgUrl} iconUrl={image.iconUrl} />
      ))}
    </section>
  </div>
);

export default TaggedImageGallery;
