import LookbookExperience from "@/components/home/LookbookExperience";

export default function Lookbook() {
  return (
    <main className="wrap section">
      <p className="eyebrow">VISUAL JOURNAL · COLLECTION NOTES</p>
      <h1 className="section-title">The lookbook.</h1>
      <p className="muted mt-4 max-w-xl text-sm leading-7">
        Explore considered combinations and add individual pieces to your bag.
        Each look is a styling direction, ready to be made your own.
      </p>
      <LookbookExperience />
    </main>
  );
}
