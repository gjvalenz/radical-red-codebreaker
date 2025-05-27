import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

import { BUTTON_VALUES } from "@/values";

export default ({
  comboMode,
  setComboMode,
  selectedButtons,
  setSelectedButtons,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Activation Combination</h2>
      <RadioGroup
        className="dark"
        defaultValue="true"
        orientation="horizontal"
        onValueChange={(value) => setComboMode(value === "true")}
      >
        <span>
          <RadioGroupItem value="true" id="yes" />
          <label htmlFor="yes">Yes</label>
        </span>
        <span>
          <RadioGroupItem value="false" id="no" />
          <label htmlFor="no">No</label>
        </span>
      </RadioGroup>
      <Label className="flex items-center space-x-2 text-lg p-2 mb-10">
        <span>Toggle Combination</span>
      </Label>
      {comboMode && (
        <ToggleGroup
          variant="outline"
          type="multiple"
          onValueChange={(value) => setSelectedButtons(value)}
        >
          {Object.keys(BUTTON_VALUES).map((button) => (
            <ToggleGroupItem
              key={button}
              value={button}
              aria-label={`Toggle ${button}`}
            >
              {button}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  );
};

{
  /*<Checkbox
          checked={noCombo}
          onCheckedChange={() => setNoCombo(!noCombo)}
        />*/
}

/*
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
        */
