"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";

// Reusable Circle component
const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border-[#40916C] border bg-[#081c15] p-3 shadow-circle-glow",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef(null);
  const div1Ref = useRef(null); // Ref for User logo
  const div2Ref = useRef(null); // Ref for logo logo
  const logo1Ref = useRef(null); // Ref for first logo (Ethereum)
  const logo2Ref = useRef(null); // Ref for second logo (Solana)
  const logo3Ref = useRef(null); // Ref for third logo (Bitcoin)

  return (
    <div
      className="relative flex w-full max-w-[600px] items-center justify-center overflow-hidden bg-transparent p-10 "
      ref={containerRef}
    >
      <div className="flex w-full items-center justify-between gap-20">
        {/* Left: User logo */}
        <Circle ref={div1Ref}>
          <Icons.user />
        </Circle>

        {/* Center: logo logo */}
        <Circle ref={div2Ref}>
          <Icons.logo />
        </Circle>

        {/* Right: 3 logos one below another */}
        <div className="flex flex-col items-center gap-10">
          <Circle ref={logo1Ref}>
            <Icons.ethereum />
          </Circle>
          <Circle ref={logo2Ref}>
            <Icons.solana />
          </Circle>
          <Circle ref={logo3Ref}>
            <Icons.bitcoin />
          </Circle>
        </div>
      </div>

      {/* Animated beams between User and logo */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={0}
        duration={3}

      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={0}
        duration={5}
        reverse={true}
        
      />
        

      {/* Animated beams from logo to each logo */}
      
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo1Ref}
        startYOffset={-10}
        endYOffset={10}
        curvature={100}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo1Ref}
        startYOffset={-10}
        endYOffset={10}
        curvature={100}
        duration={5}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={0}
        duration={3}

      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={0}
        duration={5}
        reverse={true}

      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo3Ref}
        startYOffset={10}
        endYOffset={-10}
        curvature={-100}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo3Ref}
        startYOffset={10}
        endYOffset={-10}
        curvature={-100}
        reverse={true}
        duration={5}

      />
    </div>
  );
}

// Icons for various tokens (replace with your actual icons)
const Icons = {
  logo: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 375 375" preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id="clip1">
          <path d="M 118.441406 72.25 L 233.941406 72.25 L 233.941406 298.75 L 118.441406 298.75 Z" />
        </clipPath>
        <clipPath id="clip2">
          <path d="M 118.441406 72.25 L 186 72.25 L 186 298.75 L 118.441406 298.75 Z" />
        </clipPath>
      </defs>
      <g fill="#d8f3dc">
        <g transform="translate(85.939902, 299.046718)">
          <path d="M 184.796875 -226.203125 L 177 -176.40625 L 105.90625 -176.40625 L 99.90625 -138.59375 L 164.40625 -138.59375 L 156.59375 -88.796875 L 92.09375 -88.796875 L 78 0 L 19.203125 0 L 54.90625 -226.203125 Z" />
        </g>
      </g>
      <g clipPath="url(#clip1)">
        <path fill="#081c15" d="M 175.632812 72.25 L 233.785156 72.25 L 187.664062 150.394531 L 221.75 150.394531 L 118.484375 298.855469 L 164.605469 183.710938 L 127.511719 185.542969 Z" />
      </g>
      <g clipPath="url(#clip2)">
        <path fill="#52b788" d="M 175.632812 72.25 L 185.65625 72.25 L 127.511719 185.542969 Z M 118.484375 298.855469 L 171.625 183.710938 L 164.605469 183.710938 Z" />
      </g>
    </svg>
  ),
  user: () => (
    <svg x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} width="100" height="100">
      <g>
        <circle fill="#D8F3DC" cx="256" cy="128" r="128" />
        <path fill="#D8F3DC" d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z" />
      </g>
    </svg>
  ),
  ethereum: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 24 24">
    <path fill="#2775ca" fill-rule="evenodd" d="M12 22c5.544 0 10-4.456 10-10S17.544 2 12 2 2 6.456 2 12s4.456 10 10 10m2.75-8.42c0-1.456-.875-1.956-2.625-2.162-1.25-.168-1.5-.5-1.5-1.087 0-.582.42-.956 1.25-.956.75 0 1.17.25 1.375.874a.32.32 0 0 0 .294.207h.663a.284.284 0 0 0 .293-.288v-.044c-.168-.918-.918-1.793-1.875-1.875v-.918c0-.169-.125-.294-.33-.332h-.55c-.17 0-.326.125-.37.332v.918c-1.25.17-2.08 1.126-2.08 2.17 0 1.374.83 1.912 2.58 2.124 1.17.206 1.544.457 1.544 1.125 0 .663-.587 1.125-1.375 1.125-1.087 0-1.462-.462-1.587-1.087-.038-.163-.163-.25-.288-.25h-.712a.284.284 0 0 0-.288.293v.044c.163 1.038.831 1.75 2.207 1.957v.924c0 .17.125.282.33.325h.6c.163 0 .276-.112.32-.325v-.925c1.25-.206 2.124-1.043 2.124-2.168m-6.958 3.114a6.2 6.2 0 0 0 2.083 1.262c.125.087.25.25.25.375v.587c0 .081 0 .125-.043.163-.038.168-.207.25-.375.168a7.5 7.5 0 0 1 0-14.293c.043-.038.125-.038.168-.038.17.038.25.163.25.331v.582c0 .212-.08.337-.25.418a6.17 6.17 0 0 0-3.706 3.707 6.21 6.21 0 0 0 1.623 6.738m6.127-11.57c.038-.168.206-.25.375-.168a7.56 7.56 0 0 1 4.875 4.918c1.25 3.957-.919 8.169-4.875 9.419-.044.038-.125.038-.169.038-.168-.038-.25-.163-.25-.332v-.58c0-.213.082-.338.25-.42 1.707-.625 3.082-1.956 3.707-3.706a6.206 6.206 0 0 0-3.707-8c-.125-.087-.25-.25-.25-.419v-.58c0-.088 0-.126.044-.17" clip-rule="evenodd"/>
</svg>


  ),
  solana: () => (
    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.6066 12.6682C32.3982 12.8569 32.1285 12.9639 31.8474 12.9695H5.16831C4.22268 12.9695 3.74321 11.8874 4.39916 11.2547L8.77936 7.02936C8.98341 6.83229 9.25487 6.72037 9.53852 6.71637H36.3208C37.2781 6.71637 37.7476 7.80851 37.0817 8.44448L32.6066 12.6682Z" fill="url(#paint0_linear_2347_27)"/>
<path d="M32.6066 33.4887C32.3983 33.6765 32.1278 33.7803 31.8474 33.7801H5.16831C4.22268 33.7801 3.74321 32.7079 4.39916 32.0736L8.77936 27.8382C8.98429 27.644 9.25615 27.5361 9.53852 27.5369H36.3208C37.2781 27.5369 37.7476 28.619 37.0817 29.2534L32.6066 33.4887Z" fill="url(#paint1_linear_2347_27)"/>
<path d="M32.6066 17.423C32.3983 17.2352 32.1278 17.1314 31.8474 17.1316H5.16831C4.22268 17.1316 3.74321 18.2038 4.39916 18.8381L8.77936 23.0734C8.98777 23.2622 9.2574 23.3692 9.53852 23.3748H36.3208C37.2781 23.3748 37.7476 22.2926 37.0817 21.6583L32.6066 17.423Z" fill="url(#paint2_linear_2347_27)"/>
<defs>
<linearGradient id="paint0_linear_2347_27" x1="4.09782" y1="28.2411" x2="38.1905" y2="26.8893" gradientUnits="userSpaceOnUse">
<stop stop-color="#599DB0"/>
<stop offset="1" stop-color="#47F8C3"/>
</linearGradient>
<linearGradient id="paint1_linear_2347_27" x1="4.09782" y1="29.4498" x2="37.9907" y2="28.326" gradientUnits="userSpaceOnUse">
<stop stop-color="#C44FE2"/>
<stop offset="1" stop-color="#73B0D0"/>
</linearGradient>
<linearGradient id="paint2_linear_2347_27" x1="6.01239" y1="20.2532" x2="36.1027" y2="20.2532" gradientUnits="userSpaceOnUse">
<stop stop-color="#778CBF"/>
<stop offset="1" stop-color="#5DCDC9"/>
</linearGradient>
</defs>
</svg>

  ),
  bitcoin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g fill="none"><path fill="#FFDD02" d="M12 19.286a7.286 7.286 0 1 0 0-14.572a7.286 7.286 0 0 0 0 14.572"/><path fill="#3A2A0C" d="M12.762 17.271c-3.925-4.375-2.978-6.728-4.898-8.738c-.154.921-.15.72-.15 1.911c0 1.08.034 1.003-.274 1.894c-.343.99-.802 2.465-.463 3.588c.171.574.591.844 1.17 1.007c.565.158.973.437 1.491.643c.562.223.874.48 1.732.411c.471-.034 1.225-.42 1.392-.72z"/><path fill="#895729" d="M7.864 8.533c.086.094.056.026.051.394c0 .489.077.827.15 1.294c.052.3.077.416.077.502c0 .137-.077.227-.342.981c-.215.626-.51 1.513-.515 2.323c-.004.802.275 1.534 1.085 1.873c.274.111.441.163.75.206c.484.072.48-.052.814.192c.531.4 1.268.815 1.984.94c.266.042.686 0 .844.03c.369-.18.708-.267.952-.554c-.952-3-4.217-6.685-5.464-8.571h-.16z"/><path fill="#A86617" d="M13.714 16.714c-2.486-1.341-3.146-3.823-4.157-6.325l.043-.048c-.292.086-.039.043-.3.198c-.609.368-.159.35-.36.77c-.442.922-.845 1.737-.798 2.795c.069 1.539 3.566 3.017 4.895 2.902c.223-.018.514-.202.677-.292"/><path fill="#F59935" d="M9.557 10.389c.154.042.055.77.055.998c-.042.827-.381.857.056.887c2.332 2.512 6.06-.801 6.489-.355c-.343-.845-.66-1.6-1.23-2.302c-.429-.531-2.276-1.157-2.443-1.457c-.193-.351-.819-1.86-1.423-1.723c-.159.034-.111.051-.171.137c.317.943.428 2.379-.849 2.426c-.399-.463-.759-.934-1.307-1.23a.5.5 0 0 0-.232-.056c-.162 0-.325.257-.411.429h.159c.552.835.994.943 1.307 2.246"/><path fill="#DA8515" d="M13.714 16.714c.484-.18.896-1.028 1.157-1.448c-2.876.591-5.121-2.855-5.314-3.035c.073-.334.197-1.791 0-1.842c-.395.287-.193.32-.257.857c-.03.223-.078.201-.163.372c-.193.378-.57 1.398-.566 2.148c.013 1.611 2.597 2.893 3.943 2.948c.437.017.883-.073 1.2 0"/><path fill="#727070" d="M14.871 15.261c.274-.128.433-.12.583-.368c-1.642.154-5.254-.425-6.283-2.207A.7.7 0 0 0 9 13.2c.064.887.994 1.834 1.812 2.027c.763.176 1.428.201 2.105.201c.613 0 1.238-.017 1.95-.167z"/><path fill="#B0B0B0" d="M9.171 12.686C8.794 14.73 12.025 15 13.341 15c.72 0 1.406-.043 2.113-.107c.454-.223.703-1.025.75-1.457c-1.552 1.418-5.473.801-6.536-1.162l-.12-.008c-.008.008-.026.008-.03.021l-.09.064c-.137.09-.171.137-.257.335"/><path fill="#ECB595" d="M9.69 10.196c.99-.086.522-.583.18-.823l-.823-.802c-.172.026-.335.039-.472.125c-.013.582.065 1.204.352 1.581c.505.03.467-.026.763-.081"/><path fill="#F4F4F4" d="M9.668 12.274c-.27.197-.458.356-.201.823c.381.703 1.041.973 1.765 1.23c.558.172 2.268.244 3.343.244h.622c.398-.304.655-.814 1.007-1.14c.098-.094.081-.591.081-.754c0-.42-.06-.424-.128-.758c-.112-.223-.292-.34-.515-.34c-.334 0-.548.018-.891.117c-.879.248-2.074 1.183-2.966 1.161c-.745-.017-1.298-.608-2.117-.583"/><path fill="#985B17" d="M10.478 9.017c.017.189.112.077.562.146c.214.034.415.047.664.047c.206-.497-.129-.073.454-.373c-.158-.111-.326.03-.544-.103c-.257-.154-.3-1.346-.279-1.543c-.008-.008-.025-.03-.03-.021l-.098-.09c-.056-.069-.056-.094-.095-.18a1 1 0 0 0-.085-.184l-.133-.142c-.454.737-.343 1.522-.416 2.443"/><path fill="#2C2B2A" d="M14.978 13.286c.977-1.098.189-1.513-.72-1.17c-.351.133-.746.441-.424.788c.154.167.771.403 1.144.382"/><path fill="#ECB595" d="M11.155 7.149c-.034.222-.043 1.624.416 1.842c.853.069 1.046-.197.681-.797a9.6 9.6 0 0 0-.942-1.337c-.086.137-.018.146-.155.292"/><path fill="#E8E8E8" d="M13.29 10.149c-.103.57 1.178.792 1.272.274c.129-.682-1.187-.716-1.272-.274"/><path fill="#131011" d="M11.142 12.069c.219.634 1.269.312 1.286-.082c.013-.3-.587-.587-.741-.291c-.236.445-.313.162-.545.373m2.143-.412c.099.279.253.369.665.339a.77.77 0 0 0 .385-.129c.172-.103.185-.129.236-.373c-.171-.386-.544-.386-.669-.321c-.317.15.108.077-.24.321c-.094.065-.252.034-.377.159z"/><path fill="#E8E8E8" d="M11.048 10.77c-.386-.261-1.011.497-.656.733c.463.313.96-.532.656-.733"/><path fill="url(#tokenBrandedBonk0)" d="M13.714 4.997c0 .969 0 1.86-.253 1.86c-.313 0-.416-.394-.557-1.337c-.142-.93.043-1.234.321-1.234c.275 0 .489.227.489.711"/><path fill="url(#tokenBrandedBonk1)" d="M13.285 8.143a.429.429 0 1 0 0-.857a.429.429 0 0 0 0 .857"/><path fill="url(#tokenBrandedBonk2)" d="M16.17 5.674c-.412.9-.785 1.727-1.003 1.599c-.27-.163-.189-.583.085-1.534c.275-.94.562-1.123.798-.982c.24.142.325.467.12.917"/><path fill="url(#tokenBrandedBonk3)" d="M14.952 8.34a.43.43 0 0 1-.79-.067a.43.43 0 1 1 .79.067"/><path fill="url(#tokenBrandedBonk4)" d="M18.038 7.346c-.81.497-1.551.955-1.697.745c-.184-.261.086-.548.793-1.157c.694-.591 1.054-.591 1.213-.364c.163.231.094.527-.309.776"/><path fill="url(#tokenBrandedBonk5)" d="M16.092 8.931a.43.43 0 1 1-.47-.718a.43.43 0 0 1 .47.718"/><path fill="#FCDCA3" fill-opacity=".62" d="M12.077 8.901c.004-.111.06-.214.163-.257a.24.24 0 0 1 .287.082c.154.192.325.334.565.381c.108.022.193.103.193.214c0 .103-.085.193-.193.176a1 1 0 0 1-.162-.03c-.258-.069-.618.03-.793.236c-.3.351-.772.583-1.217.583a1.57 1.57 0 0 1-.922-.279c-.086-.064-.073-.188.009-.257s.205-.06.3-.004c.128.072.334.154.613.154c.531 0 1.122-.45 1.157-.999"/><defs><linearGradient id="tokenBrandedBonk0" x1="5.468" x2="18.343" y1="14.236" y2="6.811" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#6C1A1C"/><stop offset=".47" stop-color="#DE1A26"/></linearGradient><linearGradient id="tokenBrandedBonk1" x1="5.442" x2="15.03" y1="14.261" y2="5.238" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#6C1A1C"/><stop offset=".47" stop-color="#DE1A26"/></linearGradient><linearGradient id="tokenBrandedBonk2" x1="5.236" x2="14.471" y1="12.808" y2="17.216" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#6C1A1C"/><stop offset=".47" stop-color="#DE1A26"/></linearGradient><linearGradient id="tokenBrandedBonk3" x1="5.091" x2="17.582" y1="10.812" y2="7.264" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#6C1A1C"/><stop offset=".47" stop-color="#DE1A26"/></linearGradient><linearGradient id="tokenBrandedBonk4" x1="7.776" x2="13.787" y1="10.803" y2="15.759" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#6C1A1C"/><stop offset=".47" stop-color="#DE1A26"/></linearGradient><linearGradient id="tokenBrandedBonk5" x1="6.412" x2="19.074" y1="7.453" y2="10.281" gradientUnits="userSpaceOnUse"><stop offset=".07" stop-color="#6C1A1C"/><stop offset=".47" stop-color="#DE1A26"/></linearGradient></defs></g></svg>
  ),
};
