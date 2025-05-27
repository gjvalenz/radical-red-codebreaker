"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";

import ModeSelector from "@/components/ModeSelector";
import CombinationSelector from "@/components/CombinationSelector";
import ItemSelector from "@/components/ItemSelector";
import QuantitySelector from "./QuantitySelector";

import {
  BUTTON_VALUES,
  MODE_OPTIONS,
  ADDRESS_LOOKUP,
  POKEBALL_ITEM_OPTIONS,
} from "@/values";

export default function () {
  const [mode, setMode] = useState("pokeball"); // pokeball, key item, item, tm, berry
  const [comboMode, setComboMode] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0x0001);
  const [quantity, setQuantity] = useState("1");
  const [infinite, setInfinite] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleButton = (button) => {
    setSelectedButtons((prev) =>
      prev.includes(button)
        ? prev.filter((b) => b !== button)
        : [...prev, button]
    );
  };

  const numToHexCode = (num) => num.toString(16).toUpperCase().padStart(4, "0");

  const generateCode = () => {
    const buttonValue = selectedButtons.reduce(
      (acc, cur) => acc | BUTTON_VALUES[cur],
      0
    );
    const combo = numToHexCode(buttonValue);
    const type = numToHexCode(selectedItem);
    const amountRaw = Math.min(999, Math.max(1, parseInt(quantity) || 1));
    const amount = infinite ? "FFFF" : numToHexCode(amountRaw);
    const addressValues = ADDRESS_LOOKUP[mode];
    if (!comboMode) {
      return `8${addressValues.type} ${type}\n8${addressValues.amount} ${amount}`;
    }
    return `D0000020 ${combo}\n8${addressValues.type} ${type}\n7${addressValues.type} ${type}\n8${addressValues.amount} ${amount}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (mode === "tm" || mode === "key item") {
      setQuantity(1);
      setInfinite(false);
    }
  }, [mode]);

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6 relative">
      <h1 className="text-4xl font-bold text-center mb-12">
        🎮 Pokemon Radical Red 4.1 Codebreaker Item Generator
      </h1>
      <Card className="shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mt-2">
          Generate {MODE_OPTIONS.find((item) => item.value === mode)?.label}
        </h2>
        <CardContent className="p-6 space-y-8">
          <ModeSelector mode={mode} setMode={setMode} />
          <CombinationSelector
            comboMode={comboMode}
            setComboMode={setComboMode}
            selectedButtons={selectedButtons}
            setSelectedButtons={setSelectedButtons}
          />
          <ItemSelector
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            mode={mode}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            infinite={infinite}
            setInfinite={setInfinite}
            mode={mode}
          />
        </CardContent>
      </Card>

      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 text-sm">
        <h2 className="text-xl font-semibold mb-2">Code</h2>
        <p>
          Note: You may need to open your bag twice after activating via
          combination.
        </p>
        {!comboMode && (
          <p>
            Note: Upon activation, try to deactivate it immediately before
            opening your bag.
          </p>
        )}
        <pre
          className="whitespace-pre-wrap font-mono cursor-pointer bg-black text-lime-300 text-md p-6 rounded-xl border border-lime-500 shadow-lg tracking-wide"
          onClick={handleCopy}
        >
          {generateCode()}
        </pre>
        <Button
          onClick={handleCopy}
          className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white"
        >
          <Copy size={16} />
          <span>{copied ? "Copied!" : "Copy Code"}</span>
        </Button>
      </div>

      {copied && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          Code copied to clipboard!
        </div>
      )}
    </main>
  );
}
