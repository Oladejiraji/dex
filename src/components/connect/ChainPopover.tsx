import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function ChainPopover() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="grid gap-4 absolute left-0 top-0 z-[50] bg-[red] w-full h-full">
      <div>
        <div>
          <div>
            <Input
              className="bg-transparent border-none font-geist-medium text-2xl text-grey-300 p-0"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Search by name or paste address"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
