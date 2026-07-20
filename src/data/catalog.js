export const PRODUCTS = [
  { id: "coat-structure", name: "Structure Coat", category: "Outerwear", price: 480, img: "https://images.unsplash.com/photo-1629374029669-aab2f060553b?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/coat-structure.svg",
    desc: "A floor-skimming coat cut from double-faced wool. One seam runs the full length of the back — the garment hangs from it like a plumb line." },
  { id: "blazer-line", name: "Line Blazer", category: "Tailoring", price: 360, img: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/blazer-line.svg",
    desc: "Single-button tailoring with a lapel sharpened to a point. Padded only where the shoulder needs it, nowhere else." },
  { id: "dress-column", name: "Column Dress", category: "Dresses", price: 420, img: "https://images.unsplash.com/photo-1652184513381-9755426e7fd2?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/dress-column.svg",
    desc: "A single uninterrupted line from collarbone to hem. Heavy crepe keeps the silhouette still while you move." },
  { id: "shirt-paper", name: "Paper Shirt", category: "Shirting", price: 190, img: "https://images.unsplash.com/photo-1611042553484-d61f84d22784?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/shirt-paper.svg",
    desc: "Crisp bone poplin that holds a crease like folded paper. Mother-of-pearl buttons, hidden placket option on request." },
  { id: "trouser-wide", name: "Wide Trouser", category: "Tailoring", price: 260, img: "https://images.unsplash.com/photo-1627577279497-4b24bf1021b6?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/trouser-wide.svg",
    desc: "A full-leg trouser that breaks exactly once at the shoe. High rise, deep pockets, pressed front line." },
  { id: "knit-cloud", name: "Cloud Knit", category: "Knitwear", price: 240, img: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/knit-cloud.svg",
    desc: "Undyed merino spun loose. The horizontal rib is the only pattern this house allows itself." },
  { id: "skirt-bias", name: "Bias Skirt", category: "Dresses", price: 230, img: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/skirt-bias.svg",
    desc: "Cut on the bias so the fabric falls in soft verticals. Sits at the natural waist, ends mid-calf." },
  { id: "top-halter", name: "Halter Top", category: "Shirting", price: 150, img: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/top-halter.svg",
    desc: "A single piece of bone jersey held by one seam at the neck. Wear it under the Line Blazer or on its own." }
];

export const CATEGORIES = ["All", "Outerwear", "Tailoring", "Dresses", "Knitwear", "Shirting"];

export const LOOKS = [
  { name: "The Structure Coat", img: "https://images.unsplash.com/photo-1629374029669-aab2f060553b?q=80&w=800&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-1.svg", link: "/product/coat-structure" },
  { name: "Cloud Knit / Wide Trouser", img: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=800&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-2.svg", link: "/product/knit-cloud" },
  { name: "The Column Dress", img: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=800&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-3.svg", link: "/product/dress-column" }
];

export const LOOKBOOK = [
  { img: "https://images.unsplash.com/photo-1541519481457-763224276691?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-1.svg", caption: "Atelier study 01 — white on black", wide: false },
  { img: "https://images.unsplash.com/photo-1629374029669-aab2f060553b?q=80&w=800&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-1.svg", caption: "Look 01 — Structure Coat", wide: false },
  { img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-3.svg", caption: "Three cuts, one line", wide: true },
  { img: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=800&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-2.svg", caption: "Look 02 — Cloud Knit, Wide Trouser", wide: false },
  { img: "https://images.unsplash.com/photo-1652184513381-9755426e7fd2?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-2.svg", caption: "Cut in silence — the Column Dress", wide: false },
  { img: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=800&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-3.svg", caption: "Look 03 — Column Dress", wide: false }
];

export const POSTS = [
  {
    slug: "why-two-colors",
    title: "Why we only work in two colors",
    date: "June 2026",
    tag: "Manifesto",
    img: "https://images.unsplash.com/photo-1541519481457-763224276691?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-1.svg",
    excerpt: "Color is the first thing a garment says. We wanted our clothes to say something else first.",
    body: [
      "Color is the first thing a garment says, and usually the loudest. Remove it, and the room goes quiet enough to hear the other things a garment can say: the weight of the cloth, the angle of a shoulder, the way a hem moves half a second after the person wearing it.",
      "This is not minimalism as an aesthetic. It is a constraint we chose because constraints are honest. When you cannot reach for a print or a shade to make a piece interesting, the cut has to carry everything, and a weak cut has nowhere to hide.",
      "Black and bone white are not two colors so much as two temperatures. Black holds the line of a silhouette. Bone softens it. A wardrobe built from the two of them never argues with itself in the morning."
    ]
  },
  {
    slug: "anatomy-of-the-structure-coat",
    title: "Anatomy of the Structure Coat",
    date: "May 2026",
    tag: "Atelier",
    img: "https://images.unsplash.com/photo-1629374029669-aab2f060553b?q=80&w=900&auto=format&fit=crop&sat=-100", fb: "/assets/coat-structure.svg",
    excerpt: "One seam runs the full length of the back. Everything else hangs from it.",
    body: [
      "The Structure Coat began as a single vertical line on a drafting table. That line survived every fitting and is now the center-back seam — the spine the whole coat hangs from, the way a plumb line hangs from a nail.",
      "Double-faced wool means there is no lining to do the work of hiding things. Every internal seam is bound by hand, because in this construction the inside of the coat is simply another outside.",
      "It takes our atelier eleven hours to finish one. We make twelve per month. This is not scarcity marketing; it is just how long eleven hours takes."
    ]
  },
  {
    slug: "care-repair-forever",
    title: "Care, repair, forever",
    date: "April 2026",
    tag: "House",
    img: "https://images.unsplash.com/photo-1652184513381-9755426e7fd2?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-2.svg",
    excerpt: "We repair any MONO/FORM piece free of charge, for as long as the house exists.",
    body: [
      "A garment you repair becomes more yours, not less. The mend records a winter, a move, a decade. We would rather our pieces collect that history than be replaced by a new season's version of themselves.",
      "So the policy is simple: any MONO/FORM piece, any age, repaired free of charge for as long as the house exists. Post it to the atelier, and it comes back wearing its history well.",
      "Natural fibers, reinforced seams, and repairable construction are the quiet half of this promise. The loud half is this page."
    ]
  }
];

export const FAQS = [
  { group: "Shipping", items: [
    ["How long does shipping take?", "Orders ship within 2 business days. Domestic delivery takes 3–5 days, international 7–14 days. Every order is trackable."],
    ["Do you ship internationally?", "Yes, worldwide. Duties and taxes for international orders are calculated at checkout so there are no surprises at the door."]
  ]},
  { group: "Returns", items: [
    ["What is the return policy?", "30 days on unworn pieces with tags attached. Refunds are issued to the original payment method within 5 business days of arrival back at the atelier."],
    ["Can I exchange for a different size?", "Yes. Start a return and note the size you need — exchanges ship free, both directions."]
  ]},
  { group: "Sizing & fit", items: [
    ["How does sizing run?", "True to size with an intentionally relaxed line. Between sizes, take the smaller one. Each product page lists garment measurements."],
    ["Do you offer alterations?", "Hem and sleeve adjustments are free on full-price pieces. Request them at checkout in the order notes."]
  ]},
  { group: "The garments", items: [
    ["What are the pieces made of?", "Natural fibers only: wool, merino, cotton poplin, heavy crepe. No synthetics, no blends we would not wear ourselves."],
    ["Is the repair service really free?", "Yes. Any MONO/FORM piece, any age, repaired free for as long as the house exists."]
  ]}
];

export const SIZE_ROWS = [
  ["XS", "78–82", "60–64", "84–88"],
  ["S", "84–88", "66–70", "90–94"],
  ["M", "90–94", "72–76", "96–100"],
  ["L", "96–102", "78–84", "102–108"],
  ["XL", "104–110", "86–92", "110–116"]
];

export const EDITORIAL = {
  atelier: { img: "https://images.unsplash.com/photo-1541519481457-763224276691?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-1.svg" },
  column:  { img: "https://images.unsplash.com/photo-1652184513381-9755426e7fd2?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-2.svg" },
  wide:    { img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop&sat=-100", fb: "/assets/editorial-3.svg" },
  street:  { img: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=1000&auto=format&fit=crop&sat=-100", fb: "/assets/model-look-2.svg" }
};
