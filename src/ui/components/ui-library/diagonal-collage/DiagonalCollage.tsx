export type CollageImageProps = {
  topLeftUrl: string;
  centerUrl: string;
  bottomRightUrl: string;
  iconUrl: string;
  collageText: string;
};

const DiagonalCollage: React.FC<CollageImageProps> = ({ topLeftUrl, centerUrl, bottomRightUrl, iconUrl, collageText }) => (
  <section className="flex items-center align-middle">
    <section className="relative mt-[1rem] m-auto flex items-center md:mt-[2rem]">
      <div className="mt-[-12rem] mr-[-2.5rem] border-2 border-white md:mt-[-24rem] md:mr-[-5rem]">
        <img src={topLeftUrl} alt="" className="w-[5rem] md:w-[10rem]" />
      </div>
      <div className="z-10 border-2 border-white">
        <img src={centerUrl} alt="" className="w-[12rem] md:w-[24rem]" />
      </div>
      <div className="mb-[-12rem] ml-[-2.5rem] border-2 border-white md:mb-[-24rem] md:ml-[-5rem]">
        <img src={bottomRightUrl} alt="" className="w-[5rem] md:w-[10rem]" />
      </div>
      <div className="absolute left-0 ml-[-1.5rem] top-[55%] w-[85%] flex items-center gap-6 p-3 z-20 bg-white drop-shadow-sm">
        <img src={iconUrl} alt="" className="max-h-8" />
        <p className="text-black text-sm font-medium">{collageText}</p>
      </div>
    </section>
  </section>
);

export default DiagonalCollage;
