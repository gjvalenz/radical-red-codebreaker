import { Info, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default ({ code, handleCopy, comboMode, copied }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Code</h2>
      <pre
        onClick={handleCopy}
        className="bg-neutral-950 rounded-2xl min-h-[7rem] leading-[1.5] font-mono overflow-auto py-2 pl-4 w-[50%]"
      >
        {code}
      </pre>
      <Button
        onClick={handleCopy}
        className="flex items-center space-x-2"
        disabled={code === "" || copied}
      >
        <Copy size={16} />
        <span>{copied ? "Copied!" : "Copy Code"}</span>
      </Button>
      {code != "" && (
        <Alert className="text-xs w-[80%] dark:bg-neutral-900">
          <Info className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription className="text-xs">
            Try to open your bag again if your item does not appear.
          </AlertDescription>
        </Alert>
      )}
      {!comboMode && code != "" && (
        <Alert
          variant="warning"
          className="text-xs w-[80%] dark:bg-neutral-900"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Caution</AlertTitle>
          <AlertDescription className="text-xs">
            Ideally, after inputting your cheat, deactivate it before opening
            your bag.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
