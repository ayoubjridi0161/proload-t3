import { Langfuse } from "langfuse";

const langfuse = new Langfuse({
  secretKey: "sk-lf-07e580a9-ac47-485b-97ab-1a99008b33b3",
  publicKey: "pk-lf-9e08cd2a-c92e-46cb-b7bf-7faaf05cb507",
  baseUrl: "https://cloud.langfuse.com"
});

export default langfuse;