// components/Product page/filterSidebar.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface ColorOption {
  name: string;
  hex: string;
}

interface FilterSidebarProps {
  categories: string[];
  colors: ColorOption[];
  materials: string[];
}

function FilterSidebarContent({
  categories = [],
  colors = [],
  materials = [],
}: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Parse multi-select arrays from URL
  const selectedCategories = searchParams.get("category")
    ? searchParams.get("category")!.split(",")
    : [];

  const selectedMaterials = searchParams.get("material")
    ? searchParams.get("material")!.split(",")
    : [];

  const selectedColor = searchParams.get("color") || "";
  const urlPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : 2000;

  // Local state for 60fps smooth slider dragging
  const [sliderPrice, setSliderPrice] = useState(urlPrice);

  // Sync local state if URL changes externally or via Clear All
  useEffect(() => {
    setSliderPrice(urlPrice);
  }, [urlPrice]);

  // Multi-Category Toggle
  const handleCategoryToggle = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    if (updated.length > 0) {
      params.set("category", updated.join(","));
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Multi-Material Toggle
  const handleMaterialToggle = (material: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const updated = selectedMaterials.includes(material)
      ? selectedMaterials.filter((m) => m !== material)
      : [...selectedMaterials, material];

    if (updated.length > 0) {
      params.set("material", updated.join(","));
    } else {
      params.delete("material");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Generic Query Param Update (Colors, etc.)
  const updateQueryParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Commit price to URL only when user lets go of the slider
  const commitPriceToUrl = () => {
    updateQueryParam("maxPrice", sliderPrice < 2000 ? String(sliderPrice) : null);
  };

  const handleClearAll = () => {
    setSliderPrice(2000);
    router.replace(pathname, { scroll: false });
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedMaterials.length +
    (selectedColor ? 1 : 0);

  const renderFilterContent = () => (
    <>
      {/* Category Multi-Select */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
            Category
          </h3>
          <div className="space-y-2 text-xs font-sans tracking-wide">
            {categories.map((cat) => {
              const isChecked = selectedCategories.includes(cat);
              return (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat)}
                    className="rounded border-border bg-transparent focus:ring-0 text-foreground cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Smooth Price Slider */}
      <div className="border-t border-border pt-4 mb-6">
        <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
          Price
        </h3>
        <div className="space-y-2 font-sans">
          <input
            type="range"
            min="0"
            max="2000"
            step="25"
            value={sliderPrice}
            onChange={(e) => setSliderPrice(Number(e.target.value))}
            onMouseUp={commitPriceToUrl}
            onTouchEnd={commitPriceToUrl}
            className="w-full accent-primary bg-border h-[2px] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>Up to ${sliderPrice}</span>
            <span>$2,000+</span>
          </div>
        </div>
      </div>

      {/* Colour Selection */}
      {colors.length > 0 && (
        <div className="border-t border-border pt-4 mb-6">
          <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
            Colour
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => {
              const isSelected = selectedColor === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() =>
                    updateQueryParam("color", isSelected ? null : c.name)
                  }
                  title={c.name}
                  className={`p-0.5 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                      : "hover:scale-105"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-border shadow-inner block"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Material Multi-Select */}
      {materials.length > 0 && (
        <div className="border-t border-border pt-4 mb-6">
          <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">
            Material
          </h3>
          <div className="space-y-2 text-xs font-sans tracking-wide">
            {materials.map((mat) => {
              const isChecked = selectedMaterials.includes(mat);
              return (
                <label
                  key={mat}
                  className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleMaterialToggle(mat)}
                    className="rounded border-border bg-transparent focus:ring-0 text-foreground cursor-pointer"
                  />
                  <span>{mat}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <aside className="hidden md:block w-64 shrink-0 font-serif">
        <div className="border-b border-border pb-4 mb-4 flex justify-between items-center">
          <h2 className="text-xs uppercase tracking-widest font-bold text-foreground">
            FILTER
          </h2>
          {(activeFiltersCount > 0 || sliderPrice < 2000) && (
            <button
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
        {renderFilterContent()}
      </aside>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="md:hidden text-xs uppercase tracking-widest font-semibold text-foreground px-3 py-1 border border-border rounded cursor-pointer"
      >
        FILTER {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end font-serif">
          <div className="w-80 bg-background h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xs uppercase tracking-widest font-bold text-foreground">
                  FILTERS & SORT
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-sans text-foreground cursor-pointer"
                >
                  ✕
                </button>
              </div>
              {renderFilterContent()}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-full bg-foreground text-background py-4 text-xs tracking-widest uppercase font-semibold cursor-pointer"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function FilterSidebar(props: FilterSidebarProps) {
  return (
    <Suspense fallback={<div className="w-64 shrink-0 h-96 bg-muted/20 animate-pulse rounded" />}>
      <FilterSidebarContent {...props} />
    </Suspense>
  );
}