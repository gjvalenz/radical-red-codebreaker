import { ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";

export default ({ mode, setMode, options }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Choose Mode</h2>
      <Select.Root
        value={mode.toString()}
        onValueChange={(value) => setMode(value)}
      >
        <Select.Trigger className="w-full flex items-center justify-between p-3 border rounded-lg shadow-sm text-sm bg-white">
          <div className="flex items-center space-x-2">
            <img
              src={options.find((item) => item.value === mode)?.icon}
              alt="Selected Mode"
              className="w-5 h-5"
            />
            <span>{options.find((item) => item.value === mode)?.label}</span>
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
              {options.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value.toString()}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                >
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="text-sm">{`${item.label}`}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
