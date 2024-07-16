"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import umbreon from "/public/umbreon.png";
import giratina from "/public/giratina.png";
import charizard from "/public/charizard.png";
import lillie from "/public/lillie.png";
import React from "react";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <motion.div
      id="home"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.7 }}
    >
      <section className="py-12 xl:py-24 xl:pt-28 bg-primary-light">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between gap-x-8">
            <div className="max-w-[700px] justify-center mx-auto xl:mx-0">
              <h1 className="text-7xl uppercase xl:text-[72px] xl:leading-[80px] tracking-[-2px] font-bold">
                Pokémon card prices made easy
              </h1>
              <p className="pt-8 max-w-[650px] text-muted-foreground font-light text-lg mb-8 mx-auto xl:mx-0">
                An effective way for Pokémon card collectors, players, and
                investors to track the value of their collection.
              </p>
              <div className="flex flex-row gap-y-3 md:flex-row gap-x-4 mx-auto xl:mx-0">
                <Link href="/login">
                  <Button className="gap-x-2 focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex relative justify-end">
              <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  <CarouselItem>
                    <Image
                      src={umbreon}
                      alt=""
                      width={1000}
                      height={1000}
                    ></Image>
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={giratina}
                      alt=""
                      width={1000}
                      height={1000}
                    ></Image>
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={charizard}
                      alt=""
                      width={1000}
                      height={1000}
                    ></Image>
                  </CarouselItem>
                  <CarouselItem>
                    <Image 
                      src={lillie} 
                      alt="" 
                      width={1000} 
                      height={1000}
                    ></Image>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hero;
