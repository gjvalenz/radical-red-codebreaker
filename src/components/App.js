"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

import ModeSelector from "@/components/ModeSelector";
import CombinationSelector from "@/components/CombinationSelector";
import ItemSelector from "@/components/ItemSelector";
import QuantitySelector from "./QuantitySelector";
import CodeDisplay from "./CodeDisplay";

import { BUTTON_VALUES, ADDRESS_LOOKUP } from "@/values";

export default function () {
  const [mode, setMode] = useState("none"); // pokeball, key item, item, tm, berry
  const [comboMode, setComboMode] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0x0001);
  const [quantity, setQuantity] = useState("1");
  const [infinite, setInfinite] = useState(false);
  const [copied, setCopied] = useState(false);

  const numToHexCode = (num) => num.toString(16).toUpperCase().padStart(4, "0");

  const generateCode = () => {
    if (mode === "none") return "";
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

  const code = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Code copied to clipboard!");
  };

  useEffect(() => {
    if (mode === "tm" || mode === "key item") {
      setQuantity(1);
      setInfinite(false);
    }
  }, [mode]);

  return (
    <main className="p-6 lg:max-w-2xl w-full mx-auto space-y-6 relative">
      <h1 className="text-4xl font-bold text-center mb-12">
        🎮 Pokemon Radical Red 4.1 Codebreaker Item Generator
      </h1>
      <Card className="shadow-md rounded-2xl">
        <h2 className="text-3xl font-bold text-center mt-2">
          Generate Item Code
        </h2>
        <CardContent className="pt-1 pb-6 space-y-[22px]">
          <ModeSelector mode={mode} setMode={setMode} />
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
          <CombinationSelector
            comboMode={comboMode}
            setComboMode={setComboMode}
            selectedButtons={selectedButtons}
            setSelectedButtons={setSelectedButtons}
          />
          <CodeDisplay
            code={code}
            handleCopy={handleCopy}
            comboMode={comboMode}
            copied={copied}
          />
        </CardContent>
      </Card>
    </main>
  );
}
