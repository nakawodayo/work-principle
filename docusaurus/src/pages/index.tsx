import React from "react";
import { useHistory } from "@docusaurus/router";

export default function Home() {
  const history = useHistory();

  React.useEffect(() => {
    history.push("docs/");
  }, []);

  return null;
}
