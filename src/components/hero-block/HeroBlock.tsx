import { characters } from "./hero-block.constant";
import HeroBlockMobile from "./HeroBlockMobile";
export default function HeroBlock() {
  return (
    <>
      <div
        data-testid="hero-block-desktop"
        className="h-hero-block-desktop -mt-[var(--height-navbar)] hidden w-full bg-[url('/hero-block-main-background.webp')] bg-cover bg-center select-none xl:block"
      >
        <div className="h-full w-full bg-[url('/hero-block-bottom-background.svg')] bg-bottom bg-repeat-x">
          <div className="container flex h-full pt-[var(--height-navbar)]">
            <div className="flex flex-[3] flex-col items-center justify-center">
              <div className="flex flex-1 items-center">
                <img src="/new-arrival.svg" alt="New Arrival" />
              </div>
              <div className="h-hero-block-bottom flex items-center gap-x-20">
                {characters.items.map((character) => (
                  <div key={character.name}>
                    <img
                      src={character.image}
                      alt={character.name}
                      className="h-[180px] w-[200px] object-cover"
                    />
                    <p className="font-squada-one mt-4 text-center text-lg text-black uppercase">
                      {character.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-[1] items-end">
              <img
                src={characters.featured.image}
                alt={characters.featured.name}
              />
            </div>
          </div>
        </div>
      </div>
      <HeroBlockMobile />
    </>
  );
}
