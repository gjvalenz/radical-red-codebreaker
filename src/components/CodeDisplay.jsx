import { TriangleAlert, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tip from "./Tip";

export default ({ code, handleCopy, comboMode, copied }) => {
  return (
    <div>
      <div className="flex flex-row items-center mb-1">
        <h2 className="text-xl font-semibold mb-1">Code</h2>
        {!comboMode && (
          <Tip
            content="Ideally, after inputting your cheat, deactivate it before opening your bag."
            className="ml-2"
          >
            <TriangleAlert className="h-4 w-4 text-yellow-300" />
          </Tip>
        )}
      </div>
      <div className="flex items-center justify-center h-[7rem] bg-neutral-950 rounded-sm mb-2">
        <pre
          className="text-center font-mono leading-[1.5]"
          onClick={handleCopy}
        >
          {code}
        </pre>
      </div>
      <div className="flex items-center">
        <Button
          onClick={handleCopy}
          className="flex items-center cursor-pointer"
          disabled={code === "" || copied}
        >
          <Copy size={16} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
    </div>
  );
};
