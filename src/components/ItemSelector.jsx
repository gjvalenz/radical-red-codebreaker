import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Tip from "./Tip";

import ALL_ITEMS from "../items.json";

export default ({ selectedItem, setSelectedItem, mode }) => {
  const currentItems =
    mode == "all" ? ALL_ITEMS : ALL_ITEMS.filter((item) => item.kind === mode);
  const currentItem = currentItems.find((item) => item.value === selectedItem);
  const itemIsSelected =
    mode != "none" &&
    currentItem?.kind == mode &&
    selectedItem == currentItem?.value;
  return (
    <div>
      <div className="flex flex-row items-center mb-1">
        <h2 className="text-xl font-semibold mb-1">Select Item</h2>
        {itemIsSelected && (
          <Tip
            content="Close and open your bag again if the item doesn't seem to appear."
            className="ml-2"
          >
            <Info className="h-4 w-4" />
          </Tip>
        )}
      </div>
      <div className="flex flex-row">
        <Select
          onValueChange={(value) => setSelectedItem(parseInt(value))}
          disabled={mode === "none"}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Item" />
            <SelectContent>
              <SelectGroup>
                {currentItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="mr-2 h-5 w-5"
                      />
                      <span>
                        {item.label} ({item.hex})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
        {itemIsSelected && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="link"
                className="underline decoration-dashed decoration-[0.05rem] text-xs md:text-sm"
              >
                More
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex justify-between space-x-4">
                <img
                  src={currentItem.icon}
                  alt={currentItem.label}
                  className="mr-2 h-5 w-5"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {currentItem?.label}
                  </h4>
                  <p className="text-sm">{currentItem?.description}</p>
                  <div className="flex items-center pt-2">
                    {currentItem?.price > 0 && (
                      <p className="text-xs">₽{currentItem?.price}</p>
                    )}
                    {currentItem?.price == 0 && (
                      <p className="text-xs">Not available for purchase</p>
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
