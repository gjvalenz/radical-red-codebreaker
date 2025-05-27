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

import ALL_ITEMS from "../items.json";
import { useEffect } from "react";

export default ({ selectedItem, setSelectedItem, mode }) => {
  const current_items =
    mode == "all" ? ALL_ITEMS : ALL_ITEMS.filter((item) => item.kind === mode);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Item</h2>
      {true && (
        <Select onValueChange={(value) => setSelectedItem(parseInt(value))}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Item" />
            <SelectContent>
              <SelectGroup>
                {current_items.map((item) => (
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
      )}
    </div>
  );
};

/*
{false && mode != "none" && (
        <Select.Root
          value={selectedItem.toString()}
          onValueChange={(value) => setSelectedItem(parseInt(value))}
        >
          <Select.Trigger className="w-full flex items-center justify-between p-3 border rounded-lg shadow-sm text-sm bg-white">
            <div className="flex items-center space-x-2">
              <img
                src={
                  current_items.find((item) => item.value === selectedItem)
                    ?.icon
                }
                alt="Selected Item"
                className="w-5 h-5"
              />
              <span>
                {
                  current_items.find((item) => item.value === selectedItem)
                    ?.label
                }{" "}
                (
                {current_items.find((item) => item.value === selectedItem)?.hex}
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
                {current_items.map((item) => (
                  <Select.Item
                    key={item.value}
                    value={item.value.toString()}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span className="text-sm">{`${item.label} (${item.hex})`}</span>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}*/
