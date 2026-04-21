import { cn } from "@/lib/utils";

export default function Indicator({
  index,
  num,
  indexCallback,
}: {
  index: number;
  num: number;
  indexCallback?: (index: number) => void;
}) {
  return (
    <div className="absolute w-full flex gap-2 items-center justify-center bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 mb-4 text-center">
      {Array.from({ length: num }, (_, i) => (
        <button
          key={i}
          onClick={() => indexCallback?.(i)}
          className={cn(
            "w-2.5 h-2.5 rounded-full bg-white transition-transform cursor-pointer",
            {
              "opacity-100": i === index,
              "w-2 h-2 opacity-30": i !== index,
            },
          )}
        />
      ))}
    </div>
  );
}
