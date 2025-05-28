import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";

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
      <div className="flex items-center space-x-2 py-2">
        <Checkbox
          id="combination"
          checked={comboMode}
          onCheckedChange={(v) => setComboMode(v)}
        />
        <label
          htmlFor="combination"
          className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Require a button combination to activate the cheat? (Recommended)
        </label>
      </div>

      <ToggleGroup
        type="multiple"
        onValueChange={(value) => setSelectedButtons(value)}
        className="mt-4 flex-wrap"
      >
        {Object.keys(BUTTON_VALUES).map((button) => (
          <ToggleGroupItem
            key={button}
            value={button}
            aria-label={`Toggle ${button}`}
            className="lg:px-4 lg:py-2 lg:rounded-2xl px-8 rounded-sm py-2"
            disabled={!comboMode}
          >
            {button}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
