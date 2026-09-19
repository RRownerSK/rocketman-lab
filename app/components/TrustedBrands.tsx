import Image from "next/image";
import InfiniteMarquee from "./InfiniteMarquee";
import styles from "./TrustedBrands.module.css";

/* All ten logos are 400x200 white-on-transparent, so a single rendered
   height lines them up without any per-brand tuning. */
const BRANDS: { file: string; name: string }[] = [
  { file: "logo2_inspiravita.png", name: "Inspiravita" },
  { file: "logo3_talentia.png", name: "Talentia" },
  { file: "logo4_nekonecnakniznica.png", name: "Nekonečná knižnica" },
  { file: "logo5_zlatykruh.png", name: "Zlatý kruh" },
  { file: "logo6_apartmanjuli.png", name: "Apartmán Juli" },
  { file: "logo7_alimahfusion.png", name: "Alimah Fusion" },
  { file: "logo8_platko.png", name: "Platko Catering" },
  { file: "logo1_kompletfit.png", name: "Kompletfit" },
  { file: "logo9_legionarskysyndikat_2.png", name: "Legionársky syndikát" },
  { file: "logo10_jedenapolchlapa.png", name: "Jeden a pol chlapa" },
];

export default function TrustedBrands() {
  return (
    <InfiniteMarquee
      items={BRANDS.map((brand) => (
        <Image
          key={brand.file}
          className={styles.logo}
          src={`/logos/${brand.file}`}
          alt={brand.name}
          width={400}
          height={200}
        />
      ))}
      ariaLabel="Značky, s ktorými sme spolupracovali"
      variant="logo"
      durationSeconds={38}
    />
  );
}
