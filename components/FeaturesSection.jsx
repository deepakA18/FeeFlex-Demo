import Image from 'next/image'; 

export default function Component() {
  return (
    <div className=" text-[#D8F3DC] min-h-screen flex flex-col items-center justify-center p-4 mt-16 mb-10">
      <h1 className="text-lg font-normal mb-6 text-shadow-glow">Why choose Us?</h1>

      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-transparent border border-[#D8F3DC] text-[#D8F3DC] px-8 py-2 rounded-[5px] text-xl z-10 font-regular">
            Features
          </div>
        </div>

        <div className="grid grid-cols-2 gap-40 ">
          <FeatureItem
            icon="/top-left.svg" 
            title="No Native Tokens Required"
            description="You don't need to hold tokens like ETH or SOL to cover gas fees."
            alignment="right"
          />

          <FeatureItem
            icon="/top-right.svg" 
            title="Seamless Liquidity Pool"
            description="Our unique liquidity pool ensures smooth liquidity and reliable token swaps."
            alignment="left"
            reverse
          />
        </div>

        <div className="grid grid-cols-2 gap-40">
          <FeatureItem
            icon="/bottom-left.svg" 
            title="Automatic Fee Deduction"
            description="We automatically calculate fees in the swapped token and handle the conversion for you."
            alignment="right"
          />

          <FeatureItem
            icon="/bottom-right.svg" 
            title="Transparency & Security"
            description="Full visibility on the fees being deducted and strong security protocols to protect your assets."
            alignment="left"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description, alignment }) {
  return (
    <div className={`flex items-center ${alignment === 'left' ? 'justify-start' : 'justify-end'}`}>
      {alignment === 'left' && (
        <div className=" p-3 ">
          <Image src={icon} alt={title} width={150} height={260} />
        </div>
      )}
      <div className={`max-w-xs ${alignment === 'left' ? 'text-left' : 'text-right'} mt-5`}>
        <h2 className="text-sm font-regular mb-2 opacity-[0.5]">{title}</h2>
        <p className="text-white text-sm font-thin">{description}</p>
      </div>
      {alignment === 'right' && (
        <div className="p-3 ">
          <Image src={icon} alt={title} width={150} height={260} /> 
        </div>
      )}
    </div>
  );
}
