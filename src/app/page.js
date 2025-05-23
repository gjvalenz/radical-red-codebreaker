"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";

import ModeSelector from "@/components/ModeSelector";
import CombinationSelector from "@/components/CombinationSelector";

import { BUTTON_VALUES, POKEBALL_ITEM_OPTIONS, MODE_OPTIONS } from "@/values";

export default function PokemonRadicalRedCodebreakerGenerator() {
  const [mode, setMode] = useState("pokeballs"); // pokeballs, key, items, tms
  const [noCombo, setNoCombo] = useState(false);
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
    const itemHex = `0x${selectedItem
      .toString(16)
      .toUpperCase()
      .padStart(4, "0")}`;
    return `D0000020 ${combo}\n8203C418 ${type}\n7203C418 ${type}\n8203C41A ${amount}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6 relative">
      <h1 className="text-4xl font-bold text-center mb-6">
        🎮 Pokemon Radical Red Codebreaker Item Generator
      </h1>
      <Card className="shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center mt-4">
          Generate {MODE_OPTIONS.find((item) => item.value === mode)?.label}
        </h2>
        <CardContent className="p-6 space-y-6">
          <ModeSelector mode={mode} setMode={setMode} options={MODE_OPTIONS} />
          <CombinationSelector
            noCombo={noCombo}
            setNoCombo={setNoCombo}
            selectedButtons={selectedButtons}
            toggleButton={toggleButton}
          />
          <div>
            <h2 className="text-xl font-semibold mb-2">Choose Ball</h2>
            <Select.Root
              value={selectedItem.toString()}
              onValueChange={(value) => setSelectedItem(parseInt(value))}
            >
              <Select.Trigger className="w-full flex items-center justify-between p-3 border rounded-lg shadow-sm text-sm bg-white">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      POKEBALL_ITEM_OPTIONS.find(
                        (item) => item.value === selectedItem
                      )?.icon
                    }
                    alt="Selected Item"
                    className="w-5 h-5"
                  />
                  <span>
                    {
                      POKEBALL_ITEM_OPTIONS.find(
                        (item) => item.value === selectedItem
                      )?.label
                    }{" "}
                    (
                    {
                      POKEBALL_ITEM_OPTIONS.find(
                        (item) => item.value === selectedItem
                      )?.hex
                    }
                    )
                  </span>
                </div>
                <ChevronDown size={16} />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  forceMount
                  position="popper"
                  className="bg-white rounded-md shadow-md border mt-1 max-h-60 overflow-auto z-50"
                >
                  <Select.Viewport className="p-1">
                    {POKEBALL_ITEM_OPTIONS.map((item) => (
                      <Select.Item
                        key={item.value}
                        value={item.value.toString()}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-5 h-5"
                        />
                        <span className="text-sm">{`${item.label} (${item.hex})`}</span>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Quantity</h2>
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                min="1"
                max="999"
                value={quantity}
                disabled={infinite}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    setQuantity(Math.min(999, Math.max(1, val)).toString());
                  } else {
                    setQuantity("");
                  }
                }}
                className="w-24"
              />
              <Label className="flex items-center space-x-2">
                <Checkbox
                  checked={infinite}
                  onCheckedChange={() => setInfinite(!infinite)}
                />
                <span>Infinite</span>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 text-sm">
        <h2 className="text-xl font-semibold mb-2">Code</h2>
        <p>
          Note: You may need to open your bag twice after activating via
          combination.
        </p>
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
