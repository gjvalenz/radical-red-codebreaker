import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default ({ quantity, setQuantity, infinite, setInfinite, mode }) => {
  if (mode === "key item" || mode === "tm") return null;
  return (
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
          className="w-18"
        />
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="inf"
            checked={infinite}
            onCheckedChange={(v) => setInfinite(!infinite)}
          />
          <label
            htmlFor="inf"
            className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Infinite?
          </label>
        </div>
      </div>
    </div>
  );
};
