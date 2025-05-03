import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { characters } from "./hero-block.constant";
export default function HeroBlockMobile() {
  return (
    <div
      data-testid="hero-block-mobile"
      className="h-hero-block-mobile -mt-[var(--height-navbar)] w-full bg-[url('/hero-block-main-background.webp')] bg-cover bg-center select-none xl:hidden"
    >
      <div className="h-full w-full bg-[url('/hero-block-bottom-background.svg')] bg-bottom bg-repeat-x">
        <div className="container flex h-full flex-col pt-[var(--height-navbar)]">
          <div className="mb-auto flex flex-shrink-1 flex-col items-center justify-center">
            <img src="/new-arrival.svg" alt="New Arrival" className="w-64" />
            <img
              src={characters.featured.image}
              alt={characters.featured.name}
              className="mt-2 h-[220px] object-cover"
            />
          </div>
          <div className="max-h-hero-block-bottom flex-grow-1 basis-[var(--height-hero-block-bottom)] flex-nowrap items-center gap-x-20">
            <Carousel
              opts={{
                align: "start",
              }}
              className="flex h-full w-full items-center justify-center"
            >
              <CarouselContent>
                {characters.items.map((character) => (
                  <CarouselItem
                    key={character.name}
                    className="flex basis-full flex-col items-center justify-center sm:basis-1/2"
                  >
                    <img
                      src={character.image}
                      alt={character.name}
                      className="h-[180px] w-[200px] object-cover"
                    />
                    <p className="font-squada-one mt-4 text-center text-lg text-black uppercase">
                      {character.name}
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="from-gradient-stop-1 to-gradient-stop-2 absolute top-1/2 left-0 -translate-y-1/2 border-none bg-gradient-to-r" />
              <CarouselNext className="from-gradient-stop-1 to-gradient-stop-2 absolute top-1/2 right-0 -translate-y-1/2 border-none bg-gradient-to-l" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
