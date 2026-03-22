"use client";

export default function InteractiveCard({
  children,
  contentName,
}: {
  children: React.ReactNode;
  contentName: string;
}) {
  function OnCardMouseAction(event: React.SyntheticEvent) {
    if (event.type === "mouseover") {
      event.currentTarget.classList.remove("shadow-lg", "bg-white");
      event.currentTarget.classList.add("shadow-2xl", "bg-neutral-200");
    } else if (event.type === "mouseout") {
      event.currentTarget.classList.remove("shadow-2xl", "bg-neutral-200");
      event.currentTarget.classList.add("shadow-lg", "bg-white");
    }
  }

  return (
    <div
      className="w-[260px] h-[340px] rounded-2xl shadow-md bg-white border border-gray-100 transition-all duration-300 ease-in-out flex flex-col group overflow-hidden"
      onMouseOver={(e) => OnCardMouseAction(e)}
      onMouseOut={(e) => OnCardMouseAction(e)}
    >
      {children}
    </div>
  );
}