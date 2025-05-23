import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { BUTTON_VALUES } from "@/values";

export default ({ noCombo, setNoCombo, selectedButtons, toggleButton }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Activation Combination</h2>
      <Label className="flex items-center space-x-2">
        <Checkbox
          checked={noCombo}
          onCheckedChange={() => setNoCombo(!noCombo)}
        />
        <span>No Combination</span>
      </Label>
      {!noCombo && (
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
      )}
    </div>
  );
};
