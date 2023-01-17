import React from 'react';

export type TaggedHeroImageProps = { imgUrl: string; overlay?: boolean };

const TaggedHeroImage: React.FC<TaggedHeroImageProps> = ({ imgUrl, overlay }) => (
  <section className="relative max-h-[100vh]">
    <div className="relative">
      <div className="aspect-video bg-center bg-cover" style={{ backgroundImage: `url(${imgUrl})` }} />
      {overlay && <div className="absolute top-0 left-0 aspect-video h-full bg-black/15" />}
    </div>
    <div className="absolute right-0 top-3 md:top-6 px-5 py-2 md:py-4 text-center w-30 md:w-60 items-end bg-primary-brand border border-r-0 border-white">
      <p className="font-bold text-white">10% rabat</p>
    </div>
  </section>
);

export default TaggedHeroImage;
