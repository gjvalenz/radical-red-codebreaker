"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";

const BUTTON_VALUES = {
  A: 1,
  B: 2,
  Select: 4,
  Start: 8,
  Right: 16,
  Left: 32,
  Up: 64,
  Down: 128,
  R: 256,
  L: 512,
};

const ITEM_OPTIONS = [
  {
    value: 0x0001,
    label: "Master Ball",
    hex: "0x01",
    icon: "https://img.pokemondb.net/sprites/items/master-ball.png",
  },
  {
    value: 0x0002,
    label: "Ultra Ball",
    hex: "0x02",
    icon: "https://img.pokemondb.net/sprites/items/ultra-ball.png",
  },
  {
    value: 0x0003,
    label: "Great Ball",
    hex: "0x03",
    icon: "https://img.pokemondb.net/sprites/items/great-ball.png",
  },
  {
    value: 0x0004,
    label: "Pokeball",
    hex: "0x04",
    icon: "https://img.pokemondb.net/sprites/items/poke-ball.png",
  },
  {
    value: 0x0005,
    label: "Safari Ball",
    hex: "0x05",
    icon: "https://img.pokemondb.net/sprites/items/safari-ball.png",
  },
  {
    value: 0x0006,
    label: "Net Ball",
    hex: "0x06",
    icon: "https://img.pokemondb.net/sprites/items/net-ball.png",
  },
  {
    value: 0x0007,
    label: "Dive Ball",
    hex: "0x07",
    icon: "https://img.pokemondb.net/sprites/items/dive-ball.png",
  },
  {
    value: 0x0008,
    label: "Nest Ball",
    hex: "0x08",
    icon: "https://img.pokemondb.net/sprites/items/nest-ball.png",
  },
  {
    value: 0x0009,
    label: "Repeat Ball",
    hex: "0x09",
    icon: "https://img.pokemondb.net/sprites/items/repeat-ball.png",
  },
  {
    value: 0x000a,
    label: "Timer Ball",
    hex: "0x0A",
    icon: "https://img.pokemondb.net/sprites/items/timer-ball.png",
  },
  {
    value: 0x000b,
    label: "Luxury Ball",
    hex: "0x0B",
    icon: "https://img.pokemondb.net/sprites/items/luxury-ball.png",
  },
  {
    value: 0x000c,
    label: "Premier Ball",
    hex: "0x0C",
    icon: "https://img.pokemondb.net/sprites/items/premier-ball.png",
  },
  {
    value: 0x00ef,
    label: "Cherish Ball",
    hex: "0xEF",
    icon: "https://img.pokemondb.net/sprites/items/cherish-ball.png",
  },
  {
    value: 0x00f0,
    label: "Dusk Ball",
    hex: "0xF0",
    icon: "https://img.pokemondb.net/sprites/items/dusk-ball.png",
  },
  {
    value: 0x00f1,
    label: "Heal Ball",
    hex: "0xF1",
    icon: "https://img.pokemondb.net/sprites/items/heal-ball.png",
  },
  {
    value: 0x00f2,
    label: "Quick Ball",
    hex: "0xF2",
    icon: "https://img.pokemondb.net/sprites/items/quick-ball.png",
  },
  {
    value: 0x00f3,
    label: "Fast Ball",
    hex: "0xF3",
    icon: "https://img.pokemondb.net/sprites/items/fast-ball.png",
  },
  {
    value: 0x00f4,
    label: "Level Ball",
    hex: "0xF4",
    icon: "https://img.pokemondb.net/sprites/items/level-ball.png",
  },
  {
    value: 0x00f5,
    label: "Lure Ball",
    hex: "0xF5",
    icon: "https://img.pokemondb.net/sprites/items/lure-ball.png",
  },
  {
    value: 0x00f6,
    label: "Heavy Ball",
    hex: "0xF6",
    icon: "https://img.pokemondb.net/sprites/items/heavy-ball.png",
  },
  {
    value: 0x00f7,
    label: "Love Ball",
    hex: "0xF7",
    icon: "https://img.pokemondb.net/sprites/items/love-ball.png",
  },
  {
    value: 0x00f8,
    label: "Friend Ball",
    hex: "0xF8",
    icon: "https://img.pokemondb.net/sprites/items/friend-ball.png",
  },
  {
    value: 0x00f9,
    label: "Moon Ball",
    hex: "0xF9",
    icon: "https://img.pokemondb.net/sprites/items/moon-ball.png",
  },
  {
    value: 0x00fa,
    label: "Sport Ball",
    hex: "0xFA",
    icon: "https://img.pokemondb.net/sprites/items/sport-ball.png",
  },
  {
    value: 0x00fb,
    label: "Beast Ball",
    hex: "0xFB",
    icon: "https://img.pokemondb.net/sprites/items/beast-ball.png",
  },
  {
    value: 0x00fc,
    label: "Dream Ball",
    hex: "0xFC",
    icon: "https://img.pokemondb.net/sprites/items/dream-ball.png",
  },
  {
    value: 0x00fd,
    label: "Park Ball",
    hex: "0xFD",
    icon: "https://img.pokemondb.net/sprites/items/park-ball.png",
  },
];

export default function PokemonRadicalRedCodebreakerGenerator() {
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
        🎮 Pokemon Radical Red Codebreaker Generator
      </h1>
      <Card className="shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center mt-4">
          Generate Pokeballs
        </h2>
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Activation Combination
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {Object.keys(BUTTON_VALUES).map((button) => (
                <Label
                  key={button}
                  className="flex items-center space-x-2 bg-gray-50 p-2 rounded shadow"
                >
                  <Checkbox
                    checked={selectedButtons.includes(button)}
                    onCheckedChange={() => toggleButton(button)}
                  />
                  <span>{button}</span>
                </Label>
              ))}
            </div>
          </div>

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
                      ITEM_OPTIONS.find((item) => item.value === selectedItem)
                        ?.icon
                    }
                    alt="Selected Item"
                    className="w-5 h-5"
                  />
                  <span>
                    {
                      ITEM_OPTIONS.find((item) => item.value === selectedItem)
                        ?.label
                    }{" "}
                    (
                    {
                      ITEM_OPTIONS.find((item) => item.value === selectedItem)
                        ?.hex
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
                    {ITEM_OPTIONS.map((item) => (
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
