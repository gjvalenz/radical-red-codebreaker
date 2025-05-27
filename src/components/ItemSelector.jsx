import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import ALL_ITEMS from "../items.json";

export default ({ selectedItem, setSelectedItem, mode }) => {
  const currentItems =
    mode == "all" ? ALL_ITEMS : ALL_ITEMS.filter((item) => item.kind === mode);
  const currentItem = currentItems.find((item) => item.value === selectedItem);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Item</h2>
      {true && (
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
          {selectedItem && currentItem && mode != "none" && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">More Info</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
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
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      )}
    </div>
  );
};
