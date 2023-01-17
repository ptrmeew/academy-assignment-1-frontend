export type TaggedImageProps = { imgUrl: string; iconUrl?: string; tagText?: string };

const TaggedImage: React.FC<TaggedImageProps> = ({ imgUrl, iconUrl, tagText = '' }) => (
  <article className="relative w-40 h-32 bg-cover md:w-80 md:h-56 border-2 border-white" style={{ backgroundImage: `url(${imgUrl})` }}>
    <div className="absolute right-0 top-3 md:top-4 px-4 py-2 text-center w-24 md:w-32 items-end bg-primary-brand border border-r-0 border-white">
      <p className="text-sm text-white md:text-base font-semibold">{tagText}</p>
    </div>
    <div className="absolute right-[-5px] bottom-1 md:bottom-2 md:right-[-10px] items-end">
      <img src={iconUrl} alt="" className="w-[50px] md:w-[90px]" />
    </div>
  </article>
);

export default TaggedImage;
