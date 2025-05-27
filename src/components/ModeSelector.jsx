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

import { MODE_OPTIONS } from "@/values";

export default ({ mode, setMode }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Choose Mode</h2>
      <Select onValueChange={setMode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Mode" />
          <SelectContent>
            <SelectGroup>
              {MODE_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <div className="flex items-center">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="mr-2 h-5 w-5"
                    />
                    {item.label}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};
