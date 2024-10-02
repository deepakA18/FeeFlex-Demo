// SwapComponent.js

export default function SwapComponent() {
    return (
      <div className="relative flex justify-center items-center max-h-[370px] bg-[#D8F3DC] rounded-lg shadow-md overflow-hidden"> {/* Changed to overflow-hidden */}
        {/* Background SVG */}
        <div className="absolute -right-28 -top-30 z-0">
          <img
            src="/solana-branded.svg"
            alt="Background SVG"
            className="w-[650px] h-[650px] opacity-30 -rotate-12"
          />
        </div>
  
        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-between gap-10">
          <h2 className="text-2xl font-normal text-[#1B4332]">
            "Ready to Swap? Let FeeFlex Handle the Fees!"
          </h2>
          <p className="text-sm pl-2 text-[#1B4332] font-light">
            FeeFlex Labs makes cross-chain token swaps effortless by eliminating
            the need for native tokens to cover gas fees. Join the future of
            seamless DeFi transactions today!
          </p>
          <button className="shadow-custom-dark-green max-w-[200px] h-[50px] px-5 py-2 bg-[#D8F3DC] border border-[#1B4332] rounded-[12px] group hover:bg-[#081c15] hover:shadow-custom-light-green transition-all duration-300 font-normal">
            <span className=" text-[#1B4332] group-hover:text-[#D8F3DC]">Swap Now &gt;</span>
          </button>
        </div>
      </div>
    );
}
