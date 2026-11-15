// components/product detail/shoeSizeFinder.tsx
"use client";

import React, { useState } from "react";
import { ProductVariant } from "./types/product";
import { findMatchingShoeSize } from "./types/findShoeSize"; // update if placed elsewhere

interface ShoeSizeFinderProps {
    variants: ProductVariant[];
    onSelectVariant: (variant: ProductVariant) => void;
}

export default function ShoeSizeFinder({
    variants,
    onSelectVariant,
}: ShoeSizeFinderProps) {
    const [unit, setUnit] = useState<"cm" | "in">("cm");
    const [lengthInput, setLengthInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [recommendation, setRecommendation] = useState<{
        label: string;
        matched: boolean;
    } | null>(null);

    const handleFindSize = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setRecommendation(null);

        const numericVal = parseFloat(lengthInput);
        if (!lengthInput.trim() || isNaN(numericVal) || numericVal <= 0) {
            setErrorMsg(
                `Please enter a valid foot length in ${unit === "cm" ? "centimeters" : "inches"}.`
            );
            return;
        }

        // Basic realistic range check so users get helpful feedback
        const minVal = unit === "cm" ? 15 : 6;
        const maxVal = unit === "cm" ? 36 : 14.5;
        if (numericVal < minVal || numericVal > maxVal) {
            setErrorMsg(
                `Please enter a foot length between ${minVal} and ${maxVal} ${unit}.`
            );
            return;
        }

        setIsLoading(true);
        try {
            const result = await findMatchingShoeSize(numericVal, unit, variants);

            if (result.matchedVariant) {
                onSelectVariant(result.matchedVariant);
                setRecommendation({ label: result.recommendedLabel, matched: true });
            } else {
                setRecommendation({ label: result.recommendedLabel, matched: false });
            }
        } catch (error) {
            setErrorMsg(
                error instanceof Error
                    ? error.message
                    : "Unable to calculate your size right now."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-2.5 font-sans">
            {/* Header matching the "Size" eyebrow style + CM/IN toggle */}
            <div className="flex items-center justify-between">
                <span className="eyebrow text-ink-subtle block">Find Your Size</span>

                <div className="inline-flex border border-line bg-surface text-[11px]">
                    <button
                        type="button"
                        onClick={() => {
                            setUnit("cm");
                            setErrorMsg(null);
                            setRecommendation(null);
                        }}
                        className={`px-2.5 py-0.5 tracking-wider uppercase cursor-pointer transition-colors ${unit === "cm"
                                ? "bg-brand text-on-brand font-semibold"
                                : "text-ink-muted hover:text-ink"
                            }`}
                    >
                        CM
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setUnit("in");
                            setErrorMsg(null);
                            setRecommendation(null);
                        }}
                        className={`px-2.5 py-0.5 tracking-wider uppercase cursor-pointer transition-colors ${unit === "in"
                                ? "bg-brand text-on-brand font-semibold"
                                : "text-ink-muted hover:text-ink"
                            }`}
                    >
                        IN
                    </button>
                </div>
            </div>

            {/* Input & Find Button (noValidate disables plain browser tooltips) */}
            <form onSubmit={handleFindSize} noValidate className="flex gap-3">
                <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    placeholder={
                        unit === "cm" ? "Foot length (e.g. 26.5 cm)" : "Foot length (e.g. 10.4 in)"
                    }
                    value={lengthInput}
                    onChange={(e) => {
                        setLengthInput(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                    }}
                    className={`flex-1 h-button border bg-surface px-3.5 text-xs text-ink placeholder:text-ink-subtle focus:outline-none transition-colors ${errorMsg
                            ? "border-red-700"
                            : "border-field focus:border-brand"
                        }`}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 h-button border border-field bg-surface-cream hover:bg-brand-deep hover:border-ink hover:text-surface text-ink text-xs tracking-button uppercase font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Finding..." : "Find"}
                </button>
            </form>

            {/* Themed Validation Error */}
            {errorMsg && (
                <div
                    role="alert"
                    className="p-3 border border-red-800/30 bg-red-950/5 text-red-800 text-xs flex items-center justify-between"
                >
                    <span>{errorMsg}</span>
                </div>
            )}

            {/* Themed Size Recommendation Result */}
            {recommendation && (
                <div className="p-3 border border-brand/40 bg-surface-selected text-xs text-ink">
                    <span>Recommended size: </span>
                    <span className="font-semibold text-brand">
                        {recommendation.label}
                    </span>
                    {recommendation.matched ? (
                        <span className="text-ink-muted"> — selected above</span>
                    ) : (
                        <span className="text-ink-subtle">
                            {" "}
                            — currently unavailable for this style
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}