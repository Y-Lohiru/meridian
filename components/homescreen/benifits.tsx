const benefits = [
  {
    title: "Complimentary delivery",
    description: "On every order over [AMOUNT], tracked to your door.",
  },
  {
    title: "30-day returns",
    description: "Free on unworn pairs, collected from wherever you are.",
  },
  {
    title: "Resoling for life",
    description: "Send your pair back to the workshop to be resoled and restored.",
  },
  {
    title: "Fitting concierge",
    description: "Sizing, width and care advice from our specialists, seven days a week.",
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-line bg-surface-sand">
      <div className="mx-auto grid max-w-[85rem] grid-cols-1 divide-y divide-line px-4 sm:grid-cols-2 sm:divide-y-0 md:px-10 lg:grid-cols-4">

        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`px-5 py-10 text-center sm:px-8 ${
              index > 0 ? "lg:border-l lg:border-line" : ""
            }`}
          >
            <h3 className="text-sm font-semibold text-ink">
              {benefit.title}
            </h3>

            <p className="mx-auto mt-3 max-w-[230px] text-xs leading-relaxed text-ink-muted">
              {benefit.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}