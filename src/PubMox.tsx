import type { FC } from "react";
import { useEventChat } from "./hooks";

const PubMox: FC = () => {
  const [emit] = useEventChat("pub-mox", {
    callback: (detail) => console.log("a----pub-mox", detail),
  });

  return (
    <button type="button" onClick={() => emit({ name: "sub-mox" })}>
      click it
    </button>
  );
};

export default PubMox;
