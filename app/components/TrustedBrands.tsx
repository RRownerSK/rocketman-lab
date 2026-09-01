import InfiniteMarquee from "./InfiniteMarquee";

// TODO: nahradiť reálnymi logami klientov / partnerov, ktorých máme povolenie zobraziť
const BRANDS = [
  "STUDIO NOVA",
  "NORTHPEAK",
  "VELLUM",
  "ARKIVE",
  "PLATEAU CO.",
  "MERIDIAN",
  "HOLLOWPOINT",
  "CIRCUIT & CO.",
];

export default function TrustedBrands() {
  return (
    <InfiniteMarquee
      words={BRANDS}
      ariaLabel="Značky, s ktorými sme spolupracovali"
      theme="dark"
      variant="logo"
      durationSeconds={38}
    />
  );
}
