import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import { inngest } from "./client";

const google = createGoogleGenerativeAI();
export const execute = inngest.createFunction(
  {
    id: "execute-ai",
    triggers: { event: "execute/ai" },
  },
  async ({ event, step }) => {
    // This calls `generateText` with the given arguments, adding AI observability,
    // metrics, datasets, and monitoring to your calls.
    const { steps } = await step.ai.wrap("Sezer", generateText, {
      model: google("gemini-2.5-flash"),
      prompt: "Test 123"
    });

    return steps;
  },
);
